const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const router = require('./routes')

app.use(express.json())
app.use('/api/v1', router)


app.get('/', (req, res) => {
    return ers.status(200).json({
        status: "success",
        message: "success running a server"
    })
})

app.listen(port, () => {
    console.log(`Server listening on port`, port)
})