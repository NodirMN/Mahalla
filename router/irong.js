const {Router} = require('express')
const router = Router()
const Irong = require('../modeles/irong')

router.get('/del/:id', async (req, res) => {
    await Irong.findByIdAndDelete(req.params.id)
    res.redirect('/irong')
})

router.post('/', async (req, res) => {
    const {name} = req.body
    const haveGenre = await Irong.findOne({
        name
    })
    if (haveGenre) {
        req.flash('error', 'Bunday guruh bor!')
        res.redirect('/irong')
    } else {
        const irong = await new Irong({
            name
        })
        await irong.save()
        req.flash('success', 'Yangi guruh')
        res.redirect('/irong')
    }
})


module.exports = router