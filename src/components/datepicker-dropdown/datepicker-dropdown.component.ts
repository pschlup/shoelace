import { property, query } from 'lit/decorators.js';
import { html } from 'lit';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './datepicker-dropdown.styles.js';
import type { CSSResultGroup } from 'lit';
import SlDropdown from "../dropdown/dropdown.component.js";
import SlDatepicker from "../datepicker/datepicker.component.js";
import SlButton from "../button/button.component.js";
import SlMenu from "../menu/menu.component.js";


/**
 * @summary Displays a small calendar trigger by a dropdown button that allows selecting a single date.
 * @documentation https://shoelace.style/components/datepicker-dropdown
 * @status experimental
 * @since 2.0
 *
 * @dependency sl-datepicker
 * @dependency sl-dropdown
 * @dependency sl-button
 * @dependency sl-menu
 *
 * @event sl-date-change - Emitted when the selected date changes.
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlDatepickerDropdown extends ShoelaceElement {
    static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'sl-dropdown': SlDropdown,
    'sl-button': SlButton,
    'sl-menu': SlMenu,
    'sl-datepicker': SlDatepicker
  };

  @query('sl-dropdown')
  dropdown: SlDropdown;

  @property()
  locale = navigator.language;

  /** The selected date, in ISO string format: 'yyyy-mm-dd' */
  @property({type: String, reflect: true})
  date: string = new Date().toISOString().slice(0, 10);

  private handleDatePicked(date: string) {
    this.date = date;
    this.dropdown.open = false;
    this.emit('sl-date-change', {
      detail: {
        date,
      }
    });
  }

  render() {
    return html`
      <sl-dropdown>
      <sl-button slot="trigger" caret></sl-button>
      <sl-menu>
        <sl-datepicker
          date=${this.date}
          locale=${this.locale}
          @sl-date-change=${(event: CustomEvent) => this.handleDatePicked(event.detail.date) }></sl-datepicker>
      </sl-menu>
      </sl-dropdown>
    `;
  }
}
