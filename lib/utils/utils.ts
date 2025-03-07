import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import "moment/locale/es";
// import { getCookie } from "./cookies";
import { extractPayload, PayloadCart } from "./token";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_CONFIG = {
  MAX_AGE_CART_TOKEN: 60 * 60 * 24 * 365 * 100,
};

export const VARIABLES_CONFIG = {
  APP_URL:
    process.env.NODE_ENV === "development"
      ? process.env.DEV_APP_URL
      : process.env.VERCEL_URL,
  API_URL:
    process.env.NODE_ENV === "development"
      ? process.env.DB_URL
      : process.env.POSTGRES_URL,
  CART_TOKEN: process.env.CART_TOKEN,
  JWT_SECRET: process.env.JWT_SECRET,
};

export const API_UTILS = {
  // GET_CART_TOKEN_PAYLOAD: () => {
  //   const cartToken = getCookie(VARIABLES_CONFIG.CART_TOKEN!);
  //   return cartToken
  //     ? extractPayload<PayloadCart>(cartToken?.value)
  //     : null;
  // },
};

export const formatPrice = (price: number | string) => {
  const formatter = new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  });

  const priceToFormat = typeof price === "string" ? parseInt(price, 10) : price;

  return formatter.format(priceToFormat);
};

export const formatDateToLocal = (date: Date | string) => {
  const actualDate = new Date(date);
  actualDate.setMinutes(
    actualDate.getMinutes() + actualDate.getTimezoneOffset()
  );
  return moment(actualDate).format("MMMM Do YYYY, h:mm: a");
};

export const cleanPhoneNumber = (formattedNumber: string) => {
  return formattedNumber.replace(/\D/g, "");
};

export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, ""); // Elimina caracteres no numéricos
  const match = cleaned.match(/^(\d{3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join("-");
  }
  return cleaned;
};
