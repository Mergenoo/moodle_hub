import type { LostFoundArt } from "@/data/hubSamples";

/** Illustrated stand-ins for uploaded photos (real items would be user photos). */
const bg: Record<LostFoundArt, string> = { wallet: "#E8DCCB", card: "#DCE6F7", umbrella: "#D7EEF2", usb: "#E4E4EC", keys: "#F6E1E1", phone: "#E1EDE4" };

export function ItemPhoto({ art, label }: { art: LostFoundArt; label: string }) {
  return (
    <svg viewBox="0 0 160 96" className="h-28 w-full rounded-button" role="img" aria-label={`Photo: ${label}`}>
      <rect width="160" height="96" fill={bg[art]} />
      <ellipse cx="80" cy="86" rx="46" ry="5" fill="#000" opacity="0.08" />
      {art === "wallet" && (<g><rect x="42" y="26" width="76" height="52" rx="8" fill="#2B2B2F" /><rect x="42" y="36" width="76" height="6" fill="#3D3D44" /><rect x="96" y="48" width="22" height="16" rx="4" fill="#4A4A52" /><circle cx="105" cy="56" r="3" fill="#C9B98A" /></g>)}
      {art === "card" && (<g><rect x="38" y="22" width="84" height="54" rx="6" fill="#FFFFFF" stroke="#012DB3" strokeWidth="2" /><rect x="38" y="22" width="84" height="14" rx="6" fill="#012DB3" /><rect x="46" y="44" width="22" height="26" rx="3" fill="#C9D3EE" /><rect x="76" y="46" width="38" height="4" rx="2" fill="#9AA5C4" /><rect x="76" y="56" width="30" height="4" rx="2" fill="#9AA5C4" /></g>)}
      {art === "umbrella" && (<g><path d="M30 52a50 36 0 0 1 100 0z" fill="#2F6FD6" /><path d="M30 52q12-8 25 0q12-8 25 0q12-8 25 0q12-8 25 0" fill="#2459AD" /><rect x="78" y="52" width="4" height="26" fill="#444" /><path d="M82 78q0 8-8 8" fill="none" stroke="#444" strokeWidth="4" strokeLinecap="round" /></g>)}
      {art === "usb" && (<g><rect x="44" y="34" width="62" height="28" rx="5" fill="#33343C" /><rect x="100" y="40" width="26" height="16" fill="#B9BCC6" /><rect x="106" y="44" width="4" height="3" fill="#6B6E78" /><rect x="114" y="44" width="4" height="3" fill="#6B6E78" /><circle cx="58" cy="48" r="4" fill="#E2483B" /></g>)}
      {art === "keys" && (<g><circle cx="62" cy="46" r="16" fill="none" stroke="#8A8F98" strokeWidth="4" /><rect x="76" y="42" width="48" height="8" rx="3" fill="#B6BBC4" /><rect x="108" y="50" width="6" height="9" fill="#B6BBC4" /><rect x="118" y="50" width="6" height="7" fill="#B6BBC4" /><rect x="46" y="60" width="18" height="22" rx="3" fill="#D93B3B" /></g>)}
      {art === "phone" && (<g><rect x="58" y="12" width="44" height="76" rx="9" fill="#5A5E66" /><rect x="63" y="20" width="34" height="60" rx="4" fill="#12161C" /><circle cx="80" cy="16" r="1.6" fill="#2D3138" /></g>)}
    </svg>
  );
}
