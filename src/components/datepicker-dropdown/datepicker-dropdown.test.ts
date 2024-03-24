import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-datepicker-dropdown>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-datepicker-dropdown></sl-datepicker-dropdown> `);

    expect(el).to.exist;
  });
});
