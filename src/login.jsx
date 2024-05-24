import React, {useState } from 'react';
import './App.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AdminHome from './AdminHome';
import { jwtDecode } from "jwt-decode"


export const Login = () => {
      const navigate=useNavigate();
      const [isLoggedIn, setLoggedIn] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [Log, setLogin]=useState([])

      axios.get('http://localhost:40807/api/User')
          .then(response=>setLogin(response.data));
const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('User logged in with email:', email, ' and password:', password);

    if(email === "Admin@gmail.com" && password === "Admin@123"){
      setLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true');
      navigate('/AdminHome');
      //userFound = true;
  }
   else{ 
    Log.forEach(element => {
      if(element.email==email&&element.password==password){
          setLoggedIn(true);
          sessionStorage.setItem('isLoggedIn', 'true');
          navigate(`/product/${element.id}`)
        } 
    });
  }
};
// ***********

   
return (
<div className="login">
<h2>Login</h2>
<form onSubmit={handleSubmit}>

{/*<input type="email" id="email" placeholder='Enter your email' name="email" required onChange={handleChange} />

<input type="password" id="password" placeholder='Enter the password' name="password" required onChange={handleChange} />*/}

<input type="email" id="email" placeholder='Enter your email' name="email" required onChange={(e) => setEmail(e.target.value) } />

<input type="password" id="password" placeholder='Enter the password' name="password" required onChange={(e) => setPassword(e.target.value)} />
<p></p>

        <button type="submit">Login</button>
</form>

</div>

);
};

const SignupSchema = Yup.object().shape({
 firstName: Yup.string()
    .required('First Name is required')
    .matches(/^[a-zA-Z ]*$/, 'Only letters are allowed'),
 lastName: Yup.string()
    .required('Last Name is required')
    .matches(/^[a-zA-Z ]*$/, 'Only letters are allowed'),
 email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
 password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(15,'password must be maximum 15 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Must contain at least one letter, one number, and one special character'),
 confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Must contain at least one letter, one number, and one special character'),
});

export const Signup = () => {
 const nav = useNavigate();
 const [getUser, setGetUser] = useState([]);
 axios.get("http://localhost:40807/api/User").then((res) => setGetUser(res.data));

 const handleSubmit = async (values) => {
    const CreatedOn = new Date();
    const type = 'user';

    const user = {
      id: 0,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      email: values.email,
      type: type,
      createdOn: CreatedOn,
    };

    if (user.password !== values.confirmPassword) {
      alert('Passwords do not match');
    } else if (getUser.some((iter) => iter.email === user.email)) {
      alert('Email is already exist');
    } else {
      console.log(user);
      await axios.post("http://localhost:40807/api/User", user);
      alert('User registered successfully');
    }
 };

 return (
    <div className="signup">
      <h2>Signup</h2>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder='Enter your First Name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {errors.firstName && touched.firstName && (
              <p>{errors.firstName}</p>
            )}

            <input
              type="text"
              name="lastName"
              placeholder='Enter your Last Name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            {errors.lastName && touched.lastName && (
              <p>{errors.lastName}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder='Enter your Email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && <p>{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder='Enter the Password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <p>{errors.password}</p>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder='Confirm password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p>{errors.confirmPassword}</p>
            )}

            <button type="submit">Signup</button>
          </form>
        )}
      </Formik>
    </div>
 );
};
const App = () => {
const [showLogin, setShowLogin] = useState(true);

return (
<div className="App">
<button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Signup' : 'Login'}</button>
      {showLogin ? <Login /> : <Signup />}

</div>

);
};



export {App};