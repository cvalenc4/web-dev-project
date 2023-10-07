import axios from 'axios';

const url = "https://fakestoreapi.com";

export const createProduct = (
  title,
  price,
  description,
  category,
  image,
  rate,
  count
) => {
  return axios({
    method: "post",
    url: `${url}/products`,
    data: {
      title,
      price,
      description,
      category,
      image,
      rating: {
        rate,
        count
      }
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      console.log("POST response: ", response);
      return response.data;
    })
    .catch((err) => {
      console.error("POST error: ", err);
      throw err;
    });
};

export const getAllProducts = () => {
  return axios
    .get("/products.json")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET Error: ", err);
      throw err;
    });
};
