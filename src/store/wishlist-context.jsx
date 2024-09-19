//  NEW --> MOVE THE CONTEXT HERE

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

export const useWishlist = () => useContext(WishlistContext);

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    // sync only
    const wishlistInLocal = localStorage.getItem("wishlist");
    const wishlistInJS = JSON.parse(wishlistInLocal);
    // if (wishlistInJS) return wishlistInJS;
    // else return [];
    return wishlistInJS ?? [];
  });

  const addToWishlist = (product) => {
    setWishlist((prevArr) => {
      const newArr = [...prevArr];

      const idx = newArr.findIndex((item) => {
        return item.id === product.id;
      });

      if (idx === -1) {
        // not exist

        return [...newArr, product];
      } else {
        // exists
        toast.error("Product is already exists!");
        return [...newArr];
      }
    });
  };
  useEffect(() => {
    const stringWishlistArray = JSON.stringify(wishlist);
    localStorage.setItem("wishlist", stringWishlistArray);
    toast.success("wishlist and local storage Updated");
  }, [wishlist]);
  const removeFromWishlist = (product) => {
    setWishlist((prevArr) => {
      const newArr = prevArr.filter((item) => item.id !== product.id);
      return newArr;
    });
  };
  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
