import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment'
import "moment/locale/es";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("es-DO", { // Configura la localización para la República Dominicana
    style: 'currency',
    currency: 'DOP',
  });

  return formatter.format(price);
}


export const formatDateToLocal=(date)=>{
  const actualDate = new Date(date)
  actualDate.setMinutes(actualDate.getMinutes() + actualDate.getTimezoneOffset()) 
  return moment(actualDate).format('MMMM Do YYYY, h:mm: a')
}



