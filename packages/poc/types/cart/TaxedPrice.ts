import { Money } from '../product/Money';

export interface TaxedPrice {
  totalNet?: Money, 
  totalGross?: Money, 
  totalTax?: Money
}
