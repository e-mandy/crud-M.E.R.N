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
    
    const insertActions = (tableData) => {
        tableData.map(eachData => {
            eachData.actions = (
                <div className="d-flex gap-2">
                    <Row>
                        <Col xs={12}>
                            <Button variant="primary" onClick={()=> {handleModal(eachData._id, 'update')}}>Modifier</Button>
                        </Col>
                        <Col xs={12}>
                            <Button variant="danger" onClick={() => {handleModal(eachData._id, "delete")}}>Supprimer</Button>
                        </Col>
                    </Row>
                </div>
            )
        })

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
    
    useEffect(()=>{

        const getAllData = async () => {
            try{

                const response = await fetch(`http://${import.meta.env.VITE_DESKTOP_IP}:3000/datas`)
                const json = await response.json()
                console.log(json)
                setDatas(json)
            }catch(error){
                console.log(error)
            }
        }

        getAllData()
    }, [])

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
                console.log(json)
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
        const newDatasArray = datas.filter(data => data._id != updatingOne._id)
        setDatas([updatingOne, ...newDatasArray])
    }

    const deleteDatas = (deleteOne) => {
        const newDatas = datas.filter(data => data._id != deleteOne._id)
        setDatas(newDatas)
    }

    
    return (
        <div className="h-screen container-fluid">
            <h1>CRUD EN REACT</h1>
            <Container className="row h-100">
                <Row className="d-flex">
                    <Col className="my-auto mt-6" >
                        <Formulaire onSubmit={addData}/>
                    </Col>
                    <Col>
                        <DataTable columns={columns} data={insertActions(datas)} />
                    </Col>
                </Row>
                {show && <ModalCard show={show} hide={() => handleModal(0, "update")} id={selectedId} update={(value) => updateData(selectedId, value)} modal="update" />}
                {showSupp && <ModalCard show={showSupp} hide={() => handleModal(0, "delete")} id={selectedId} modal="delete" del={() => deleteData(selectedId)} />}
            </Container>
        </div>
    )
}