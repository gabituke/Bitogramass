import express from 'express'
import db from '../database/connect.js'


const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
        const profiles = await db.Profiles.findAll()
        res.json(profiles)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.get('/single/:id', async (req, res) => {
    try {
        const profile = await db.Profiles.findByPk(req.params.id)
        res.json(profile)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.post('/new', async (req, res) => {
    try {
        await db.Profiles.create(req.body)
        res.send('Profilis sėkmingai sukurtas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id', async (req, res) => {
    try {
        const profile = await db.Profiles.findByPk(req.params.id)
        await profile.update(req.body)
        res.send('Profilis sėkmingai atnaujintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
        const profile = await db.Profiles.findByPk(req.params.id)
        await profile.destroy()
        res.send('Profilis sėkmingai ištrintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router