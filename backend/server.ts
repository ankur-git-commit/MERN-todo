import express, { Application } from 'express'
import dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT || 3000

const app: Application = express()

app.get('/', (_req, res) => {
    res.send({message: "Hello World!"})
})

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
})