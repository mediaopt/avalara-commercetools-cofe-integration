import { Cart } from '@Types/cart/Cart';
import { Discount } from '@Types/cart/Discount';
import { Order } from '@Types/cart/Order';
import { ShippingMethod } from '@Types/cart/ShippingMethod';
import { Variant } from '@Types/product/Variant';
import { CartDetails } from 'frontastic/actions/cart';
import { ProjectSettings } from '@Types/ProjectSettings';
import { Address } from '@Types/account/Address';

export interface UseCart {
  data?: Order;
  addItem: (variant: Variant, quantity: number) => Promise<void>;
  updateCart: (payload: CartDetails) => Promise<Cart>;
  removeItem: (lineItemId: string) => Promise<void>;
  updateItem: (lineItemId: string, newQuantity: number) => Promise<void>;
  removeDiscountCode?: (discount: Discount) => Promise<void>;
  redeemDiscountCode?: (code: string) => Promise<void>;
  setShippingMethod: (shippingMethodId: string) => Promise<void>;
  getShippingMethods: () => Promise<ShippingMethod[]>;
  validateShippingAddress: (address: Address) => Promise<{
    valid?: boolean;
    address?: {
      line1?: string;
      line2?: string;
      line3?: string;
      city?: string;
      postalCode?: string;
      region?: string;
      country?: string;
    }[];
    errorMessages?: any[];
    addressValidation?: boolean;
  }>;
  checkout: () => Promise<void>;
  orderHistory?: () => Promise<Order[]>;
  getProjectSettings?: () => Promise<ProjectSettings>;
}
