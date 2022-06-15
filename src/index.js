const app = require('fastify')({
    logger: true
})
const notes = require('./notes.json')


app.get('/notes', function (req, reply) {
    return notes 
})


app.get('/notes/:id',(req,reply) =>{
    const id = parseInt(req.params.id)
    const note = notes.find((note) => note.id === id)
    return note
})

app.get('/users',(req,reply) =>{
    const users = notes.map((note) => note.first_name)
    return users
})

app.get('/users/:first_name',(req,reply) =>{
    const first_name = req.params.first_name
    const note = notes.find((note) => note.first_name === first_name)
    return note
})
 
 

app.listen(3000, (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
})
