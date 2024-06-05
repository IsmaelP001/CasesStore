import airpods from '../../public/airpods.png'
import iphone from '../../public/iphone.png'
import appleTv from '../../public/appleTv.png'
import homepod from '../../public/homepod.png'
import homepod2 from '../../public/homepod2.png'

import IA from '../../public/IA.svg'
import assistance from '../../public/assistance.svg'
import gift from '../../public/gift.svg'


import mac from '../../public/mac.png'
import appleWatch from '../../public/appleWatch.png'

import iphoneIcon from '../../public/iphone.svg'
import macbookProIcon from '../../public/macbookIcon.svg'
import macbookAirIcon from '../../public/macbookAirIcon.svg'
import macMiniIcon from '../../public/macMiniIcon.svg'

import airpodsIcon from '../../public/airpodsIcon.svg'
import airpods3Icon from '../../public/airpods3Icon.svg'
import airpodsProIcon from '../../public/airpodsProIcon.svg'

import ipadIcon from '../../public/ipadIcon.svg'
import ipadPro from '../../public/ipadPro.png'

import airpodsWhite from '../../public/airpodsWhite.png'
import airpods3 from '../../public/airpods3.webp'
import airpodsPro from '../../public/airpodsPro.png'
import macbookAir from '../../public/macbookAir.jpeg'


export const navLinks=[
    {
        type:'Dispositivos',
        link:'/cases'
    },
    {
        type:'Colecciones',
        link:'/'
    },
    {
        type:'Personalizacion',
        link:'/configure/design'
    },
    {
        type:'Mas popular',
        link:'/popular'
    },  {
        type:'Preguntas frecuentes',
        link:'/popular'
    }
    
]

export const productLinks=[
    {type:'iphone',
     image:iphone,
     link:'/iphone'
    },
    {type:'mac',
    image:mac,
    link:'/mac'
    },
    {type:'airpods',
     image:airpods,
     link:'/airpods'
    },
    {type:'appleWatch',
     image:appleWatch,
     link:'/appleWatch'
    },
    {type:'appleTv',
     image:appleTv,
     link:'/appleTv'
    },
    {type:'homepod',
     image:homepod,
     link:'/homepod'
    },
]


export const IphonesLinks=[
    
    {type:'iphone 14',
     image:iphone,
     link:'/iphone',
     colors:['red','blue','yellow','gray'],
     discountPrice:41099
    },
    {type:'iphone 13 pro',
    image:iphone,
    link:'/iphone',   
    colors:['red','blue','yellow','gray'],
    discountPrice:38099

    },
  
    {type:'iphone 13',
    image:iphone,
    link:'/iphone',
    colors:['red','blue','yellow','gray'],
    discountPrice:26622
    },
    {type:'iphone 12',
     image:iphone,
     link:'/iphone',
     colors:['red','blue','yellow','gray'],
     discountPrice:21566
    },
    {type:'iphone 11',
     image:iphone,
     link:'/iphone',
     colors:['red','blue','yellow','gray'],
     discountPrice:17566
    },
    {type:'iphone Xs',
     image:iphone,
     link:'/iphone',
     colors:['red','blue','yellow','gray'],
     discountPrice:12566
    },
    {type:'iphone SE',
     image:iphone,
     link:'/iphone',
     colors:['red','blue','yellow','gray'],
     discountPrice:11556
    },
    
]




export const discountLinks=[
    {
        type:'iphone 11 pro',
        discountPrice:18099,
        regularPrice:23099,
        image:iphone,
        link:'/iphone/2',
        discountPorcentage:'-15%'
    },
    {
        type:'home pod',
        discountPrice:25099,
        regularPrice:28099,
        image:homepod2,
        link:'/iphone/2',
        discountPorcentage:'-25%'


    },
    {
        type:'airpods ',
        discountPrice:11099,
        regularPrice:14099,
        image:airpods,
        link:'/iphone/2',
        discountPorcentage:'-30%'


    },
    {
        type:'mac',
        discountPrice:35499,
        regularPrice:29599,
        image:mac,
        link:'/iphone/2',
        discountPorcentage:'-25%'
    }
]


export const featureLinks=[
    {
        isNew:false,
        title:'Asistencia personalizada',
        content:'Compra con uno de nuestros representantes. <br> ',
        image:assistance,
        link:'/iphone/2',
    },
    {
        isNew:false,
        title:'IA',
        content:'Consulta con nuestra IA sobre comparaciones, caracteristicas, opciones y lo que desees.',
        image:IA,
        link:'/iphone/2',
    },
    {
        isNew:false,
        title:'Regalos personalizados',
        content:'Envia tu compra como regalo a esa persona especial y personaliza tu regalo',
        image:gift,
        link:'/iphone/2',
    },
    {
        isNew:false,
        title:'Accesorios',
        content:'Personaliza tus accesorios con tu nombre, photos, stickers y mas.',
        image:'https://photos3.walmart.com/prism/themes/wmcases-1.themepack/ap_gildedhearts_iphone_13_tough.iphonecover/_hd_product_01.jpg',
        link:'/iphone/2',
    },
  

]


