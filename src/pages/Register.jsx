import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
const [details,setDetails]=useState([]);
const navigate=useNavigate();
const [passworderror,setpassworderror]=useState(false);
const handledetailChange = (e) => {
  setDetails({
    ...details,
    [e.target.name]: e.target.value,
  });
  
};
const registerCreate=()=>{
  if(details.password!==details.confirmpassword){
    setpassworderror(true);
    return;
  }
  delete details.confirmpassword;
  console.log(details);

  fetch("http://localhost:3002/customer/signup", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

  setDetails([]);
  setpassworderror(false);
  navigate('/');
}
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input name="firstName" placeholder="name" onChange={handledetailChange} />
          <Input name="lastName" placeholder="last name" onChange={handledetailChange} />
          <Input name="username" placeholder="username"  />
          <Input name="email" placeholder="email" onChange={handledetailChange} />
          <Input name="password" placeholder="password" onChange={handledetailChange} />
          <Input name="confirmpassword"placeholder="confirm password" onChange={handledetailChange} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {passworderror && <div>Passwords do not match. please try again</div>}
          <Button onClick={registerCreate}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
