import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  div {
    display: grid;
    gap: 0.5em;
    grid-template-columns: 8em 1fr;
  }
`;
