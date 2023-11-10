export class MiniQuery {

    constructor(selector, container) {
        this.elements = Array.from((container ?? document).querySelectorAll(selector));
    }
    click(handler){
        this.elements.forEach((element) => {
            element.addEventListener("click", handler)
        })

    }
    length() {
        return this.elements.length;
    }
}

export const $ = (selector, container) => {
    console.log("$ is called with", selector);
    return new MiniQuery(selector, container);
};
