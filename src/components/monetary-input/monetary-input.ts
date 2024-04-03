import SlMonetaryInput from './monetary-input.component.js';

export * from './monetary-input.component.js';
export default SlMonetaryInput;

SlMonetaryInput.define('sl-monetary-input');

declare global {
  interface HTMLElementTagNameMap {
    'sl-monetary-input': SlMonetaryInput;
  }
}
