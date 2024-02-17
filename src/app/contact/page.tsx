import React from "react";
import { CardContent, Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

function Contact() {
  return (
    <div>
      <h1 className="py-10 font-semibold text-4xl text-center">
        Meet the staff
      </h1>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Card>
            <CardContent className="p-0 flex">
              <div className="mr-4">
                <Image
                  alt="lady drinking lemonade"
                  layout="responsive"
                  className="object-cover rounded-lg"
                  src="/lady.jpg"
                  width="600"
                  height="400"
                />
              </div>
              <div className="">
                <p className="pt-28 pl-28 text-3xl">
                  Founder and owner of the Lemonade Stand
                </p>
                <p className="pt-7 px-32 text-2xl italic">
                  “Life is like a lemonade cocktail, it’s all about the right
                  mix. Too much sour, and it’s hard to swallow. Too much sweet,
                  and it’s cloying. But with the right balance, it’s a
                  refreshing burst of life.”
                </p>
                <p className="py-7 pl-28 text-2xl">- Carolina</p>
              </div>
            </CardContent>
          </Card>
          <Card className="my-8">
            <CardContent className="p-0 flex">
              <div className="">
                <p className="pt-28 pl-28 text-3xl">
                  Buyer and beer specialist
                </p>
                <p className="pt-7 px-32 text-2xl italic">
                  “Beer is not just a drink, it is a way to share joy, laughter
                  and memories with those you love. Beer is not just a hobby, it
                  is a passion that unites people across borders and cultures.
                  Beer is not just a pleasure, it is happiness in life.”
                </p>
                <p className="py-7 pl-28 text-2xl">- James</p>
              </div>
              <div className="ml-4">
                <Image
                  alt="man with beer"
                  layout="responsive"
                  className="object-cover rounded-lg"
                  src="/man.jpg"
                  width="600"
                  height="400"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="mb-10">
            <CardContent className="p-0 flex">
              <div className="mr-4">
                <Image
                  alt="lady drinking lemonade"
                  layout="responsive"
                  className="object-cover rounded-lg"
                  src="/winelady.jpg"
                  width="600"
                  height="400"
                />
              </div>
              <div className="">
                <p className="pt-28 pl-28 text-3xl">Social media manager</p>
                <p className="pt-7 px-32 text-2xl italic">
                  “Life is like a cocktail: you never know what you get until
                  you taste it. Sometimes it is sweet, sometimes it is bitter,
                  sometimes it is strong, sometimes it is weak. But no matter
                  what, it is always worth trying.”
                </p>
                <p className="py-7 pl-28 text-2xl">- Nadia</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Contact;
