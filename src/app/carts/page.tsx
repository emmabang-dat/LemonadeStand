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
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrderStore } from "@/lib/order";

function Carts() {
  const [randomDrinks, setRandomDrinks] = useState<Drink[]>([]);
  const useCart = useCartStore();
  const useOrder = useOrderStore();

  const [open, setOpen] = React.useState(false);

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

  const handleCancel = () => {
    if (useCart.items.length === 0) {
      window.history.back();
    } else {
      setOpen(true);
    }
  };

  const handleCancelConfirmed = () => {
    useCart.clearCart();
    window.history.back();
  };

  return (
    <div>
      <h1 className="pt-10 font-semibold text-4xl text-center">
        Cart Overview
      </h1>
      <div className="grid items-start gap-4 px-4 pb-4 md:gap-8 md:px-6 lg:grid-cols-[1fr_300px]">
        {/* Your Cart */}
        <Card className="flex flex-col p-0 mt-10">
          <CardContent className="flex flex-col gap-4">
            <div className="font-semibold text-2xl py-6">Your cart</div>
            <div className="grid gap-4">
              {useCart.items.length === 0 ? (
                <div className="italic text-gray-400">Cart is empty</div>
              ) : (
                useCart.items.map((cocktail) => (
                  <div
                    key={cocktail.idDrink}
                    className="flex items-center gap-6"
                  >
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
                        {cocktail.quantity} x $ {cocktail.strPrice}
                      </div>
                    </div>
                    <Button
                      onClick={() => useCart.addToCart(cocktail)}
                      className="h-8 w-8"
                      size="icon"
                      variant="outline"
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Add one</span>
                    </Button>
                    <Button
                      onClick={() => useCart.removeFromCart(cocktail.idDrink)}
                      className="h-8 w-8"
                      size="icon"
                      variant="outline"
                    >
                      <MinusIcon className="h-4 w-4" />
                      <span className="sr-only">Remove one</span>
                    </Button>
                  </div>
                ))
              )}
            </div>

            <Separator />
            <div className="flex items-center text-lg">
              <div>Subtotal</div>
              <div className="ml-auto">${useCart.subTotal().toFixed(2)}</div>
            </div>
          </CardContent>

          <CardFooter className="flex gap-8">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your cart.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleCancel}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelConfirmed}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Popover>
              <PopoverTrigger>
                <Button
                  className="w-full"
                  onClick={() => {
                    useOrder.addOrder(useCart.items, useCart.subTotal(), useOrder.orderId);
                    
                    useCart.clearCart();
                  }}
                >
                  <CreditCardIcon className="mr-2 h-4 w-4" />
                  Pay with card
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                Hoorayy! 🎉 You have made an order!
              </PopoverContent>
            </Popover>
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
                    <Button onClick={() => useCart.addToCart(drink)} size="sm">
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
export default Carts;
