import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment'
import "moment/locale/es";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatPrice = (price: number | string) => {
  const formatter = new Intl.NumberFormat("es-DO", {
    style: 'currency',
    currency: 'DOP',
  });

  const priceToFormat =
  typeof price === "string" ? parseInt(price, 10) : price;

  return formatter.format(priceToFormat);
}


export const formatDateToLocal=(date:Date | string)=>{
  const actualDate = new Date(date)
  actualDate.setMinutes(actualDate.getMinutes() + actualDate.getTimezoneOffset()) 
  return moment(actualDate).format('MMMM Do YYYY, h:mm: a')
}

export  const cleanPhoneNumber = (formattedNumber:string) => {
  return formattedNumber.replace(/\D/g, "");
};

export const formatPhoneNumber = (value:string) => {
  const cleaned = value.replace(/\D/g, ""); // Elimina caracteres no numéricos
  const match = cleaned.match(/^(\d{3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join("-");
  }
  return cleaned;
};



