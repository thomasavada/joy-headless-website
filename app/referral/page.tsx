import { ForcedTheme } from '@/components/ForcedTheme';
import { Button } from '@/components/ui/button';
import { SponsorsSection } from '@/components/layout/sections/sponsors';
import { CustomCollapsible } from '@/components/ui/collapsible';
import { TestimonialSection } from '@/components/layout/sections/testimonial';
import { Metadata } from 'next';
import Image from 'next/image';
import { CTASection } from '@/components/layout/sections/cta';

export const metadata: Metadata = {
  title: 'Referral Program - Joy',
  description: `Transform loyal customers into powerful brand ambassadors with Joy's referral program. Encourage sharing and reward both referrers and their friends.`,
};

const rewardTypes = [
  {
    title: 'Discount percentage',
    description: `Give a percentage discount on customers' next purchase as a token of appreciation for spreading the word.`,
  },
  {
    title: 'Discount amount',
    description: `Offer a fixed discount amount for each successful referral, rewarding customers' efforts with immediate savings.`,
  },
  {
    title: 'Points reward',
    description: 'Award points for every successful referral, which customers can redeem for future purchases or exclusive rewards.',
  },
];

const sharingFeatures = [
  {
    title: 'Share via social media',
    description: 'Automatically generate a unique referral link for each customer to share with their friends.',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Easy-to-share-referral-links.png',
    alt: 'Easy-to-share referral links'
  },
  {
    title: 'Share via social media',
    description: 'Easily share referral links across multiple social platforms with ease using Joy.',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Share-via-social-media.png',
    alt: 'Share via social media'
  },
  {
    title: 'Seamless Email Marketing Integration',
    description: 'Integrate effortlessly with your email marketing tool for smooth customer communication.',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Email-Marketing-Integration.png',
    alt: 'Email Marketing Integration'
  },
];

export default function ReferralPage() {
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
                  Transform Loyal Customers into<br />
                  <span className="text-primary-dark">Powerful Brand Ambassadors</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Encourage loyal customers to share their positive experiences and become advocates, helping to grow your brand organically
                </p>
              </div>
              <Button size="lg">Book a demo</Button>
            </div>

            {/* Sponsors with extra margin */}
            <div className="mb-24">
              <SponsorsSection />
            </div>

            {/* Win-Win Section with Collapsibles */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                  Turn Sharing into a Win-Win for Everyone
                </h2>
                <p className="text-xl text-gray-400">
                  Reward both customers and their friends, making sharing a mutually beneficial experience that drives growth.
                </p>
              </div>

              {/* Collapsible Section */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <CustomCollapsible title="Discount percentage">
                  Give a percentage discount on customers' next purchase as a token of appreciation for spreading the word.
                </CustomCollapsible>

                <CustomCollapsible title="Discount amount">
                  Offer a fixed discount amount for each successful referral, rewarding customers' efforts with immediate savings.
                </CustomCollapsible>

                <CustomCollapsible title="Points reward">
                  Award points for every successful referral, which customers can redeem for future purchases or exclusive rewards.
                </CustomCollapsible>
              </div>
            </div>
          </div>
        </section>

        {/* Sharing Features Section */}
        <section className="w-full py-20 sm:py-32 md:py-40 bg-gray-900 border-t border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="space-y-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
                Make referral rewards simple to access and redeem
              </h2>
              <p className="text-gray-400 text-center max-w-3xl mx-auto">
                Customers can share referral links on multiple platforms and get email reminders for rewards
              </p>

              <div className="grid gap-8 md:grid-cols-3">
                {sharingFeatures.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-full aspect-[380/269] rounded-lg overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                      />
                    </div>
                    <h4 className="text-xl font-bold">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section with borders */}
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
