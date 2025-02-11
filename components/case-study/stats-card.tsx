import { SuccessStoryInfo } from '@/lib/strapi';

interface StatsCardProps {
  info: SuccessStoryInfo;
}

export const StatsCard = ({ info }: StatsCardProps) => {
  // Check if any stats exist
  const hasStats = info.industry || info.use_case || info.location || 
                  info.orders_per_month || info.revenue;

  return (
    <>
      {/* Stats Card */}
      {hasStats && (
        <div className="bg-gray-50 rounded-lg p-4 mb-3">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-2">{info.company_name} STATS</h2>
          
          {info.industry && (
            <div className="mb-2">
              <p className="text-[12px] text-gray-500 tracking-wider">Industry</p>
              <p className="text-[13px] font-medium text-gray-900">{info.industry}</p>
            </div>
          )}

          {info.use_case && (
            <div className="mb-2">
              <p className="text-[12px] text-gray-500 tracking-wider">Use case</p>
              <p className="text-[13px] font-medium text-gray-900">{info.use_case}</p>
            </div>
          )}

          {info.location && (
            <div className="mb-2">
              <p className="text-[12px] text-gray-500 tracking-wider">Location</p>
              <p className="text-[13px] font-medium text-gray-900">{info.location}</p>
            </div>
          )}

          {info.orders_per_month && (
            <div className="mb-2">
              <p className="text-[12px] text-gray-500 tracking-wider">Orders</p>
              <p className="text-[13px] font-medium text-gray-900">{info.orders_per_month}</p>
            </div>
          )}

          {info.revenue && (
            <div className="mb-2 last:mb-0">
              <p className="text-[12px] text-gray-500 tracking-wider">Revenue</p>
              <p className="text-[13px] font-medium text-gray-900">{info.revenue}</p>
            </div>
          )}
        </div>
      )}

      {/* Features */}
      {info.features?.data?.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-2">FEATURES</h2>
          <div className="flex flex-wrap gap-1">
            {info.features.data.map((feature, index) => (
              <div 
                key={index}
                className="inline-flex px-2 py-0.5 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-600 hover:border-gray-300 transition-colors"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}; 