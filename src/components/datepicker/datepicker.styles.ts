import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  :host > div {
    background-color: var(--sl-panel-background-color);
    cursor: default;
    padding: 12px;
    max-width: 240px;
  }

  h1 {
    display: grid;
    font-size: 1.5em;
    grid-template-columns: 1em auto 1em;
    justify-items: center;
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
    font-size: 0.8em;
    padding: 2px 6px;
    text-align: center;
  }

  li.header {
    color: var(--sl-color-neutral-600);
    font-weight: bold;
  }

  li.day {
    border-radius: 3px;
    cursor: pointer;
    text-align: right;
  }

  li.weekend {
  }

  li.dimmed {
    color: var(--sl-color-neutral-400);
  }

  li.selected {
    background-color: var(--sl-color-primary-500);
    border-radius: 3px;
    color: white;
  }

  li.day:not(.selected):hover {
    background-color: var(--sl-color-neutral-100);
  }
`;
