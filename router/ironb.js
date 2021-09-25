const {Router} = require('express')
const router = Router()
const Irong = require('../modeles/irong')
const Ironb = require('../modeles/ironb')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    const irons = await Ironb.find().populate('genreId').lean()
    res.render('iron/ironview', {
        title: 'Temir daftar ro`yhati',
        irons
    })
})

router.get('/ironnew', auth, async (req, res) => {
    const irons = await Ironb.find().lean()
    res.render('iron/ironnew', {
        title: 'Temir daftarga kiritish',
        irons
    })
})

//////////////////////////////////////
router.post('/del', auth, async (req, res) => {
    const _id = req.body._id
    await Ironb.findByIdAndDelete({_id})
    res.redirect('/ironb/')
})
////////////////////
router.post('/', auth, async (req, res) => {
    try{
    let {
        namem,
        iron,
        adress,
        name,
        work,
        year,
        count,
        genreId,
        counts,
        child,
        marrid,
        typem,
        tel,
        typef,
        typema,
        yearmar,
        father,
        mat,
        yearfat,
        mather,
        yearmat,
        text,
        group,
    } = req.body

    let img = req.file.path
    name = name.toLowerCase()

    const ironb = await new Ironb({
                namem,
                iron,
                img,
                adress,
                name,
                work,
                year,
                count,
                tel,
                genreId,
                counts,
                child,
                marrid,
                yearmar,
                mat,
                text,
                typem,
                typef,
                typema,
                father,
                yearfat,
                mather,
                yearmat,
                text,
                group,
    })
    await ironb.save()
    res.redirect('/ironb/')
}catch(error){
    console.log(error);
}
})

router.post('/save', auth, async (req, res) => {
    const {
        namem,
        iron,
        group,
        adress,
        name,
        work,
        year,
        mat,
        tel,
        count,
        genreId,
        counts,
        child,
        marrid,
        text,
        typem,
        typef,
        typema,
        yearmar,
        father,
        yearfat,
        mather,
        yearmat,
        _id
    } = req.body
    const img = req.file.path
    const ironb = {
        namem,
        iron,
        group,
        img,
        adress,
        name,
        year,
        count,
        genreId,
        tel,
        counts,
        child,
        marrid,
        text,
        typem,
        typef,
        typema,
        yearmar,
        father,
        yearfat,
        mather,
        yearmat,
    }
    await Ironb.findByIdAndUpdate({_id},ironb)
    res.redirect('/ironb/'+_id)
})

router.get('/edit/:id', auth, async (req, res) => {
    const _id = req.params.id
    // const irones = await Irong.find().lean()
    const ironb = await Ironb.findOne({_id}).lean()
    res.render('iron/ironedit', {
        title: `${ironb.name}ni ma'lumot o'zgartirish`,
        ironb,

    })
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id
    const ironb = await Ironb.findOne({
        _id
    }).populate('genreId').lean()
    ironb.name = ironb.name.toUpperCase()
    res.render('iron/ironindex', {
        title: `${ironb.name}`,
        ironb
    })
})

module.exports = router