"use client";

import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { MinusIcon } from "../../public/svg/minusIcon";
import { useEffect, useState } from "react";
import { Drink } from "@/interface/cocktail";
import cocktailsData from "@/lib/cocktailapi.json";
import { ShoppingBagIcon } from "../../public/svg/shoppingBagIcon";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "../../public/svg/searchIcon";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function Home() {
  const { cart, addToCart, removeFromCart } = useCartStore((state) => state);
  const [cocktails, setCocktails] = useState<Drink[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setCocktails(cocktailsData.cocktailsData);
  }, []);

  const filteredCocktails = cocktails.filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="grid items-start gap-4 px-4 pb-4 md:gap-8 md:px-6 lg:grid-cols-[1fr_300px]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="pt-10 font-semibold text-4xl text-center">
            Lemonade Stand
          </h1>
          <p className="pb-4 text-gray-500 dark:text-gray-400 text-center">
            The most refreshing lemonades
          </p>
        </div>
        <div className="grid gap-4">
          {filteredCocktails.length === 0 && (
            <p className="text-gray-500 italic text-2xl">
              No cocktails match your search...
            </p>
          )}
          {filteredCocktails &&
            filteredCocktails.map((cocktail) => (
              <Card key={cocktail.idDrink}>
                <CardContent className="flex items-center gap-4">
                  <img
                    alt={cocktail.strDrink}
                    className="aspect-2-1 rounded-lg object-cover border mt-4"
                    height="100"
                    src={cocktail.strDrinkThumb}
                    width="200"
                  />
                  <div className="flex-1 grid gap-2">
                    <CardTitle>{cocktail.strDrink}</CardTitle>
                    <CardDescription>{cocktail.strDescription}</CardDescription>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                  <div className="font-semibold mr-4">${cocktail.strPrice}</div>
                  <Button onClick={() => addToCart(cocktail.idDrink)} size="sm">
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>

      <div>
        {/* Searchbar */}
        <div className="relative mt-8">
          <Input
            className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-primary"
            type="search"
            placeholder="Search for a drink"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Cart */}
        <Card className="mt-4 sticky top-8">
          <CardContent>
            <div className="font-semibold pt-6 pb-3">Your cart</div>
            {cart.size === 0 ? (
              <p className="text-gray-500 italic pt-3">Your cart is empty</p>
            ) : (
              Array.from(cart).map(([drinkId, quantity]) => {
                const drink = cocktails.find(
                  (cocktail) => cocktail.idDrink === drinkId
                );
                if (!drink) return null;

                return (
                  <div key={drinkId} className="flex items-center gap-4 mt-2">
                    <img
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="80"
                      src={drink.strDrinkThumb}
                      width="80"
                    />
                    <div className="flex-1 grid gap-1 text-sm">
                      <div className="font-semibold">{drink.strDrink}</div>
                      <div>
                        {quantity} x ${drink.strPrice}
                      </div>
                    </div>
                    <Button
                      onClick={() => removeFromCart(drinkId)}
                      className="h-6 w-6"
                      size="icon"
                      variant="outline"
                    >
                      <MinusIcon className="h-2 w-2" />
                      <span className="sr-only">Remove one</span>
                    </Button>
                  </div>
                );
              })
            )}
          </CardContent>

          <CardFooter className="flex gap-4">
            <div>Subtotal</div>
            <div className="ml-auto">
              $
              {Array.from(cart).reduce((total, [drinkId, quantity]) => {
                const drink = cocktails.find(
                  (cocktail) => cocktail.idDrink === drinkId
                );
                return (
                  total + (drink ? quantity * parseFloat(drink.strPrice) : 0)
                );
              }, 0)}
            </div>

            <Button className="w-full" disabled={cart.size === 0}>
              <Link href="/cart" className="flex items-center">
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                Go to cart
              </Link>
            </Button>

            {/* <Link href="/cart" className="flex items-center">
                <Button className="w-full" disabled={cart.size === 0}>
                  <ShoppingBagIcon className="mr-2 h-4 w-4" />
                  Go to cart
                </Button>
              </Link> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
