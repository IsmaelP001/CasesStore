"use client";
import {
  Rubik_Vinyl,
  Kavoon,
  Sedgwick_Ave_Display,
  Lilita_One,
  Shadows_Into_Light,
  Satisfy,
  Amatic_SC,
  Concert_One,
  Yellowtail,
  Silkscreen,
  Creepster,
  Kaushan_Script,
  Gloria_Hallelujah,
  Architects_Daughter,
  Audiowide,
  Waiting_for_the_Sunrise,
  Mansalva,
  Finger_Paint,
  DynaPuff,
  Nosifer,
  Frijole,
} from "next/font/google";

const rubikVinyl = Rubik_Vinyl({
  weight: "400",
  subsets: ["latin"],
});

const kavoon = Kavoon({
  weight: "400",
  subsets: ["latin"],
});

const sedgwickAveDisplay = Sedgwick_Ave_Display({
  weight: "400",
  subsets: ["latin"],
});

const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
});

const shadowsIntoLight = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
});

const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
});

const amaticSC = Amatic_SC({
  weight: "400",
  subsets: ["latin"],
});

const concertOne = Concert_One({
  weight: "400",
  subsets: ["latin"],
});

const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  weight: "400",
  subsets: ["latin"],
});

const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
});

const kaushanScript = Kaushan_Script({
  weight: "400",
  subsets: ["latin"],
});

const gloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
});

const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

const waitingForTheSunrise = Waiting_for_the_Sunrise({
  weight: "400",
  subsets: ["latin"],
});

const mansalva = Mansalva({
  weight: "400",
  subsets: ["latin"],
});

const fingerPaint = Finger_Paint({
  weight: "400",
  subsets: ["latin"],
});

const dynaPuff = DynaPuff({
  weight: "400",
  subsets: ["latin"],
});

const nosifer = Nosifer({
  weight: "400",
  subsets: ["latin"],
});

const frijole = Frijole({
  weight: "400",
  subsets: ["latin"],
});

// Arreglo de fuentes personalizadas
const CUSTOM_FONTS = [
  {
    id: 6,
    name: "Sedgwick Ave Display",
    fontFamily: sedgwickAveDisplay.style.fontFamily,
  },
  {
    id: 8,
    name: "Shadows Into Light",
    fontFamily: shadowsIntoLight.style.fontFamily,
  },
  { id: 11, name: "Amatic SC", fontFamily: amaticSC.style.fontFamily },
  { id: 9, name: "Satisfy", fontFamily: satisfy.style.fontFamily },
  { id: 4, name: "Rubik Vinyl", fontFamily: rubikVinyl.style.fontFamily },
  { id: 5, name: "Kavoon", fontFamily: kavoon.style.fontFamily },

  { id: 7, name: "Lilita One", fontFamily: lilitaOne.style.fontFamily },

  { id: 14, name: "Concert One", fontFamily: concertOne.style.fontFamily },
  { id: 15, name: "Yellowtail", fontFamily: yellowtail.style.fontFamily },
  { id: 17, name: "Silkscreen", fontFamily: silkscreen.style.fontFamily },
  { id: 18, name: "Creepster", fontFamily: creepster.style.fontFamily },
  {
    id: 19,
    name: "Kaushan Script",
    fontFamily: kaushanScript.style.fontFamily,
  },
  {
    id: 20,
    name: "Gloria Hallelujah",
    fontFamily: gloriaHallelujah.style.fontFamily,
  },
  {
    id: 23,
    name: "Architects Daughter",
    fontFamily: architectsDaughter.style.fontFamily,
  },
  { id: 25, name: "Audiowide", fontFamily: audiowide.style.fontFamily },
  {
    id: 26,
    name: "Waiting for the Sunrise",
    fontFamily: waitingForTheSunrise.style.fontFamily,
  },
  { id: 27, name: "Mansalva", fontFamily: mansalva.style.fontFamily },
  { id: 29, name: "Finger Paint", fontFamily: fingerPaint.style.fontFamily },
  { id: 30, name: "DynaPuff", fontFamily: dynaPuff.style.fontFamily },
  { id: 31, name: "Nosifer", fontFamily: nosifer.style.fontFamily },
  { id: 32, name: "Frijole", fontFamily: frijole.style.fontFamily },
];

const FONT_COLORS = [
  { id: 1, name: "Blanco", hex: "#FFFFFF" },
  { id: 2, name: "Negro", hex: "#000000" },
  { id: 3, name: "Rojo", hex: "#FF0000" },
  { id: 4, name: "Azul", hex: "#0000FF" },
  { id: 5, name: "Verde", hex: "#008000" },
  { id: 6, name: "Amarillo", hex: "#FFFF00" },
];

export { CUSTOM_FONTS, FONT_COLORS };
