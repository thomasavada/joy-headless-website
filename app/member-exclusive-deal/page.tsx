import { ForcedTheme } from '@/components/ForcedTheme';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SponsorsSection } from '@/components/layout/sections/sponsors';
import { TestimonialSection } from '@/components/layout/sections/testimonial';
import { CTASection } from '@/components/layout/sections/cta';

export const metadata: Metadata = {
  title: 'Member Exclusive Deal | Joy Rewards & Loyalty Program',
  description: 'Attract more repeat customers, increase sales, and build stronger loyalty with exclusive offers.',
};

export default function MemberExclusiveDealPage() {
  return (
    <ForcedTheme theme="dark">
      <main className="flex min-h-screen flex-col bg-[#020817]" role="main">
        {/* Hero Section */}
        <section className="py-20" aria-labelledby="hero-heading">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium mb-6">
                Built for Shopify
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Unlock Exclusive Deals for Loyalty Members
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                Attract more repeat customers, increase sales, and build stronger loyalty with exclusive offers.
              </p>
              <Link
                href="/book-demo"
                className="inline-block px-8 py-3 bg-[#00A3FF] hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-label="Book a demo"
                role="button"
                tabIndex={0}
              >
                Book a demo
              </Link>
            </div>

            {/* Logos Section */}
            <div className="text-center">
              <SponsorsSection />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium mb-6">
                Redeem Point
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-16">
                Set Up Perfect Deals for Members Only
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Discount Program */}
              <div className="bg-[#0A0F1C] p-8 rounded-xl">
                <div className="mb-6">
                  <Image
                    src="https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604-0.avif"
                    alt="Discount program"
                    width={372}
                    height={269}
                    className="w-full rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">Discount voucher</h3>
                <p className="text-gray-400">
                  Give a percentage discount on customers&apos; next purchase as a token of appreciation for spreading the word.
                </p>
              </div>

              {/* Free Gift Program */}
              <div className="bg-[#0A0F1C] p-8 rounded-xl">
                <div className="mb-6">
                  <Image
                    src="https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604.avif"
                    alt="Free gift program"
                    width={372}
                    height={269}
                    className="w-full rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">Free product</h3>
                <p className="text-gray-400">
                  Offer a fixed discount amount for each successful referral, rewarding customers&apos; efforts with immediate savings.
                </p>
              </div>

              {/* Free Shipping */}
              <div className="bg-[#0A0F1C] p-8 rounded-xl">
                <div className="mb-6">
                  <Image
                    src="https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653605.png"
                    alt="Joy - Free Shipping"
                    width={372}
                    height={269}
                    className="w-full rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">Free shipping</h3>
                <p className="text-gray-400">
                  Award points for every successful referral, which customers can redeem for future purchases or exclusive rewards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Control Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium mb-6">
                Redeem Point
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-16">
                Easily Control Your Campaigns
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="bg-[#0A0F1C] p-8 rounded-xl flex items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4">Set Active dates</h3>
                  <p className="text-gray-400">
                    Easily specify the start and end dates for your campaigns to ensure they run at the right time.
                  </p>
                </div>
                <div className="ml-8">
                  <Image
                    src="https://cdn-web.joy.so/cdn/image/2025/02/Set-Active-dates%E2%80%8B-with-Joy.png"
                    alt="Set Active dates with Joy"
                    width={566}
                    height={194}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-[#0A0F1C] p-8 rounded-xl flex items-center">
                <div className="ml-8">
                  <Image
                    src="https://cdn-web.joy.so/cdn/image/2025/02/Apply-Conditions-for-Discounts-and-Countries.png"
                    alt="Apply Conditions for Discounts and Countries"
                    width={566}
                    height={194}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-1 ml-8">
                  <h3 className="text-xl font-bold mb-4">Apply Conditions for Discounts and Countries</h3>
                  <p className="text-gray-400">
                    Easily apply conditions to target specific discounts and countries for your campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gradient-to-b from-transparent to-black/20">
          <TestimonialSection />
        </section>

        {/* CTA Section */}
        <CTASection
          title={[
            "Drive repeat sales.",
            "Reward your customers with Joy"
          ]}
        />
      </main>
    </ForcedTheme>
  );
}
