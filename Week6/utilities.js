export function qs(selector) { 
    return document.querySelector(selector);
}

//add a onTouch to the element
export function onTouch(elementSelector, callback) { 
    const elem = qs(elementSelector);
    elem.addEventListener("click", callback);
}