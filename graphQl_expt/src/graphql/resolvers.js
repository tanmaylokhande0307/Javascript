import { products } from "../data/product.js";

export const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find((product) => product.id === id),
  },

  Mutation: {
    createProduct: (_, { title, price, inStock, category }) => {
      const newProduct = {
        id: String(products.length + 1),
        title,
        category,
        price,
        inStock,
      };

      products.push(newProduct);
      return newProduct;
    },
  },
};
