import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function Formulaire({ onSubmit }){

    const handleData = (formData) => {
        onSubmit(formData.data)
    }

    const { register, handleSubmit, formState: {errors} } = useForm()
    return (
        <Container>
            {/* <Form onSubmit={handleData}>
                <Form.Group className="mb-3" controlId="formData">
                    <Form.Label>Votre donnée</Form.Label>
                    <Form.Control type="text" name="data" placeholder="Veuillez insérer votre information"/>
                </Form.Group>
                <Button variant="primary" type="submit">Envoyer</Button>
            </Form> */}

            <Form onSubmit={handleSubmit(handleData)}>
                <Form.Group className="mb-3" controlId="data">
                    <Form.Label>Insérez votre donnée</Form.Label>
                    <Form.Control type="text" placeholder="Veuillez insérer votre information" {...register('data', {
                        required: "Donnée requise"
                    })} />
                    { errors.data && <span className="text-danger">{ errors.data.message }</span> }
                </Form.Group>
                <Button type="submit">Envoyer</Button>
            </Form>
        </Container>
    )

    // React Data Table
    // React Hook Form
    // Generate Express App
    // Prisma
    // Zustand
}