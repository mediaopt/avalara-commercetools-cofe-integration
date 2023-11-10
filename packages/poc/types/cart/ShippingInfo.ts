import { ShippingMethod } from './ShippingMethod';
import { Money } from '../product/Money';
import { TaxedPrice } from './TaxedPrice';

export interface ShippingInfo extends ShippingMethod {
  price?: Money;
  taxedPrice?: TaxedPrice;
  discounts?: Money[];
}
