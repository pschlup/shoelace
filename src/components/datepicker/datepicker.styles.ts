import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  :host > div {
    background-color: var(--sl-panel-background-color);
    padding: 12px;
    max-width: 240px;
  }

  h1 {
    font-size: 1.5em;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  h2 {
    font-size: 0.8em;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  ol {
    display: grid;
    list-style-type: none;
    margin: 0;
    padding: 0;
    gap: 2px;
    grid-template-columns: repeat(7, 1fr);
  }

  li {
    bullet: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.8em;
    padding: 2px 6px;
    text-align: right;
  }

  li.dimmed {
    color: var(--sl-color-neutral-400);
  }

  li.selected {
    background-color: var(--sl-color-primary-500);
    border-radius: 3px;
    color: white;
  }

  li:not(.selected):hover {
    background-color: var(--sl-color-neutral-100);
  }
`;

// :host > div {
//   background-color: var(--sl-panel-background-color);
//   padding: 12px;
//   max-width: 240px;
// }
//
// h1 {
//   font-size: 1.5em;
//   margin: 0;
//   padding: 0;
//   text-align: center;
// }
//
// h2 {
//   font-size: 0.8em;
//   margin: 0;
//   padding: 0;
//   text-align: center;
// }
//
// ol {
//   display: grid;
//   list-style-type: none;
//   margin: 0;
//   padding: 0;
//   gap: 2px;
//   grid-template-columns: repeat(7, 1fr);
// }
//
// li {
//   bullet: none;
//   border-radius: 3px;
//   cursor: pointer;
//   font-size: 0.8em;
//   padding: 2px 6px;
//   text-align: right;
// }
//
// li.dimmed {
//   color: var(--sl-color-neutral-400);
// }
//
// li.selected {
//   background-color: var(--sl-color-primary-500);
//   border-radius: 3px;
//   color: white;
// }

// li:not(.selected):hover {
//   background-color: var(--sl-color-neutral-100);
// }
