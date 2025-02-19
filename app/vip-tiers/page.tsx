import { ForcedTheme } from '@/components/ForcedTheme';
import { Button } from '@/components/ui/button';
import { SponsorsSection } from '@/components/layout/sections/sponsors';
import { TestimonialSection } from '@/components/layout/sections/testimonial';
import { Metadata } from 'next';
import Image from 'next/image';
import { Gift, Percent, Star, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VIP Tiers - Joy',
  description: 'Build tiered loyalty campaigns with point thresholds, easily managed through Joy\'s user-friendly platform.',
};

const rewardTypes = [
  {
    title: 'Free products',
    description: 'Encourage repeat business by offering free products as incentives',
    icon: Gift,
  },
  {
    title: 'Discounts',
    description: 'Drive more sales with exclusive discounts for returning customers',
    icon: Percent,
  },
  {
    title: 'Bonus points',
    description: 'Reward customers with bonus points to keep them coming back',
    icon: Star,
  },
  {
    title: 'Free Shipping',
    description: 'Enhance customer satisfaction by offering free shipping on future purchases',
    icon: Truck,
  },
];

const features = [
  {
    title: 'VIP Tier Settings',
    description: 'Tailor your VIP tiers with earned or spent calculations, set start dates, create unique discount codes, and manage tier demotion and resets for a seamless and rewarding loyalty experience.',
    image: 'https://joy.so/wp-content/uploads/2025/02/Frame-2085653117-1-e1738839891633.png',
  },
  {
    title: 'VIP Tier Design',
    description: 'Create a stunning VIP experience with custom membership cards, eye-catching icons, and personalized info boxes that highlight your top-tier benefits.',
    image: 'https://joy.so/wp-content/uploads/2025/02/Joy-VIP-Tier-Design.png',
    imageWidth: 482,
    imageHeight: 245,
  },
  {
    title: 'VIP Tier Notification',
    description: 'Instant notifications keep customers engaged, alerting them to rewards and VIP tier upgrades for maximum excitement.',
    image: 'https://joy.so/wp-content/uploads/2025/02/Joy-VIP-Tier-Notification%E2%80%8B.png',
    imageWidth: 630,
    imageHeight: 69,
  }
];

export default function VIPTiersPage() {
  return (
    <ForcedTheme theme="dark">
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="w-full py-20 sm:py-32 md:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-24">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  The freedom to customize<br />
                  VIP Tiers as you desire
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Build tiered loyalty campaigns with point thresholds, easily managed through Joy&apos;s user-friendly platform.
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

        {/* Reward Types Section */}
        <section className="w-full py-20 sm:py-32 md:py-40 border-t border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Build long-term loyalty<br />
                  of customers
                </h2>
                <p className="text-gray-400 md:text-xl text-center max-w-3xl mx-auto">
                  Freely choose entry rewards that offer instant gratification, making your loyal customers feel valued and appreciated.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {rewardTypes.map((type, index) => (
                  <div key={index} className="flex flex-col items-center text-center space-y-6">
                    <div className="flex items-center justify-center w-20 h-20 bg-[#0A1628] rounded-2xl">
                      <type.icon className="w-10 h-10 text-[#1863DC]" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold">{type.title}</h4>
                      <p className="text-gray-400">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 sm:py-32 md:py-40 border-t border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-16 md:grid-cols-2 max-w-6xl mx-auto">
              {/* VIP Tier Settings */}
              <div className="flex flex-col space-y-4">
                <div className="bg-[#0A1628]/50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span>Calculate tier by</span>
                    <span className="font-semibold">Point Earn</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>Start date</span>
                    <span className="font-semibold">22/10/2024</span>
                  </div>
                </div>
                <div className="bg-[#0A1628]/50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">👑</span>
                    <span>Gold Tier</span>
                  </div>
                  <span>2000 points earn</span>
                </div>
                <div className="bg-[#0A1628]/50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">👑</span>
                    <span>Silver Tier</span>
                  </div>
                  <span>1000 points earn</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold mb-4">VIP Tier Settings</h3>
                  <p className="text-gray-400">
                    Tailor your VIP tiers with earned or spent calculations, set start dates, create unique discount codes, and manage tier demotion and resets for a seamless and rewarding loyalty experience.
                  </p>
                </div>
              </div>

              {/* VIP Tier Design */}
              <div className="flex flex-col space-y-4">
                <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="text-xl mb-1">Gold</h4>
                      <p className="text-sm text-gray-400">Membership & VIP</p>
                    </div>
                    <span className="text-2xl">👑</span>
                  </div>
                  <div className="w-full bg-gray-700/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-yellow-400 w-3/4 h-full rounded-full"></div>
                  </div>
                  <p className="text-sm mt-2 text-gray-400">Almost there - just a little more to go!</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold mb-4">VIP Tier Design</h3>
                  <p className="text-gray-400">
                    Create a stunning VIP experience with custom membership cards, eye-catching icons, and personalized info boxes that highlight your top-tier benefits.
                  </p>
                </div>
              </div>

              {/* VIP Tier Notification - Full Width */}
              <div className="md:col-span-2 flex flex-col items-center text-center space-y-6">
                <h3 className="text-2xl font-bold">VIP Tier Notification</h3>
                <p className="text-gray-400 max-w-2xl">
                  Instant notifications keep customers engaged, alerting them to rewards and VIP tier upgrades for maximum excitement.
                </p>
                <div className="flex gap-4 w-full justify-center">
                  <div className="bg-[#0A1628]/80 text-yellow-400 px-6 py-3 rounded-full">
                    �� VIP tier achieved
                  </div>
                  <div className="bg-[#0A1628]/80 text-purple-400 px-6 py-3 rounded-full">
                    ⭐ Pre-tier reward
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="border-t border-gray-800">
          <TestimonialSection />
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 sm:py-32 md:py-40 bg-gray-900 border-t border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Drive repeat sales.<br />
                Reward your customers with Joy
              </h2>
              <Button size="lg">Book a demo</Button>
            </div>
          </div>
        </section>
      </main>
    </ForcedTheme>
  );
}