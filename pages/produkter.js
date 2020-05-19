import { request } from 'graphql-request';
import useSWR from 'swr';

import IndexProducts from 'components/Product/IndexProducts.component';

import { FETCH_ALL_PRODUCTS_QUERY } from 'const/GQL_QUERIES';
import { WOO_CONFIG } from 'config/nextConfig';

const Produkter = () => {
  const { data, error } = useSWR(FETCH_ALL_PRODUCTS_QUERY, (query) =>
    request(WOO_CONFIG.GRAPHQL_URL, query)
  );

  return (
    <>
      {data ? (
        <IndexProducts products={data} />
      ) : (
        <div className="mt-8 text-2xl text-center">Laster produkter ...</div>
      )}
      {/* Display error message if error occured */}
      {error && (
        <div className="mt-8 text-2xl text-center">
          Feil under lasting av produkter ...
        </div>
      )}
    </>
  );
};

export default Produkter;
