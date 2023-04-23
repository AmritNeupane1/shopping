import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';
import "../style.css"
import React, { useEffect, useState } from "react";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  text-decoration: none;
`;



const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  font-weight: 700;
  transition-duration: .3s;
  cursor: pointer;
  text-decoration: none;
  ${mobile({ fontSize: "24px" })}
  &:hover {
    font-size: 35px;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled(Link)`
  font-size: 20px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = (props) => {
  let isloggin=props.isloggin;
  

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
          <Logo>GOAT.ed</Logo>
          </Link>
        </Center>
        <Right>
         {
          !isloggin && <><MenuItem to="/login" >Login</MenuItem>
          <MenuItem to="/Register">Sign up</MenuItem></>
         }
         {
          isloggin && <> <div>
          <Link to="/profile">
            <img class="circular--square"
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="profile"
              width="50" height="50"
            />
            {/* <AssignmentIndIcon/> */}
          </Link>
        </div></>
         }
         
          <MenuItem>
          <Link to="/Cart">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
