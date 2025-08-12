import { useEffect, useState } from 'react'
import { Modal, Form, Button, Col, Container, Row } from 'react-bootstrap'
export function ModalCard({show, hide, id, update, modal, del}){

  const [updatingData, setUpdatingData] = useState("")
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    const getFindData = async () => {
      const response = await fetch(`http://localhost:4000/api/data/${id}`)
      const json = await response.json()
      setUpdatingData(json.value)
      setUpdatingId(json._id)
    }
     getFindData()
  }, [])

  const handleUpdatingData = (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const newData = Object.fromEntries(form).data
    update(newData)
  }

  const handleDeletingData = (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const newData = Object.fromEntries(form).id
    del()
  }
  
  if(modal == "update"){

    return (
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Modification de la donnée</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdatingData}>
            <Form.Group controlId="modifData">
              <Form.Label>Entrez la nouvelle donnée</Form.Label>
              <Form.Control type="text" name="data" placeholder="Insérez la donnée à modifier" value={updatingData} onChange={(event) => setUpdatingData(event.target.value)}></Form.Control>
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
          <Form onSubmit={handleDeletingData}>
            <Form.Group controlId="modifData">
              <Form.Label>Etes-vous sûr de vouloir supprimer cette donnée ?</Form.Label>
              <Form.Control type="hidden" name="id" value={updatingId} ></Form.Control>
            </Form.Group>
            <Container>
              <Row>
                <Col>
                  <Button variant="dark" onClick={hide}>Annuler</Button>
                </Col>
                <Col>
                  <Button type="submit" variant="danger">Supprimer</Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

}

