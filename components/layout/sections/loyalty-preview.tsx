import Image from "next/image";

export const LoyaltyPreview = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <p className="text-sm text-primary mb-4">About Joy Loyalty</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Giving merchants all<br />
            the essentials to grow
          </h2>
        </div>
        
        <div className="w-full rounded-2xl border border-border/50 overflow-hidden bg-card">
          <Image
            src="https://joy.so/wp-content/uploads/2025/01/Mask-group-1.png"
            alt="Joy Loyalty Dashboard Preview"
            width={1200}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}; 