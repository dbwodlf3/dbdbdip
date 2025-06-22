declare global {
  namespace JSX {
    interface IntrinsicElements {
      'table-component': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}