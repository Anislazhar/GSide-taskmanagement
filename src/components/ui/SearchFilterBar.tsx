import React from "react";

interface SearchFilterBarProps {
  query: string;
  filter: string;
  onQueryChange: (q: string) => void;
  onFilterChange: (f: string) => void;
  onRestart: () => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  query,
  filter,
  onQueryChange,
  onFilterChange,
  onRestart,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-1 w-full sm:w-auto p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        placeholder="Search contract or name"
      />
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
      >
        <option>All</option>
        <option>New</option>
        <option>Done</option>
        <option>Escalated</option>
      </select>
      <button
        onClick={onRestart}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        Restart Queue
      </button>
    </div>
  );
};

export default React.memo(SearchFilterBar);
