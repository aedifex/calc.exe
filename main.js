// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sample in-memory database (you'd typically use a real database)
const items = [];

// Define routes

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read all items
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// Read a specific item by ID
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = items.find((i) => i.id === itemId);
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    res.status(200).json(item);
  }
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const index = items.findIndex((i) => i.id === itemId);
  if (index === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    items[index] = updatedItem;
    res.status(200).json(updatedItem);
  }
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const index = items.findIndex((i) => i.id === itemId);
  if (index === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    items.splice(index, 1);
    res.status(204).send();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
