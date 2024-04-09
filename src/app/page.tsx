import About from '@/components/ForHomepage/About/About';
import MainBenefits from '@/components/ForHomepage/MainBenefits/MainBenefits';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import Services from '@/components/ForHomepage/Services/Services';
import RoadToUs from '@/components/ForHomepage/RoadToUs/RoadToUs';
import OurLocation from '@/components/ForHomepage/OurLocation/OurLocation';
import SocialNetworks from '@/components/ForHomepage/SocialNetworks/SocialNetworks';

import { getProductsForSlider } from '@/helpers/fetchProducts';

export default async function Home() {
  const productsForSlider = await getProductsForSlider();

  return (
    <>
      <About />
      <ProductSlider products={productsForSlider} />
      <MainBenefits />
      <Services />
      <RoadToUs />
      <OurLocation />
      <SocialNetworks />
    </>
  );
}
