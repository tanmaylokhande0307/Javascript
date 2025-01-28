import { products } from "../data/product";

export const resolvers = {
  Query: {
    products: () => products,
  },
};
