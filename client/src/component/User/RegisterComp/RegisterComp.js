import { useState, useEffect } from 'react';
import React from 'react';
import "./registercomp.css";



export default function RegisterComp() {
  const initialValues = { username: "", email: "", password:"",confirmpassword: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    }
  

const handleSubmit = (e) => {
  e.preventDefault();
 setFormErrors(Validate(formValues));
 setIsSubmit(true);
};
useEffect(() => {
  console.log(formErrors);
  if(Object.keys(formErrors).length === 0 && isSubmit){
    console.log(formValues);
  }
  },[formErrors])
const Validate = (values) =>{
  const errors = {}
  const regex = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;
  if (!values.username){
    errors.username = "username is required!";
  }
  if (!values.email){
    errors.email = "email is required!";
  }
  if (!values.password){
    errors.password = "password is required";
  }
  return errors;

  if (!values.confirmpassword){
    errors.confirmpassword = "password doesn't match"
  }
  }


  return (
    <div className='container mt-4'>
      {Object.keys(formErrors).length === 0 && isSubmit ? 
      ( <div className='ui message success'>Signed Sucessfully</div>) :
        <pre>{JSON.stringify()}</pre>
    }
    <form className='register-form rounded-4 p-5 text-left bg-light' onSubmit={handleSubmit}>
      <h2 className='text-center py-2'>Register</h2><label className=' mb-2'>
      
        Username
      <br></br><input className='inputfield rounded-2' type="username" name="username" value={formValues.userName} onChange={handleChange} />
      <p>{formErrors.username}</p></label>
      <label className='mb-2'>
        Email
        <br></br><input className='inputfield  rounded-2' type="email" name="email" value={formValues.email} onChange={handleChange} />
        <p>{formErrors.email}</p></label>
      <label className=''>
        Password
        <br></br><input className='inputfield  rounded-2'  type="password" name="password" value={formValues.password} onChange={handleChange} />
        <p>{formErrors.password}</p></label>
      <label className='mb-2'><p>{formValues.comfirmpassword}</p>
        Confirm Password
      <br></br><input className='inputfield  rounded-2' type="confirmpassword" name="confirmpassword" value={formValues.confirmpassword} onChange={handleChange} />
      <p>{formErrors.comfirmpassword}</p></label>
      <div className='d-grid py-3'>
      <button className=" btn bg-success" type="submit">Submit</button>
      <p>{formErrors.submit}</p>
      </div>
    </form>
    </div>
  );
}