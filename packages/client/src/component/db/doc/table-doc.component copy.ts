import { CardItemComponent } from "../card-item.component";

type RecentItems = {
    type?: string;
    cluster?: string;
    shard?: string;
    database?: string;
};

export class TableDocComponent extends HTMLDivElement {
    items: CardItemComponent[] = [];

    constructor(input?: { noInit?: boolean }) {
        super();

        // Parents
        const parent_el = this.parentNode;
        const shadow_el = this.attachShadow({ mode: "open" });

        // Attributes
        const api_at = this.getAttribute("api");
        const table_at = this.getAttribute("table");
        const description_at = this.getAttribute("description");

        // Elements
        const table_el = document.createElement("div");
        table_el;

        const tableDesc_el = document.createElement("div");
        (() => {
            const tableName_el = document.createElement("div");
            tableName_el.style.paddingBottom = "8px";
            tableName_el.style.fontSize = "2rem";
            tableName_el.textContent = table_at;

            const tableExplain_el = document.createElement("div");
            tableExplain_el.textContent = description_at;

            tableDesc_el.appendChild(tableName_el);
            tableDesc_el.appendChild(tableExplain_el);

            console.log(tableName_el);
        })();

        const fieldDesc_el = document.createElement("div");
        (() => {
            const field_el = document.createElement("div");
            fieldDesc_el.style.fontSize = "1.4rem";
            fieldDesc_el.textContent = "Fields";

            fieldDesc_el.appendChild(field_el);
        })();

        // Append
        shadow_el.appendChild(table_el);
        table_el.appendChild(tableDesc_el);
        table_el.appendChild(fieldDesc_el);
    }
}

// Define the new element
customElements.define("d-table-doc", TableDocComponent, {
    extends: "div",
});
