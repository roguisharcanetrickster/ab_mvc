const { JSDOM } = require("jsdom");
const webix = require("./_mock/webix");
const webixElement = require("./_mock/webix_element");

const dom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
global.FileReader = global.window.FileReader;
global.Blob = global.window.Blob;

global.$$ = webixElement;
global.webix = webix;
