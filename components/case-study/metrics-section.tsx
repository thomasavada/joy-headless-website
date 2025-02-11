import { SuccessStoryInfo } from '@/lib/strapi';

interface MetricsSectionProps {
  info: SuccessStoryInfo;
}

export const MetricsSection = ({ info }: MetricsSectionProps) => {
  if (!info.key_results?.data?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {info.key_results.data.map((result, index) => {
        // Extract number and text from result string (e.g., "315 K + members enrolled in one year")
        const matches = result.match(/^([\d.]+)\s*([KMB]+)?\s*\+\s*(.+)$/i);
        if (!matches) return null;

        const [_, number, unit, text] = matches;
        
        return (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {number}
              {unit}
              <span className="text-primary">+</span>
            </div>
            <p className="text-base md:text-lg text-gray-600 leading-snug">
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
}; 