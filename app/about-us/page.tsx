import {ForcedTheme} from '@/components/ForcedTheme';
import {Metadata} from 'next';
import Image from 'next/image';
import {FeaturesPreview} from '@/components/layout/sections/features-preview';
import {CTASection} from '@/components/layout/sections/cta';

export const metadata: Metadata = {
  title: 'About us | Joy Rewards & Loyalty Program',
  description: 'Founded in 2021, Joy is the all-in-one solution for creating and managing effortless loyalty programs that cultivate brand affection and influence customer actions.',
};

const stats = [
  {
    number: '9k+',
    label: 'Shopify merchants'
  },
  {
    number: '4.9',
    label: 'Average rating'
  },
  {
    number: '1k8+',
    label: 'Shopify reviews'
  },
  {
    number: '2m',
    label: 'Average response time'
  }
];

export default function AboutUsPage() {
  return (
    <ForcedTheme theme="dark">
      <main className="flex min-h-screen flex-col bg-[#020817]">
        {/* Hero Section */}
        <section className="w-full py-20 sm:py-32 md:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <span className="text-sm font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                Welcome to
              </span>
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                Joy Loyalty Program
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Founded in 2021, is the all-in-one solution for creating and managing effortless loyalty programs that cultivate brand affection and influence customer actions.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section - Image on right */}
        <section className="w-full py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <div className="space-y-4 text-gray-400">
                  <p>
                    As a product-first company, Joy's mission is to help brands worldwide build deep, meaningful relationships with their customers by delivering innovative, effective, and tailored loyalty solutions.
                  </p>
                  <p>
                    We focus on providing the tools and insights that businesses need to understand their customers better and create personalized, impactful experiences.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://cdn-web.joy.so/cdn/image/2025/01/About-Joy.avif"
                    alt="Joy team celebrating"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section - Image on left */}
        <section className="w-full py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row-reverse gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-6">Our vision</h2>
                <p className="text-gray-400">
                  Our vision is to set the gold standard in loyalty program solutions, becoming the go-to choice for businesses worldwide by consistently delivering excellence and innovation.
                </p>
              </div>
              <div className="flex-1">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://cdn-web.joy.so/cdn/image/2025/01/we-are-Joy.avif"
                    alt="Joy team working together"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-[#0A0F1C] p-8 rounded-lg border-l-2 border-blue-500">
                <div className="text-4xl font-bold text-white mb-2">9k+</div>
                <div className="text-gray-400">Shopify merchants</div>
              </div>
              <div className="bg-[#0A0F1C] p-8 rounded-lg border-l-2 border-blue-500">
                <div className="text-4xl font-bold text-white mb-2">4.9</div>
                <div className="text-gray-400">Average rating</div>
              </div>
              <div className="bg-[#0A0F1C] p-8 rounded-lg border-l-2 border-blue-500">
                <div className="text-4xl font-bold text-white mb-2">1k8+</div>
                <div className="text-gray-400">Shopify reviews</div>
              </div>
              <div className="bg-[#0A0F1C] p-8 rounded-lg border-l-2 border-blue-500">
                <div className="text-4xl font-bold text-white mb-2">2m</div>
                <div className="text-gray-400">Average response time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview Section */}
        <FeaturesPreview />

        {/* CTA Section */}
        <CTASection
          title={[
            "Join thousands of merchants",
            "who trust Joy"
          ]}
        />
      </main>
    </ForcedTheme>
  );
}
