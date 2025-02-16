"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchTarget } from "../context/IsGrid";
import { Search, X } from "lucide-react";

export function SearchTarget() {
  const { changeSearch } = useSearchTarget();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={inputRef} className="relative flex items-center">
     
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
      >
        <Search className="w-6 h-6 text-gray-600" />
      </button>

      <input
        type="text"
        placeholder="Buscar..."
        className={`absolute right-14 w-48 md:w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
        onChange={(e) => changeSearch(e.target.value)}
      />

      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="w-12 h-12 flex items-center justify-center absolute rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </div>
  );
}
