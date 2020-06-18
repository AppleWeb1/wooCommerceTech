import Hero from 'components/Index/Hero.component';
import IndexProducts from 'components/Product/IndexProducts.component';
import PageTitle from 'components/Header/PageTitle.component';

import client from 'utils/apollo/ApolloClient.js';

import { FETCH_ALL_PRODUCTS_QUERY } from 'utils/const/GQL_QUERIES';

/**
 * Main index page
 * @param {Object} products
 * Initial static data is sent as props from getStaticProps and loaded through 'utils/const/INITIAL_PRODUCTS'
 */
const HomePage = ({ products }) => {
  return (
    <>
      <Hero />
      <PageTitle title="Produkter" />
      {products && <IndexProducts products={products} />}
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  //export async function getServerSideProps() {

  const { data, loading, networkStatus } = await client.query({
    query: FETCH_ALL_PRODUCTS_QUERY,
  });

  return {
    props: {
      products: data.products.nodes,
      loading: loading,
      networkStatus: networkStatus,
    },
    unstable_revalidate: 5,
  };
}
