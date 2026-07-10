function Logo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="10.5" stroke="var(--ink-muted)" strokeWidth="1.5" opacity="0.6" />
      <g stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="13" cy="13" r="4.6" />
        <path d="M13 4.2v2.2M13 19.6v2.2M4.2 13h2.2M19.6 13h2.2M7.1 7.1l1.5 1.5M17.4 17.4l1.5 1.5" />
      </g>
    </svg>
  )
}

export default Logo
