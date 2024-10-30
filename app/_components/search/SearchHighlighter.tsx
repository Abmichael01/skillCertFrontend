import React, { useEffect, useRef } from 'react';
import Mark from 'mark.js';

interface SearchHighlighterProps {
  query: string;
  children: React.ReactNode;
}

const SearchHighlighter: React.FC<SearchHighlighterProps> = ({ query, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const markInstance = new Mark(contentRef.current);

      markInstance.unmark({
        done: () => {
          if (query) {
            markInstance.mark(query, {
              className: "highlight",
            });
          }
        },
      });
    }
  }, [query, children]);

  return (
    <div ref={contentRef}>
      {children}
    </div>
  );
};

export default SearchHighlighter;
