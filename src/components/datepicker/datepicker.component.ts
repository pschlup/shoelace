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
  serializeIso8601String,
  monthName,
  monthNumber
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

  /** An example attribute. */
  @property() attr = 'example';

  /** The selected date, in ISO string format: 'yyyy-mm-dd' */
  @property({type: String, reflect: true})
  date: string = new Date().toISOString().slice(0, 10);

  /** The month currently being displayed. */
  @property({attribute: false})
  month: string = this.date.slice(0, 7);

  @watch('date')
  async handleDateChange() {
    // Ensures the displayed month matches the selected date whenever it changes.
    this.month = this.date.slice(0, 7);
  }

  private handleDayClick(date: CalendarDate) {
    this.date = serializeIso8601String(date);
    this.emit('sl-change');
  }

  private handleNavigationClick(monthDelta: number) {
    const month: CalendarMonth = parseMonth(this.month);
    this.month = serializeMonth(addMonths(month, monthDelta));
  }

  render() {
    const date = parseIso8601String(this.date);
    const month: CalendarMonth = parseMonth(this.month);
    const monthId = month.month;
    const firstOfMonth: CalendarDate = { ...month, day: 1 };
    const weekDay = weekDays.indexOf(dayOfWeek(firstOfMonth));
    const firstOfCalendar = addDays(firstOfMonth, -weekDay);
    let endOfCalendar = lastDateInMonth(month);
    const lastWeekDay = weekDays.indexOf(dayOfWeek(endOfCalendar));
    if (lastWeekDay < 6) {
      endOfCalendar = addDays(endOfCalendar, 6 - lastWeekDay);
    }
    const days= periodOfDates(firstOfCalendar, endOfCalendar);
    // return html`Hello, World!`;
    return html`
    <div>
      <div>
        <h1>
          <sl-icon-button
            name="arrow-left-short"
            @click=${() => this.handleNavigationClick(-1)}></sl-icon-button>
          ${monthId}
          <sl-icon-button
            name="arrow-right-short"
            @click=${() => this.handleNavigationClick(1)}></sl-icon-button>
        </h1>
        <h2>${month.year}</h2>
      </div>
      <ol>
        ${map(days, (d) =>
      html`
          <li class="${classMap({
        "selected": datesEqual(d, date),
        "dimmed": (d.month != monthId)})}"
        @click=${() => this.handleDayClick(d) }>${d.day}</li>
      `
    )}
      </ol>
    </div>
    `;
  }
}

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function parseMonth(date: string): CalendarMonth {
  const match = /^(\d{4})-(\d{2})$/.exec(date);
  if (!match) {
    throw "The string \"" + date + "\" does not match the format YYYY-MM";
  }
  const year = parseInt(match[1], 10);
  const monthNumber = parseInt(match[2], 10);
  if (monthNumber < 1 || monthNumber > 12) {
    throw "The string \"" + date + "\" does not have a month number between 01 and 12";
  }
  return { year: year, month: monthName(monthNumber) };
}

function serializeMonth(month: CalendarMonth): string {
  return `${month.year}-${monthNumber(month.month).toString().padStart(2, '0')}`;
}
