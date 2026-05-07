// FNViewLLMComponent
// Webix UI for the LLM widget. Renders:
//   - system prompt switcher (process / object / interface)
//   - prompt textarea (input)
//   - Send button -> POST /llm/complete (stubbed) -> writes plan text to output
//   - Build button -> for systemPrompt=process, persists a minimal
//     DefinitionBundle through AB.definitionBundleCreate. For other
//     systemPrompts, alerts a TODO (no platform helpers yet).
//   - response textarea (output, readonly)
export default function FNViewLLMComponent({ ABViewComponentPlugin }) {
   return class ABViewLLMComponent extends ABViewComponentPlugin {
      constructor(baseView, idBase, ids) {
         super(
            baseView,
            idBase || `ABViewLLM_${baseView.id}`,
            Object.assign(
               {
                  systemPrompt: "",
                  input: "",
                  output: "",
                  buttonSend: "",
                  buttonBuild: "",
               },
               ids,
            ),
         );
      }

      ui() {
         this.settings = this.view.settings || {};
         const ids = this.ids;
         const systemPrompt =
            this.settings.systemPrompt || "process";
         const placeholder = this.settings.placeholder || "";

         const _ui = super.ui([
            {
               view: "richselect",
               id: ids.systemPrompt,
               label: "System Prompt",
               labelWidth: 120,
               value: systemPrompt,
               options: [
                  { id: "process", value: "Process" },
                  { id: "object", value: "Object" },
                  { id: "interface", value: "Interface" },
               ],
            },
            {
               view: "textarea",
               id: ids.input,
               height: 100,
               placeholder: placeholder || "Describe what to build...",
            },
            {
               cols: [
                  { fillspace: true },
                  {
                     view: "button",
                     id: ids.buttonSend,
                     value: "Send",
                     autowidth: true,
                     click: () => this._sendLLM(),
                  },
                  {
                     view: "button",
                     id: ids.buttonBuild,
                     value: "Build",
                     css: "webix_primary",
                     autowidth: true,
                     click: () => this._build(),
                  },
               ],
            },
            {
               view: "textarea",
               id: ids.output,
               readonly: true,
               height: 200,
               placeholder: "LLM response will appear here.",
            },
         ]);

         return _ui;
      }

      onShow() {
         super.onShow();
      }

      /**
       * @method _sendLLM
       * POST the current prompt + systemPrompt to /llm/complete and write
       * the response text into the output textarea.
       */
      async _sendLLM() {
         const ids = this.ids;
         const AB = this.view && this.view.AB;
         if (!AB || !AB.Network || typeof AB.Network.post !== "function") {
            webix.alert({
               title: "LLM",
               text: "Network unavailable.",
            });
            return;
         }

         const prompt = ($$(ids.input) && $$(ids.input).getValue()) || "";
         const systemPrompt =
            ($$(ids.systemPrompt) && $$(ids.systemPrompt).getValue()) ||
            "process";

         try {
            const result = await AB.Network.post({
               url: "/llm/complete",
               data: { systemPrompt, prompt },
            });
            const text = (result && result.text) || "";
            if ($$(ids.output)) $$(ids.output).setValue(text);
         } catch (err) {
            webix.alert({
               title: "LLM error",
               text: (err && err.message) || "Unknown error",
            });
         }
      }

      /**
       * @method _build
       * Persist a minimal DefinitionBundle through the existing
       * POST /definition/bundle/create flow. Only `process` systemPrompt is
       * wired for MVP - other types alert a TODO.
       */
      async _build() {
         const ids = this.ids;
         const AB = this.view && this.view.AB;
         const systemPrompt =
            ($$(ids.systemPrompt) && $$(ids.systemPrompt).getValue()) ||
            "process";

         if (systemPrompt !== "process") {
            webix.alert({
               title: "Build",
               text:
                  "TODO: Build is only wired for 'process' in this MVP. " +
                  "Add definitionBundleNewMinimal" +
                  systemPrompt.charAt(0).toUpperCase() +
                  systemPrompt.slice(1) +
                  " to enable.",
            });
            return false;
         }

         if (
            !AB ||
            typeof AB.definitionBundleNewMinimalProcess !== "function" ||
            typeof AB.definitionBundleCreate !== "function"
         ) {
            webix.alert({
               title: "Build",
               text: "Definition bundle helpers unavailable.",
            });
            return false;
         }

         const name = ($$(ids.input) && $$(ids.input).getValue()) || "";
         if (!name.trim()) {
            webix.alert({
               title: "Build",
               text: "Enter a prompt to use as the process name.",
            });
            return false;
         }

         try {
            const bundle = AB.definitionBundleNewMinimalProcess({ name });
            const results = await AB.definitionBundleCreate(bundle);
            if (typeof webix.message === "function") {
               webix.message({
                  type: "success",
                  text: `Created process ${results.process.id}`,
               });
            }
            return results;
         } catch (err) {
            webix.alert({
               title: "Build error",
               text: (err && err.message) || "Unknown error",
            });
            return false;
         }
      }
   };
}
