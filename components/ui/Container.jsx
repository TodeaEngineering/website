export default function Container({ children, className = '' }) {
  return <div className={`max-w-[1140px] mx-auto px-6 ${className}`}>{children}</div>;
}
