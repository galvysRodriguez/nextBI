"use client"
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

import { useCallback } from "react";
import { usePageTarget, useTargetStore } from "../../hooks/useSearch";

export const ITEMS_PER_PAGE = 9

export function SectionPagination(){
    const {page, setPage} = usePageTarget()
    const { searchResults } = useTargetStore();

    const totalPages = useCallback(() =>{
        return Math.ceil(searchResults().length/ITEMS_PER_PAGE);
    }, [searchResults])

    const renderPageButtons = () => {
        const pages = [];
      
        for (let i = 1; i <= totalPages(); i++) {
          if (
            i === 1 ||
            i === totalPages() ||
            (i >= page - 1 && i <= page + 1)
          ) {
            pages.push(
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  page === i
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {i}
              </button>
            );
          } else if (
            (i === page - 2 || i === page + 2) &&
            i !== 1 &&
            i !== totalPages()
          ) {
            pages.push(
              <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }
        }
      
        return pages
      };
      
    
    return (
        <div className="flex items-center justify-center gap-2 py-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
    
          {renderPageButtons()}
    
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages()}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      );
}