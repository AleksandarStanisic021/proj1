import { useState, useMemo, useCallback } from "react";
import Tag from "./Tag";
import VirtualList from "./VirtualList";
import type { FilterThreshold, SelectableElement } from "./types";

const TOTAL = 10_000;
const MAX_SELECTION = 3;

const ALL_ELEMENTS: SelectableElement[] = Array.from(
  { length: TOTAL },
  (_, i) => ({
    id: i + 1,
    name: `Element ${i + 1}`,
  }),
);

export default function SelectWidget() {
  const [saved, setSaved] = useState<SelectableElement[]>([]);
  const [draft, setDraft] = useState<SelectableElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterThreshold>(0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_ELEMENTS.filter(
      (el) =>
        el.name.toLowerCase().includes(q) && (filter === 0 || el.id > filter),
    );
  }, [search, filter]);

  const handleOpen = useCallback(() => {
    setDraft([...saved]);
    setSearch("");
    setFilter(0);
    setIsOpen(true);
  }, [saved]);

  const handleSave = useCallback(() => {
    setSaved([...draft]);
    setIsOpen(false);
  }, [draft]);

  const handleCancel = useCallback(() => setIsOpen(false), []);

  const handleToggle = useCallback((el: SelectableElement) => {
    setDraft((prev) => {
      const exists = prev.some((x) => x.id === el.id);
      if (exists) return prev.filter((x) => x.id !== el.id);
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, el];
    });
  }, []);

  const removeDraft = useCallback(
    (id: number) => setDraft((prev) => prev.filter((x) => x.id !== id)),
    [],
  );
  const removeSaved = useCallback(
    (id: number) => setSaved((prev) => prev.filter((x) => x.id !== id)),
    [],
  );

  return (
    <div className="bg-white rounded-xl p-6 max-w-2xl shadow-sm font-sans">
      <h2 className="text-lg font-semibold mb-1">Select items</h2>
      <p className="text-sm text-gray-500 mb-3">
        You currently have {saved.length} selected item
        {saved.length !== 1 ? "s" : ""}.
      </p>

      <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
        {saved.map((el) => (
          <Tag
            key={el.id}
            label={el.name}
            onRemove={() => removeSaved(el.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleOpen}
        className="bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">
        Change my choice
      </button>

      {isOpen && (
        <div className="border border-gray-200 rounded-lg mt-3 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <span className="font-semibold text-sm">Select items</span>
            <button
              type="button"
              onClick={handleCancel}
              aria-label="Close"
              className="text-gray-400 hover:text-gray-700 text-xl leading-none bg-transparent border-0 cursor-pointer">
              &times;
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-100 flex-wrap">
            <label htmlFor="sw-search" className="text-sm text-gray-500">
              Search
            </label>
            <input
              id="sw-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-44 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
            <label htmlFor="sw-filter" className="text-sm text-gray-500 ml-2">
              Filter
            </label>
            <select
              id="sw-filter"
              value={filter}
              onChange={(e) =>
                setFilter(Number(e.target.value) as FilterThreshold)
              }
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400">
              <option value={0}>No filter</option>
              <option value={100}>&gt;100</option>
              <option value={2500}>&gt;2500</option>
              <option value={10000}>&gt;10000</option>
            </select>
          </div>

          {/* Count */}
          <div className="text-xs text-gray-400 px-4 py-1 bg-gray-50 border-b border-gray-100">
            Showing {filtered.length.toLocaleString()} of{" "}
            {TOTAL.toLocaleString()} elements
          </div>

          {/* List */}
          <VirtualList items={filtered} draft={draft} onToggle={handleToggle} />

          {/* Footer */}
          <div className="px-4 py-3">
            <p className="text-xs text-gray-400 mb-2">
              Current selected items:
            </p>
            <div className="flex flex-wrap gap-2 mb-3 min-h-[28px]">
              {draft.map((el) => (
                <Tag
                  key={el.id}
                  label={el.name}
                  onRemove={() => removeDraft(el.id)}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="bg-slate-800 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-slate-700 transition-colors">
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
