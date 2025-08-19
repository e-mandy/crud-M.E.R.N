const express = require('express')

const router = express.Router()
const { getAllDatas, createData, deleteData, updateData, getSpecialData } = require('../controllers/dataController')

// Get all datas
router.get('/', getAllDatas)

// Get a special data
router.get('/:id', getSpecialData)

// Create a new data
router.post('/', createData)

// Delete a data
router.delete('/:id', deleteData)

// Update a data
router.patch('/:id', updateData)

module.exports = router