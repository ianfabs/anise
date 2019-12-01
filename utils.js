/** 
 * @module anise-utils
 * @author Ian Fabs
 * @copyright 2019; Ian Fabs
 * @file Provides helpful utilities for working with the DOM.
*/

/**
 * @function
 * A shorthand for `document.querySelector`
 * 
 * @param  {string} selector Any valid CSS selector.
 * 
 */
const query = selector => document.querySelector(selector);
/**
 * @function
 * A shorthand for `document.querySelectorAll`
 * 
 * @param  {string} selector Any valid CSS selector.
 * 
 */
const queryAll = selector => document.querySelectorAll(selector);

/**
 * @function
 * Appends the specified child to the parent, and then returns the parent
 * 
 * @param  {HTMLElement} parent
 * @param  {HTMLElement} child
 * 
 * @returns {HTMLElement} The element specified in the parent argument
 */
const append = (parent, child) => {
    p.appendChild(c);
    return p;
};

/**
 * @function
 * Shorthand for `document.createTextNode`
 * 
 * @param  {string} text The text node contents
 * 
 * @returns {Text}
 */
const textNode = text => document.createTextNode(text);

/**
 * @function
 * Allows the addition of inline styles.
 * 
 * @param  {HTMLElement} element The text node contents.
 * 
 * @returns {HTMLElement} Returns the element passed to it
 */
const style = element => {
    return (args, ...strings) => {
        // reassembles the template string parts
        let template = args.reduce((a, v, i) => a + v + strings[i]);
        // Remove excess whitespace
        let lines = template.replace(/[\s]+[\s][\b]?/g, "\n").split("\n").filter(it => it !== "");
        console.log(lines);
        lines.forEach( line => {
            let keyValuePair = line.split(": ");
            let key = keyValuePair[0]/* .replace(/(?<=\-)[aA-zZ]/g, match => {
                return match.toUpperCase();
            }) */, value = keyValuePair[1].replace(";","");
            let temp = {};
            temp[key] = value;
            console.log(temp);
            Object.assign(element.style, temp);
        });

        return element;
    }
}

const isKnownElement = element => {
    let isHTMLElement = element instanceof HTMLElement;
    let isWebComponent = element instanceof HTMLUnknownElement && (customElements.get( element.tagName ) !== undefined || customElements.get( element.tagName ) !== null);
    return isHTMLElement || isWebComponent;
};

/**
 * @ignore
 * @function
 * This will be a more slick way to create a custom element.
 */
const createCustomElement = () => {};

export {
    query,
    queryAll,
    append,
    // Just a synonym for append for weird people
    append as attach,
    textNode,
    style,
    isKnownElement,
};