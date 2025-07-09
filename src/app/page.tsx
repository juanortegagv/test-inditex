import { getProducts } from '@/lib/api';
import HomeClient from '@/components/home-client';

const Home = async () => {
  const products = await getProducts();
  return <HomeClient products={products} />;
};

export default Home;
