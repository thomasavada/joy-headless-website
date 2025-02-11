import {SuccessStoryInfo} from '@/lib/strapi';

interface MetricsSectionProps {
  info: SuccessStoryInfo;
}

export const MetricsSection = ({ info }: MetricsSectionProps) => {
  if (!info.key_results?.data?.length) return null;

  const parseMetric = (result: string) => {
    // Try to match different patterns
    const patterns = [
      // Pattern for "number unit+ text" (e.g., "315K+ members enrolled")
      /^([\d.]+)\s*([KMB]+)?\s*\+\s*(.+)$/i,
      // Pattern for "number% text" (e.g., "98.5% MoM Sales Growth")
      /^([\d.]+)%\s*(.+)$/i,
      // Pattern for "number text" (e.g., "45 reward redemption rate")
      /^([\d.]+)\s*(.+)$/i
    ];

    for (const pattern of patterns) {
      const matches = result.match(pattern);
      if (matches) {
        if (matches[0].includes('%')) {
          return {
            number: matches[1],
            unit: '%',
            text: matches[2]
          };
        } else {
          return {
            number: matches[1],
            unit: matches[2] || '',
            text: matches[3] || matches[2]
          };
        }
      }
    }

    // If no pattern matches, return the original text as-is
    return {
      number: '',
      unit: '',
      text: result
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {info.key_results.data.map((result, index) => {
        const { number, unit, text } = parseMetric(result);

        // If no number was parsed, just display the text
        if (!number) {
          return (
            <div key={index} className="text-center">
              <p className="text-base md:text-lg text-gray-600 leading-snug">{text}</p>
            </div>
          );
        }

        return (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {number}
              {unit}
              {unit !== '%' && <span className="text-primary">+</span>}
            </div>
            <p className="text-base md:text-lg text-gray-600 leading-snug">{text}</p>
          </div>
        );
      })}
    </div>
  );
};
