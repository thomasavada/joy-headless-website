import Image from "next/image";

const integrationLogos = [
  { src: "https://joy.so/wp-content/uploads/2024/12/5.png", alt: "Integration Logo 1" },
  { src: "https://joy.so/wp-content/uploads/2024/12/2.png", alt: "Integration Logo 2" },
  { src: "https://joy.so/wp-content/uploads/2024/12/3-1.png", alt: "Integration Logo 3" },
  { src: "https://joy.so/wp-content/uploads/2024/12/4.png", alt: "Integration Logo 4" },
  { src: "https://joy.so/wp-content/uploads/2024/12/1.png", alt: "Integration Logo 5" }
];

export const ShopifyPOS = () => {
  return (
    <section className="w-full bg-background py-20" id="about">
      <div className="container px-4 mx-auto flex flex-col items-center">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <span className="inline-flex items-center px-4 py-2 text-sm text-primary border border-primary/20 rounded-full bg-primary/5">
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
        <div className="w-full max-w-5xl mb-20">
          <Image
            src="https://joy.so/wp-content/uploads/2024/12/Frame-2085653566-1024x549.png"
            alt="loyalty program Shopify POS"
            width={1024}
            height={549}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Integration Section */}
        <div className="text-center max-w-2xl mx-auto space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Joy works with all your favorite tools
          </h2>
          <p className="text-lg text-muted-foreground">
            Expand your store's potential with top Shopify app integrations for management and customer journeys
          </p>
        </div>

        {/* Integration Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-4xl">
          {integrationLogos.map((logo, index) => (
            <div 
              key={index}
              className="p-6 border-2 border-border/50 rounded-lg flex items-center justify-center bg-card"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={113}
                height={114}
                className="w-16 h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 