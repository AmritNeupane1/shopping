import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {

  const [myData, setMyData] = useState([]);
  const [mysize,setmysize]=useState([]);
  const { productId }=useParams();
  // console.log(productId);
  
  useEffect(() => {
    // console.log(productID);
    
    console.log("http://localhost:3002/home/productPage/"+productId);
    fetch("http://localhost:3002/home/productPage/"+productId)
      .then(response => response.json())
      .then((data) => {setMyData(data); setmysize(data.size)})
      .catch(error => console.error(error));
  }, []);


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={myData.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{myData.name}</Title>
          <Desc>
           {myData.description}
          </Desc>
          {/* <div>
      <p>Prop 1: {prop1}</p>
      <p>Prop 2: {prop2}</p>
    </div> */}
          <Price>Rs.{myData.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                { mysize.xs==true && <FilterSizeOption>XS</FilterSizeOption> }
                { mysize.s==true && <FilterSizeOption>S</FilterSizeOption> }
                { mysize.m==true && <FilterSizeOption>M</FilterSizeOption> }
                { mysize.l==true && <FilterSizeOption>L</FilterSizeOption> }
                { mysize.xl==true && <FilterSizeOption>XL</FilterSizeOption> }
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
