const base = 'inline-flex items-center gap-2 px-[22px] py-[9px] rounded-[5px] text-sm font-semibold cursor-pointer transition-all duration-250';

const variants = {
  primary: `${base} bg-primary text-white border-none hover:bg-primary-hover`,
  outline: `${base} bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white`,
};

export default function Button({ href, variant = 'primary', children, style, type, onClick, className = '' }) {
  const cls = `${variants[variant]} ${className}`;

  if (href) {
    return <a href={href} className={cls} style={style}>{children}</a>;
  }

  return <button type={type} className={cls} style={style} onClick={onClick}>{children}</button>;
}
