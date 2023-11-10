import { TaxPortion } from './TaxPortion';
import { Money } from '../product/Money';

export interface Tax {
  amount: Money;
  gross: Money;
  tax: Money
  name?: string;
  taxPortions?: TaxPortion[];
}
