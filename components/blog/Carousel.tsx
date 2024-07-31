import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card"

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full relative"
    >
      <CarouselContent className="flex flex-row z-20">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="w-[30px]">
            <div className="p-1">
              <Card className="z-30">
                <CardContent className="flex aspect-square items-center justify-center p-6 z-40">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
