import About from '@/components/About/About';
import MainBenefits from '@/components/MainBenefits/MainBenefits';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import Services from '@/components/Services/Services';
import RoadToUs from '@/components/RoadToUs/RoadToUs';
import OurLocation from '@/components/OurLocation/OurLocation';
import SocialNetworks from '@/components/SocialNetworks/SocialNetworks';

export default function Home() {
  return (
    <>
      <About />
      <ProductSlider />
      <MainBenefits />
      <Services />
      <RoadToUs />
      <OurLocation />
      <SocialNetworks />
    </>
  );
}
