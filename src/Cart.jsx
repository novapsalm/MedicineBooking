import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './cart.css'
import LogOut from './logout';
import { useParams } from 'react-router-dom'; 
 
export default function Cart() {
  const navigate = useNavigate([]);
    const [carts, setCarts] = useState([]);
    const {id}=useParams();
    const [isLoggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('isLoggedIn') === 'true');
 useEffect(() => {
  if (!isLoggedIn) {
   
    navigate('/login');
  }
  else{
    sessionStorage.setItem('isLoggedIn',true)
  }
}, [isLoggedIn]);
    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:40807/api/Cart/${id}`);
            setCarts(response.data);
        } catch (error) {
            alert(error)
        }
     };
     const totalBill = carts.reduce((total, item) => total + item.unitPrice, 0);


     const handleDelete = async (index) => {
      const itemToDelete = carts[index];
    
      // Make an API call to delete the item from the backend
      const response = await fetch(`http://localhost:40807/api/Cart/${itemToDelete.userId}`, {
        method: 'DELETE',
      });
    
      if (!response.ok) {
        throw new Error('Error deleting item');
      }
    
      // If successful, delete the item from the local state as well
      const newCarts = [...carts];
      newCarts.splice(index, 1);
      setCarts(newCarts);
    };
    
     /*const handleDelete = (index) => {
     const newCarts = [...carts];
     newCarts.splice(index, 1);
     setCarts(newCarts);
};*/

     const deleteCart=async(cart)=>{
        try{
          const response =await axios.delete(`http://localhost:40807/api/Cart/${id}`)
          alert("Order Placed");
          navigate(`/product/${id}`);
        }
        catch{
          console.log(error)
        }
      }
      const handlelogout=()=>{
        sessionStorage.removeItem('isLoggedIn');
        navigate('/login');
      }
  return (
    <>
    <Button variant ="contained" color = "success" onClick={fetchCart}>CART DETAILS</Button>&nbsp;&nbsp;
    <Button variant="contained" color="primary" onClick={()=>navigate(`/product/${id}`)}>PRODUCTS</Button>&nbsp;&nbsp;
    <Button variant="contained" color="error" onClick={()=>handlelogout()}>LOGOUT</Button>&nbsp;&nbsp;
    <h1>SHOPPING CART</h1>
      <ul>
        {carts.map((item, index) => (
          <li key={index}>
            {item.name} - Rs.{item.unitPrice}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>Total Bill: Rs.{Math.floor(totalBill)}</p>
 
      <Button variant ="contained" color = "success" onClick={deleteCart}>Pay Now Rs.{Math.floor(totalBill)}</Button>
    </>
  )
}
 
