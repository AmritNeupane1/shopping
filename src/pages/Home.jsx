import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import axios from "axios";

const Home = (props) => {
  let isloggin=props.isloggin;

  const [myData, setMyData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/home")
      .then(response => response.json())
      .then((data) => {setMyData(data); console.log(data); })
      .catch(error => console.error(error));
  }, []);


  return (
    <div>
      <Announcement />
      <Navbar isloggin={isloggin}/>
      <Slider />
      <Categories />
      <Products popularProducts={myData}/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
