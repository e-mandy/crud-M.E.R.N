import { useEffect, useState } from "react";
import Formulaire from "../form/formv2";
import { Container, Row, Col, Button } from "react-bootstrap";
import DataTable from "react-data-table-component"
import { ModalCard } from "../modal/modal";

const columns = [
    {
        name: "Numéro",
        selector: row => row.id
    },

    {
        name: "Valeur",
        selector: row => row.value
    },

    {
        name: "Actions",
        selector: row => row.actions,
    }
]




export function Homepage(){

    const [datas, setDatas] = useState([])
    const [show, setShow] = useState(false)
    const [showSupp, setShowSupp] = useState(false)
    const [selectedId, setSelectedId] = useState()

    useEffect(()=>{

        const getAllData = async () => {
            try{

                const response = await fetch(`http://${import.meta.env.VITE_DESKTOP_IP}:3000/datas`)
                const json = await response.json()
                
                setDatas(json)
            }catch(error){
                console.log(error)
            }
        }

        getAllData()
    }, [])
    
    const insertActions = (tableData) => {
        if(Array.isArray(tableData)){
            tableData.map(eachData => {
                eachData.actions = (
                    <div className="d-flex gap-2">
                        <Row>
                            <Col>
                                <Button size="sm" variant="primary" onClick={()=> {handleModal(eachData.id, 'update')}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </Button>
                            </Col>
                            <Col>
                                <Button size="sm" variant="danger" onClick={() => {handleModal(eachData.id, "delete")}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                )
            })
        }

        return tableData
    }
    
    const handleModal = (id, modal) =>{
        setSelectedId(id)
        if(modal == "update"){
            setShow(!show)
        }else if(modal == "delete"){
            setShowSupp(!showSupp)
        }
    }
    

    const addData = (dataValue) => {
        const insertData = async () => {
            try{
                const response = await fetch(`http://${import.meta.env.VITE_DESKTOP_IP}:3000/datas`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        value: dataValue
                    })
                })
                const json = await response.json()
                
                setDatas([json, ...datas])
            }catch(error){
                console.log(error)
            }
        }
        insertData()
    }

    const updateData = (id, value) => {

        const editData = async () => {
            const response = await fetch(`http://${import.meta.env.VITE_DESKTOP_IP}:3000/datas/${id}`, {
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
            const response = await fetch(`http://${import.meta.env.VITE_DESKTOP_IP}:3000/datas/${id}`, {
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
    
    const updateDatas = (updatingOne) => {
        const newDatasArray = datas.filter(data => data.id != updatingOne.id)
        setDatas([updatingOne, ...newDatasArray])
    }

    const deleteDatas = (deleteOne) => {
        const newDatas = datas.filter(data => data.id != deleteOne.id)
        setDatas(newDatas)
    }

    
    return (
        <div className="d-flex flex-column h-screen container-fluid">
            <Container>
                <Col><h1 style={{}}>CRUD EN REACT</h1></Col>
            </Container>
            <Row className="flex-grow-1">
                <Col className="align-content-center mb-5" data-testid="formulaire"><Formulaire onSubmit={addData}/></Col>
                <Col><DataTable columns={columns} data={insertActions(datas)} /></Col>
            </Row>
                {show && <ModalCard show={show} hide={() => handleModal(0, "update")} id={selectedId} update={(value) => updateData(selectedId, value)} modal="update" />}
                {showSupp && <ModalCard show={showSupp} hide={() => handleModal(0, "delete")} id={selectedId} modal="delete" del={() => deleteData(selectedId)} />}
        </div>
    )
}