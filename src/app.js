//app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
config();

const bookRoutes = require("./routes/book.routes");

// Usamos express para los middlewares
const app = express();
app.use(bodyParser.json()); // Parseador de Bodies

// Conectar a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() {
  console.log("Connected to MongoDB");
});

// Usar las rutas para los libros
app.use('/books', bookRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});