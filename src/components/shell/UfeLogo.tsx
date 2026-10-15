/** UFE wordmark recreated as SVG (stripe mark + "UFE"). */
export function UfeLogo({ className = "h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 116 28" className={`text-brand ${className}`} role="img" aria-label="UFE">
      <g fill="currentColor">
        <rect x="0" y="2" width="26" height="6" rx="1.5" />
        <rect x="4" y="11" width="22" height="6" rx="1.5" />
        <rect x="0" y="20" width="26" height="6" rx="1.5" />
      </g>
      <rect x="7" y="2" width="3" height="24" className="fill-surface" />
      <text
        x="34"
        y="25"
        fill="currentColor"
        fontSize="28"
        fontWeight="800"
        letterSpacing="1"
        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
      >
        UFE
      </text>
    </svg>
  );
}
