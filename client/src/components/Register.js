import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const initialFormsState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [successMessage, setSuccessMessage] = useState(false);
  const [input, setInput] = useState(initialFormsState);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios("http://localhost:5000/users/register", {
      method: "POST",
      data: input,
    }).then((response) => {
      if (response.status === 200) {
        setInput(initialFormsState);
        setSuccessMessage(true);
      }
    });
  };
  return (
    <div className="page-wrapper">
      <div className="login-wrapper">
        {successMessage && (
          <Alert variant="success">
            <p>You successfully registerd.You can go ahead and login</p>
          </Alert>
        )}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formGroupfname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter firstname"
              name="firstName"
              onChange={handleChange}
              value={input.firstName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGrouplname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter lastname"
              name="lastName"
              onChange={handleChange}
              value={input.lastName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              value={input.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={input.password}
            />
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Link to="/login">Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
