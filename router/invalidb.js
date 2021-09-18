const {Router} = require('express')
const router = Router()
const Invalidg = require('../modeles/invalidg')
const Invalidb = require('../modeles/invalidb')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    const invalids = await Invalidb.find().populate('genreId').lean()
    res.render('inval/invalidview', {
        title: 'Nogironlar ro`yhati',
        invalids
    })
})

router.get('/invalidnew', auth, async (req, res) => {
    const invalids = await Invalidg.find().lean()
    res.render('inval/invalidnew', {
        title: 'Nogiron kiritish',
        invalids
    })
})

//////////////////////////////////////
router.post('/del', auth, async (req, res) => {
    const _id = req.body._id
    await Invalidb.findByIdAndDelete({_id})
    res.redirect('/invalidb/')
})
////////////////////
router.post('/', auth, async (req, res) => {
    let {
        namem, iron,img,adress,name,work,year,count,genreId,counts,child,marrid,typem,tel,typef,typema,yearmar,father,mat,yearfat,mather,yearmat,text,
        gurup,
    } = req.body
    name = name.toLowerCase()
    const invalidb = await new Invalidb({
                namem,iron,img,adress,name,work,year,count,tel,genreId,counts,child,marrid,yearmar,mat,text,typem,typef,typema,father,yearfat,mather,yearmat,text,gurup,
    })
    await invalidb.save()
    res.redirect('/invalidb/')
})

router.post('/save', auth, async (req, res) => {
    const {
        namem,iron,img,adress,name,work,year,mat,tel,count,genreId,counts,child,marrid,text,typem,typef,
typema,yearmar,father,yearfat,mather,yearmat,gurup, _id
    } = req.body

    const invalidb = {namem,iron,img,adress,name,year,count,genreId,tel,counts,child,marrid,text,typem,typef,typema,yearmar,father,yearfat,matherwork,yearmat,tegurup,
    }
    await Invalidb.findByIdAndUpdate({_id}, invalidb)
    res.redirect('/invalidb/'+_id)
})

router.get('/edit/:id', auth, async (req, res) => {
    const _id = req.params.id
    const invalides = await Invalidg.find().lean()
    const invalidb = await Invalidb.findOne({
        _id
    }).lean()
    res.render('inval/invalidedit', {
        title: `${invalidb.name}ni ma'lumot o'zgartirish`,
        invalidb,
        invalides
    })
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id
    const invalidb = await Invalidb.findOne({_id}).populate('genreId').lean()
    invalidb.name = invalidb.name.toUpperCase()
    res.render('inval/invalidw', {
        title: `${invalidb.name}`,
        invalidb
    })
})

module.exports = router