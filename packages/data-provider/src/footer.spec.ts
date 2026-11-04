import { hasConfiguredFooter } from './footer';

describe('hasConfiguredFooter', () => {
<<<<<<< HEAD
  it('is true for any content the deployment configured itself', () => {
    expect(hasConfiguredFooter({ customFooter: 'Operator policy' })).toBe(true);
    /** An operator who set the footer to nothing still set it. */
    expect(hasConfiguredFooter({ customFooter: '' })).toBe(true);
    expect(
      hasConfiguredFooter({ interface: { privacyPolicy: { externalUrl: 'https://x/privacy' } } }),
    ).toBe(true);
    expect(
      hasConfiguredFooter({ interface: { termsOfService: { externalUrl: 'https://x/terms' } } }),
    ).toBe(true);
=======
  it('is true for a footer the deployment configured itself', () => {
    expect(hasConfiguredFooter({ customFooter: 'Operator policy' })).toBe(true);
    expect(hasConfiguredFooter({ customFooter: '[Docs](https://example.com)' })).toBe(true);
>>>>>>> upstream/main
  });

  it('is false for a deployment that configured none of it', () => {
    expect(hasConfiguredFooter()).toBe(false);
    expect(hasConfiguredFooter(null)).toBe(false);
    expect(hasConfiguredFooter({})).toBe(false);
<<<<<<< HEAD
    /** The links carry the policy sections, so a section without one is not a
     *  footer: this is what the bar renders from. */
    expect(hasConfiguredFooter({ interface: { privacyPolicy: {}, termsOfService: {} } })).toBe(
      false,
    );
=======
    /** An operator who set the footer to nothing suppressed the welcome
     *  screen's disclaimer; a conversation renders nothing for it, so it must
     *  not reserve the band a bar would need. */
    expect(hasConfiguredFooter({ customFooter: '' })).toBe(false);
    /** The bar trims each part, so whitespace is the same nothing. */
    expect(hasConfiguredFooter({ customFooter: '   ' })).toBe(false);
>>>>>>> upstream/main
  });
});
