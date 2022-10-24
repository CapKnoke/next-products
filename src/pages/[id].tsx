import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from '../components/Image';
import { Product, Products } from '../types/product';

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetch('https://fakestoreapi.com/products')
    .then(res=>res.json()) as Products
  const paths = products.map((product) => ({ params: { id: product.id.toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ product: Product }> = async ({ params }) => {
  const product = await fetch(`https://fakestoreapi.com/products/${params?.id}`)
    .then(res=>res.json()) as Product
  return {
    props: { product },
  };
};

const Product: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ product }) => {
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <main>
        <section className="max-w-4xl mx-auto py-12 px-4 flex flex-col gap-8">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="md:flex">
            <Image src={product.image} height={400} width={'100%'} className="rounded-md shadow-lg border border-opacity-10 border-gray-800" />
            <div className="p-4 flex flex-col justify-between md:w-full gap-4">
              <p className="text-gray-600 text-lg">{product.description}</p>
              <div className="flex flex-col gap-4">
                <div className="bg-blue-600 py-2 px-6 rounded-full text-white font-bold capitalize text-center">{product.category}</div>
                <p className="after:content-['$'] text-xl text-right">{product.price}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;
