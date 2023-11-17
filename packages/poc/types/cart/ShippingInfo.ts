import { ShippingMethod } from './ShippingMethod';
import { Money } from '../product/Money';
import { TaxedPrice } from './TaxedPrice';
import { TaxRate } from './TaxRate';

export interface ShippingInfo extends ShippingMethod {
  price?: Money;
  taxedPrice?: TaxedPrice;
  discounts?: Money[];
  taxRate?: TaxRate;
}
