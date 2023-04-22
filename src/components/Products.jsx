import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import React, { useEffect, useState } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = (props) => {
  console.log(props.popularProducts);

  const myData=props.popularProducts;
  //const data = props.popularProducts;
  return (
    <Container>
      {myData.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
