"use client";
import React, { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import "../app/styles.css";
import { cn } from "../lib/utils/utils";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { FaArrowRightLong, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import Image from "next/image";
import { trpc } from "../lib/trpc/client";
import CartDrawer from "./cart/Cart";
import Loading from "./Loading";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, LogOut, User } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import { useIsMobile } from "@/hooks/use-mobile";

const FavoriteTrigger = () => {
  const { status } = useSession();
  const { data: favorites, isFetching: isFetchingFavorites } =
    trpc.userFeatures.favorite.getUserFavorites.useQuery(undefined, {
      enabled: status === "authenticated",
    });

  return (
    <Link href={"/favorites"}>
      <div className="relative text-xs">
        <Heart />
        <span
          className={cn(
            "absolute -top-2 -right-2 w-4 h-4 rounded-full bg-secondary grid place-content-center text-xs font-semibold text-primary-foreground",
            !favorites?.length && !isFetchingFavorites ? "bg-transparent" : null
          )}
        >
          {isFetchingFavorites && <Loading size={10} />}
          {favorites?.length && !isFetchingFavorites ? favorites.length : null}
        </span>
      </div>
    </Link>
  );
};

const MobileNavbar: React.FC = () => {
  const [isDevicesOpen, setDevicesOpen] = useState(false);
  const [isCollectionsOpen, setCollectionsOpen] = useState(false);
  const { data: collections } = trpc.catalog.getCollections.useQuery();
  const { data: devices } = trpc.catalog.getDevices.useQuery();

  const toggleSubmenu = (submenu: "devices" | "collections") => {
    if (submenu === "devices") {
      setDevicesOpen(!isDevicesOpen);
    } else {
      setCollectionsOpen(!isCollectionsOpen);
    }
  };

  return (
    <div className="relative flex z-50 bg-white  items-center justify-between px-4 py-1 border-b md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="p-2 z-50">
            <FaBars className="text-xl" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menú</SheetTitle>
          </SheetHeader>
          <nav className="mt-14 space-y-3 max-w-[250px] m-auto">
            <SheetClose asChild>
              <Link href={"/"} className="block text-lg font-medium">
                Inicio
              </Link>
            </SheetClose>

            {/* Dispositivos */}
            <div>
              <button
                className="flex items-center justify-between w-full text-lg font-medium"
                onClick={() => toggleSubmenu("devices")}
              >
                Dispositivos
                {isDevicesOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isDevicesOpen && (
                <ul className="mt-2 space-y-2 pl-4">
                  {devices?.map((device) => (
                    <li key={device.id}>
                      <SheetClose asChild>
                        <Link
                          href={`/cases?device=${device.name}`}
                          className="block"
                        >
                          {device.name}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Colecciones */}
            <div>
              <button
                className="flex items-center justify-between w-full text-lg font-medium"
                onClick={() => toggleSubmenu("collections")}
              >
                Colecciones
                {isCollectionsOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isCollectionsOpen && (
                <ul className="mt-2 space-y-2 pl-4">
                  {collections?.map((collection) => (
                    <li key={collection.id}>
                      <SheetClose asChild>
                        <Link
                          href={`/cases?collection=${collection?.name}`}
                          className="block"
                        >
                          {collection.name}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <SheetClose asChild>
              <Link href="/cases" className="block text-lg font-medium">
                Fundas
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/favorites" className="block text-lg font-medium">
                Favoritos
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/profile" className="block text-lg font-medium">
                Perfil
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/configure/design"
                className="block text-lg font-medium"
              >
                Crear Funda
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
      <div>
        <Link className="NavigationMenuLh-[75vh]ink" href="/">
          <Image
            src="/icons/cartago-logo.png"
            width={50}
            height={50}
            className="w-[80px] h-[50px] object-cover pt-1 object-center"
            alt="cartago-logo"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <FavoriteTrigger />
        <CartDrawer />
      </div>
    </div>
  );
};

export default function Navbar() {
  const isMobile = useIsMobile();
  const { data: collections } = trpc.catalog.getCollections.useQuery();
  const { data: devices } = trpc.catalog.getDevices.useQuery();

  if (isMobile) {
    return <MobileNavbar />;
  }

  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <div className="NavigationMenuContainer  bg-transparent ">
        <div className="NavigationMenuStart list-none">
          <NavigationMenu.Item>
            <Link className="NavigationMenuLink" href="/">
              <Image
                src="/icons/cartago-logo.png"
                width={50}
                height={50}
                className="w-[80px] h-[50px] object-cover object-center"
                alt="cartago-logo"
              />
            </Link>
          </NavigationMenu.Item>
        </div>
        <div className="NavigationMenuCenter rounded-xl">
          <NavigationMenu.List className="NavigationMenuList !rounded-3xl">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Dispositivos <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <div className="px-4 pt-4">
                  <h3 className="text-xl font-bold">Dispositivos</h3>
                  <ul className="w-[600px] grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
                    {devices?.map((device) => (
                      <ListItem
                        key={device?.id}
                        href={`/cases?device=${device?.name}`}
                      >
                        <p className="hover:underline"> {device?.name}</p>
                      </ListItem>
                    ))}
                  </ul>
                  <div className="fles justify-center items-center  text-center py-1">
                    <NavigationMenu.Link asChild>
                      <Link
                        href={"/cases"}
                        className={cn(buttonVariants({ variant: "link" }))}
                      >
                        Ver todos
                      </Link>
                    </NavigationMenu.Link>
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Colecciones <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent p-5">
                <h3 className="text-xl font-bold">Colecciones</h3>
                <ul className="w-[600px] grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] p-4">
                  {collections?.map((collection) => (
                    <ListItem
                      href={`/cases?collection=${collection?.name}`}
                      key={collection?.id}
                    >
                      <div className="flex gap-3 items-center">
                        <div>
                          <Image
                            width={50}
                            height={50}
                            src={collection?.image ?? ""}
                            alt={collection?.name ?? "Collection Image"}
                            className="w-[30px] h-[30px] object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <p className="hover:underline">{collection?.name}</p>
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <Button
                variant="link"
                size="sm"
                className="bg-primary text-primary-foreground rounded-3xl px-4 "
              >
                <Link href="/configure/design">
                  Crea tu propia <span>Funda</span>
                  <FaArrowRightLong className="text-xl inline ml-2 hover:ml-2 transition-all animate-pulse transition-300" />
                </Link>
              </Button>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="NavigationMenuIndicator">
              <div className="Arrow" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>
        </div>
        <div className="NavigationMenuEnd list-none flex gap-3 items-center mr-10">
          <NavigationMenu.Item>
            <FavoriteTrigger />
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <CartDrawer />
          </NavigationMenu.Item>
          <NavigationMenu.Item className="ml-0.5">
            <UseAuthOptions />
          </NavigationMenu.Item>
        </div>
      </div>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
}

const ListItem = React.forwardRef<
  HTMLLIElement,
  {
    className?: string;
    children: React.ReactNode;
    title?: string;
    href: string;
  }
>(({ className, href, children, title, ...props }) => (
  <li {...props}>
    <NavigationMenu.Link asChild>
      <Link href={href || ""}>
        <p className="text-base font-bold leading-none mb-1">{title}</p>
        {children}
      </Link>
    </NavigationMenu.Link>
  </li>
));
ListItem.displayName = "ListItem";

function UseAuthOptions() {
  const { data, status }: any = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User size={28} className="mt-1" />
      </DropdownMenuTrigger>
      {status === "authenticated" ? (
        <DropdownMenuContent className="w-56 bg-card mt-2 mr-2 z-50">
          <DropdownMenuLabel>
            <div className="flex gap-2 items-center">
              <Avatar className="w-[25px] h-[25px]">
                <AvatarImage src={data?.user?.image ?? ""} />
                <AvatarFallback>
                  {data?.user?.name && data?.user?.lastName ? (
                    <p>
                      <span>{data.user.name.slice(0, 1)}</span>
                      <span>{data.user.lastName.slice(0, 1)}</span>
                    </p>
                  ) : (
                    <span>{data?.user?.name?.slice(0, 1)}</span>
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{data?.user?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {data?.user?.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link className="flex gap-2 items-center" href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex gap-2 items-center" href="/favorites">
                <Heart className="mr-2 h-4 w-4" />
                <span>Favoritos</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-56 bg-card mt-2 mr-2">
          <DropdownMenuLabel>
            <p className="text-center">Usuario</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link className="flex justify-between" href="/auth/signin">
                <User className="mr-2 h-4 w-4" />
                Iniciar sesión
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
