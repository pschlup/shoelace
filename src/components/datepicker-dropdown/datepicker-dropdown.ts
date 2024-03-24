import SlDatepickerDropdown from './datepicker-dropdown.component.js';

export * from './datepicker-dropdown.component.js';
export default SlDatepickerDropdown;

SlDatepickerDropdown.define('sl-datepicker-dropdown');

declare global {
  interface HTMLElementTagNameMap {
    'sl-datepicker-dropdown': SlDatepickerDropdown;
  }
}
