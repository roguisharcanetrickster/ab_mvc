import FNViewLLMComponent from "./FNViewLLMComponent.js";

// FNViewLLM Web
// ABView definition for the LLM widget. Hosts a chat-like UI that talks to a
// stubbed server endpoint (POST /llm/complete) and, when the user clicks
// "Build", persists a minimal DefinitionBundle via the existing
// /definition/bundle/create flow (ab_plugin_ab_mvc service).
export default function FNViewLLM({
   ABViewPlugin,
   ABViewComponentPlugin,
}) {
   const ABViewLLMComponent = FNViewLLMComponent({ ABViewComponentPlugin });

   const ABViewLLMComponentDefaults = {
      systemPrompt: "process",
      placeholder: "",
   };

   const ABViewDefaults = {
      key: "ab-view-view-llm",
      icon: "comments",
      labelKey: "Plugin ab-view-view-llm",
   };

   return class ABViewLLM extends ABViewPlugin {
      static getPluginKey() {
         return "ab-view-view-llm";
      }

      static common() {
         return ABViewDefaults;
      }

      static defaultValues() {
         return ABViewLLMComponentDefaults;
      }

      component(parentId) {
         return new ABViewLLMComponent(this, parentId);
      }

      toObj() {
         var obj = super.toObj();
         obj.views = [];
         return obj;
      }

      fromValues(values) {
         super.fromValues(values);
         this.settings = this.settings || {};
      }

      componentList() {
         return [];
      }
   };
}
