import Button from "@restart/ui/esm/Button";
import React, {useEffect, useRef, useState} from "react";
import { Form } from "react-bootstrap";
import {useMutation , gql} from "@apollo/client";


const SIGNUP_MUTATION = gql`
  mutation Signup($name: String!, $email: String!, $password: String!, $bio: String!) {
    signup(name: $name, email: $email, password: $password, bio: $bio) {
      userErrors {
        message
      }
      user {
        name
        email
        id
      }
    }
  }
`


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const [mutationFunction , {loading , data ,error:MutationError}] = useMutation(SIGNUP_MUTATION)

  const handleClick = async() => {
    await mutationFunction({variables:{
        name,
        password,
        email,
        bio
      }})
  };


  console.log(data)

  useEffect(()=> {
    if(data){
      const {signup:{userErrors}} = data
      userErrors.length > 0 && setError(userErrors.join(''))
    }
  },[data])


  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signup</Button>
      </Form>
    </div>
  );
}
