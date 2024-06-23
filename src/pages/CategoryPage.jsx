import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import Categories from "../components/Categories";

const CategoryPage = () => {
  // Obtiene el parámetro `category_id` de la URL
  const { category_id } = useParams();

  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);

  //  Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para el número total de páginas
  const [totalPages, setTotalPages] = useState(0);

  // useEffect de búsqueda de productos.
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?category=${category_id}&seller_id=179571326&offset=${
          (currentPage - 1) * 10
        }&limit=10`
      );

      // Convierte
      const data = await response.json();
      setProducts(data.results);
      setTotalPages(Math.ceil(data.paging.total / 10));
    };

    fetchProducts();
  }, [category_id, currentPage]);

  // se usa para actualizar el estado currentPage cuando el usuario cambia de página.
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
