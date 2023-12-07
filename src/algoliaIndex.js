import Parse from "parse";
import * as Env from "./environments.js";

const algoliasearch = require('algoliasearch');
const client = algoliasearch(Env.ALGOLIA_APP_ID, Env.ALGOLIA_API_KEY);
const index = client.initIndex('realProducts');

// import existing data from parse app to algolia
const indexData = () => {
  const Products = Parse.Object.extend("Products");
  const query = new Parse.Query(Products);
  return query.find().then((results) => {
    const formattedResults = results.map((result) => {
      return {
        objectID: result.id,
        ...result.attributes
      };
    });
    // Add to Algolia index
    index.saveObjects(formattedResults);
    return results;
  });
};

export default index;