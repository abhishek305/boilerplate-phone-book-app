import { useState, useRef, useEffect } from "react";
import { SortOption, SORT_OPTIONS } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SortDropdownProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export function SortDropdown({ sortOption, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  // Find current selected option
  const selectedOption = SORT_OPTIONS.find(option => option.value === sortOption);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="icon-btn flex items-center text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm transition-all"
        onClick={toggleDropdown}
      >
        <i className="ri-sort-desc mr-1"></i>
        <span className="hidden sm:inline">Sort</span>
      </button>
      
      <div 
        className={cn(
          "absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-1 z-20 transition-all duration-200 ease-in-out",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        {SORT_OPTIONS.map(option => (
          <button
            key={option.value}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => handleOptionSelect(option.value)}
          >
            <i className={`${option.icon} mr-2 text-gray-500`}></i>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
