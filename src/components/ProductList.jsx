import React from "react";

const ProductList = ({ products }) => {
  console.log(products, "");
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <a href={product.permalink} target="_blank" rel="noopener noreferrer">
            <img src={product.thumbnail} alt={product.title} loading="lazy" />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
