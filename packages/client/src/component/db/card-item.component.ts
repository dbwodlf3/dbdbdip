type ItemType = "cluster" | "db" | "table";
const InputAttributes = ["type", "cluster", "shard", "database"] as const;

export class CardItemComponent extends HTMLDivElement {
    constructor(input?: { noInit?: boolean }) {
        super();
        const noInit = input?.noInit;

        const type = this.getAttribute("type") || "";
        const cluster = this.getAttribute("cluster") || "";
        const shard = this.getAttribute("shard") || "";
        const database = this.getAttribute("database") || "";

        if (!noInit) this.__init({ type, cluster, shard, database });
    }

    private __init(input: {
        type?: string;
        cluster?: string;
        shard?: string;
        database?: string;
    }) {
        // Parents
        const parent_el = this.parentNode;
        const shadow_el = this.attachShadow({ mode: "open" });

        // Attributes
        const type_at = input.type || "";
        const cluster_at = input.cluster || "";
        const shard_at = input.shard || "";
        const database_at = input.database || "";

        const materialLink_el = document.createElement("link");
        materialLink_el.href =
            "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        materialLink_el.rel = "stylesheet";

        const card_el = document.createElement("div");
        card_el.style.display = "flex";
        card_el.style.flexDirection = "column";
        card_el.style.alignItems = "center";
        card_el.style.justifyContent = "center";
        card_el.style.width = "160px";
        card_el.style.height = "160px";
        card_el.style.border = "2px dotted #B9D7EA";

        const icon_el = document.createElement("span");
        icon_el.classList.add("material-symbols-outlined");
        icon_el.style.fontSize = "32px";
        icon_el.style.marginBottom = "8px";
        icon_el.textContent = (() => {
            if (type_at == "cluster") return "hub";
            if (type_at == "db") return "database";
            if (type_at == "add") return "add";
            return "";
        })();

        const cluster_name_el = document.createElement("div");
        cluster_name_el.textContent = cluster_at;

        const database_name_el = document.createElement("div");
        database_name_el.textContent = database_at;

        // Compound
        card_el.appendChild(icon_el);
        card_el.appendChild(cluster_name_el);
        card_el.appendChild(database_name_el);

        // Append it to the shadow root
        shadow_el.appendChild(materialLink_el);
        shadow_el.appendChild(card_el);
    }

    static renderItem(input: {
        type?: string;
        cluster?: string;
        shard?: string;
        database?: string;
    }) {
        const item = new CardItemComponent({ noInit: true });
        item.__init(input);
        return item;
    }
}

// Define the new element
customElements.define("d-card-item", CardItemComponent, { extends: "div" });
