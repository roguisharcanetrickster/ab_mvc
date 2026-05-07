// FNViewLLM Properties
// Properties panel for the LLM widget. Allows the designer to set the
// default system prompt and an optional input placeholder.
export default function FNViewLLMProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   return class ABViewLLMProperties extends ABViewPropertiesPlugin {
      constructor() {
         super(ABViewLLMProperties.getPluginKey(), {
            systemPrompt: "process",
            placeholder: "",
         });
         this.AB = AB;
      }

      static getPluginKey() {
         return "ab-view-view-llm";
      }

      static getPluginType() {
         return "properties-view";
      }

      defaultValues() {
         return {
            systemPrompt: "process",
            placeholder: "",
         };
      }

      ui() {
         const ids = this.ids;
         const L = this.AB && this.AB.Label ? this.AB.Label() : (s) => s;
         const defaults = this.defaultValues();

         return super.ui([
            {
               view: "fieldset",
               label: L("Default System Prompt:"),
               body: {
                  type: "clean",
                  padding: 10,
                  rows: [
                     {
                        id: ids.systemPrompt,
                        view: "radio",
                        name: "systemPrompt",
                        vertical: true,
                        value: defaults.systemPrompt,
                        options: [
                           { id: "process", value: L("Process") },
                           { id: "object", value: L("Object") },
                           { id: "interface", value: L("Interface") },
                        ],
                        on: {
                           onChange: () => {
                              this.onChange();
                           },
                        },
                     },
                  ],
               },
            },
            {
               id: ids.placeholder,
               view: "text",
               name: "placeholder",
               label: L("Input Placeholder"),
               placeholder: L("Optional input hint"),
               on: {
                  onChange: () => {
                     this.onChange();
                  },
               },
            },
            {},
         ]);
      }

      async init(AB) {
         this.AB = AB;
         await super.init(AB);
      }

      populate(view) {
         super.populate(view);
         const ids = this.ids;
         const settings = (view && view.settings) || {};
         if ($$(ids.systemPrompt))
            $$(ids.systemPrompt).setValue(settings.systemPrompt || "process");
         if ($$(ids.placeholder))
            $$(ids.placeholder).setValue(settings.placeholder || "");
      }

      values() {
         const values = super.values();
         const ids = this.ids;
         const $component = $$(ids.component);
         if ($component && typeof $component.getValues === "function") {
            values.settings = $component.getValues();
         }
         return values;
      }

      fromValues(values) {
         super.fromValues(values);
         this.settings = this.settings || {};
      }

      ViewClass() {
         return super._ViewClass("llm");
      }
   };
}
