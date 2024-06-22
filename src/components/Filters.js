import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

const Filters = ({ onApplyFilters }) => {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleApplyFilters = () => {
    onApplyFilters({ query, minPrice, maxPrice });
  };

  return (
    <Grid container spacing={2} style={{ marginBottom: "16px" }}>
      <Grid item xs={12} md={4}>
        <TextField
          label="Buscar Producto"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          label="Precio Mínimo"
          variant="outlined"
          fullWidth
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          label="Precio Máximo"
          variant="outlined"
          fullWidth
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleApplyFilters}
        >
          Aplicar Filtros
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
