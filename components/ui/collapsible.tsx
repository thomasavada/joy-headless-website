"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import {Minus, Plus} from 'lucide-react';
import {useState} from 'react';

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

interface CustomCollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export function CustomCollapsible({ title, children }: CustomCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <h3 className="text-xl font-medium">{title}</h3>
        {isOpen ? (
          <Minus className="h-6 w-6 text-primary-dark" />
        ) : (
          <Plus className="h-6 w-6 text-primary-dark" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-gray-400">{children}</p>
        </div>
      )}
    </div>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
