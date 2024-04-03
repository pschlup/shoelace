import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<sl-monetary-input>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <sl-monetary-input></sl-monetary-input> `);

    expect(el).to.exist;
  });
});
