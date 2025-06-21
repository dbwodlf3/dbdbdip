import { render, html, TemplateResult } from 'lit-html';
import { EventComponent } from './event.js';

/**
 * This is Base Component for HTMLElementComponent.
 * You need to implement _getHTML() method.
*/
export class ElementComponent extends EventComponent {
    containerHTML?: HTMLElement;

    constructor(containerHTML?: HTMLElement) {
        super();

        if(containerHTML)
            this.setContainer(containerHTML);
    }

    setContainer(containerHTML: HTMLElement){
        this.containerHTML = containerHTML;
    }

    _getHTML () {
        return html`
            <div> You have to implements _getHTML method. </div>
        `
    }

    getHTML () {
        return html`<div
            id="${this.id}"
        >
            ${this._getHTML()}
        </div>`
    }
}