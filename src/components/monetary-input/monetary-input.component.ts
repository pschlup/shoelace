import { property } from 'lit/decorators.js';
import { html } from 'lit';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './monetary-input.styles.js';
import type { CSSResultGroup } from 'lit';
import type {SlChangeEvent} from "../../events/sl-change.js";
import type SlSelect from "../select/select.component.js";
import type SlInput from "../input/input.component.js";
import '../input/input.ts';
import '../select/select.ts';
import '../option/option.ts';

/**
 * @summary Short summary of the component's intended use.
 * @documentation https://shoelace.style/components/monetary-input
 * @status experimental
 * @since 2.0
 *
 * @dependency sl-input
 * @dependency sl-dropdown
 * @dependency sl-option
 *
 * @event sl-change - Emitted when the control's value changes.
 */
export default class SlMonetaryInput extends ShoelaceElement {
    static styles: CSSResultGroup = [componentStyles, styles];

  @property({ type: String, reflect: true }) value: string;
  @property({ type: String }) name: string;

  /** The available currencies, separated by spaces e.g. "USD EUR GBP" */
  @property({ type: String }) currencies: string = 'EUR USD GBP';

  private handleCurrencyChange(ev: SlChangeEvent) {
    const [_, numberValue] = this.value.split(' ');
    const currency = <string>(ev.target as SlSelect).value;
    this.value = `${currency} ${numberValue}`;
    this.emit('sl-change');
  }

  private handleInputChange(ev: SlChangeEvent) {
    const [currency, _] = this.value.split(' ');
    const numberValue = (ev.target as SlInput).value;
    this.value = `${currency} ${numberValue}`;
    this.emit('sl-change');
  }

  render() {
    const [currency, numberValue] = this.value.split(' ');
    return html`
      <div>
        <sl-select value="${currency}" @sl-change=${this.handleCurrencyChange}>
          ${this.currencies.split(' ').map(currency =>
            html`<sl-option value="${currency}">${currency}</sl-option>`
          )}
        </sl-select>
        <sl-input value="${numberValue}" @sl-change=${this.handleInputChange}></sl-input>
      </div>
    `;
  }
}
