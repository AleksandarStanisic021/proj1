import { useState, useMemo, useRef, useEffect } from "react";
import type { SelectableElement } from "./types";

const ITEM_HEIGHT = 37;
const BUFFER = 20;
const MAX_SELECTION = 3;

interface VirtualListProps {
  items: SelectableElement[];
  draft: SelectableElement[];
  onToggle: (el: SelectableElement) => void;
}

export default function VirtualList({
  items,
  draft,
  onToggle,
}: VirtualListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    setScrollTop(0);
    containerRef.current?.scrollTo(0, 0);
  }, [items]);

  const draftIds = useMemo(() => new Set(draft.map((d) => d.id)), [draft]);

  const { startIdx, endIdx } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
    const end = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + 224) / ITEM_HEIGHT) + BUFFER,
    );
    return { startIdx: start, endIdx: end };
  }, [scrollTop, items.length]);

  const visibleItems = items.slice(startIdx, endIdx + 1);

  return (
    <div
      ref={containerRef}
      className="h-56 overflow-y-auto border-b border-gray-100 relative"
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}>
      <div className="relative" style={{ height: items.length * ITEM_HEIGHT }}>
        {items.length === 0 ? (
          <div className="text-sm text-gray-400 text-center p-5">
            No elements found.
          </div>
        ) : (
          visibleItems.map((el, i) => {
            const isChecked = draftIds.has(el.id);
            const isDisabled = !isChecked && draft.length >= MAX_SELECTION;
            return (
              <div
                key={el.id}
                className={[
                  "absolute left-0 w-full flex items-center gap-2.5 px-4 border-b border-gray-100 text-sm",
                  isChecked ? "bg-blue-50" : "bg-white",
                  isDisabled ? "opacity-50" : "hover:bg-slate-50",
                ].join(" ")}
                style={{
                  top: (startIdx + i) * ITEM_HEIGHT,
                  height: ITEM_HEIGHT,
                }}>
                <input
                  type="checkbox"
                  id={`cb-${el.id}`}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => onToggle(el)}
                  className="w-4 h-4 accent-slate-800 shrink-0 cursor-pointer"
                />
                <label
                  htmlFor={`cb-${el.id}`}
                  className={
                    isDisabled
                      ? "cursor-not-allowed text-gray-400"
                      : "cursor-pointer flex-1"
                  }>
                  {el.name}
                </label>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
