import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-datepicker>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-datepicker></sl-datepicker> `);

    expect(el).to.exist;
  });
});
