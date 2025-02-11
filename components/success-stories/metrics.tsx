interface Metric {
  value: string;
  label: string;
}

const metrics: Metric[] = [
  {
    value: "31M+",
    label: "engagements in the first month in Vinamilk's program"
  },
  {
    value: "63%",
    label: "redemption rate in the Glamourus Program"
  },
  {
    value: "89%",
    label: "referral conversion rate in Korean Skincare program"
  },
  {
    value: "98.5%",
    label: "MoM sales growth in Allbirds Korea campaign"
  }
];

export const MetricsSection = () => {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm bg-blue-500/10 text-blue-500 mb-6">
            Case study
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-900">
            How Our Solutions Made<br />
            a Real Impact
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
            Our platform is continuously improved to provide cutting-edge tools that are easy to use, ensuring that even those new to digital marketing can see immediate benefits.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-4">
              <div className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
                {metric.value}
              </div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 