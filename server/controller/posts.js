import express from 'express'
import db from '../database/connect.js'
import upload from '../middleware/multer.js'

const Router = express.Router()



Router.get('/', async (req, res) => {
	try {
		const posts = await db.Posts.findAll();
		res.json(posts);
	} catch (error) {
		console.log(error);
		res.status(500).send('Įvyko klaida');
	}
});

Router.get('/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id, {
            include: {
                model: db.Comments,
                include: db.Users
            }
        })
        res.json(post)
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

Router.post('/new', upload.single('photo'), async (req, res) => {
    try {
        if(req.file)
            req.body.photo = '/uploads/' + req.file.filename

        await db.Posts.create(req.body)
        res.send('Darbuotojas sėkmingai išsaugotas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id', upload.single('photo'), async (req, res) => {
    try {
        if(req.file)
            req.body.photo = '/uploads/' + req.file.filename

        const post = await db.Posts.findByPk(req.params.id)
        await post.update(req.body)
        res.send('Darbuotojas sėkmingai atnaujintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        await post.destroy()
        res.send('Darbuotojas sėkmingai ištrintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router