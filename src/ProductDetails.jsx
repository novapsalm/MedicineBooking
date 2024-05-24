import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material'
import './ProductDetails.css';
import LogOut from './logout';
 
const ProductDetails = () => {
 const [medicine, setMedicine] = useState([]);
 const { name } = useParams();
 const {id}=useParams();
 const nav = useNavigate([]);
 const [isLoggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('isLoggedIn') === 'true');
 useEffect(() => {
  if (!isLoggedIn) {
   
    nav('/login');
  }
  else{
    sessionStorage.setItem('isLoggedIn',true)
  }
}, [isLoggedIn]);

 useEffect(() => {
    const fetchMedicine = async () => {
      try {
        let res = await axios.get(`http://localhost:40807/api/Medicine/${name}`)  
       .then(res=>setMedicine(res.data))    
      } catch (error) {
        console.log(error);
      }
    };
 
    fetchMedicine();
 });
 const addToCart = (medicine) => {
  const cart={
    id:0,
    userId: id,
    medicineId : medicine.id ,
    unitPrice: medicine.unitPrice,
    quantity: medicine.quantity,
    totalPrice: medicine.unitPrice
  }
  alert("Item Added Successfully")
  axios.post("http://localhost:40807/api/Cart",cart)
  console.log(cart);
 };
 const handlelogout=()=>{
    sessionStorage.removeItem('isLoggedIn');
    nav('/login');
  }
let index = 0
 return (
    <>      
    {      
        medicine.map(md=>(
            <div className='container'>
            <h1 key={index++}>{md.name}</h1>  
                <p><b>Manufacturer:</b> {md.manufacturer}</p>  
                <p><b>Descriptions:</b> {md.descriptions}</p>
                <p><b>Quantity:</b> {md.quantity}</p>
                <p><b>Expiry Date:</b> {md.expDate}</p>
                <p><b>Price:</b> {md.unitPrice}</p>
                <Button variant="contained" color="primary" onClick={() => addToCart(md)}>Add to Cart</Button>&nbsp;&nbsp;
                <Button variant="contained" color="success" onClick={()=>nav(`/Cart/${id}`)}>VIEW CART</Button>&nbsp;&nbsp;
                <Button variant="contained" color="error" onClick={()=>handlelogout()}>LOGOUT</Button>&nbsp;&nbsp;

            </div>
        ))  
    }
      </>
 );
};
 
export default ProductDetails;