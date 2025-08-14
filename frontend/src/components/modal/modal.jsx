import { useEffect, useState } from 'react'
import { Modal, Form, Button, Col, Container, Row } from 'react-bootstrap'
import { set, useForm } from 'react-hook-form'
export function ModalCard({show, hide, id, update, modal, del}){

  const [updatingData, setUpdatingData] = useState("")
  
  const { register, handleSubmit, formState: {errors}, reset } = useForm({
    defaultValues: {
      data: updatingData
    }
  })

  useEffect(() => {
    const getFindData = async () => {
      const response = await fetch(`http://localhost:4000/api/data/${id}`)
      const json = await response.json()
      
      reset({
        data: json.value
      })
      
    }
    getFindData()
  }, [])
  
  
  const onSubmit = (updateData) => {
    let { data } = updateData
    setUpdatingData(data)
    update(data)
  }
  

  const handleDeletingData = (event) => {
    event.preventDefault()
    del()
  }
  
  if(modal == "update"){

    return (
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Modification de la donnée</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="modifData">
              <Form.Label>Entrez la nouvelle donnée</Form.Label>
              <Form.Control type="text" {...register('data', {
                required: "Donnée requise"
              })} 
              placeholder="Insérez la donnée à modifier" />
              {errors.data && <span className="text-danger">{ errors.data.message }</span>}
            </Form.Group>
            <Button type="submit">Modifier</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }else if(modal == "delete"){
    return (
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression d'une donnée</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
              <Row className="mb-4">Etes-vous sûr de vouloir supprimer cette donnée ?</Row>
              <Row>
                <Col>
                  <Button variant="dark" onClick={hide}>Annuler</Button>
                </Col>
                <Col>
                  <Button variant="danger" onClick={del}>Supprimer</Button>
                </Col>
              </Row>
            </Container>
        </Modal.Body>
      </Modal>
    )
  }

}

