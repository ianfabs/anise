import {
    query,
    queryAll,
    append,
    attach,
    textNode,
    style,
    isKnownElement,
} from "./utils";

type FunctionComponent = (...props:any[]) => HTMLElement;
type FC = FunctionComponent;
type FactoryTagParameter = HTMLElement | FC | String | string;

/**
 * @function
 * The JSX Pragma for vanilla dom for Anise
 *
 * @param  {FactoryTagParameter} tag
 * @param  {any} attrs
 * @param  {any[]} children
 */
const element = (tag: (HTMLElement | FC | String | string), attrs:any = null, ...children: any[]) => {
    /** The element being created in the element pragma */
    let _new_element: any;
    if (typeof tag === 'string') _new_element = document.createElement(tag);
    else if (isKnownElement(<HTMLElement>tag)) _new_element = tag;
    // TODO: This might not work, might need to revisit
    else if (tag instanceof Function) {
        const _temp = tag(Object.fromEntries(Object.entries(attrs).filter(it => !Object.keys(HTMLElement).includes(it[0]))));
        if ( isKnownElement(_temp) ) _new_element = _temp;
        else throw new Error("Anise Error: The function component specified does not return a valid HTMLElement");
    // This else case supports direct text children
    } else return document.createTextNode(<string>tag);
    // Apply attributes to the element being created
    Object.assign(_new_element, attrs);
    // Check if children are specified, and if so render them
    if (children != null) {
        for (const child of children) {
            if (isKnownElement(child)) _new_element.appendChild(child);
            /**
             * I'm not certain how necessary this else-if block is.
             * Consider the following example:
             * @example
             * const MyFC = props => {
             *    let counter = 0;
             *    const handleClick = _ => counter++;
             *    return <span>{counter} <button onClick={handleClick}>Click Me</button></span>;
             * };
             *
             * attach(
             *    query("#app"),
             *    <div>
             *       <h1>Hello World!</h1>
             *       <MyFC />
             *    </div>
             * );
             *
             * @description
             * I surmise that this else-if block will never be triggered in this example, because it will compile to the following:
             * @example
             * Anise.element("div", {}, [
             *    Anise.element("h1", {}, ["Hello World!"])
             *    Anise.element(MyFC, {}, null)
             * ])
             *
             * After writing this example out I understand that this is necessary.
             */
            else if (child instanceof Function) {
                const _temp = child();
                if (isKnownElement(_temp)) _new_element.appendChild(child);
                else throw new Error("Anise Error: The function component specified does not return a valid HTMLElement");
            }
            else _new_element.appendChild(document.createTextNode(child));
        }
    // In all seriousness I don't know what to do here
    } else return void 0;

    return _new_element;
};

// Not implemented
const fragment = () => {};


export {
    element,
    query,
    queryAll,
    append,
    attach,
    textNode,
    style,
    isKnownElement,
};
