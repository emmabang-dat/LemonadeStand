import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { MinusIcon } from "../../../public/svg/minusIcon";
import { CreditCardIcon } from "../../../public/svg/creditCardIcon";

export default function Component() {
  return (
    <div>
      <h1 className="pt-10 font-semibold text-4xl text-center">
        Cart Overview
      </h1>
      <div className="grid items-start gap-4 pb-4">
        <Card className="flex flex-col p-0 mt-10">
          <CardContent className="flex flex-col gap-4">
            <div className="font-semibold text-2xl py-6">Your cart</div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="100"
                  src="/placeholder.svg"
                  width="100"
                />
                <div className="flex-1 grid gap-1 text-sm">
                  <div className="font-semibold">Summer Breeze</div>
                  <div>1 x $3.99</div>
                </div>
                <Button className="h-6 w-6" size="icon" variant="outline">
                  <MinusIcon className="h-2 w-2" />
                  <span className="sr-only">Remove one</span>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="100"
                  src="/placeholder.svg"
                  width="100"
                />
                <div className="flex-1 grid gap-1 text-sm">
                  <div className="font-semibold">Sparkling Citrus</div>
                  <div>1 x $2.99</div>
                </div>
                <Button className="h-6 w-6" size="icon" variant="outline">
                  <MinusIcon className="h-2 w-2" />
                  <span className="sr-only">Remove one</span>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="100"
                  src="/placeholder.svg"
                  width="100"
                />
                <div className="flex-1 grid gap-1 text-sm">
                  <div className="font-semibold">Berry Bliss</div>
                  <div>1 x $4.49</div>
                </div>
                <Button className="h-6 w-6" size="icon" variant="outline">
                  <MinusIcon className="h-2 w-2" />
                  <span className="sr-only">Remove one</span>
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex items-center">
              <div>Subtotal</div>
              <div className="ml-auto">$11.47</div>
            </div>
          </CardContent>

          <CardFooter className="flex gap-4">
            <Button className="w-full">
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Pay with card
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
