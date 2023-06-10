const express = require("express")
const app = express()

// Fruits
const fruitsData = require("./fruits.json")
const fruits = fruitsData.fruits

// Vegetables
const vegetablesData = require("./vegetables.json")
const vegetables = vegetablesData.vegetables

const limit = 10

// Main endpoint
app.get("/api", function (req, res) {
  var messages = [
    {
      Hello: "This is the official FruVeg API",
    },
    {
      Description:
        "This is a test version of this api, please use it for testing purposes only. To use it for public, request full version from me. Get random fruits and vegetables instantly. Perfect for recipes, nutrition apps, and meal inspiration. Start exploring fresh produce now! ",
    },
    {
      Directories: [
        "/api/fruits",
        "/api/vegetables",
        "/api/randomfruits",
        "/api/randomvegs",
        "Use pagination in fruits and vegetables by using /api/fruits?page=1 or any number you want. The random endpoints gives 3 outcomes in a request",
      ],
    },
    {
        "Credits/Owner":
        "Ansh Kaushal"
    },
    {
      Socials: [
        "https://instagram.com/anshhkaushal",
        "https://snapchat.com/add/anshhkaushal",
        "https://www.youtube.com/channel/UCikZudSeNVFwt4U5wTFNezw",
      ],
    },
  ]
  res.json(messages)
})

// Fruits endpoint
app.get("/api/fruits", (req, res) => {
  const page = parseInt(req.query.page) || 1

  if (!req.query.page) {
    return res.redirect(`/api/fruits?page=1`)
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const results = fruits.slice(startIndex, endIndex)

  const nextPage = page + 1
  const hasNextPage = endIndex < fruits.length

  res.json({
    page,
    limit,
    total: fruits.length,
    results,
    nextPage: hasNextPage ? nextPage : null,
  })
})

// Vegetables endpoint
app.get("/api/vegetables", (req, res) => {
  const page = parseInt(req.query.page) || 1

  if (!req.query.page) {
    return res.redirect(`/api/vegetables?page=1`)
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const results = vegetables.slice(startIndex, endIndex)

  const nextPage = page + 1
  const hasNextPage = endIndex < vegetables.length

  res.json({
    page,
    limit,
    total: vegetables.length,
    results,
    nextPage: hasNextPage ? nextPage : null,
  })
})

// Random fruits endpoint (max 3)
app.get("/api/randomfruits", (req, res) => {
  const randomFruits = getRandomElements(fruits, 5)
  res.json({ fruits: randomFruits })
})

// Random vegetables endpoint (max 3)
app.get("/api/randomvegs", (req, res) => {
  const randomVegetables = getRandomElements(vegetables, 5)
  res.json({ vegetables: randomVegetables })
})

app.listen(3000, () => {
  console.log("open http://localhost:3000")
})

function getRandomElements(arr, numElements) {
  const shuffled = arr.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numElements)
}
