const {Schema,model} = require('mongoose')
const irong = new Schema({
    name: {
        type: String,
        required: true
    },
})
module.exports = model('Irong', irong)