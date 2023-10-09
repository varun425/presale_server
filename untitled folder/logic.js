const express = require('express');
const app = express();
const port = 3000; // Choose your desired port

const { MongoClient } = require('mongodb'); // You can use any database you prefer

app.use(express.json());

// Replace the following with your database connection URL
const dbURL = "mongodb+srv://minting:minting@cluster0.fw8thv9.mongodb.net/";

const dbName = 'test';
const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize the database connection
async function initializeDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');

    // Create or get a reference to the database
    const db = client.db(dbName);

    // Create or get a reference to the collection where you want to store the values
    const collection = db.collection('presale');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

initializeDatabase();

// API endpoint to retrieve t1 and t2 values
app.get('/api/tier', async (req, res) => {
  try {
    const db = client.db(dbName);

    const collection = db.collection('presale');

    const document = await collection.findOne({ _id: 'tier' });

    res.json({ t1: document.t1, t2: document.t2 });

  } catch (err) {
    console.error('Error retrieving values:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to update t1 and t2 values
app.put('/api/tier', async (req, res) => {
  try {
    const { t1, t2 } = req.body;
    // Create or get a reference to the database
    const db = client.db(dbName);
    // Create or get a reference to the collection where the values are stored
    const collection = db.collection('presale');
    // Update the document by the unique key with the new t1 and t2 values
    const result = await collection.updateOne({ _id: 'tier' }, { $set: { t1, t2 } });
    if (result.modifiedCount === 1) {
      console.log('Values updated successfully');
      res.json({ message: 'Values updated successfully' });
    } else {
      console.log('Values not updated');
      res.status(400).json({ error: 'Values not updated' });
    }
  } catch (err) {
    console.error('Error updating values:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
