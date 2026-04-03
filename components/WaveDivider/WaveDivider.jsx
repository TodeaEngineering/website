export default function WaveDivider({ flip = false, variant = 1 }) {
  const path =
    variant === 1
      ? 'M0,20 C360,50 720,0 1080,35 C1260,48 1380,22 1440,28 L1440,50 L0,50 Z'
      : 'M0,25 C240,0 480,50 720,25 C960,0 1200,40 1440,15 L1440,50 L0,50 Z';

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-[50px] block">
        <path fill="#eef6ff" d={path} />
      </svg>
    </div>
  );
}
