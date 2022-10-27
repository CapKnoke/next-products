import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from '../components/Image';
import { Products } from '../types/product';

export const getStaticProps: GetStaticProps<{ products: Products }> = async () => {
  const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
  return {
    props: { products },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Next.js Products</title>
      </Head>
      <main>
        <section className="max-w-4xl mx-auto py-12 px-4 flex flex-col gap-8">
          <h1 className="text-2xl font-semibold">Products</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex flex-col justify-between rounded-md shadow-lg border border-opacity-10 border-gray-800"
                >
                  <Link href={`/${product.id}`}>
                    <a>
                      <Image src={product.image} height={200} width={'100%'} />
                      <p className="font-semibold py-2 px-4">{product.title}</p>
                    </a>
                  </Link>
                  <div className="p-4 flex flex-col gap-4">
                    <div className="px-6 py-2 text-center font-bold capitalize bg-blue-600 rounded-full text-white">
                      {product.category}
                    </div>
                    <p className="after:content-['$'] text-lg text-right">{product.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
