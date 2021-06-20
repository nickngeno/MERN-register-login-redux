import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import {  useDispatch } from "react-redux";
import { isLoggedin } from "../redux/actions/Loggedin";

const Login = () => {
  const history = useHistory();
  const initialFormsState = {
    email: "",
    password: "",
  };
  const [input, setInput] = useState(initialFormsState);
  const [error, setError] = useState(false);
  // const loginState = useSelector((state) => state.isLogged);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios("http://localhost:5000/users/login", {
      method: "POST",
      data: input,
    }).then((response) => {
      if (response.data.status !== 0) {
        setInput(initialFormsState);
        history.push("/profile");
        dispatch(isLoggedin(response.data));
        setError(false)
      } else {
        setError(true);
      }
    });
  };

  return (
    <div className="page-wrapper">
      <div className="login-wrapper">
        {error && (
          <Alert variant="danger">
            <p>Username and password does not match!</p>
          </Alert>
        )}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              value={input.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={input.password}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
      <p>
        New to our platform ? <Link to="/">Register</Link>
      </p>
    </div>
  );
};

export default Login;
