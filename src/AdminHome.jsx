import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import './AdminHome.css';
import LogOut from './logout';
 
function AdminHome() {
 
const [id, setId] = useState("");
const [name, setName] = useState("");
const [descriptions, setDescription] = useState("");
const [manufacturer, setManufacturer] = useState("");
const [unitPrice, setPrice] = useState("");
const [quantity, setQuantity] = useState("");
const [expDate, setDate] = useState("");
const [medicines,setMedicines]=useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);
 
   async function Load() {    
    const result = await axios.get("http://localhost:40807/api/Medicine");
    setMedicines(result.data);
    console.log(result.data);
  }
   
  async function save(event) {  
    event.preventDefault();
    try {
      await axios.post("http://localhost:40807/api/Medicine", {        
        name:name,
        descriptions:descriptions,
        manufacturer:manufacturer,
        unitPrice:unitPrice,
        quantity:quantity,
        expDate:expDate
      });
      alert("Medicine Added Successfully");
          setId("");
          setName("");
          setDescription("");
          setManufacturer("");
          setPrice("");
          setQuantity("");
          setDate("");
          Load();
    } catch (err) {
      alert(err);
    }
  }
 
  async function editService(medicines) {
    setId(medicines.id);
    setName(medicines.name);
    setDescription(medicines.descriptions);
    setManufacturer(medicines.manufacturer);
    setPrice(medicines.unitPrice);
    setQuantity(medicines.quantity);
    setDate(medicines.expDate)
  }
 
 
  async function DeleteService(id) {
  await axios.delete("http://localhost:40807/api/Medicine/"+id );
   alert("Service deleted Successfully");
   setId("");
   setName("");
   setDescription('');
    setManufacturer('');
    setPrice('');
    setQuantity('');
    setDate('')
   Load();
  }
 
 
  async function update(event) {
    event.preventDefault();
    try {
     await   axios.put("http://localhost:40807/api/Medicine/"+id, {
            id: id,
            name: name,
            descriptions:descriptions,
            manufacturer:manufacturer,
            unitPrice:unitPrice,
            quantity:quantity,
            expDate:expDate
        }
      );
      alert("Medicine Updated Successfully");
      setId("");
      setName("");
      setDescription('');
      setManufacturer('');
      setPrice('');
      setQuantity('');
      setDate('')  
      Load();
    } catch (err) {
      alert(err);
    }
  }
 
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <LogOut/>
        <h1>Medicine Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
           
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
 
            <label>Medicine Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              value={name}
              required
              onChange={(event) => {
                setName(event.target.value);
              }}
            />

            <label>Description</label>
            <input
              type="text"
              class="form-control"
              id="descriptions"
              value={descriptions}
              required
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />

            <label>Manufacturer</label>
            <input
              type="text"
              class="form-control"
              id="manufacture"
              value={manufacturer}
              required
              onChange={(event) => {
                setManufacturer(event.target.value);
              }}
            />

            <label>Unit Price</label>
            <input
              type="text"
              class="form-control"
              id="unitPrice"
              value={unitPrice}
              required
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />

            <label>Quantity</label>
            <input
              type="text"
              class="form-control"
              id="quantity"
              value={quantity}
              required
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            />
            <label>Expiry Date</label>
            <input
              type="text"
              class="form-control"
              id="expdate"
              value={expDate}
              required
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />

          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Add
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
 
       <table class="table table-light" align="center">
        <thead>
          <tr>
            <th scope="col">Medicine Id</th>
            <th scope="col">Medicine Name</th>
            <th scope="col">Description</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Expiry date</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {medicines.map(function fn(ser) {
          return (
            <tbody>
              <tr>
                <th scope="row">{ser.id} </th>
                <td>{ser.name}</td>
                <td>{ser.descriptions}</td>
                <td>{ser.manufacturer}</td>
                <td>{ser.unitPrice}</td>
                <td>{ser.quantity}</td>
                <td>{ser.expDate}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editService(ser)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteService(ser.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      
      </div>
      
    );
  }
 
 
  export default AdminHome;
