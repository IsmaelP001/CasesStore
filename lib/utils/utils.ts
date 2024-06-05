import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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



