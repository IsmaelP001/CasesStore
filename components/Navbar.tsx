'use client'
import { useState, useEffect, useRef } from 'react';
import { navLinks } from "../lib/utils/links"
import Link from "next/link"
import CartDrawer from './cart/Cart';
import { MdOutlineFavorite } from "react-icons/md";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const navRef=useRef(null)

  useEffect(() => {
    const navHeight=navRef.current.getBoundingClientRect().height;
    const handleScroll = () => {
      if (window.scrollY > navHeight) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav ref={navRef} className={`py-2  sticky inset-0 flex justify-between px-10 importante  min-w-[80%] transition-all duration-300 ${scrolling ? 'bg-neutral text-neutral-100' : 'bg-base-200'}`}>
        <div>
          <Link href='/' className='text-xs'>Store</Link>
        </div>
         <ul className="flex gap-8 justify-between">
            {navLinks.map(link =>
               <li key={link.type}>
                <Link href={link.link}>
                  <span className="capitalize text-xs font-light">{link.type}</span>
                </Link>
               </li>
            )}
         </ul>

         <div className='flex items-center gap-5'>
           <MdOutlineFavorite className='text-2xl text-rose-600'/>
           <CartDrawer/>
         </div>

    </nav>
  )
}

export default Navbar;

// "use client";

// const PRODUCTS_MODELS = [
//   {
//     name: "iPhone",
//     options: [
//       "iPhone X",
//       "iPhone 11",
//       "iPhone 11 Pro",
//       "iPhone 12 Max",
//       "iPhone 12",
//       "iPhone 12 Pro",
//       "iPhone 13 Max",
//       "iPhone 13",
//       "iPhone 13 Pro",
//       "iPhone 13 Max",
//       "iPhone 14",
//       "iPhone 14 Pro",
//       "iPhone 14 Max",
//     ],
//   },
//   {
//     name: "iPad",
//     options: [
//       "iPad 10,9 Pulgadas",
//       "iPad Air",
//       "iPad Pro 11 Pulgadas",
//       "iPad Pro 12.9 Pulgadas",
//     ],
//   },
//   {
//     name: "AirPods",
//     options: [
//       "AirPods 2nd Generacion",
//       "AirPods 3er Generacion",
//       "AirPods Pro",
//       "AirPods Pro 2",
//     ],
//   },
//   {
//     name: "Macbook",
//     options: ["MackBook Air", "MackBook Pro"],
//   },
//   {
//     name: "Apple Watch",
//     options: [
//       "Watch SE 35 mm",
//       "Watch SE 44 mm",
//       "Watch pro 35 mm",
//       "Watch pro 44 mm",
//     ],
//   },
// ];

// import * as React from "react";
// import Link from "next/link";

// import { cn } from "../lib/utils/utils";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "../components/ui/navigation-menu";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

// function NavigationMenuNavbar() {
//   return (
//        <NavigationMenu className="w-100vw">
//       <NavigationMenuList className="">
//         <NavigationMenuItem >
//           <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
//           <NavigationMenuContent className='absolute left-0 top-0 right-0 bottom-0 min-w-[800px] min-h-[800px]'>
//             <ul className="flex gap-5 p-6 md:w-[400px] lg:w-full z-[999]">
//               <li className="w-[150px] bg-red-200">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                     href="/"
//                   >
//                     <span>icon</span>
//                     <div className="mb-2 mt-4 text-lg font-medium">
//                       shadcn/ui
//                     </div>
//                     <p className="text-sm leading-tight text-muted-foreground">
//                       Beautifully designed components that you can copy and
//                       paste into your apps. Accessible. Customizable. Open
//                       Source.
//                     </p>
//                   </a>
//                 </NavigationMenuLink>
//               </li>
//               <ul className="w-[600px] grid gap-2 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
//                 {PRODUCTS_MODELS.map(({ name, options }) => {
//                   return (
//                     <ListItem title={name}>
//                       {options.map((device) => (
//                         <article key={device}>{device}</article>
//                       ))}
//                     </ListItem>
//                   );
//                 })}
//               </ul>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {components.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <Link href="/docs" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               Documentation
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li className={title === "iPhone" ? " row-span-3 bg-red-200" : "bg-red-20"}>
//       <div className="text-sm font-medium leading-none">{title}</div>
//       <NavigationMenuLink asChild>
//         <Link className=" text-sm" href="/cases">
//           {children}
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

// export default NavigationMenuNavbar;
