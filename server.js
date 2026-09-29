const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Clavier mécanique', description: 'Clavier AZERTY rétroéclairé', price: 89.99, category: 'Informatique' },
  { id: 2, name: 'Tasse', description: 'Tasse en céramique 350 ml', price: 9.5, category: 'Cuisine' }
];
let nextId = 3;

app.listen(PORT, () => {
  console.log(`API démarrée sur http://localhost:${PORT}`);
});

function findProduct(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "L'identifiant doit être un entier positif" });
  }
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Produit ${id} introuvable` });
  }
  req.productIndex = index;
  next();
}

app.get('/products', (req, res) => {
  const { category } = req.query;
  const result = category
    ? products.filter((p) => p.category.toLowerCase() === String(category).toLowerCase())
    : products;
  res.status(200).json(result);
});

app.get('/products/:id', findProduct, (req, res) => {
  res.status(200).json(products[req.productIndex]);
});