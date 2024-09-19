import { createContext, useContext, useEffect, useState } from "react";
import generateProducts from "../utils/generate-products";
import toast from "react-hot-toast";
import axios from "axios";

const ProductContext = createContext({
  products: [],
});

export const useProduct = () => useContext(ProductContext);

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  // const [products, setProducts] = useState(() => {
  //   // sync only
  //   const productsInLocal = localStorage.getItem("products");
  //   const productsInJS = JSON.parse(productsInLocal);

  //   if (productsInLocal) {
  //     return productsInJS;
  //   } else {
  //     const productsList = generateProducts(100);
  //     const stringProductArray = JSON.stringify(productsList);
  //     localStorage.setItem("products", stringProductArray);
  //     toast.success("Products Added to local storage");

  //     return productsList;
  //   }
  // });
  // localhost:5000/api/products
  // GET
  function getProductList() {
    axios.get("http://localhost:5000/api/products").then((response) => {
      console.log(response.data);
      setProducts(
        response.data.map((item) => {
          return {
            ...item,

            id: item._id, // come from BE
            title: item.name, // come from BE
          };
        })
      );
    });
  }

  useEffect(() => {
    // fetch (side effect) XXX
    getProductList();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
