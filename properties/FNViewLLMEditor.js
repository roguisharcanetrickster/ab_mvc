// FNViewLLMEditor
// Editor wrapper for the LLM ABView. Used by the ABDesigner canvas.
export default function FNViewLLMEditor({ AB, ABViewEditorPlugin }) {
   return class ABViewLLMEditor extends ABViewEditorPlugin {
      constructor(view, base = "interface_editor_viewllm", ids = {}) {
         super(view, base, ids);
      }

      static getPluginKey() {
         return "ab-view-view-llm";
      }

      static getPluginType() {
         return "editor-view";
      }

      ui() {
         return super.ui();
      }

      async init(AB) {
         await super.init(AB);
      }

      onShow() {
         super.onShow();
      }

      onHide() {
         super.onHide();
      }

      detatch() {
         super.detatch();
      }
   };
}
