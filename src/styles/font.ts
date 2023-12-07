import { Outfit } from 'next/font/google';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700']
});

export const fontClass = `${outfit.variable} font-sans`;
export const fontFamily = outfit.style.fontFamily;
