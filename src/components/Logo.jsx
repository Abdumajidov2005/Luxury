export default function Logo({ tone = 'light', href = '#home', onClick }) {
  return (
    <a className={`logo logo--${tone}`} href={href} onClick={onClick} aria-label="Luxury Glamping — back to top">
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 5 4 34h32L20 5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 16 14 34h12L20 16Z" fill="var(--c-clay)" />
      </svg>
      <span className="logo__text">
        <span className="logo__main">Luxury</span>
        <span className="logo__sub">Glamping</span>
      </span>
    </a>
  );
}
