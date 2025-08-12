import { useState } from "react";
import { Form as BootstrapForm, Button, Container } from "react-bootstrap";
import './form.css';

export function Form({ onData }) {
  const handleForm = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const value = Object.fromEntries(form);

    const sendData = async ()=>{
      try{
        await fetch('http://localhost:4000/api/data/', {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({value: value.value}),
        })

      }catch(error){
        console.log('Erreur', error)
      }
    }
    sendData()
  };

  return (
    <Container className="my-4">
      <BootstrapForm onSubmit={handleForm}>
        <BootstrapForm.Group className="mb-3" controlId="value">
          <BootstrapForm.Label>Valeur de la donnée</BootstrapForm.Label>
          <BootstrapForm.Control type="text" name="value" placeholder="Entrez une donnée" />
        </BootstrapForm.Group>

        <Button variant="primary" type="submit">
          Soumettre
        </Button>
      </BootstrapForm>
      
    </Container>
  );
}
