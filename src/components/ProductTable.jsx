import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";
import { Skeleton } from "@mui/lab";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: 440,
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
  },
  tableHead: {
    backgroundColor: "#1976d2",
  },
  tableCellHead: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#e3f2fd",
    },
    "&:hover": {
      backgroundColor: "#bbdefb",
    },
  },
  tableCell: {
    borderBottom: "2px solid #1976d2",
  },
  link: {
    color: "#1976d2",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const ProductTable = ({ products, loading }) => {
  const classes = useStyles();

  // Si está cargando, crea un array de 10 elementos vacíos, si no, usa los productos.
  const rows = loading ? Array.from(new Array(10)) : products;

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table stickyHeader>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableCellHead}>Producto Id</TableCell>
            <TableCell className={classes.tableCellHead}>
              Nombre Producto
            </TableCell>
            <TableCell className={classes.tableCellHead}>Precio</TableCell>
            <TableCell className={classes.tableCellHead}>
              Mercado Enlace
            </TableCell>
            <TableCell className={classes.tableCellHead}>Imagen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                {loading ? <Skeleton variant="text" /> : row.id}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {loading ? <Skeleton variant="text" width={150} /> : row.title}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {loading ? (
                  <Skeleton variant="text" width={100} />
                ) : (
                  `$ ${row.price}`
                )}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {loading ? (
                  <Skeleton variant="text" width={200} />
                ) : (
                  <Link
                    href={row.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    {row.permalink}
                  </Link>
                )}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {loading ? (
                  <Skeleton variant="rectangular" width={100} height={100} />
                ) : (
                  <img
                    src={row.thumbnail}
                    alt={row.title}
                    loading="lazy"
                    style={{ width: 90, height: 100 }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
