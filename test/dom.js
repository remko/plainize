import jsdom from 'jsdom';
import { DOMParser, XMLSerializer } from 'xmldom';
import * as _ from 'lodash';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.window.DOMParser = DOMParser;
global.window.XMLSerializer = XMLSerializer;
global.navigator = {
	userAgent: 'node.js'
};

const KEYS = [
	"Node",
	"XMLSerializer",
	"DOMParser"
];
_.forEach(KEYS, key => {
	global[key] = global.window[key];
});
