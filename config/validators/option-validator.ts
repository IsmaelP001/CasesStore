
'use client'
import pet_2 from '../../public/stickers/pets/corgi-2.png'
import pet_3 from '../../public/stickers/pets/corgi-3.png'
import pet_4 from '../../public/stickers/pets/corgi-4.png'
import pet_5 from '../../public/stickers/pets/dog.png'
import pet_6 from '../../public/stickers/pets/play-with-pet.png'
import pet_7 from '../../public/stickers/pets/playing-2.png'



import person_1 from '../../public/stickers/people/santaSvg.svg'
import person_2 from '../../public/stickers/people/dumbbell.png'
import person_3 from '../../public/stickers/people/late-night.png'
import person_4 from '../../public/stickers/people/students.png'
import person_5 from '../../public/stickers/people/woman-2.png'
import person_6 from '../../public/stickers/people/woman-3.png'
import person_7 from '../../public/stickers/people/woman.png'
import { v4 as uuidv4 } from 'uuid';

import { PRODUCT_PRICES } from "./product-prices"
//bg-zinc-800
//bg-rose-500

export const COLORS = [
  { label:'Negro', value:'black', tw:'bg-zinc-800',hex:'#27272a'},
  {
    label:'Azul',
    value:'blue',
    tw:'bg-blue-500',
    hex:'#3b82f6'
  },
  { label:'Amarrillo', value:'rose', tw:'bg-yellow-500',hex:'#eab308' },
  { label:'Rojo mate', value:'rose', tw:'bg-rose-600',hex:'#e11d48' },  
] as const

export const MODELS = {
  name: 'models',
  options: [
    {
      label: 'iPhone X',
      value: 'iphonex',
      image: 'https://example.com/images/iphonex.png', // Reemplaza con la URL real
    },
    
    {
      label: 'iPhone XS Max',
      value: 'iphonexsmax',
      image: 'https://example.com/images/iphonexsmax.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 11',
      value: 'iphone11',
      image: 'https://example.com/images/iphone11.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 11 Pro',
      value: 'iphone11pro',
      image: 'https://example.com/images/iphone11pro.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 11 Pro Max',
      value: 'iphone11promax',
      image: 'https://example.com/images/iphone11promax.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone SE (2nd generation)',
      value: 'iphonese2',
      image: 'https://example.com/images/iphonese2.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 12',
      value: 'iphone12',
      image: 'https://example.com/images/iphone12.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 12 Pro',
      value: 'iphone12pro',
      image: 'https://example.com/images/iphone12pro.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 12 Pro Max',
      value: 'iphone12promax',
      image: 'https://example.com/images/iphone12promax.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 13',
      value: 'iphone13',
      image: 'https://example.com/images/iphone13.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 13 Pro',
      value: 'iphone13pro',
      image: 'https://example.com/images/iphone13pro.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 13 Pro Max',
      value: 'iphone13promax',
      image: 'https://example.com/images/iphone13promax.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone SE (3rd generation)',
      value: 'iphonese3',
      image: 'https://example.com/images/iphonese3.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 14',
      value: 'iphone14',
      image: 'https://example.com/images/iphone14.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 14 Plus',
      value: 'iphone14plus',
      image: 'https://example.com/images/iphone14plus.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 14 Pro',
      value: 'iphone14pro',
      image: 'https://example.com/images/iphone14pro.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 14 Pro Max',
      value: 'iphone14promax',
      image: 'https://example.com/images/iphone14promax.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 15',
      value: 'iphone15',
      image: 'https://example.com/images/iphone15.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 15 Pro',
      value: 'iphone15pro',
      image: 'https://example.com/images/iphone15pro.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 15 Pro Max',
      value: 'iphone15promax',
      image: 'https://example.com/images/iphone15promax.png', // Reemplaza con la URL real
    },{
      label: 'iPhone 16',
      value: 'iphone16',
      image: 'https://example.com/images/iphone16.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 16 Pro',
      value: 'iphone16pro',
      image: 'https://example.com/images/iphone16pro.png', // Reemplaza con la URL real
    },
    {
      label: 'iPhone 16 Pro Max',
      value: 'iphone16promax',
      image: 'https://example.com/images/iphone16promax.png', // Reemplaza con la URL real
    },
  ],
} as const;

export const MATERIALS = {
  name: 'material',
  options: [
    {
      id:1,
      label: 'Silicone',
      value: 'silicone',
      description: undefined,
      price:PRODUCT_PRICES.material.silicone
    },
    {
      id:2,
      label: 'Soft Polycarbonate',
      value: 'polycarbonate',
      description: 'Scratch-resistant coating',
      price:PRODUCT_PRICES.material.polycarbonate

    },
  ],
} as const

// export const FINISHES = {
//   name: 'finish',
//   options: [
//     {
//       label: 'Smooth Finish',
//       value: 'smooth',
//       description: undefined,
//       price: PRODUCT_PRICES.finish.smooth,

//     },
//     {
//       label: 'Textured Finish',
//       value: 'textured',
//       description: 'Soft grippy texture',
//       price: PRODUCT_PRICES.finish.textured,

//     },
//   ],
// } as const


export const STIKERS_OPTIONS= [
  {
    type:'Personas',
    content:[
      {id:uuidv4(),image:person_2,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:person_1,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:person_3,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:person_4,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:person_5,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:person_6,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:person_7,width:80,height:80,x:320,y:250},
    ]
  },
  {
    type:'Mascotas',
    content:[
      {id:uuidv4(),image:pet_2,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:pet_3,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:pet_4,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:pet_5,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:pet_6,width:80,height:80,x:320,y:250},
      {id:uuidv4(),image:pet_7,width:80,height:80,x:320,y:250},

    ]
  }
]