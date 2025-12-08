"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded mb-3 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-[#607D8B] text-white text-sm font-medium"
      >
        {title}
        <ChevronDown
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
          size={18}
        />
      </button>

      {open && (
        <div className="bg-gray-50 px-4 py-3 text-sm text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}
