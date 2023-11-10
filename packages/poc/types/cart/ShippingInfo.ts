import { ShippingMethod } from './ShippingMethod';
import { Money } from '../product/Money';
import { TaxedPrice } from './taxedPrice';

export interface ShippingInfo extends ShippingMethod {
  price?: Money;
  discounts?: Money[];
  taxedPrice?: TaxedPrice
}
