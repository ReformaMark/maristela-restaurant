/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as arimaValidation from "../arimaValidation.js";
import type * as auth from "../auth.js";
import type * as cartItems from "../cartItems.js";
import type * as CustomPassword from "../CustomPassword.js";
import type * as dashboard from "../dashboard.js";
import type * as favorites from "../favorites.js";
import type * as http from "../http.js";
import type * as menus from "../menus.js";
import type * as notifications from "../notifications.js";
import type * as orders from "../orders.js";
import type * as ratings from "../ratings.js";
import type * as ResendOTPPasswordReset from "../ResendOTPPasswordReset.js";
import type * as shippingAddress from "../shippingAddress.js";
import type * as transactions from "../transactions.js";
import type * as upload from "../upload.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  arimaValidation: typeof arimaValidation;
  auth: typeof auth;
  cartItems: typeof cartItems;
  CustomPassword: typeof CustomPassword;
  dashboard: typeof dashboard;
  favorites: typeof favorites;
  http: typeof http;
  menus: typeof menus;
  notifications: typeof notifications;
  orders: typeof orders;
  ratings: typeof ratings;
  ResendOTPPasswordReset: typeof ResendOTPPasswordReset;
  shippingAddress: typeof shippingAddress;
  transactions: typeof transactions;
  upload: typeof upload;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
