import { ForcedTheme } from '@/components/ForcedTheme';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Demo | Joy Rewards & Loyalty Program',
  description: 'Schedule a demo with our experts to learn how Joy can help grow your business with loyalty programs.',
};

export default function BookDemoPage() {
  return (
    <ForcedTheme theme="dark">
      <main className="flex min-h-screen flex-col bg-[#020817]">
        <div className="container max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column - Content */}
              <div className="max-w-md">
                <h1 className="text-5xl font-bold mb-6">Talk to experts</h1>
                <p className="text-gray-400 mb-8">
                  Don&apos;t hesitate to reach out with any questions.<br />
                  We&apos;ll get back to you quickly with a response.
                </p>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>📧</span>
                  <span>sales@joy.so</span>
                </div>
              </div>

              {/* Right Column - Form */}
              <div>
                <form className="space-y-6 max-w-lg">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2">
                      Your name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded bg-[#0A0F1C] border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email and Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded bg-[#0A0F1C] border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm mb-2">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 rounded bg-[#0A0F1C] border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Store URL and Monthly Orders Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="store" className="block text-sm mb-2">
                        Store URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        id="store"
                        name="store"
                        required
                        className="w-full px-4 py-3 rounded bg-[#0A0F1C] border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="orders" className="block text-sm mb-2">
                        Monthly Orders <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="orders"
                        name="orders"
                        required
                        defaultValue="0 - 2,000"
                        className="w-full px-4 py-3 rounded bg-[#0A0F1C] border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0 - 2,000">0 - 2,000</option>
                        <option value="2,000 - 5,000">2,000 - 5,000</option>
                        <option value="5,000 - 10,000">5,000 - 10,000</option>
                        <option value="10,000+">10,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Referral Source */}
                  <div>
                    <label htmlFor="referral" className="block text-sm mb-2">
                      How did you hear about us? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="referral"
                      name="referral"
                      required
                      defaultValue="Google Search"
                      className="w-full px-4 py-3 rounded bg-[#0A0F1C] border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Google Search">Google Search</option>
                      <option value="Social Media">Social Media (Facebook, Instagram, Twitter, LinkedIn, etc.)</option>
                      <option value="Another Website">Another Company's Website</option>
                      <option value="Word of Mouth">Word of Mouth (Friends, Family, Colleagues)</option>
                      <option value="Email">Email Newsletter</option>
                      <option value="Blog">Blog/Article</option>
                      <option value="Event">Event</option>
                      <option value="Influencer">Influencer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm mb-2">
                      What can we help you with? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded bg-[#0A0F1C] border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Privacy Policy */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      required
                      className="mt-1"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-400">
                      I have read and agree to the Joy's{' '}
                      <a href="/privacy-policy" className="text-blue-500 hover:text-blue-400">
                        Privacy Policy
                      </a>{' '}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-3 text-white bg-[#00A3FF] hover:bg-blue-600 rounded font-medium transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ForcedTheme>
  );
}