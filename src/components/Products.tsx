import { useEffect, useState } from "react";
import styles from "../styles/products.module.css";
// import { ProductsProps } from "../types/models";
import Card from "./Card";
import Spinner from "./Spinner";
// import { getProducts } from "../utils/getData";
import Sidebar from "./Sidebar";
import { useFilter } from "../context/FilterContext";

const Products = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  // const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage: number = 9;
  // console.log(currentPage);

  // console.log(data);
  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    setLoading(true);

    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLoading(false);

        setData(data.products);
      } catch (error: any) {
        setLoading(false);
        console.log(error);
      }
    };

    getData();
  }, [searchQuery, currentPage, keyword, selectedCategory]);

  //get filtered products
  const getFilteredProducts = () => {
    let filteredProducts = data;
    // console.log(filteredProducts);

    //filter based on category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    //filter based on minimum price
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    //filter based on maximum price
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    //filter based on search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filteredProducts;

    // if (filter === "expensive") {
    //   return filteredProducts.sort(
    //     (acc, product) => parseFloat(product.price) - parseFloat(acc.price)
    //   );
    // } else if (filter === "cheap") {
    //   return filteredProducts.sort(
    //     (acc, product) => parseFloat(acc.price) - parseFloat(product.price)
    //   );
    // } else if (filter === "popular") {
    //   return filteredProducts.sort(
    //     (acc, product) => parseFloat(product.rating) - parseFloat(acc.rating)
    //   );
    // } else if (filter === "all") {
    //   return filteredProducts;
    // }
  };

  const filteredProducts = getFilteredProducts();
  // console.log(filteredProducts);

  return (
    <div className={styles.products}>
      <Sidebar />
      <div className={styles.products_data}>
        <div className={styles.wrapper}>
          {loading ? (
            <Spinner />
          ) : (
            filteredProducts &&
            filteredProducts.map((item) => (
              <div className={styles.card} key={item.id}>
                <Card products={item} />
              </div>
            ))
          )}
          {/* pagination  */}
        </div>
        {!loading && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button type="button">{currentPage}</button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              // disabled={currentPage * itemsPerPage >= data.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
