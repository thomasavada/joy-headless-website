import { SponsorsSection } from "@/components/layout/sections/sponsors";

export const SuccessStoriesHero = () => {
  return (
    <section className="w-full py-20 bg-background-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1 rounded-full text-sm bg-blue-500/10 text-blue-500">
            Case studies
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
          Customer success stories
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto text-center">
          Working with top global brands across industries has helped us create a powerful, flexible loyalty platform and gain the expertise to deliver exceptional services to our retail, fashion, and F&B clients.
        </p>
        
        <div className="mt-12">
          <SponsorsSection />
        </div>
      </div>
    </section>
  );
} 