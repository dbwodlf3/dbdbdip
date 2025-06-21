// Create a class for the element
export class LogoComponent extends HTMLDivElement {
    constructor() {
        super();

        // Parents
        const parent_el = this.parentNode;
        const shadow_el = this.attachShadow({ mode: "open" });

        const logo_size = this.getAttribute("size");

        // Create text node and add word count to it
        const img_el = document.createElement("img");

        img_el.setAttribute("src", "/static/img/logo.png");
        img_el.style.blockSize = logo_size || "128px";

        const text_el = document.createElement("span");

        // Append it to the shadow root
        shadow_el.appendChild(img_el);

        // Update count when element content changes
        setInterval(function () {}, 200);
    }
}

// Define the new element
customElements.define("d-logo", LogoComponent, { extends: "div" });
