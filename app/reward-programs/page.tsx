import { ForcedTheme } from '@/components/ForcedTheme';
import { Button } from '@/components/ui/button';
import { SponsorsSection } from '@/components/layout/sections/sponsors';
import { TestimonialSection } from '@/components/layout/sections/testimonial';
import { Metadata } from 'next';
import { Heart, UserPlus, ShoppingBag, Gift, Star } from 'lucide-react';
import Image from 'next/image';
import { CTASection } from '@/components/layout/sections/cta';

export const metadata: Metadata = {
  title: 'Reward Programs - Joy',
  description: 'Boost repeat purchase rate with Earn & Redeem points. Incentivize customers to buy more by rewarding them with points, discounts or exclusive offers.',
};

const earningPoints = [
  {
    title: 'Social follows',
    description: 'Boost your social following by rewarding points for a follow',
    icon: Heart,
  },
  {
    title: 'Account Creation',
    description: 'Inspire your customers to register for a store account',
    icon: UserPlus,
  },
  {
    title: 'Purchases',
    description: 'Offer reward points with every purchase to encourage repeat buying',
    icon: ShoppingBag,
  },
  {
    title: 'Birthdays',
    description: 'Give bonus points to customers on their birthday',
    icon: Gift,
  },
  {
    title: 'Writing reviews',
    description: 'Boost brand trust by rewarding points for reviews',
    icon: Star,
  }
];

const redeemRewards = [
  {
    title: 'Discount program',
    description: 'Boost repeat purchases with fixed or percentage discounts that keep customers returning',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604-0.avif',
    imageWidth: 372,
    imageHeight: 269,
  },
  {
    title: 'Free gift program',
    description: 'Let customers collect points and trade them for free samples or products',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604.avif',
    imageWidth: 372,
    imageHeight: 269,
  },
  {
    title: 'Free shipping program',
    description: 'Treat loyal customers to the delight of free shipping when they earn enough points',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604-1.avif',
    imageWidth: 372,
    imageHeight: 269,
  }
];

const advancedFeatures = [
  {
    title: 'POS extension',
    description: 'Seamlessly integrate rewards with POS system for a smooth customer experience',
  },
  {
    title: 'Points expiration',
    description: 'Encourage timely redemptions and boost customer engagement',
  },
  {
    title: 'Report & Analytics',
    description: 'Provide valuable insights to track performance and make data-driven decisions',
  },
  {
    title: 'Advanced custom CSS',
    description: 'Customize the look and feel of your site for a unique brand experience',
  }
];

export default function RewardProgramsPage() {
  return (
    <ForcedTheme theme="dark">
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="w-full py-20 sm:py-32 md:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-24">
              <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary-dark/10 text-primary-dark">
                Built for Shopify
              </span>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Boost repeat purchase rate<br />
                  with Earn & Redeem points
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Incentivize customers to buy more by rewarding them with points, discounts or exclusive offers that can be redeemed.
                </p>
              </div>
              <Button size="lg">Book a demo</Button>
            </div>

            {/* Sponsors Section */}
            <div className="mb-24">
              <SponsorsSection />
            </div>
          </div>
        </section>

        {/* Earning Points Section */}
        <section className="w-full py-20 sm:py-32 md:py-40 border-t border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="space-y-16">
              <div className="text-center space-y-4">
                <span className="text-sm font-medium text-primary-dark">Earning points</span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fully customizable rewards<br />for customers
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
                {earningPoints.map((point, index) => (
                  <div key={index} className="flex flex-col items-center text-center space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-[#0A1628] rounded-2xl">
                      <point.icon className="w-8 h-8 text-[#1863DC]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold">{point.title}</h4>
                      <p className="text-gray-400 text-sm">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Redeem Rewards Section */}
        <section className="w-full py-20 sm:py-32 md:py-40 border-t border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="space-y-16">
              <div className="text-center space-y-4">
                <span className="text-sm font-medium text-primary-dark">Earning points</span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Redeem Rewards for the Things<br />Customers Love Most
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {redeemRewards.map((reward, index) => (
                  <div key={index} className="flex flex-col items-center text-center space-y-6">
                    <div className="relative w-full aspect-[372/269] rounded-lg overflow-hidden">
                      <Image
                        src={reward.image}
                        alt={reward.title}
                        width={reward.imageWidth}
                        height={reward.imageHeight}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 372px"
                      />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold">{reward.title}</h3>
                      <p className="text-gray-400">{reward.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="w-full py-20 sm:py-32 md:py-40 border-t border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="space-y-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
                Advanced features for all your needs
              </h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {advancedFeatures.map((feature, index) => (
                  <div key={index} className="flex flex-col space-y-3">
                    <h4 className="text-lg font-bold">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="border-t border-gray-800">
          <TestimonialSection />
        </section>

        {/* CTA Section */}
        <CTASection
          title={[
            "Drive repeat sales.",
            "Reward your customers with Joy"
          ]}
          variant="gradient"
        />
      </main>
    </ForcedTheme>
  );
}
