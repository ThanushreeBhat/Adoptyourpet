const express = require('express')
const app = express()
app.use(express.json());


// Sample pet data
const pets = [
  { id: 1, name: "Bella",age:2, type: "Dog",breed: "Golden Retriever",
    fun_fact: "Golden Retrievers love swimming!", image: "bella.jpg" },
  { id: 2, name: "Milo", type: "Cat",breed:"Siamese",fun_fact:"", image: "milo.jpg" },
  {id:3, name:"Max",type:"Dog",breed:"Pomerian",fun_fact:"Siamese cats are known for their vocal personality!",image:"max.jpg"},
  {id:4, name:"Bruno", type:"Dog",breed:"Labrador",fun_fact:"Labradors are smart!",image:"bruno.jpg"},
  {id:5, name:"Luna",type:"Cat",breed:"Persian",fun_fact:"Persian cats are calm, affectionate, and love a quiet environment.",image:"luna.jpg"},
  {id:6, name:"Buddy",type:"Dog",breed:"German Shepherd",fun_fact:"German Shepherds are fun-loving!",image:"buddy.jpg"}
];

// GET /pets endpoint
app.get('/pets', (request, response) => {
  response.status(200).json(pets);
})
app.get('/pets/details', (request, response) => {
  const petId = parseInt(request.query.petId); 
  const pet = pets.find((pet) => pet.id === petId);

  if (!pet)  response.json({
        status:404,
        messge:"Pet Not Found",
    })

  response.status(200).json(pet);
});
let adoptionIdCounter = 7000; // Starting ID

// POST /adopt endpoint
app.post('/adopt', (request, response) => {
  const { pet_id, applicant_name, email, reason } = request.body;

  // Basic validation
  if (!pet_id || !applicant_name || !email || !reason) {
    return response.status(400).json({ message: "All fields are required." });
  }

  // Check if pet exists
  const petExists = pets.some(pet => pet.id === pet_id);
  if (!petExists) {
    return response.status(404).json({ message: "Pet not found." });
  }

  // Simulate adoption ID
  adoptionIdCounter++;

  response.status(201).json({
    adoption_id: adoptionIdCounter,
    status: "pending_review",
    message: "Your adoption request has been received!"
  });
});



// Start server
app.listen(2017, () => {
  console.log(`Pet adoption API server running on http://localhost:2017`);
});
