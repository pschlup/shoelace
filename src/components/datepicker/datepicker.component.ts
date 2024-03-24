import { property } from 'lit/decorators.js';
import { html, type CSSResultGroup } from 'lit';
// import { LocalizeController } from '../../utilities/localize.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import { watch } from '../../internal/watch.js';
import styles from './datepicker.styles.js';
import {
  type CalendarDate,
  type CalendarMonth,
  parseIso8601String,
  dayOfWeek,
  addDays,
  periodOfDates,
  lastDateInMonth,
  datesEqual,
  addMonths,
  serializeIso8601String
} from 'typescript-calendar-date';
import {map} from "lit/directives/map.js";
import {classMap} from "lit/directives/class-map.js";
import SlIconButton from "../icon-button/icon-button.component.js";

/**
 * @summary Displays a small calendar that allows selecting a single date.
 * @documentation https://shoelace.style/components/datepicker
 * @status experimental
 * @since 2.15
 *
 * @dependency sl-icon-button
 * @dependency sl-icon
 *
 * @event sl-change - Emitted when the selected date changes.
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlDatepicker extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'sl-icon-button': SlIconButton
  };

  // private readonly localize = new LocalizeController(this);

  @property()
  locale = navigator.language;

  /** The selected date, in ISO string format: 'yyyy-mm-dd' */
  @property({type: String, reflect: true})
  date: string = new Date().toISOString().slice(0, 10);

  /** The month currently being displayed. This date should always include day 01 of the month. */
  @property({attribute: false})
  month: CalendarMonth = parseIso8601String(this.date);

  @watch('date')
  async handleDateChange() {
    // Ensures the displayed month matches the selected date whenever it changes.
    this.month = parseIso8601String(this.date);
  }

  private handleDayClick(date: CalendarDate) {
    this.date = serializeIso8601String(date);
    // TODO: Add the selected date to the event details
    this.emit('sl-change');
  }

  private handleNavigationClick(monthDelta: number) {
    this.month = addMonths(this.month, monthDelta);
  }

  private formatMonthName(date: CalendarDate): string {
    const monthNameFormat = new Intl.DateTimeFormat(this.locale, { month: "long" }).format;
    return monthNameFormat(new Date(serializeIso8601String(date)))
  }

  private getWeekdayNames() {
    const format = new Intl.DateTimeFormat(this.locale, { weekday: 'short' }).format;
    return [...Array(7).keys()]
      .map((day) => format(new Date(Date.UTC(2021, 1, day+1))));
  }

  render() {
    // TODO: Maybe use day.js for simpler translations and date manipulation
    const date = parseIso8601String(this.date);
    const monthId = this.month.month;
    const firstOfMonth: CalendarDate = { ...this.month, day: 1 };
    const endOfMonth = lastDateInMonth(this.month);
    const weekDay = weekDays.indexOf(dayOfWeek(firstOfMonth));
    const firstOfCalendar = addDays(firstOfMonth, -weekDay);
    const endOfCalendar = addDays(endOfMonth, 6 - weekDays.indexOf(dayOfWeek(endOfMonth)));
    // Lists all days that will be displayed in the calendar
    const days= periodOfDates(firstOfCalendar, endOfCalendar);
    const weekdays = this.getWeekdayNames().map((w) => w.slice(0, 2));
    return html`
    <div>
      <div>
        <h1>
          <sl-icon-button
            name="arrow-left-short"
            @click=${() => this.handleNavigationClick(-1)}></sl-icon-button>
          ${this.formatMonthName(firstOfMonth)}
          <sl-icon-button
            name="arrow-right-short"
            @click=${() => this.handleNavigationClick(1)}></sl-icon-button>
        </h1>
        <h2>${this.month.year}</h2>
      </div>
      <ol>
        ${map(weekdays, (w) => html`
          <li class="header">${w}</li>
        `)}
        ${map(days, (d) => html`
            <li class="${classMap({
                "day": true,
                "selected": datesEqual(d, date),
                "weekend": (dayOfWeek(d) === "sat" || dayOfWeek(d) === "sun"),
                "dimmed": (d.month != monthId)})}"
              @click=${() => this.handleDayClick(d) }>
              ${d.day}
            </li>
        `)}
      </ol>
    </div>
    `;
  }
}

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
