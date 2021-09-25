const {Schema,model} = require('mongoose')

const invalidb = new Schema({
    img: String,
    adress: String,
    year: String,
    name: {
        type: String,
        required: true
    },
    count: {
        type: String,
        required: true
    },
    page: String,
    genreId: {
        type: Schema.Types.ObjectId,
        ref: 'Invalidg'
    },
    namem: String,
    work: String,
    counts: String,
    child: String,
    group: String,
    marrid: String,
    type: String,
    yearmar: String,
    father: String,
    tel: Number,
    typema: String,
    mat: String,
    typef: String,
    yearfat: String,
    mather: String,
    typem: String,
    yearmat: String,
    yearmar: String,
    text: String,


})

module.exports = model('Invalidb', invalidb)