const DataModel = require('../Models/Data')
const mongoose = require('mongoose')
// Controller pour la gestion des données


// Récupération de toutes les données de la base de données
const getAllDatas = async (req, res) =>{
    try{
        const datas = await DataModel.find({})
        res.status(200).json({datas})
    }catch(error){
        res.status(404).json({
            "code": "No datas found"
        })
    }
}

const getSpecialData = async (req, res) => {
    const { id } = req.params
    try{
        const data = await DataModel.findById({_id: id})
        res.status(200).json(data)
    }catch(error){
        console.log(error)
        res.status(404).json({
            "code": "NO DATA FOUND"
        })
    }

}

const createData = async (req, res)=>{
    try{
        console.log(req.body)
        const {value} = req.body
        
        const result = await DataModel.create({value})
        console.log(result)
        res.status(200).json(result)
    }catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const updateData = async (req, res) =>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("Ici")
        return res.status(404).json({
            "code": "NO_REFERENCE_ID"
        })
    }

    const data = await DataModel.findByIdAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    if(!data){
        console.log("Ici plutot")
        return res.status(400).json({
            "code": "NO_REFERENCE_ID",
            "message": "The id doesn't exist"
        })
    }
    res.status(200).send(data)
}

const deleteData = async (req, res) =>{
    const { id } = req.params
    try{

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                "code": "NO_REFERENCE_ID",
                "message": "The id doesn't exist"
            })
        }
    
        const data = await DataModel.findByIdAndDelete({_id: id})
        if(!data){
            return res.status(400).json({
                "code": "NO_REFERENCE_ID",
                "message": "The id doesn't exist"
            })
        }
        res.status(200).json(data)
    }catch(error){
        console.log(error)
        res.json(error)
    }
    
}

module.exports = { getAllDatas, createData, deleteData, updateData, getSpecialData }