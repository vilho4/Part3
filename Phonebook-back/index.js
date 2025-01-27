const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.use(express.static('dist'))

morgan.token('body', (request) => JSON.stringify(request.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))




let persons = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    },
    {
        "id": "5",
        "name": "Teppo Testaaja",
        "number": "123-123-123"
    }
  ]  

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!!!</h1>')
  })

  app.get('/info', (request, response) => {
    response.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <p>${Date(Date.now()).toString()}</p>`
    )
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person =  persons.find(person=>person.id===id)
    if (person){
        response.json(person)
    }else{
        response.status(404).end()
    }
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id != id)
    
    response.status(204).end()
})

const generateRandomId = () => {
  const randomInt = Math.floor(Math.random() * (1000 - 1 + 1)) + 1
  return String(randomInt)
  // const maxId = persons.length > 0
  //   ? Math.max(...persons.map(n => Number(n.id)))
  //   : 0
  // return String(maxId + 1)
}

const nameExists = (body) => {
  return persons.some(person => person.name === body.name)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: !body.name ? 'body name is missing' : 'body number is missing'
    })
  }

  if (nameExists(body)){
    return response.status(400).json({
      error:`${body.name} already exists in persons`
    })
  }
  
  const person = {
    id:generateRandomId(),
    name:body.name,
    number:body.number
  }

  persons.concat(person)
  // console.log(request.headers)
  console.log(person, 'added succesfully')
  response.json(person)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })