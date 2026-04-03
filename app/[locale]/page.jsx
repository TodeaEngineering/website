import Hero from '@/components/Hero/Hero';
import WaveDivider from '@/components/WaveDivider/WaveDivider';
import Services from '@/components/Services/Services';
import Approach from '@/components/Approach/Approach';
import About from '@/components/About/About';
import TechStack from '@/components/TechStack/TechStack';
import Industries from '@/components/Industries/Industries';
import CtaBanner from '@/components/CtaBanner/CtaBanner';
import Contact from '@/components/Contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <WaveDivider />
      <Services />
      <WaveDivider flip />
      <Approach />
      <WaveDivider variant={2} />
      <About />
      <WaveDivider variant={2} flip />
      <TechStack />
      <WaveDivider />
      <Industries />
      <WaveDivider flip />
      <CtaBanner />
      <Contact />
    </>
  );
}
