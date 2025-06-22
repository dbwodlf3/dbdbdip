import { ParsedField, ParsedTable } from "../libs/types";

export class TableComponent extends HTMLElement {
  static get observedAttributes() {
    return ['parsed-data'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'parsed-data') {
      const data = JSON.parse(newValue);
      this.setParsedData(data);
    }
  }

  parsedData?: ParsedTable;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    this.render();
  }

  generateFieldItem(field: ParsedField): string {
    const hasChildren = field.fields && field.fields.length > 0;
    const description = field.description?.join(' ') || '';

    return `
      <div class="field ${hasChildren ? 'field-group' : ''}">
        <div class="field-header" ${hasChildren ? 'role="button" aria-expanded="false" onclick="this.parentNode.classList.toggle(\'expanded\')"' : ''}>
          <span class="field-name" style="flex-grow:1;">${field.fieldName}</span>
          <span class="field-type">${field.type.length < 8 ? field.type : "Object"}</span>
          ${hasChildren ? `
            <span class="toggle-icon">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <polyline points="9 6 15 12 9 18" fill="none" stroke="#333" stroke-width="2"/>
              </svg>
            </span>` : ''}
        </div>
        ${description ? `<p class="field-description">${description}</p>` : ''}
        ${hasChildren ? `
          <div class="nested-fields">
            ${field.fields!.map(f => this.generateFieldItem(f)).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  setParsedData(data: ParsedTable) {
    this.parsedData = data;
    this.render();
  }

  async render() {
    if (!this.shadowRoot || !this.parsedData) return;

    const { collectionName, description, fields } = this.parsedData;

    this.shadowRoot.innerHTML = /*html*/`
      <style>
        .collection-card {
          max-width: 600px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 16px;
          margin: 16px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          font-family: sans-serif;
          color: #333;
        }

        .collection-header .collection-name {
          margin: 0 0 8px 0;
          font-size: 1.5em;
        }

        .collection-header .collection-description {
          margin: 0 0 16px 0;
          font-size: 0.95em;
          line-height: 1.5;
          color: #555;
        }

        .fields-list .field {
          margin-bottom: 12px;
        }

        .field-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: default;
          padding: 8px;
          background: #f9f9f9;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
        }

        .field-group .field-header {
          cursor: pointer;
        }

        .field-name {
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .field-type {
          font-size: 0.9em;
          font-family: monospace;
          color: #666;
          margin-left: 8px;
        }

        .toggle-icon {
          margin-left: auto;
          font-size: 0.9em;
          transition: transform 0.2s;
          transform-origin: center; /* 추가: 중심 기준으로 회전 */
        }

        .field-group.expanded > .field-header > .toggle-icon {
          transform: rotate(90deg);
        }

        .field-description {
          margin: 4px 0 0 4px;
          font-size: 0.95em;
          line-height: 1.4;
          color: #444;
        }

        .nested-fields {
          margin: 8px 0 8px 16px;
          padding: 8px 0 0 8px;
          border-left: 2px solid #ddd;
        }

        .field-group .nested-fields {
          display: none;
        }

        .field-group.expanded > .nested-fields {
          display: block;
        }

        @media (max-width: 600px) {
          .collection-card {
            padding: 12px;
          }
          .field-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .toggle-icon {
            align-self: flex-end;
            margin-top: 4px;
          }
        }
      </style>

      <div class="collection-card">
        <div class="collection-header">
          <h2 class="collection-name">${collectionName}</h2>
          <p class="collection-description">${description.join(' ')}</p>
        </div>
        <div class="fields-list">
          ${fields.map(field => this.generateFieldItem(field)).join('')}
        </div>
      </div>
    `;

  }
}

customElements.define('table-component', TableComponent);