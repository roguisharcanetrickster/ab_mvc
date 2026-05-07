import FNViewLLM from "./properties/FNViewLLM.js";
import FNViewLLMEditor from "./properties/FNViewLLMEditor.js";

export default function registerProperties(PluginAPI) {
   return [
      FNViewLLM(PluginAPI),
      FNViewLLMEditor(PluginAPI)
   ];
}
