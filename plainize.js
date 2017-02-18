function forEach(collection, iteratee) {
	for (let i = 0; i < collection.length; ++i) {
		iteratee(collection[i], i);
	}
}

function simplifyWhitespace(text) {
	return text.replace(/[\r\n\t ]+/g, ' ');
}

function isParagraph(tagName) {
	return tagName === "P"
		|| tagName === "PRE" 
		|| tagName === "BLOCKQUOTE" 
		|| tagName === "CITE" 
		|| tagName === "CODE" 
		|| tagName === "DIV" 
		|| tagName === "H1"
		|| tagName === "H2"
		|| tagName === "H3"
		|| tagName === "H4"
		|| tagName === "H5"
		|| tagName === "H6"
		;
}

function convertNodesToText(nodes) {
	const text = [];
	forEach(nodes, node => {
		const nodeType = node.nodeType;
		if (nodeType === Node.ELEMENT_NODE) {
			const tagName = node.tagName;
			if (tagName === "SCRIPT" || tagName === "STYLE") {
				// Do nothing
			}
			else if (tagName === "BR") {
				text.push("\n");
			}
			else if (isParagraph(tagName)) {
				text.push(convertNodesToText(node.childNodes));
				text.push("\n", "\n");
			}
			else {
				text.push(convertNodesToText(node.childNodes));
			}
		}
		else if (nodeType === Node.TEXT_NODE) {
			text.push(simplifyWhitespace(node.textContent));
		}
		else {
			console.error("Unknown node type:", node.nodeType);
		}
	});
	return text.join("");
}

function plainize(html) {
	const doc = document.implementation.createHTMLDocument('');
	doc.documentElement.innerHTML = html;
	const root = doc.getElementsByTagName('body')[0];
	return convertNodesToText(root.childNodes);
}

module.exports = plainize;
