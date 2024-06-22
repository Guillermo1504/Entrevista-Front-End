import React, { useState, useEffect } from "react";
import Categories from "../components/Categories";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import { Container, Grid, Paper } from "@mui/material";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    query: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const queryParam = filters.query ? `&q=${filters.query}` : "";
      const minPriceParam = filters.minPrice
        ? `&price_min=${filters.minPrice}`
        : "";
      const maxPriceParam = filters.maxPrice
        ? `&price_max=${filters.maxPrice}`
        : "";

      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?seller_id=179571326&category=${selectedCategory}&offset=${
          (currentPage - 1) * 10
        }&limit=10${queryParam}${minPriceParam}${maxPriceParam}`
      );
      const data = await response.json();
      setProducts(data.results);
      setTotalPages(Math.ceil(data.paging.total / 10));
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, currentPage, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper>
            <Categories onSelectCategory={handleCategorySelect} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper style={{ padding: "16px", backgroundColor: "#e3f2fd" }}>
            <Filters onApplyFilters={handleApplyFilters} />
            <ProductTable products={products} loading={loading} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
