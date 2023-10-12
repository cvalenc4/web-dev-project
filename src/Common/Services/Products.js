import Parse from "parse";

// this is used to get the products from our database 
export const getAllProducts = () => {
  const Products = Parse.Object.extend("Products");
  const query = new Parse.Query(Products);

  return query.find().then((results) => {
    return results.map((result) => {
      return result;
    });
  });
};
