import { Abril_Fatface, DM_Sans, Geist, Geist_Mono, Poppins, Roboto_Slab } from "next/font/google";

export const poppins = Poppins({
   variable: "--font-poppins",
   subsets: ["latin"],
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const abril = Abril_Fatface({
   variable: "--font-abril",
   subsets: ["latin"],
   weight: ["400"],
});

export const dm_sans= DM_Sans({
   variable:"--dm-sans",
   subsets:["latin"],
   weight:["100","200","300","400","500","600","700","800","900","1000"]
})

export const roboto_slab= Roboto_Slab({
   variable:"--roboto_slab",
   subsets:["latin"],
   weight:["100","200","300","400","500","600","700","800","900",]
})

export const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
   weight:["100","300","700","900"]
});

export const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
   weight:["100","200","900"]
});