import FadeIn from '@/components/FadeIn/FadeIn';

export default function SectionHeader({ label, title, subtitle, center = false }) {
  return (
    <FadeIn>
      <div className={`mb-13 ${center ? 'text-center' : ''}`}>
        <div className="text-xs font-bold tracking-[1.5px] uppercase text-primary mb-2.5">
          {label}
        </div>
        <h2 className="text-[2rem] max-md:text-[1.6rem] font-semibold tracking-tight leading-[1.25] text-navy mb-3.5">
          {title}
        </h2>
        <p className={`text-[0.95rem] text-text leading-[1.7] max-w-[580px] ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      </div>
    </FadeIn>
  );
}
