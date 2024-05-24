import React,{useState,useEffect} from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cart from './Cart';
import './products.css'
import LogOut from './logout';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
 const [cart, setCart] = useState([]);
 const [medicineName, setMedicineName] = useState('');
 const [medicines, setMedicines] = useState([]);
 const nav=useNavigate()
 const [carts, setCarts] = useState([]);
 const [users,setUsers]=useState([]);
 const {id}=useParams();
 const [isLoggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('isLoggedIn') === 'true');
 useEffect(() => {
  if (!isLoggedIn) {
   
    nav('/login');
  }
  else{
    sessionStorage.setItem('isLoggedIn',true)
  }
}, [isLoggedIn]);
  //axios.get(`http://localhost:40807/api/Medicine/`).then(response=>setMedicines(response.data))

    const getUsers=async()=>{
      const response=await fetch('http://localhost:40807/api/Medicine');
      setUsers(await response.json());
    }
    const fetchMedicine = async () => {
      try {
          await axios.get(`http://localhost:40807/api/Medicine/${medicineName}`)
           .then(response=>setMedicines(response.data))
          //nav(`/products/${medicineName}/${id}`)
      } catch (error) {
          alert(error)
          console.log(error.message)

      }
   };
   
   
    useEffect(()=>{
      getUsers();
    },[]);
 
 const addToCart = (medicine) => {
  const cart={
    id:0,
    userId: id,
    medicineId : medicine.id ,
    unitPrice: medicine.unitPrice,
    quantity: medicine.quantity,
    totalPrice: medicine.unitPrice
  }
  axios.post("http://localhost:40807/api/Cart",cart)
  alert("Item Added Sucessfully")
  console.log(cart);
 };
 const handlelogout=()=>{
  sessionStorage.removeItem('isLoggedIn');
  nav('/login');
}
 
 return (
    <div>
      <h1>PRODUCTS PAGE</h1>
      <div>
        <input type="text" placeholder="Search Medicine by Name" required onChange={(e) => setMedicineName(e.target.value)}  />
        <Button variant="contained" color="primary" onClick={fetchMedicine}>
          Search
        </Button>&nbsp;&nbsp;
        <Button variant="contained" color="success" onClick={()=>nav(`/Cart/${id}`)}>VIEW CART</Button>&nbsp;&nbsp;
        <Button variant="contained" color="error" onClick={()=>handlelogout()}>LOGOUT</Button>&nbsp;&nbsp;
        {/* <LogOut/> */}

      </div>
      <div className="grid-container">
        {
          medicines.map((medicine) => (
            <div className="grid-item" key={medicine.id}>
              <h3>{medicine.name}</h3>
              <p>Price: {medicine.unitPrice}</p>
              <Button variant="contained" color="primary" onClick={() => addToCart(medicine)}>
                Add to Cart
              </Button >&nbsp;&nbsp;
              <Button variant="contained" color="success" onClick={() => nav(`/products/${medicine.name}/${id}`)}>View Details</Button>
            </div>
          ))
        }
       
      </div>
    </div>
 );
};
 
export default ProductPage;