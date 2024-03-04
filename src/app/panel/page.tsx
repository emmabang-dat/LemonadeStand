import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { useCartStore } from "@/lib/store";
  import React from "react";
  
  function Panel() {

    return (
      <div className="grid gap-4 px-4 pb-4 md:gap-8 md:px-6 lg:grid-cols-[1fr_300px] pt-10">
          <Card>
            <CardHeader>
              <CardTitle>Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="80"
                    src="/placeholder.svg"
                    width="80"
                  />
                  <div className="flex-1 grid gap-1 text-sm">
                    <div className="font-semibold">Summer</div>
                    <div>1 x $3.99</div>
                  </div>
                  <div className="font-semibold">$3.99</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center">
                <div>Total</div>
                <div className="ml-auto">$11.47</div>
              </div>
            </CardFooter>
          </Card>
      </div>
    );
  }
  
  export default Panel;
  