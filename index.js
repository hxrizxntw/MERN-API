// * Setup Express
const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send('Hello World')
  })

// * Setup Express
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})