import { TStartupConfig } from 'librechat-data-provider';
<<<<<<< HEAD
=======
import { policyUrls } from '~/utils/policies';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';

function Footer({ startupConfig }: { startupConfig: TStartupConfig | null | undefined }) {
  const localize = useLocalize();
  if (!startupConfig) {
    return null;
  }
<<<<<<< HEAD
  const privacyPolicy = startupConfig.interface?.privacyPolicy;
  const termsOfService = startupConfig.interface?.termsOfService;

  const privacyPolicyRender = privacyPolicy?.externalUrl && (
    <a
      className="text-sm text-accent-primary underline decoration-transparent transition-all duration-200 hover:text-accent-primary-hover hover:decoration-accent-primary-hover focus:text-accent-primary-hover focus:decoration-accent-primary-hover"
      href={privacyPolicy.externalUrl}
=======
  /** Read the way the consent reads them, so a blank url is not a policy on one
   *  screen and a link back to this page on another. */
  const { privacyPolicyUrl, termsOfServiceUrl } = policyUrls(startupConfig);

  const privacyPolicyRender = privacyPolicyUrl != null && (
    <a
      className="text-accent-primary hover:text-accent-primary-hover hover:decoration-accent-primary-hover focus:text-accent-primary-hover focus:decoration-accent-primary-hover text-sm underline decoration-transparent transition-all duration-200"
      href={privacyPolicyUrl}
>>>>>>> upstream/main
      // Removed for WCAG compliance
      // target={privacyPolicy.openNewTab ? '_blank' : undefined}
      rel="noreferrer"
    >
      {localize('com_ui_privacy_policy')}
    </a>
  );

<<<<<<< HEAD
  const termsOfServiceRender = termsOfService?.externalUrl && (
    <a
      className="text-sm text-accent-primary underline decoration-transparent transition-all duration-200 hover:text-accent-primary-hover hover:decoration-accent-primary-hover focus:text-accent-primary-hover focus:decoration-accent-primary-hover"
      href={termsOfService.externalUrl}
=======
  const termsOfServiceRender = termsOfServiceUrl != null && (
    <a
      className="text-accent-primary hover:text-accent-primary-hover hover:decoration-accent-primary-hover focus:text-accent-primary-hover focus:decoration-accent-primary-hover text-sm underline decoration-transparent transition-all duration-200"
      href={termsOfServiceUrl}
>>>>>>> upstream/main
      // Removed for WCAG compliance
      // target={termsOfService.openNewTab ? '_blank' : undefined}
      rel="noreferrer"
    >
      {localize('com_ui_terms_of_service')}
    </a>
  );

  return (
    <div className="align-end m-4 flex justify-center gap-2" role="contentinfo">
      {privacyPolicyRender}
      {privacyPolicyRender && termsOfServiceRender && (
<<<<<<< HEAD
        <div className="border-r-[1px] border-border-medium" />
=======
        <div className="border-border-medium border-r-[1px]" />
>>>>>>> upstream/main
      )}
      {termsOfServiceRender}
    </div>
  );
}

export default Footer;
