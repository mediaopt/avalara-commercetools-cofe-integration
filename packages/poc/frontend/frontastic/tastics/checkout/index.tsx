import React from 'react';
import AdyenCheckout from 'components/commercetools-ui/adyen-checkout';
import Checkout from '../../../components/commercetools-ui/checkout';
const exampleCountries = ['us', 'de', 'it', 'nl', 'at', 'gb', 'pl', 'sg', 'be'];
import { getCountryOptions } from '../../../helpers/countryOptions';

const CheckoutTastic = ({ data }) => {
  return <Checkout shippingCountryOptions={getCountryOptions(exampleCountries)} />;
  return (
    <AdyenCheckout termsLink={data.termsLink} cancellationLink={data.cancellationLink} privacyLink={data.privacyLink} />
  );
};

export default CheckoutTastic;
