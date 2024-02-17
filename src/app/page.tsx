"use client";

import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MinusIcon } from "../../public/svg/minusIcon";
import { CreditCardIcon } from "../../public/svg/creditCardIcon";
import { useEffect, useState } from "react";
import { getRandomCocktail } from "@/lib/cocktailapi";
import { Drink } from "@/interface/cocktail";

export default function Home() {
  const [cocktails, setCocktails] = useState<Drink[]>([]);
  const [cart, setCart] = useState<Drink[]>([]);

  const addToCart = (drink: Drink) => {
    setCart([...cart, drink]);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  useEffect(() => {
    getRandomCocktail()
      .then((cocktails: Drink[]) => {
        setCocktails(cocktails);
      })
      .catch((error) => {
        console.error("Error fetching random cocktails:", error);
      });
  }, []);

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
          {cocktails &&
            cocktails.map((cocktails) => (
              <Card key={cocktails.idDrink}>
                <CardContent className="flex items-center gap-4">
                  <img
                    alt={cocktails.strDrink}
                    className="aspect-2-1 rounded-lg object-cover border mt-4"
                    height="100"
                    src={cocktails.strDrinkThumb}
                    width="200"
                  />
                  <div className="flex-1 grid gap-2">
                    <CardTitle>{cocktails.strDrink}</CardTitle>
                    <CardDescription>
                      {cocktails.strInstructions}
                    </CardDescription>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                  <div className="font-semibold">$6</div>
                  <Button onClick={() => addToCart(cocktails)} size="sm">
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
      <Card className="mt-8 sticky top-8">
        <CardContent>
          <div className="font-semibold pt-6 pb-3">Your cart</div>
          {cart.length === 0 ? (
            <p className="text-gray-500 italic pt-3">Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="80"
                  src={item.strDrinkThumb}
                  width="80"
                />
                <div className="flex-1 grid gap-1 text-sm">
                  <div className="font-semibold">{item.strDrink}</div>
                  <div>1 x $6</div>
                </div>
                <Button className="h-6 w-6" size="icon" variant="outline">
                  <MinusIcon
                    onClick={() => removeFromCart(index)}
                    className="h-2 w-2"
                  />
                  <span className="sr-only">Remove one</span>
                </Button>
              </div>
            ))
          )}
        </CardContent>

        <CardFooter>
          <div>Subtotal</div>
          <div className="ml-auto">
            ${cart.reduce((total, item) => total + 6, 0)}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
