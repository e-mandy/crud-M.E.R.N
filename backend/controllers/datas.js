const { PrismaClient, Prisma } = require('../generated/prisma')


const prisma = new PrismaClient

const getAllDatas = async(req, res)=>{
    try{
        const datas = await prisma.data.findMany()
        res.status(200).json(datas)
    }catch(error){
        res.json({
            code: "NO_COLLECTION_FOUND",
            message: error
        })
    }
}

const getSpecialData = async(req, res) =>{
    const {id} = req.params
    try{
        const specialData = await prisma.data.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json(specialData)
    }catch(error){
        res.json({
            code: "NO_DATA_FOUND",
            message: error
        })
    }
}

const createData = async (req, res) => {
    const {value} = req.body
    try{
        const createdData = await prisma.data.create({
            data: {value: value}
        })
        res.status(200).json(createdData)
    }catch(error){
        res.status(400).json({
            code: "BAD_REQUEST",
            message: error
        })
    }
}

const updateData = async(req, res) => {
    const {id} = req.params
    const {value} = req.body
    try{
        const updatedData = await prisma.data.update({
            where: {
                id: id
            },
            data: {
                value: value
            }
        })
        res.status(200).json(updatedData)
    }catch(error){
        res.status(400).json({
            code: "DATA_NOT_FOUND",
            message: error
        })
    }
}

const deleteData = async(req, res) => {
    try{
        const {id} = req.params
        const deletedData = await prisma.data.delete({
            where: {
                id: id
            }
        })
        res.status(200).json(deletedData)
    }catch(error){
        res.status(400).json({
            code: "DATA_NOT_FOUND",
            message: error
        })
    }
}

module.exports = { getAllDatas, getSpecialData, createData, updateData, deleteData }