"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sources = [
  "Google Search",
  "Social Media",
  "Friend Referral",
  "Blog Post",
  "Other"
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add your form submission logic here
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          required
          className="w-full px-4 py-3 rounded-lg bg-white text-[#0B1121] placeholder:text-[#667085]"
        />
      </div>

      {/* Email Input */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email*"
          required
          className="w-full px-4 py-3 rounded-lg bg-white text-[#0B1121] placeholder:text-[#667085]"
        />
      </div>

      {/* Website Input */}
      <div>
        <input
          type="url"
          name="website"
          placeholder="Your Website*"
          required
          className="w-full px-4 py-3 rounded-lg bg-white text-[#0B1121] placeholder:text-[#667085]"
        />
      </div>

      {/* Phone Input */}
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full px-4 py-3 rounded-lg bg-white text-[#0B1121] placeholder:text-[#667085]"
        />
      </div>

      {/* Monthly Order Input */}
      <div>
        <input
          type="text"
          name="monthlyOrder"
          placeholder="Monthly Order*"
          required
          className="w-full px-4 py-3 rounded-lg bg-white text-[#0B1121] placeholder:text-[#667085]"
        />
      </div>

      {/* Source Select */}
      <div>
        <label className="block text-white mb-2">
          How did you hear about us? <span className="text-red-500">*</span>
        </label>
        <Select required>
          <SelectTrigger className="w-full bg-white text-[#0B1121] border-0">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {sources.map((source) => (
              <SelectItem 
                key={source} 
                value={source}
                className="hover:bg-[#00A6ED]/10"
              >
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message Input */}
      <div>
        <textarea
          name="message"
          placeholder="What can we help you with?*"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-white text-[#0B1121] placeholder:text-[#667085] resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#00A6ED] hover:bg-[#00A6ED]/90 text-white py-6 rounded-lg text-lg font-medium"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
} 