import { useState } from 'react';
import { Button, Col, Container, Table, Row, Modal, Form, FormLabel } from 'react-bootstrap';
import { ModalCard } from '../modal/modal';

export function TableData({ allData, updateDatas, deleteDatas }) {

  const [show, setShow] = useState(false)
  const [selectedId, setSelectedId] = useState()
  const [showSupp, setShowSupp] = useState(false)

  const handleModal = (id, modal) =>{
    setSelectedId(id)
    if(modal == "update"){
      setShow(!show)
    }else if(modal == "delete"){
      setShowSupp(!showSupp)
    }
  }

  const updateData = (id, value) => {
    
    const editData = async () => {
      const response = await fetch(`http://localhost:4000/api/data/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          value: value
        })
      })
      const json = await response.json()
      updateDatas(json)
    }

    editData()
    setShow(false)
  }
  
  const deleteData =  (id) => {
    const suppData = async () => {
      const response = await fetch(`http://localhost:4000/api/data/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const json = await response.json()
      deleteDatas(json)
    }

    suppData()
    setShowSupp(false)
  }

  return (
    <Container className="my-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Valeur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allData.map(jsonData => (
            <tr key={jsonData._id}>
              <td>{jsonData._id}</td>
              <td>{jsonData.value}</td>
              <td>
                <Container>
                  <Row gap={2}>
                    <Col>
                      <Button variant="primary" size="sm" onClick={()=> handleModal(jsonData._id, "update")}>Modifier</Button>
                    </Col>
                    <Col>
                      <Button variant="danger" size="sm" onClick={()=>handleModal(jsonData._id, "delete")}>Supprimer</Button>
                    </Col>
                  </Row>
                </Container>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
          {show && <ModalCard show={show} hide={() => handleModal(selectedId, "update")} id={selectedId} update={(value) => updateData(selectedId, value)} modal="update" />}
          {showSupp && <ModalCard show={showSupp} hide={() => handleModal(selectedId, "delete")} id={selectedId} modal="delete" del={() => deleteData(selectedId)} />}
    </Container>
  );
}
