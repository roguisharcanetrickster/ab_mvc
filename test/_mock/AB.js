const EventEmitter = require("events").EventEmitter;

class ClassUI extends EventEmitter {
   constructor(view, idBase, ids) {
      super();
      this.view = view || {};
      this.ids = {};
      if (typeof ids === "object" && ids !== null) {
         Object.keys(ids).forEach((k) => {
            this.ids[k] = `${idBase}_${k}`;
         });
      }
      this.ids.component = idBase || "component";
      this.settings = (view && view.settings) || {};
   }
   ui(rows) {
      return { id: this.ids.component, rows: rows || [] };
   }
   onShow() {}
}

class ABViewPlugin {
   constructor() {
      this.settings = {};
   }
   toObj() {
      return {};
   }
   fromValues(values) {
      this.settings = (values && values.settings) || {};
   }
}

class ABViewPropertiesPlugin {
   constructor(key, defaults) {
      this.key = key;
      this.defaults = defaults;
      this.ids = {};
   }
   ui(rows) {
      return { rows: rows || [] };
   }
   async init() {}
   populate() {}
   values() {
      return { settings: {} };
   }
   fromValues() {}
   _ViewClass() {
      return null;
   }
}

class ABViewEditorPlugin {
   constructor(view, base, ids) {
      this.view = view;
      this.base = base;
      this.ids = ids || {};
   }
   ui() {
      return {};
   }
   async init() {}
   onShow() {}
   onHide() {}
   detatch() {}
}

class Config {
   uiSettings() {
      return {};
   }
}

class Multilingual {
   static labelPlugin(...params) {
      this._params = params;
   }
}

class AB {
   constructor() {
      this.Network = {
         post: () => Promise.resolve({}),
      };

      this.Class = {
         ABFieldManager: {
            allFields: () => {},
         },
      };

      this.ClassUI = ClassUI;
      this.ABViewComponentPlugin = ClassUI;
      this.ABViewPlugin = ABViewPlugin;
      this.ABViewPropertiesPlugin = ABViewPropertiesPlugin;
      this.ABViewEditorPlugin = ABViewEditorPlugin;

      this.Config = new Config();
      this.Multilingual = Multilingual;

      this.notify = {
         developer: () => {},
      };
   }

   Label() {
      return (s) => s;
   }

   uuid() {
      return "test-uuid";
   }

   definitionBundleNewMinimalProcess() {
      return { process: {}, children: [] };
   }

   async definitionBundleCreate() {
      return { process: { id: "p1" }, children: [] };
   }
}

module.exports = AB;
module.exports.default = AB;
