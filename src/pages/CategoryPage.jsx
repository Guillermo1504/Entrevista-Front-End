import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import Categories from "../components/Categories";

const CategoryPage = () => {
  const { category_id } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?category=${category_id}&seller_id=179571326&offset=${
          (currentPage - 1) * 10
        }&limit=10`
      );
      const data = await response.json();
      setProducts(data.results);
      setTotalPages(Math.ceil(data.paging.total / 10));
    };

    fetchProducts();
  }, [category_id, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Categories />
        <div style={{ flex: 1 }}>
          <ProductTable products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
