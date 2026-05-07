import FNViewLLM from "./web/FNViewLLM.js";

export default function registerWeb(PluginAPI) {
   return [
      FNViewLLM(PluginAPI)
   ];
}
