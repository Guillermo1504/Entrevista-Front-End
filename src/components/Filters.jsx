import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const Filters = ({ onApplyFilters }) => {
  // Estado para almacenar el valor de búsqueda del producto.
  const [query, setQuery] = useState("");

  //  Estado para almacenar el valor del precio mínimo.
  const [minPrice, setMinPrice] = useState("");

  // Estado para almacenar el valor del precio máximo.
  const [maxPrice, setMaxPrice] = useState("");

  // Se llama cuando el usuario hace clic en el botón "Aplicar Filtros".
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
          sx={{ color: "white", background: "white" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          label="Precio Mínimo"
          variant="outlined"
          fullWidth
          type="number"
          value={minPrice}
          sx={{ color: "white", background: "white" }}
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
          sx={{ color: "white", background: "white" }}
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
