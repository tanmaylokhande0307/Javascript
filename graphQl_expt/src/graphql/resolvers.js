import { products } from "../data/product.js";

export const resolvers = {
  Query: {
    products: () => products,
  },
};
