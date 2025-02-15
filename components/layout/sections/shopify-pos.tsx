import Image from "next/image";

const integrations = [
  {
    name: "Chatty",
    description: "Smart live chat with AI chatbot, Messenger, FAQs, and help center for effortless customer support.",
    logo: "https://cdnapps.avada.io/faq/logo/logo-chatty.png"
  },
  {
    name: "Air Reviews",
    description: "Reward customers when they write a review.",
    logo: "https://cdn.shopify.com/s/files/1/0700/8177/3604/files/AirNewLogo_26072024.png"
  },
  {
    name: "Judge.me",
    description: "Integrate to reward customers when they write a review.",
    logo: "https://cdn1.avada.io/joy/judgeme-logo.png"
  },
  {
    name: "Joy Subscription",
    description: "Reward customer for every subscription purchase.",
    logo: "https://cdn.shopify.com/s/files/1/0700/8177/3604/files/logo_subscription.webp"
  },
  {
    name: "Gorgias",
    description: "Display the customer's loyalty profile next to tickets including their points balance, tier name, referral URL,...",
    logo: "https://cdn.shopify.com/app-store/listing_images/d783d0d0ded4ab7a13c20f47533819a3/icon/CNOe1Y-4vocDEAE=.png"
  },
  {
    name: "Yotpo",
    description: "Integrate to allows you to reward customers when they write a review.",
    logo: "https://cdn1.avada.io/joy/yotpo-logo-v3.svg"
  },
  {
    name: "Transcy",
    description: "Translate all content on your store.",
    logo: "https://cdnapps.avada.io/joy/integrations/Transcy.png"
  },
  {
    name: "PageFly",
    description: "Integrate to show reward popup to any PageFly.",
    logo: "https://cdn1.avada.io/joy/page_fly.webp"
  },
  {
    name: "Klaviyo",
    description: "Sync customers to Klaviyo and include reward information in your emails.",
    logo: "https://cdn.shopify.com/s/files/1/0700/8177/3604/files/logo_klaviyo.png"
  },
  {
    name: "Drip",
    description: "Sync customer loyalty data to Drip to include reward details in your emails.",
    logo: "https://cdn.shopify.com/app-store/listing_images/843daba1b44b3eb144d3f71c91b466cc/icon/CIi77qf0lu8CEAE=.png"
  },
  {
    name: "Mailchimp",
    description: "Sync customer loyalty data to Mailchimp to include reward details in your emails.",
    logo: "https://cdn.shopify.com/s/files/1/0700/8177/3604/files/logo_mailchimp.webp"
  },
  {
    name: "Omnisend",
    description: "Omnisend is the omnichannel marketing automation platform built for growing ecommerce businesses.",
    logo: "https://cdn.shopify.com/s/files/1/0700/8177/3604/files/omnisend_logo.webp"
  },
  {
    name: "PushOwl",
    description: "Send push notifications about loyalty program events to customers.",
    logo: "https://cdn.shopify.com/s/files/1/0700/8177/3604/files/logo_pushowl.webp"
  },
  {
    name: "Shopify Flow",
    description: "Create custom automation for loyalty reward.",
    logo: "https://cdn.shopify.com/s/files/1/0700/8177/3604/files/logo_shopify_flow.webp"
  },
  {
    name: "Stamped",
    description: "Reward customers when they write a review.",
    logo: "https://cdn1.avada.io/joy/stamped-logo.svg"
  },
  {
    name: "Loox",
    description: "Reward customers when they write a review.",
    logo: "https://cdn1.avada.io/joy/loox-logo.png"
  },
  {
    name: "Hydrogen",
    description: "Integrate Joy Loyalty seamlessly with Shopify Headless Commerce or Custom Storefront.",
    logo: "https://cdn.shopify.com/s/files/1/0700/8177/3604/files/logo_hydrogen.webp"
  },
  {
    name: "Shopify Subscription",
    description: "Reward customer for every subscription purchase.",
    logo: "https://cdn.shopify.com/s/files/1/0700/8177/3604/files/shopify_subscription_logo.webp"
  }
];

export const ShopifyPOS = () => {
  // Show only first 12 integrations
  const shownIntegrations = integrations.slice(0, 12);

  return (
    <section className="w-full bg-background py-20" id="about">
      <div className="container px-4 mx-auto flex flex-col items-center">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <span className="inline-flex items-center px-4 py-2 text-sm text-primary dark:text-primary-dark border border-primary/20 dark:border-primary-dark/20 rounded-full bg-primary/5 dark:bg-primary-dark/5">
            Loyalty for Point of Sales
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Designed for Shopify POS
          </h2>
          <p className="text-lg text-muted-foreground">
            Joy was created to deliver a seamless loyalty experience across both online and offline channels
          </p>
        </div>

        {/* Main Image */}
        <Image
          src="https://cdn-web.joy.so/cdn/image/2024/12/Frame-2085653566.png"
          alt="loyalty program Shopify POS"
          width={1024}
          height={549}
          className="w-full max-w-5xl h-auto rounded-lg mb-20"
        />

        {/* Integration Section */}
        <div className="text-center max-w-2xl mx-auto space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Joy works with all your favorite tools
          </h2>
          <p className="text-lg text-muted-foreground">
            Enhance your store&apos;s performance with our carefully selected Shopify app integrations designed to boost customer loyalty and maximize retention
          </p>
        </div>

        {/* Integration Cards Grid */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shownIntegrations.map((integration, index) => (
              <div
                key={index}
                className="p-4 bg-card rounded-lg border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex flex-col gap-2">
                  <div className="relative h-10 w-10 bg-white dark:bg-gray-800 rounded-lg p-1.5">
                    <Image
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground">{integration.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {integration.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore All Integrations Button */}
          <div className="mt-12 text-center">
            <a
              href="/integrations"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-primary border border-primary/20 rounded-full bg-white dark:bg-white hover:bg-primary/5 dark:hover:bg-white/10 transition-colors"
              tabIndex={0}
              aria-label="Explore all integrations"
            >
              Explore all integrations
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
