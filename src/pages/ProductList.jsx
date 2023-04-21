import styled from "styled-components";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
const Input=styled.input`
border: none;
border-bottom: 0.125rem solid grey;
width: 10%;
height: 1rem;
font-size: 1.0625rem;
padding-left: 0.875rem;
line-height: 147.6%;
padding-top: 0.825rem;
padding-bottom: 0.5rem;

`;

const ProductList = () => {
  // const [oldvalue, setoldvalue] = useState({});
  const [value, setNewvalue] = useState({
    min:0,
    max:0,
  });
  const size=useState("size");
  const applychange=()=>{
    
  }
  const handleChange=(e)=>{
    setNewvalue({
      ...value,
      [e.target.name]: e.target.value,
    });

  };
  const getComboA=(e)=> {
    size=(e.target.value);
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          
          <Select onChange={getComboA}>
            <Option disabled selected value="size">
              Size
            </Option>
            <Option value="xs">XS</Option>
            <Option value="s">S</Option>
            <Option value="m">M</Option>
            <Option value="l">L</Option>
            <Option value="xl">XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Price Range:</FilterText>
          <Input type="Number" name="min" placeholder="Min" onChange={handleChange}/>{"  "}
          <Input type="Number" name="max" placeholder="Max" onChange={handleChange}/>{"  "}
          <button onClick={applychange}>Apply</button>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
