import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';
import {SlDatepicker} from "../../shoelace.js";

describe('<sl-datepicker>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-datepicker></sl-datepicker> `) as SlDatepicker;

    expect(el).to.exist;
    await expect(el.value).to.equal(new Date().toISOString().slice(0, 10));
  });
});
