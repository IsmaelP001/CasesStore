"use server";
import { faker } from "@faker-js/faker";
import {
  product,
  productDevices,
  productImages,
  printPattern,
  material,
  devices,
  collection,
  color,
  user,
} from "./schemes";
import { db } from "./db";
import { v4 as uuidv4 } from 'uuid';

const manualProductsArray = [
  {
    id: uuidv4(),
    name: "Escudo Celestial",
    description: "Un escudo elegante y resistente, diseñado para proteger con estilo. Perfecto para quienes buscan combinar funcionalidad y diseño.",
    price: 1000,
    discountPrice: 900,
    productType: "CASE",
    isConfigurable: true,
    collectionId: "col-1",
    printPatternId: "pat-1",
    materialId: "mat-1",
    coverImage: "prod-1-cover.jpg",
    colorId: "color-1",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: uuidv4(),
    name: "Amuleto Fugaz",
    description: "Un amuleto mágico que brilla con intensidad. Ideal para aquellos que buscan un toque de misterio y elegancia.",
    price: 1100,
    discountPrice: 950,
    productType: "ACCESORY",
    isConfigurable: false,
    collectionId: "col-2",
    printPatternId: "pat-2",
    materialId: "mat-2",
    coverImage: "prod-2-cover.jpg",
    colorId: "color-2",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: uuidv4(),
    name: "Armadura Estelar",
    description: "Una armadura robusta y personalizable, inspirada en las estrellas. Perfecta para quienes buscan protección y estilo único.",
    price: 1200,
    discountPrice: 1000,
    productType: "CUSTOM_CASE_MATERIAL",
    isConfigurable: true,
    collectionId: "col-3",
    printPatternId: "pat-3",
    materialId: "mat-3",
    coverImage: "prod-3-cover.jpg",
    colorId: "color-3",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  {
    id: uuidv4(),
    name: "Escudo Crepúsculo",
    description: "Un escudo con un diseño inspirado en los colores del atardecer. Ideal para quienes aprecian la belleza de la naturaleza.",
    price: 1300,
    discountPrice: 1150,
    productType: "CASE",
    isConfigurable: false,
    collectionId: "col-4",
    printPatternId: "pat-4",
    materialId: "mat-4",
    coverImage: "prod-4-cover.jpg",
    colorId: "color-4",
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
  },
  {
    id: uuidv4(),
    name: "Piedra Infinita",
    description: "Una piedra mística que parece contener la energía del universo. Perfecta para aquellos que buscan un accesorio con un toque de magia.",
    price: 1400,
    discountPrice: 1200,
    productType: "ACCESORY",
    isConfigurable: true,
    collectionId: "col-5",
    printPatternId: "pat-5",
    materialId: "mat-5",
    coverImage: "prod-5-cover.jpg",
    colorId: "color-5",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: uuidv4(),
    name: "Guardian Nocturno",
    description: "Un escudo diseñado para proteger en las horas más oscuras. Ideal para quienes buscan seguridad y un diseño imponente.",
    price: 1500,
    discountPrice: 1300,
    productType: "CASE",
    isConfigurable: true,
    collectionId: "col-1",
    printPatternId: "pat-1",
    materialId: "mat-1",
    coverImage: "prod-6-cover.jpg",
    colorId: "color-1",
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
  },
  {
    id: uuidv4(),
    name: "Cuerda Astral",
    description: "Una cuerda resistente y elegante, inspirada en las constelaciones. Perfecta para quienes buscan un accesorio con un toque celestial.",
    price: 1600,
    discountPrice: 1400,
    productType: "ACCESORY",
    isConfigurable: false,
    collectionId: "col-2",
    printPatternId: "pat-2",
    materialId: "mat-2",
    coverImage: "prod-7-cover.jpg",
    colorId: "color-2",
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
  },
  {
    id: uuidv4(),
    name: "Coraza Legendaria",
    description: "Una coraza personalizable que evoca la fuerza de los héroes antiguos. Ideal para quienes buscan un diseño épico y funcional.",
    price: 1700,
    discountPrice: 1500,
    productType: "CUSTOM_CASE_MATERIAL",
    isConfigurable: true,
    collectionId: "col-3",
    printPatternId: "pat-3",
    materialId: "mat-3",
    coverImage: "prod-8-cover.jpg",
    colorId: "color-3",
    createdAt: new Date("2023-01-08"),
    updatedAt: new Date("2023-01-08"),
  },
  {
    id: uuidv4(),
    name: "Escudo Lunar",
    description: "Un escudo con un diseño inspirado en la luna. Perfecto para quienes buscan un toque de serenidad y protección.",
    price: 1800,
    discountPrice: 1600,
    productType: "CASE",
    isConfigurable: false,
    collectionId: "col-4",
    printPatternId: "pat-4",
    materialId: "mat-4",
    coverImage: "prod-9-cover.jpg",
    colorId: "color-4",
    createdAt: new Date("2023-01-09"),
    updatedAt: new Date("2023-01-09"),
  },
  {
    id: uuidv4(),
    name: "Gema Brillante",
    description: "Una gema que deslumbra con su brillo. Ideal para aquellos que buscan un accesorio que llame la atención.",
    price: 1900,
    discountPrice: 1700,
    productType: "ACCESORY",
    isConfigurable: true,
    collectionId: "col-5",
    printPatternId: "pat-5",
    materialId: "mat-5",
    coverImage: "prod-10-cover.jpg",
    colorId: "color-5",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    id: uuidv4(),
    name: "Escudo Solar",
    description: "Un escudo que brilla con la energía del sol. Perfecto para quienes buscan protección y un diseño radiante.",
    price: 2000,
    discountPrice: 1800,
    productType: "CASE",
    isConfigurable: true,
    collectionId: "col-1",
    printPatternId: "pat-1",
    materialId: "mat-1",
    coverImage: "prod-11-cover.jpg",
    colorId: "color-1",
    createdAt: new Date("2023-01-11"),
    updatedAt: new Date("2023-01-11"),
  },
  {
    id: uuidv4(),
    name: "Colgante Estrella",
    description: "Un colgante con forma de estrella que brilla en la oscuridad. Ideal para quienes buscan un accesorio con un toque mágico.",
    price: 2100,
    discountPrice: 1900,
    productType: "ACCESORY",
    isConfigurable: false,
    collectionId: "col-2",
    printPatternId: "pat-2",
    materialId: "mat-2",
    coverImage: "prod-12-cover.jpg",
    colorId: "color-2",
    createdAt: new Date("2023-01-12"),
    updatedAt: new Date("2023-01-12"),
  },
  {
    id: uuidv4(),
    name: "Armadura Dorada",
    description: "Una armadura dorada que deslumbra con su brillo. Perfecta para quienes buscan un diseño lujoso y protector.",
    price: 2200,
    discountPrice: 2000,
    productType: "CUSTOM_CASE_MATERIAL",
    isConfigurable: true,
    collectionId: "col-3",
    printPatternId: "pat-3",
    materialId: "mat-3",
    coverImage: "prod-13-cover.jpg",
    colorId: "color-3",
    createdAt: new Date("2023-01-13"),
    updatedAt: new Date("2023-01-13"),
  },
  {
    id: uuidv4(),
    name: "Escudo Aurora",
    description: "Un escudo inspirado en los colores de la aurora boreal. Ideal para quienes buscan un diseño único y llamativo.",
    price: 2300,
    discountPrice: 2100,
    productType: "CASE",
    isConfigurable: false,
    collectionId: "col-4",
    printPatternId: "pat-4",
    materialId: "mat-4",
    coverImage: "prod-14-cover.jpg",
    colorId: "color-4",
    createdAt: new Date("2023-01-14"),
    updatedAt: new Date("2023-01-14"),
  },
  {
    id: uuidv4(),
    name: "Piedra Estelar",
    description: "Una piedra que parece contener la energía de las estrellas. Perfecta para quienes buscan un accesorio con un toque cósmico.",
    price: 2400,
    discountPrice: 2200,
    productType: "ACCESORY",
    isConfigurable: true,
    collectionId: "col-5",
    printPatternId: "pat-5",
    materialId: "mat-5",
    coverImage: "prod-15-cover.jpg",
    colorId: "color-5",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: uuidv4(),
    name: "Escudo Galáctico",
    description: "Un escudo que evoca la inmensidad del espacio. Ideal para quienes buscan un diseño futurista y protector.",
    price: 2500,
    discountPrice: 2300,
    productType: "CASE",
    isConfigurable: true,
    collectionId: "col-1",
    printPatternId: "pat-1",
    materialId: "mat-1",
    coverImage: "prod-16-cover.jpg",
    colorId: "color-1",
    createdAt: new Date("2023-01-16"),
    updatedAt: new Date("2023-01-16"),
  },
  {
    id: uuidv4(),
    name: "Cuerda Mística",
    description: "Una cuerda con un diseño enigmático y resistente. Perfecta para quienes buscan un accesorio con un toque de misterio.",
    price: 2600,
    discountPrice: 2400,
    productType: "ACCESORY",
    isConfigurable: false,
    collectionId: "col-2",
    printPatternId: "pat-2",
    materialId: "mat-2",
    coverImage: "prod-17-cover.jpg",
    colorId: "color-2",
    createdAt: new Date("2023-01-17"),
    updatedAt: new Date("2023-01-17"),
  },
  {
    id: uuidv4(),
    name: "Coraza Radiante",
    description: "Una coraza que brilla con una luz propia. Ideal para quienes buscan un diseño impresionante y protector.",
    price: 2700,
    discountPrice: 2500,
    productType: "CUSTOM_CASE_MATERIAL",
    isConfigurable: true,
    collectionId: "col-3",
    printPatternId: "pat-3",
    materialId: "mat-3",
    coverImage: "prod-18-cover.jpg",
    colorId: "color-3",
    createdAt: new Date("2023-01-18"),
    updatedAt: new Date("2023-01-18"),
  },
  {
    id: uuidv4(),
    name: "Escudo Nebuloso",
    description: "Un escudo con un diseño que evoca las nebulosas del espacio. Perfecto para quienes buscan un toque de misterio y protección.",
    price: 2800,
    discountPrice: 2600,
    productType: "CASE",
    isConfigurable: false,
    collectionId: "col-4",
    printPatternId: "pat-4",
    materialId: "mat-4",
    coverImage: "prod-19-cover.jpg",
    colorId: "color-4",
    createdAt: new Date("2023-01-19"),
    updatedAt: new Date("2023-01-19"),
  },
  {
    id: uuidv4(),
    name: "Gema Lunar",
    description: "Una gema que brilla con la luz de la luna. Ideal para quienes buscan un accesorio con un toque de magia y elegancia.",
    price: 2900,
    discountPrice: 2700,
    productType: "ACCESORY",
    isConfigurable: true,
    collectionId: "col-5",
    printPatternId: "pat-5",
    materialId: "mat-5",
    coverImage: "prod-20-cover.jpg",
    colorId: "color-5",
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-01-20"),
  },
];


const productImagesArray = [
  // Book 1
  {
    id: uuidv4(),
    productId: 'book-1',
    image: 'https://boomslank.com/cdn/shop/files/bmslnks-002_1800x1800.png.jpg?v=1736724434',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: uuidv4(),
    productId: 'book-1',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcs-009_1800x1800.png.jpg?v=1736724435',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: uuidv4(),
    productId: 'book-1',
    image: 'https://boomslank.com/cdn/shop/files/1070600_1800x1800.png.jpg?v=1736724436',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },

  // Book 2
  {
    id: uuidv4(),
    productId: 'book-2',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-015_46ace3dd-b014-4f1b-a582-767e2c3418a2_1800x1800.png.jpg?v=1736724404',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: uuidv4(),
    productId: 'book-2',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-014_af8b1951-5c05-4d18-bf5f-8935435d5401_1800x1800.png.jpg?v=1736724406',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: uuidv4(),
    productId: 'book-2',
    image: 'https://boomslank.com/cdn/shop/files/IP15PR_9e2d14d2-254f-415f-8bc9-2bdd73c9ce94_1800x1800.png.jpg?v=1736724406',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },

  // Book 3
  {
    id: uuidv4(),
    productId: 'book-3',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-001_ed4cca70-a94a-4630-8480-b5a9f294e383_1800x1800.png.jpg?v=1736724376',
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03'),
  },
  {
    id: uuidv4(),
    productId: 'book-3',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-002_d4ee116a-c658-4ee9-ad21-d60b096ea5d4_1800x1800.png.jpg?v=1736724378',
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03'),
  },
  {
    id: uuidv4(),
    productId: 'book-3',
    image: 'https://boomslank.com/cdn/shop/files/ZF14_2_SQ_1800x1800.png.jpg?v=1736724378',
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03'),
  },

  // Book 4
  {
    id: uuidv4(),
    productId: 'book-4',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-003_5514660d-a44f-4672-9d8d-2ef6a6ef01fe_1800x1800.png.jpg?v=1736724344',
    createdAt: new Date('2023-01-04'),
    updatedAt: new Date('2023-01-04'),
  },
  {
    id: uuidv4(),
    productId: 'book-4',
    image: 'https://boomslank.com/cdn/shop/files/Gate14_1_IG_SQ_1800x1800.png.jpg?v=1736724345',
    createdAt: new Date('2023-01-04'),
    updatedAt: new Date('2023-01-04'),
  },
  {
    id: uuidv4(),
    productId: 'book-4',
    image: 'https://boomslank.com/cdn/shop/files/Gate14B_IG_SQ_1800x1800.png.jpg?v=1736724345',
    createdAt: new Date('2023-01-04'),
    updatedAt: new Date('2023-01-04'),
  },

  // Book 5
  {
    id: uuidv4(),
    productId: 'book-5',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-017_25819191-35f8-4463-befd-eead76fac765_1800x1800.png.jpg?v=1736724310',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-05'),
  },
  {
    id: uuidv4(),
    productId: 'book-5',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-016_5303f212-932d-4628-a054-e3e7b8130b13_1800x1800.png.jpg?v=1736724311',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-05'),
  },
  {
    id: uuidv4(),
    productId: 'book-5',
    image: 'https://boomslank.com/cdn/shop/products/AshuraiPhone2_1800x1800.jpg?v=1736724312',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-05'),
  },

  // Book 6
  {
    id: uuidv4(),
    productId: 'book-6',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-011_e84dacc2-c0af-4720-80dc-a5810056d07b_1800x1800.png.jpg?v=1736724281',
    createdAt: new Date('2023-01-06'),
    updatedAt: new Date('2023-01-06'),
  },
  {
    id: uuidv4(),
    productId: 'book-6',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-010_1cebd08d-eb37-46ff-8f4b-b2c0fdd32675_1800x1800.png.jpg?v=1736724282',
    createdAt: new Date('2023-01-06'),
    updatedAt: new Date('2023-01-06'),
  },
  {
    id: uuidv4(),
    productId: 'book-6',
    image: 'https://boomslank.com/cdn/shop/products/PacifistCase-min_1800x1800.jpg?v=1736724282',
    createdAt: new Date('2023-01-06'),
    updatedAt: new Date('2023-01-06'),
  },

  // Book 7
  {
    id: uuidv4(),
    productId: 'book-7',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-029_97b4261c-175f-4bdb-ba29-a8f0e75e4cd0_1800x1800.png.jpg?v=1736724255',
    createdAt: new Date('2023-01-07'),
    updatedAt: new Date('2023-01-07'),
  },
  {
    id: uuidv4(),
    productId: 'book-7',
    image: 'https://boomslank.com/cdn/shop/products/PaperPlaneCase-min_1800x1800.jpg?v=1736724256',
    createdAt: new Date('2023-01-07'),
    updatedAt: new Date('2023-01-07'),
  },
  {
    id: uuidv4(),
    productId: 'book-7',
    image: 'https://boomslank.com/cdn/shop/products/Paper-min_1800x1800.jpg?v=1736724256',
    createdAt: new Date('2023-01-07'),
    updatedAt: new Date('2023-01-07'),
  },

  // Book 8
  {
    id: uuidv4(),
    productId: 'book-8',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-025_fa2406de-94c0-405e-9792-d95498f88266_1800x1800.png.jpg?v=1736724231',
    createdAt: new Date('2023-01-08'),
    updatedAt: new Date('2023-01-08'),
  },
  {
    id: uuidv4(),
    productId: 'book-8',
    image: 'https://boomslank.com/cdn/shop/products/Arsenal-0_1800x1800.jpg?v=1736724232',
    createdAt: new Date('2023-01-08'),
    updatedAt: new Date('2023-01-08'),
  },
  {
    id: uuidv4(),
    productId: 'book-8',
    image: 'https://boomslank.com/cdn/shop/products/Arsenal0-min_1800x1800.jpg?v=1736724232',
    createdAt: new Date('2023-01-08'),
    updatedAt: new Date('2023-01-08'),
  },

  // Book 9
  {
    id: uuidv4(),
    productId: 'book-9',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-030_f32b0081-b4b2-4857-b5d3-393a0251f68a_1800x1800.png.jpg?v=1736723666',
    createdAt: new Date('2023-01-09'),
    updatedAt: new Date('2023-01-09'),
  },
  {
    id: uuidv4(),
    productId: 'book-9',
    image: 'https://boomslank.com/cdn/shop/products/iPhoneArsenal_1800x1800.jpg?v=1736723668',
    createdAt: new Date('2023-01-09'),
    updatedAt: new Date('2023-01-09'),
  },
  {
    id: uuidv4(),
    productId: 'book-9',
    image: 'https://boomslank.com/cdn/shop/products/Arsenal0vArsenaliPhoneHome_e38cb3d0-1dce-4aab-9660-b7c15261f4a6_1800x1800.jpg?v=1736723668',
    createdAt: new Date('2023-01-09'),
    updatedAt: new Date('2023-01-09'),
  },

  // Book 10
  {
    id: uuidv4(),
    productId: 'book-10',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-022_a4b545f0-a80a-45df-8489-72b032e368ce_1800x1800.png.jpg?v=1736724202',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-01-10'),
  },
  {
    id: uuidv4(),
    productId: 'book-10',
    image: 'https://boomslank.com/cdn/shop/products/Side-min_1800x1800.jpg?v=1736724203',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-01-10'),
  },
  {
    id: uuidv4(),
    productId: 'book-10',
    image: 'https://boomslank.com/cdn/shop/products/iPhone12SideQ_871e2bd6-1ba7-48dd-84ba-a2c56a774623_1800x1800.png.jpg?v=1736724203',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-01-10'),
  },

  // Book 11
  {
    id: uuidv4(),
    productId: 'book-11',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-012_b481607d-edfb-4b61-b751-b9ea7fee7152_1800x1800.png.jpg?v=1736724171',
    createdAt: new Date('2023-01-11'),
    updatedAt: new Date('2023-01-11'),
  },
  {
    id: uuidv4(),
    productId: 'book-11',
    image: 'https://boomslank.com/cdn/shop/products/Drive-min_1800x1800.jpg?v=1736724173',
    createdAt: new Date('2023-01-11'),
    updatedAt: new Date('2023-01-11'),
  },
  {
    id: uuidv4(),
    productId: 'book-11',
    image: 'https://boomslank.com/cdn/shop/products/DriveIP11B_1800x1800.jpg?v=1736724173',
    createdAt: new Date('2023-01-11'),
    updatedAt: new Date('2023-01-11'),
  },

  // Book 12
  {
    id: uuidv4(),
    productId: 'book-12',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-004_3450755f-2779-4388-beae-62c551f80074_1800x1800.png.jpg?v=1736724140',
    createdAt: new Date('2023-01-12'),
    updatedAt: new Date('2023-01-12'),
  },
  {
    id: uuidv4(),
    productId: 'book-12',
    image: 'https://boomslank.com/cdn/shop/products/PISCIP_1800x1800.png.jpg?v=1736724142',
    createdAt: new Date('2023-01-12'),
    updatedAt: new Date('2023-01-12'),
  },
  {
    id: uuidv4(),
    productId: 'book-12',
    image: 'https://boomslank.com/cdn/shop/products/PiscesIP11_1800x1800.png.jpg?v=1736724142',
    createdAt: new Date('2023-01-12'),
    updatedAt: new Date('2023-01-12'),
  },

  // Book 13
  {
    id: uuidv4(),
    productId: 'book-13',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-026_c2deaef3-4829-40eb-9b40-01634c64cd5c_1800x1800.png.jpg?v=1736724108',
    createdAt: new Date('2023-01-13'),
    updatedAt: new Date('2023-01-13'),
  },
  {
    id: uuidv4(),
    productId: 'book-13',
    image: 'https://boomslank.com/cdn/shop/products/DSC00175_1800x1800.jpg?v=1736724110',
    createdAt: new Date('2023-01-13'),
    updatedAt: new Date('2023-01-13'),
  },
  {
    id: uuidv4(),
    productId: 'book-13',
    image: 'https://boomslank.com/cdn/shop/products/DSC00175-2_1800x1800.jpg?v=1736724110',
    createdAt: new Date('2023-01-13'),
    updatedAt: new Date('2023-01-13'),
  },

  // Book 14
  {
    id: uuidv4(),
    productId: 'book-14',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-008_02d81fca-e0ec-48a8-970f-6129b294bea7_1800x1800.png.jpg?v=1736724077',
    createdAt: new Date('2023-01-14'),
    updatedAt: new Date('2023-01-14'),
  },
  {
    id: uuidv4(),
    productId: 'book-14',
    image: 'https://boomslank.com/cdn/shop/products/SpaceCowboyiPhoneOne_1800x1800.jpg?v=1736724079',
    createdAt: new Date('2023-01-14'),
    updatedAt: new Date('2023-01-14'),
  },
  {
    id: uuidv4(),
    productId: 'book-14',
    image: 'https://boomslank.com/cdn/shop/products/Space-min_1800x1800.jpg?v=1736724079',
    createdAt: new Date('2023-01-14'),
    updatedAt: new Date('2023-01-14'),
  },

  // Book 15
  {
    id: uuidv4(),
    productId: 'book-15',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-007_3da0a0eb-a6c7-4a51-be05-2c2616355d51_1800x1800.png.jpg?v=1736724018',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    id: uuidv4(),
    productId: 'book-15',
    image: 'https://boomslank.com/cdn/shop/products/Car-min_1800x1800.jpg?v=1736724020',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    id: uuidv4(),
    productId: 'book-15',
    image: 'https://boomslank.com/cdn/shop/products/CarwashCase_1800x1800.jpg?v=1736724020',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },

  // Book 16
  {
    id: uuidv4(),
    productId: 'book-16',
    image: 'https://boomslank.com/cdn/shop/files/bmslnkcase-021_32a1fb96-4b57-4841-9e01-afc5657006a7_1800x1800.png.jpg?v=1736723990',
    createdAt: new Date('2023-01-16'),
    updatedAt: new Date('2023-01-16'),
  },
  {
    id: uuidv4(),
    productId: 'book-16',
    image: 'https://boomslank.com/cdn/shop/products/Mega-min_1800x1800.jpg?v=1736723991',
    createdAt: new Date('2023-01-16'),
    updatedAt: new Date('2023-01-16'),
  },
  {
    id: uuidv4(),
    productId: 'book-16',
    image: 'https://boomslank.com/cdn/shop/products/MegalithCaseHome_1800x1800.jpg?v=1736723991',
    createdAt: new Date('2023-01-16'),
    updatedAt: new Date('2023-01-16'),
  },

  // Book 17
  {
    id: uuidv4(),
    productId: 'book-17',
    image: 'https://artcases.co/wp-content/uploads/2021/05/31.jpg',
    createdAt: new Date('2023-01-17'),
    updatedAt: new Date('2023-01-17'),
  },
  {
    id: uuidv4(),
    productId: 'book-17',
    image: 'https://artcases.co/wp-content/uploads/2020/02/ArtCases.Co-Frente-iPhoneX-Funda-de-Madera-Bamu-Grabado-e1546391313783.jpg',
    createdAt: new Date('2023-01-17'),
    updatedAt: new Date('2023-01-17'),
  },
  {
    id: uuidv4(),
    productId: 'book-17',
    image: 'https://artcases.co/wp-content/uploads/2020/02/Borde3.jpg',
    createdAt: new Date('2023-01-17'),
    updatedAt: new Date('2023-01-17'),
  },

  // Book 18
  {
    id: uuidv4(),
    productId: 'book-18',
    image: 'https://i.etsystatic.com/54551196/r/il/089275/6382905718/il_1588xN.6382905718_tdme.jpg',
    createdAt: new Date('2023-01-18'),
    updatedAt: new Date('2023-01-18'),
  },
  {
    id: uuidv4(),
    productId: 'book-18',
    image: 'https://i.etsystatic.com/54551196/r/il/7b1218/6382906956/il_1588xN.6382906956_gp89.jpg',
    createdAt: new Date('2023-01-18'),
    updatedAt: new Date('2023-01-18'),
  },
  {
    id: uuidv4(),
    productId: 'book-18',
    image: 'https://i.etsystatic.com/54551196/r/il/6426f7/6430997519/il_1588xN.6430997519_a89i.jpg',
    createdAt: new Date('2023-01-18'),
    updatedAt: new Date('2023-01-18'),
  },

  // Book 19
  {
    id: uuidv4(),
    productId: 'book-19',
    image: 'https://i.etsystatic.com/52429523/r/il/f6850d/6385496895/il_1588xN.6385496895_kjui.jpg',
    createdAt: new Date('2023-01-19'),
    updatedAt: new Date('2023-01-19'),
  },
  {
    id: uuidv4(),
    productId: 'book-19',
    image: 'https://i.etsystatic.com/52429523/r/il/e8b244/6385496585/il_1588xN.6385496585_h1zc.jpg',
    createdAt: new Date('2023-01-19'),
    updatedAt: new Date('2023-01-19'),
  },
  {
    id: uuidv4(),
    productId: 'book-19',
    image: 'https://i.etsystatic.com/52429523/r/il/49a6e5/6337432714/il_1588xN.6337432714_9wyj.jpg',
    createdAt: new Date('2023-01-19'),
    updatedAt: new Date('2023-01-19'),
  },

  // Book 20
  {
    id: uuidv4(),
    productId: 'book-20',
    image: 'https://i.etsystatic.com/56325795/r/il/9a0f59/6604389066/il_1588xN.6604389066_ajxl.jpg',
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20'),
  },
  {
    id: uuidv4(),
    productId: 'book-20',
    image: 'https://i.etsystatic.com/56325795/r/il/c0f0cc/6604376546/il_1588xN.6604376546_k3jb.jpg',
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20'),
  },
  {
    id: uuidv4(),
    productId: 'book-20',
    image: 'https://i.etsystatic.com/56325795/r/il/c566fd/6604478204/il_1588xN.6604478204_2f00.jpg',
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20'),
  },
];


