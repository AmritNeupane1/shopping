import React, { useState } from "react";
import styled from "styled-components";
import { Item } from "../data.js";
import "../style.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [addresses, setAddresses] = useState(Item.addresses);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [showAddAddress, setShowAddAddress] = useState(false);
  const handleNewAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddAddress = () => {
    setAddresses((oldAddresses) => [
      ...oldAddresses,
      { ...newAddress, id: addresses.length + 1 },
    ]);
    setNewAddress({ street: "", city: "", state: "", zip: "" });
    setShowAddAddress(false);
    Item.addresses = addresses;
    // window.location.reload(false);
  };

  return (
    <div>
      <Navbar isloggin="true" />
      <div className="container">
        <div className="profile">
          <div className="header">
            <h2>My Profile</h2>
          </div>
          <div className="section">
            <div className="section-header">Personal Information</div>
            <div className="row">
              <div className="label">First Name:</div>
              <div className="value">John</div>
            </div>
            <div className="row">
              <div className="label">Last Name:</div>
              <div className="value">Doe</div>
            </div>
            <div className="row">
              <div className="label">Email:</div>
              <div className="value">johndoe@gmail.com</div>
            </div>
          </div>
          <div className="section bound">
            <div className="section-header">Orders</div>
            <div className="row-header">
              <div className="label">Order ID</div>
              <div className="label">Products</div>
              <div className="label">Total</div>
            </div>
            {Item.orders.map((order) => (
              <div className="row" key={order._id}>
                <div className="value">{order._id}</div>
                <div className="value">{order.product}</div>
                <div className="value">{order.totalAmount}</div>
              </div>
            ))}
          </div>
          <div className="section">
            <div className="section-header">Addresses</div>
            {Item.addresses.map((address) => (
              <div className="address">
                <div className="row">
                  <div className="label">street:</div>
                  <div className="value">{address.street}</div>
                </div>
                <div className="row">
                  <div className="label">City:</div>
                  <div className="value">{address.city}</div>
                </div>
                <div className="row">
                  <div className="label">State:</div>
                  <div className="value">{address.state}</div>
                </div>
                <div className="row">
                  <div className="label">Zip:</div>
                  <div className="value">{address.zip}</div>
                </div>
              </div>
            ))}
            <button onClick={() => setShowAddAddress(true)}>
              Add New Address
            </button>
            {showAddAddress && (
              <>
                <div className="address">
                  <div className="row">
                    <div className="label">street:</div>
                    <input
                      type="text"
                      name="street"
                      onChange={handleNewAddressChange}
                    />
                  </div>
                  <div className="row">
                    <div className="label">City:</div>
                    <input
                      type="text"
                      name="city"
                      onChange={handleNewAddressChange}
                    />
                  </div>
                  <div className="row">
                    <div className="label">State:</div>
                    <input
                      type="text"
                      name="state"
                      onChange={handleNewAddressChange}
                    />
                  </div>
                  <div className="row">
                    <div className="label">Zip:</div>
                    <input
                      type="text"
                      name="zip"
                      onChange={handleNewAddressChange}
                    />
                  </div>
                  <button onClick={handleAddAddress}>submit</button>
                  <div></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
