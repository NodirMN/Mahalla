const {Router} = require('express')
const router = Router()
const Invalidg = require('../modeles/invalidg')

router.get('/del/:id', async (req, res) => {
    await Invalidg.findByIdAndDelete(req.params.id)
    res.redirect('/invalidg')
})

router.post('/', async (req, res) => {
    const {name} = req.body
    const haveGenre = await Invalidg.findOne({
        name
    })
    if (haveGenre) {
        req.flash('error', 'Bunday guruh bor!')
        res.redirect('/invalidg')
    } else {
        const invalidg = await new Invalidg({
            name
        })
        await invalidg.save()
        req.flash('success', 'Yangi guruh')
        res.redirect('/invalidg')
    }
})


module.exports = router