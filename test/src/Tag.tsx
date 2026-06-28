interface TagProps {
  label: string;
  onRemove: () => void;
}

export default function Tag({ label, onRemove }: TagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-md">
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="opacity-70 hover:opacity-100 text-base leading-none bg-transparent border-0 text-white cursor-pointer p-0"
      >
        &times;
      </button>
    </span>
  );
}
