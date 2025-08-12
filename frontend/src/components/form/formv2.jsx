import { Button, Container, Form } from "react-bootstrap";

export default function Formulaire({ onSubmit }){

    const handleData = (event) => {
        event.preventDefault()
        const form = new FormData(event.target)

        const tabForm = Object.fromEntries(form)

        onSubmit(tabForm.data)
    }

    return (
        <Container>
            <Form onSubmit={handleData}>
                <Form.Group className="mb-3" controlId="formData">
                    <Form.Label>Votre donnée</Form.Label>
                    <Form.Control type="text" name="data" placeholder="Veuillez insérer votre information"/>
                </Form.Group>
                <Button variant="primary" type="submit">Envoyer</Button>
            </Form>
        </Container>
    )
}