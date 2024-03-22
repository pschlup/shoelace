import { property } from 'lit/decorators.js';
import { html } from 'lit';
// import { LocalizeController } from '../../utilities/localize.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './datepicker.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Short summary of the component's intended use.
 * @documentation https://shoelace.style/components/datepicker
 * @status experimental
 * @since 2.0
 *
 * @dependency sl-example
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
export default class SlDatepicker extends ShoelaceElement {
    static styles: CSSResultGroup = [componentStyles, styles];

  // private readonly localize = new LocalizeController(this);

  /** An example attribute. */
  @property() attr = 'example';

  @watch('example')
  handleExampleChange() {
    // do something
  }

  render() {
    return html`<h2>Hello <slot></slot>!</h2>`;
  }
}
