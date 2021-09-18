const {Schema,model} = require('mongoose')
const invalidg = new Schema({
    name: {
        type: String,
        required: true
    },
})
module.exports = model('Invalidg', invalidg)