export const discountLinksTab=[
    [
        {
            type:'iphone 11 pro',
            discountPrice:18099,
            regularPrice:23099,
            image:iphone,
            link:'/iphone/2',
            discountPorcentage:'-15%'
        },
        {
            type:'home pod',
            discountPrice:25099,
            regularPrice:28099,
            image:homepod2,
            link:'/iphone/2',
            discountPorcentage:'-25%'
    
    
        },
        {
            type:'airpods ',
            discountPrice:11099,
            regularPrice:14099,
            image:airpods,
            link:'/iphone/2',
            discountPorcentage:'-30%'
    
    
        },
        {
            type:'iphone 12 ',
            discountPrice:11099,
            regularPrice:14099,
            image:iphone,
            link:'/iphone/2',
            discountPorcentage:'-30%'
    
    
        },

    ],
    [
        {
            type:'airpods ',
            discountPrice:11099,
            regularPrice:14099,
            image:airpods,
            link:'/iphone/2',
            discountPorcentage:'-30%'
    
    
        },
        {
            type:'home pod',
            discountPrice:25099,
            regularPrice:28099,
            image:homepod2,
            link:'/iphone/2',
            discountPorcentage:'-25%'
    
    
        },
       
        {
            type:'mac',
            discountPrice:35499,
            regularPrice:29599,
            image:mac,
            link:'/iphone/2',
            discountPorcentage:'-25%'
        }

    ],
    [
        {
            type:'home pod',
            discountPrice:25099,
            regularPrice:28099,
            image:homepod2,
            link:'/iphone/2',
            discountPorcentage:'-25%'
    
    
        },
        {
            type:'iphone 11 pro',
            discountPrice:18099,
            regularPrice:23099,
            image:iphone,
            link:'/iphone/2',
            discountPorcentage:'-15%'
        },
        
        {
            type:'airpods ',
            discountPrice:11099,
            regularPrice:14099,
            image:airpods,
            link:'/iphone/2',
            discountPorcentage:'-30%'
    
    
        },

    ],
]


export const tabsName=[
    {type:'Ofertas de hoy',
     tabId:1
    },
    {type:'Mejores descuentos',
    tabId:2
    },
    {type:'Mas vendidos',
    tabId:3
    },
    {type:'Recien añadidos',
    tabId:4
    }
]


export const iphoneIconslinks=[
    {
        type:'iphone 14',
        image:iphoneIcon
    },
    {
        type:'iphone 13',
        image:iphoneIcon
    }, {
        type:'iphone 12',
        image:iphoneIcon
    },
    {
        type:'iphone 11',
        image:iphoneIcon
    },
    {
        type:'iphone Xs',
        image:iphoneIcon
    },
    {
        type:'Accesorios',
        image:iphoneIcon
    }
]


export const ipadIconslinks=[
    {
        type:'ipad pro',
        image:ipadIcon
    },
    {
        type:'iphone air',
        image:ipadIcon
    }, {
        type:'iphone',
        image:ipadIcon
    },
    {
        type:'iphone mini',
        image:ipadIcon
    },
    {
        type:'apple pencil',
        image:ipadIcon
    },
    {
        type:'teclado',
        image:ipadIcon
    }
]





export const MackbookIconslinks=[
    {
        type:'mackbook pro',
        image:macbookProIcon
    },
    {
        type:'mackbook air',
        image:macbookAirIcon
    },
     {
        type:'mac mini',
        image:macMiniIcon
    },  
]

export const AirpodsIconslinks=[
    {
        type:'airpods 2da generacion',
        image:airpodsIcon
    },
    {
        type:'airpods 3',
        image:airpods3Icon
    },
     {
        type:'airpods pro',
        image:airpodsProIcon
    },  
]


export const IpadProductsLinks=[
    
    {type:'Ipad Pro',
     image:ipadPro,
     link:'/ipad',
     colors:['red','blue','yellow','gray'],
     discountPrice:41099
    },
    {type:'ipad air',
     image:ipadPro,
     link:'/iphone',   
     colors:['red','blue','yellow','gray'],
     discountPrice:38099
    },
  
    {type:'Ipad ',
    image:ipadPro,
    link:'/ipad',
    colors:['red','blue','yellow','gray'],
    discountPrice:26622
    },
    {type:'ipad mini',
     image:ipadPro,
     link:'/iphone',
     colors:['red','blue','yellow','gray'],
     discountPrice:21566
    },
   
    
]


export const AirpodsProductsLinks=[
    
    {type:'Airpods',
     subType:'2nd generation',
     image:airpodsWhite,
     link:'/airpods',
     discountPrice:5000
    },
    {type:'Airpods',
     subType:'3nd generation',
     image:airpods3,
     link:'/airpods',
     discountPrice:8000
    },
  
    {type:'Airpods pro',
     subType:'2nd generation',
     image:airpodsPro,
     link:'/airpods',
     discountPrice:13000
    }

]

export const MacbookProductsLinks=[
    
    {type:'Macbook Air',
     image:macbookAir,
     link:'/macbook',
     discountPrice:5000
    },
    {type:'MacbookPro',
     image:macbookAir,
     link:'/macbook',
     discountPrice:8000
    },
  
    {type:'Mac mini',
     image:macbookAir,
     link:'/macbook',
     discountPrice:13000
    }

]