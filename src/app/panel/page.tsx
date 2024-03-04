"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Drink } from "@/interface/cocktail";
import { useOrderStore } from "@/lib/order";
import { useCartStore } from "@/lib/store";
import React from "react";

function Panel() {
  const useOrder = useOrderStore();
  const useCart = useCartStore();

  return (
    <div className="grid items-start gap-4 px-4 pb-4 pt-10 md:gap-8 md:px-6 lg:grid-cols-[1fr_300px]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {useOrder.items.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="font-bold text-xl">Order {order.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {order.cart.map((drink: Drink) => (
                    <div
                      key={drink.idDrink}
                      className="flex items-center gap-4"
                    >
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="100"
                        src={drink.strDrinkThumb}
                        width="100"
                      />
                      <div className="flex-1 grid gap-1 text-base">
                        <div className="font-semibold">{drink.strDrink}</div>
                        <div>
                          {drink.quantity} x $ {drink.strPrice}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center">
                  <div>Total</div>
                  <div className="ml-auto">$ {order.cartSubTotal.toFixed(2)}</div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      {/* Total */}
      <Card className="sticky top-8">
        <CardContent>
          <div className="font-bold text-center pt-8 pb-6">Total Revenue</div>
          <div className="text-xl text-center">$ {useOrder.totalRevenue.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Panel;
