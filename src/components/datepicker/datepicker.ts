import SlDatepicker from './datepicker.component.js';

export * from './datepicker.component.js';
export default SlDatepicker;

SlDatepicker.define('sl-datepicker');

declare global {
  interface HTMLElementTagNameMap {
    'sl-datepicker': SlDatepicker;
  }
}
