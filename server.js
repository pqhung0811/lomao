const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})