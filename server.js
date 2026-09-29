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