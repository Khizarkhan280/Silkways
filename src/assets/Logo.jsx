// Replace the <svg> below with your own logo SVG.
// Tip: use className (not class) and keep sizing via Tailwind classes.
export default function Logo({ className = "h-8 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="32" rx="6" fill="#4F5BD5" />
      <text x="60" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="sans-serif">
        YOUR LOGO
      </text>
    </svg>
  );
}
