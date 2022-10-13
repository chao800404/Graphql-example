import React, { useState, useEffect } from "react";
import {useMutation , gql} from "@apollo/client";
import { Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";

const SIGNIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      userErrors {
        message
      }
      user {
        name
        email
      }
    }
  }
`

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mutationFunction , {loading , error:mutationError , data }] = useMutation(SIGNIN_MUTATION)
  const [error, setError] = useState(null);


  const handleClick = async() => {
    await mutationFunction({variables:{
        email,
        password
      }}).then(()=> {
        setPassword("")
        setEmail("")
    })
  };


  useEffect(()=> {
    if(data){
      const {signin:{userErrors}} = data
      console.log(userErrors)
      userErrors.length > 0 && setError(userErrors.map(({message})=> message).join(''))
    }
  },[data])




  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              error !== null  && setError(null)
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              error !== null  && setError(null)
            }}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signin</Button>
      </Form>
    </div>
  );
}
