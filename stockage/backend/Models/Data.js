const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    value: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Data', dataSchema);