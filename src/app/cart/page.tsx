"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { MinusIcon } from "../../../public/svg/minusIcon";
import { CreditCardIcon } from "../../../public/svg/creditCardIcon";
import { PlusIcon } from "../../../public/svg/plusIcon";
import { useCartStore } from "@/lib/store";
import cocktailsData from "@/lib/cocktailapi.json";
import { useEffect, useState } from "react";
import { Drink } from "@/interface/cocktail";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart, addToCart } = useCartStore((state) => state);
  const [randomDrinks, setRandomDrinks] = useState<Drink[]>([]);
  const allDrinks: Drink[] = cocktailsData.cocktailsData;

  const generateRandomDrinks = () => {
    const allDrinks = cocktailsData.cocktailsData;
    const randomIndexes: number[] = [];
    while (randomIndexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * allDrinks.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    const randomDrinksData: Drink[] = randomIndexes.map(
      (index) => allDrinks[index]
    );
    setRandomDrinks(randomDrinksData);
  };

  useEffect(() => {
    generateRandomDrinks();
  }, []);

  const subtotal = Array.from(cart)
    .reduce((total, [drinkId, quantity]) => {
      const cocktail = cocktailsData.cocktailsData.find(
        (cocktail) => cocktail.idDrink === drinkId
      );
      if (!cocktail) return total;

      return total + parseFloat(cocktail.strPrice) * quantity;
    }, 0)
    .toFixed(2);

  return (
    <div>
      <h1 className="pt-10 font-semibold text-4xl text-center">
        Cart Overview
      </h1>
      <div className="grid items-start gap-4 px-4 pb-4 md:gap-8 md:px-6 lg:grid-cols-[1fr_300px]">
        <Card className="flex flex-col p-0 mt-10">
          <CardContent className="flex flex-col gap-4">
            <div className="font-semibold text-2xl py-6">Your cart</div>
            {cart.size === 0 ? (
              <p className="text-gray-500 italic">Your cart is empty</p>
            ) : (
              <div className="grid gap-4">
                {Array.from(cart).map(([drinkId, quantity]) => {
                  const cocktail = cocktailsData.cocktailsData.find(
                    (cocktail) => cocktail.idDrink === drinkId
                  );
                  if (!cocktail) return null;
                  return (
                    <div key={drinkId} className="flex items-center gap-6">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="200"
                        src={cocktail.strDrinkThumb}
                        width="200"
                      />
                      <div className="flex-1 grid gap-2 text-lg">
                        <div className="font-semibold">{cocktail.strDrink}</div>
                        <div>
                          {quantity} x $ {cocktail.strPrice}
                        </div>
                      </div>
                      <Button
                        onClick={() => addToCart(drinkId)}
                        className="h-8 w-8"
                        size="icon"
                        variant="outline"
                      >
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only">Add one</span>
                      </Button>
                      <Button
                        onClick={() => removeFromCart(drinkId)}
                        className="h-8 w-8"
                        size="icon"
                        variant="outline"
                      >
                        <MinusIcon className="h-4 w-4" />
                        <span className="sr-only">Remove one</span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
            <Separator />
            <div className="flex items-center text-lg">
              <div>Subtotal</div>
              <div className="ml-auto">${subtotal}</div>
            </div>
          </CardContent>

          <CardFooter className="flex gap-8">
            <Link href="/">
          <Button className="hover:bg-slate-600 bg-slate-800">
              Cancel
            </Button>
            </Link>
            <Button className="w-full">
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Pay with card
            </Button>
          </CardFooter>
        </Card>

        {/* Anything else */}
        <Card className="sticky top-8">
          <CardContent>
            <div className="font-semibold pt-6 pb-3">Anything else</div>
            <div className="grid gap-4">
              {randomDrinks.map((drink) => (
                <div
                  key={drink.idDrink}
                  className="flex items-center gap-6 mt-2"
                >
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="80"
                    src={drink.strDrinkThumb}
                    width="80"
                  />
                  <div className="flex-1 grid gap-1 text-sm">
                    <div className="font-semibold">{drink.strDrink}</div>
                    <div>$ {drink.strPrice}</div>
                    <Button onClick={() => addToCart(drink.idDrink)} size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
