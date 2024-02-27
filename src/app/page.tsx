import About from '@/components/About/About';
import MainBenefits from '@/components/MainBenefits/MainBenefits';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import Services from '@/components/Services/Services';

export default function Home() {
  return (
    <>
      <About />
      <ProductSlider />
      <Services />
      <MainBenefits />
    </>
  );
}
