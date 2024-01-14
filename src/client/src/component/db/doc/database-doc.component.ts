import { CardItemComponent } from "../card-item.component";

export class DatabaseDocComponent extends HTMLDivElement {
    items: CardItemComponent[] = [];
    tables: [] = [];

    constructor() {
        super();

        // Parents
        const parent_el = this.parentNode;
        const shadow_el = this.attachShadow({ mode: "open" });

        // Attributes
        const api_at = this.getAttribute("api");
        const database_at = this.getAttribute("database");
        const cluster_at = this.getAttribute("cluster");
        const shard_at = this.getAttribute("shard");
        const description_at = this.getAttribute("description");

        // Elements
        const wrapper_el = document.createElement("div");

        const database_el = document.createElement("div");
        (() => {
            const databaseName_el = document.createElement("div");
            databaseName_el.style.fontSize = "2rem";
            databaseName_el.textContent = database_at;

            const clusterName_el = document.createElement("div");
            clusterName_el.style.fontSize = "1.2rem";
            clusterName_el.textContent = cluster_at;

            const shardName_el = document.createElement("div");
            shardName_el.style.fontSize = "1.2rem";
            shardName_el.textContent = shard_at;

            wrapper_el.appendChild(databaseName_el);
            wrapper_el.appendChild(clusterName_el);
            wrapper_el.appendChild(shardName_el);
        })();

        const tables_el = document.createElement("div");
        (() => {})();

        // Append
        shadow_el.appendChild(wrapper_el);
        wrapper_el.appendChild(database_el);
    }

    renderTables() {}
}

// Define the new element
customElements.define("d-database-doc", DatabaseDocComponent, {
    extends: "div",
});
