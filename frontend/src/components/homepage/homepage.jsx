import { useEffect, useState } from "react";
import Formulaire from "../form/formv2";
import { TableData } from "../table/tableData";
import { Container, Row, Col } from "react-bootstrap";

export function Homepage(){

    const [datas, setDatas] = useState([])
    
    useEffect(()=>{

        const getAllData = async () => {
            try{

                const response = await fetch('http://localhost:4000/api/data')
                const json = await response.json()
                setDatas(json.datas)
            }catch(error){
                console.log(error)
            }
        }

        getAllData()
    }, [])

    const addData = (dataValue) => {
        const insertData = async () => {
            try{
                const response = await fetch('http://localhost:4000/api/data', {
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
    
    const updateDatas = (updatingOne) => {
        const newDatasArray = datas.filter(data => data._id != updatingOne._id)
        setDatas([updatingOne, ...newDatasArray])
    }

    const deleteDatas = (deleteOne) => {
        const newDatas = datas.filter(data => data._id != deleteOne._id)
        setDatas(newDatas)
    }

    
    return (
        <div>
            <h1>CRUD EN REACT</h1>
            <Container className="row">
                <Row>
                    <Col>
                        <Formulaire onSubmit={addData}/>
                    </Col>
                    <Col>
                        <TableData allData={datas} updateDatas={(lastUpdateData) => updateDatas(lastUpdateData)} deleteDatas={(lastDelete) => deleteDatas(lastDelete)} />
                    </Col>                
                </Row>
            </Container>
        </div>
    )
}