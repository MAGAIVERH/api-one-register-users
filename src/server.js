import express from "express"
import { PrismaClient } from "@prisma/client"
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 5000



// Create a new User
app.post('/', async (req, res) => {
   
   await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})


// Read all Users
app.get('/', async (req, res) => {


      const users = await prisma.user.findMany({
            where: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        })
    res.status(200).json(users)
})



// Update an User
app.put('/:id', async (req, res) => {
   
   const userUpadte = await prisma.user.update({
      
        where: {
            id: req.params.id
         },

         data: {
             name: req.body.name,
             email: req.body.email,
             age: req.body.age
         }
       
     })
 
     res.status(201).json(userUpadte)
 })


//  Delete an User
app.delete('/:id', async (req, res) => {
    const userId = req.params.id;

    // Verifica se o usuário existe antes de deletar
    const userExists = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!userExists) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const userDelete = await prisma.user.delete({
        where: { id: userId },
    });

    res.status(200).json({ message: "Usuário deletado com sucesso!", userDelete });
});




app.listen(PORT, () => {
    console.log(`O servidor esta rodando na porta ${PORT} `)
})