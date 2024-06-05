
'use client'
import pet_1 from '../public/stickers/pets/hungry.png'
import pet_2 from '../public/stickers/pets/corgi-2.png'
import pet_3 from '../public/stickers/pets/corgi-3.png'
import pet_4 from '../public/stickers/pets/corgi-4.png'
import pet_5 from '../public/stickers/pets/dog.png'
import pet_6 from '../public/stickers/pets/play-with-pet.png'
import pet_7 from '../public/stickers/pets/playing-2.png'


import person_1 from '../public/stickers/people/santaSvg.svg'
import person_2 from '../public/stickers/people/dumbbell.png'
import person_3 from '../public/stickers/people/late-night.png'
import person_4 from '../public/stickers/people/students.png'
import person_5 from '../public/stickers/people/woman-2.png'
import person_6 from '../public/stickers/people/woman-3.png'
import person_7 from '../public/stickers/people/woman.png'

import { PRODUCT_PRICES } from "../validators/product-prices"
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
    },
    {
      label: 'iPhone 11',
      value: 'iphone11',
    },
    {
      label: 'iPhone 12',
      value: 'iphone12',
    },
    {
      label: 'iPhone 13',
      value: 'iphone13',
    },
    {
      label: 'iPhone 14',
      value: 'iphone14',
    },
    {
      label: 'iPhone 15',
      value: 'iphone15',
    },
  ],
} as const

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
      {id:1,image:person_1,width:80,height:80,x:320,y:250},
      {id:2,image:person_2,width:80,height:80,x:320,y:250},
      {id:3,image:person_3,width:80,height:80,x:320,y:250},
      {id:4,image:person_4,width:80,height:80,x:320,y:250},
      {id:5,image:person_5,width:80,height:80,x:320,y:250},
      {id:6,image:person_6,width:80,height:80,x:320,y:250},
      {id:7,image:person_7,width:80,height:80,x:320,y:250},
    ]
  },
  {
    type:'Mascotas',
    content:[
      {id:8,image:pet_1,width:500,height:500,x:200,y:200},
      {id:9,image:pet_2,width:500,height:500,x:200,y:200},
      {id:10,image:pet_3,width:500,height:500,x:200,y:200},
      {id:11,image:pet_4,width:500,height:500,x:200,y:200},
      {id:12,image:pet_5,width:500,height:500,x:200,y:200},
      {id:13,image:pet_6,width:500,height:500,x:200,y:200},
      {id:14,image:pet_7,width:500,height:500,x:200,y:200},

    ]
  }
]