export async function seed() {
  try {
    // 1. Sembrar roles
    const adminRoleId = uuidv4();
    const userRoleId = uuidv4();
    // await db.insert(rol).values([
    //   { id: adminRoleId, rol: "admin" },
    //   { id: userRoleId, rol: "user" },
    // ]);

    // // 2. Sembrar un usuario (opcional)
    // await db.insert(user).values({
    //   id: uuidv4(),
    //   firstName: "John",
    //   lastName: "Doe",
    //   email: "john.doe@example.com",
    //   provider: "local",
    //   password: "password123",
    //   phonenumber: "8096654123",
    //   rolId: userRoleId,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    // 3. Colecciones de anime (hard coded)
    const animeCollections = [
      { id: uuidv4(), name: "Clasicos Reto", image: "https://i.blogs.es/e48fa3/anime/840_560.jpeg", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Criaturas Místicas", image: "https://st1.uvnimg.com/a4/ff/f9883d7f481b9b3fe5a491a1b4e4/shutterstock-754882633-1.jpg", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Leyendas Shonen", image: "https://areajugones.sport.es/wp-content/uploads/2024/07/crunchyroll-mejores-shonen-1-1560x880.jpg.webp", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Fantasía Oscura", image: "https://buzzerlatam.com/wp-content/uploads/2024/05/Tougen-Anki_01.webp", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Espiritus y Demonios", image: "https://occ-0-8407-114.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABYC8CXewEhOsPxMygSSKZVTSigay1gcG-rhEjX_CR_3toAFZXM2Qw9yBv6WZNTkvKkhxoCkjg_0LyXU6podYiI3HKq-OkDmwhMci.jpg?r=937", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Aventuras Isekai", image: "https://preview.redd.it/msdgx50s8the1.jpeg?auto=webp&s=fa7c3cfccde86bd84c5b43f5ab715d15ba91d53e", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Guardian nocturno", image: "https://dg9aaz8jl1ktt.cloudfront.net/the_files/81899/std.jpg?1612796751", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Ciber Gerreros", image: "https://s0.smartresize.com/wallpaper/339/370/HD-wallpaper-calamity-artwork-fortnite-2019-games-cyber-warriors-fortnite-battle-royale-season-6-calamity-fortnite-thumbnail.jpg", createdAt: new Date(), updatedAt: new Date() },

    ];

    // 4. Patrones de impresión (hard coded)
    const printPatterns = [
      { id: uuidv4(), name: "Floral", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Geometric", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Abstract", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Stripes", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Polka Dot", createdAt: new Date(), updatedAt: new Date() },
    ];

    // 5. Materiales para la carcasa de un iPhone (hard coded)
    const materials = [
      { id: uuidv4(), name: "Leather", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Polyester", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Silicone", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Fabric", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "Wood", createdAt: new Date(), updatedAt: new Date() },
    ];

    // 6. Dispositivos de iPhone (hard coded)
    const iPhoneDevices = [
      { id: uuidv4(), name: "iPhone SE", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "iPhone 11", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "iPhone 12", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "iPhone 12 Pro", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "iPhone 13", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "iPhone 13 Pro Max", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "iPhone 14", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "iPhone 14 Pro", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "iPhone 15", createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: "iPhone 15 Pro", createdAt: new Date(), updatedAt: new Date() },
    ];

    const colors: { id: string; name: string }[] = [];
    for (let i = 0; i < 5; i++) {
      const [col] = await db.insert(color).values({
        id: faker.string.uuid(),
        name: faker.color.human(),
        color: faker.internet.color(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();
      colors.push(col);
    }

    const productsMap = manualProductsArray.map((product,index)=>{
      const coverImage= productImagesArray.slice(index * 3)?.[0]?.image
      const collectionId = animeCollections[Math.round(Math.random() * animeCollections.length)]?.id || animeCollections[0].id
      const printPatternId = printPatterns[Math.round(Math.random() * printPatterns.length)]?.id || printPatterns[0].id
      const materialId = materials[Math.round(Math.random() * materials.length)]?.id || materials[0].id
      const colorId=colors[Math.round(Math.random() * colors.length)]?.id || colors[0].id
      return {
        ...product,
        coverImage,
        collectionId,
        printPatternId,
        materialId,
        colorId
      }
    })

    const productDevicesMap = manualProductsArray.reduce((acc:any,item)=>{
      const randomDevices = faker.helpers.shuffle(iPhoneDevices).slice(0, 3)
      const productDevice =randomDevices.map(device=>({
        id:uuidv4(),
        productId:item.id,
        stock:faker.number.int({min:0,max:100}),
        deviceId:device.id
      }))
      acc.push(productDevice)
      return acc
    },[]).flat()

    let index =0
    const productImagesMap = manualProductsArray.reduce((acc:any,item)=>{
      const productImages = productImagesArray.slice(index, index + 3);
      index+=3
      const images =productImages.map(image=>({
        image:image.image,
        productId:item.id,
        createdAt:image.createdAt,
        updatedAt:image.updatedAt
      }))
      acc.push(images)
      return acc
    },[]).flat()
    await db.insert(devices).values(iPhoneDevices);
    await db.insert(material).values(materials);
    await db.insert(printPattern).values(printPatterns);
    await db.insert(collection).values(animeCollections);
    await db.insert(product).values(productsMap as any);
    await db.insert(productDevices).values(productDevicesMap)
    await db.insert(productImages).values(productImagesMap)



    console.log("Seed finalizado con arrays hard coded");
  } catch (error) {
    console.error("Error seeding DB", error);
    throw error;
  }
}



seed();
