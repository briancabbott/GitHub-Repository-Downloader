import { Emitter } from './emitter';
import { CheckoutPricingInstance, CheckoutPricingPromise } from './pricing/checkout';

export type ApplePayConfig = {
  /**
   * Your ISO 3166 country code (ex: ‘US’). This is your country code as the merchant.
   */
  country: string;

  /**
   * ISO 4217 purchase currency (ex: ‘USD’)
   */
  currency: string;

  /**
   * Purchase description to display in the Apple Pay payment sheet.
   */
  label: string;

  /**
   * Total cost to display in the Apple Pay payment sheet. Required if `options.pricing` is not provided.
   */
  total: string;

  /**
   * If provided, will override `options.total` and provide the current total price on the CheckoutPricing instance
   * when the Apple Pay flow is initiated.
   */
  pricing?: CheckoutPricingInstance | CheckoutPricingPromise;

  /**
   * If provided, tokens generated by the `recurly.ApplePay` instance will include customer billing address from the
   * form, overriding any billing address gathered from Apple Pay.
   *
   * See {@link https://developers.recurly.com/reference/recurly-js/index.html#getting-a-token|Getting a Token} for all
   * compatible fields.
   */
  form?: HTMLFormElement;
};

export type ApplePayEvent =
  | 'token'
  | 'error'
  | 'ready'
  | 'shippingContactSelected'
  | 'paymentAuthorized'
  | 'shippingMethodSelected'
  | 'cancel';

export interface ApplePayInstance extends Emitter<ApplePayEvent> {
  /**
   * @see {@link https://developers.recurly.com/reference/recurly-js/index.html#fn-applepayready|ApplePay.ready}
   */
  ready: (cb?: VoidFunction) => void;
  begin: (cb?: VoidFunction) => void;
}

export type ApplePay = (config: ApplePayConfig) => ApplePayInstance;