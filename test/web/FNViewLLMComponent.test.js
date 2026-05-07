require("@babel/polyfill");
const assert = require("assert");
const sinon = require("sinon");

const AB = require("../_mock/AB.js");
const FNViewLLMComponentModule = require("../../web/FNViewLLMComponent.js");
const FNViewLLMComponent =
   FNViewLLMComponentModule.default || FNViewLLMComponentModule;

function getTarget(ab) {
   if (!ab) ab = new AB();

   const ABViewLLMComponent = FNViewLLMComponent({
      ABViewComponentPlugin: ab.ABViewComponentPlugin,
   });

   const baseView = {
      id: "view1",
      AB: ab,
      settings: {},
   };

   return new ABViewLLMComponent(baseView, "ABViewLLM_view1");
}

describe("FNViewLLMComponent", function () {
   afterEach(function () {
      sinon.restore();
   });

   it(".constructor - should set ids properly", function () {
      const target = getTarget();

      assert.equal("ABViewLLM_view1", target.ids.component);
      assert.equal("ABViewLLM_view1_systemPrompt", target.ids.systemPrompt);
      assert.equal("ABViewLLM_view1_input", target.ids.input);
      assert.equal("ABViewLLM_view1_output", target.ids.output);
      assert.equal("ABViewLLM_view1_buttonSend", target.ids.buttonSend);
      assert.equal("ABViewLLM_view1_buttonBuild", target.ids.buttonBuild);
   });

   it(".ui - should return a UI definition with rows containing the richselect", function () {
      const target = getTarget();
      const result = target.ui();

      assert.equal(true, result != null);
      assert.equal(target.ids.component, result.id);
      assert.equal(true, Array.isArray(result.rows));
      const richselect = result.rows.find((r) => r && r.view === "richselect");
      assert.equal(true, richselect != null);
      assert.equal(target.ids.systemPrompt, richselect.id);
      assert.equal(3, richselect.options.length);
   });

   it("._sendLLM - should POST /llm/complete and write response to output", async function () {
      const ab = new AB();
      const target = getTarget(ab);

      const expected = { text: "TODO: add llm API here" };
      const spyPost = sinon.stub(ab.Network, "post").resolves(expected);

      const setValueSpy = sinon.spy();
      sinon.stub(global, "$$").callsFake((id) => ({
         id,
         getValue: () => (id === target.ids.input ? "make a process" : "process"),
         setValue: setValueSpy,
      }));

      await target._sendLLM();

      assert.equal(true, spyPost.calledOnce);
      const arg = spyPost.firstCall.args[0];
      assert.equal("/llm/complete", arg.url);
      assert.equal("process", arg.data.systemPrompt);
      assert.equal("make a process", arg.data.prompt);
      assert.equal(true, setValueSpy.calledOnceWith(expected.text));
   });

   it("._build - process: should call definitionBundleNewMinimalProcess + definitionBundleCreate", async function () {
      const ab = new AB();
      const target = getTarget(ab);

      const minimalSpy = sinon
         .stub(ab, "definitionBundleNewMinimalProcess")
         .returns({ process: { id: "p1" }, children: [] });
      const createSpy = sinon
         .stub(ab, "definitionBundleCreate")
         .resolves({ process: { id: "p1" }, children: [] });

      sinon.stub(global, "$$").callsFake((id) => ({
         id,
         getValue: () =>
            id === target.ids.systemPrompt ? "process" : "My Process",
      }));

      const result = await target._build();

      assert.equal(true, minimalSpy.calledOnceWith({ name: "My Process" }));
      assert.equal(true, createSpy.calledOnce);
      assert.equal("p1", result.process.id);
   });

   it("._build - object: should NOT persist and should alert TODO", async function () {
      const ab = new AB();
      const target = getTarget(ab);

      const minimalSpy = sinon.spy(ab, "definitionBundleNewMinimalProcess");
      const createSpy = sinon.spy(ab, "definitionBundleCreate");
      const alertSpy = sinon.spy(global.webix, "alert");

      sinon.stub(global, "$$").callsFake((id) => ({
         id,
         getValue: () => (id === target.ids.systemPrompt ? "object" : "x"),
      }));

      const result = await target._build();

      assert.equal(false, result);
      assert.equal(false, minimalSpy.called);
      assert.equal(false, createSpy.called);
      assert.equal(true, alertSpy.calledOnce);
   });

   it("._build - interface: should NOT persist and should alert TODO", async function () {
      const ab = new AB();
      const target = getTarget(ab);

      const createSpy = sinon.spy(ab, "definitionBundleCreate");
      const alertSpy = sinon.spy(global.webix, "alert");

      sinon.stub(global, "$$").callsFake((id) => ({
         id,
         getValue: () => (id === target.ids.systemPrompt ? "interface" : "x"),
      }));

      const result = await target._build();

      assert.equal(false, result);
      assert.equal(false, createSpy.called);
      assert.equal(true, alertSpy.calledOnce);
   });

   it("._build - process with empty input: should alert and not persist", async function () {
      const ab = new AB();
      const target = getTarget(ab);

      const createSpy = sinon.spy(ab, "definitionBundleCreate");
      const alertSpy = sinon.spy(global.webix, "alert");

      sinon.stub(global, "$$").callsFake((id) => ({
         id,
         getValue: () => (id === target.ids.systemPrompt ? "process" : ""),
      }));

      const result = await target._build();

      assert.equal(false, result);
      assert.equal(false, createSpy.called);
      assert.equal(true, alertSpy.calledOnce);
   });
});
