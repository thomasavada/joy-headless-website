"use client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel";
import {Star} from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "https://cdn-web.joy.so/cdn/image/2024/12/Fresh-Brew-Cafe-feedback.avif",
    name: "Fresh Brew Cafe",
    userName: "Verified Customer",
    comment: "Enjoyed the functionality and depth of the features. I was able to set up my coffee club membership tiers and add start up points, bonus points and discounts for each tier. I totally loved the loyalty page that you can set up on the website, looks amazing.",
    rating: 5.0,
  },
  {
    image: "https://cdn-web.joy.so/cdn/image/2024/12/DEINELOCKEN-feedback.avif",
    name: "DEINELOCKEN",
    userName: "Verified Customer",
    comment: "Been working with Joy multiple months now. We have been very satisfied with how things work here, including the seamless POS experience. Support team was quick to respond and walk us through the process. Great experience!",
    rating: 5.0,
  },
  {
    image: "https://cdn-web.joy.so/cdn/image/2024/12/Fallopian-Tube-Formula-feedback.avif",
    name: "Fallopian Tube Formula",
    userName: "Verified Customer",
    comment: "This is a great app! My customers love it and it has brought me in quite a bit of sales so it's a win win! I love when I can make my customers happy and Joy does that. 10 stars for Joy!",
    rating: 5.0,
  },
  {
    image: "https://cdn-web.joy.so/cdn/image/2024/12/Hobby-Corner-Egypt-freeback.avif",
    name: "Hobby Corner Egypt",
    userName: "Verified Customer",
    comment: "I've been using the Joy app for loyalty points and rewards, and it has exceeded my expectations in every way! Setting up the program was a breeze, and the customization options are fantastic – I was able to easily align it with my store's branding.",
    rating: 5.0,
  },
  {
    image: "https://cdn-web.joy.so/cdn/image/2024/12/Shayna-Gibbons-Keeley-Boutique-feedback.avif",
    name: "Shayna Gibbons Keeley Boutique",
    userName: "Verified Customer",
    comment: "I have found this application to be highly effective for my clients, and it is user-friendly. Whenever I have inquiries, the support team is extremely helpful and responds promptly.",
    rating: 5.0,
  }
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonials
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Hear from our users
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={review.image}
                        alt={review.name}
                      />
                      <AvatarFallback>{review.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
