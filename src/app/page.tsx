import About from '@/components/About/About';
import MainBenefits from '@/components/MainBenefits/MainBenefits';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import RoadToUs from '@/components/RoadToUs/RoadToUs';

export default function Home() {
  return (
    <>
      <About />
      <ProductSlider />
      <MainBenefits />

      <RoadToUs />
    </>
  );
}
