const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('node:fs');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// IMPORTANTE: Cambia esta ruta para Vercel
const upload = multer({ dest: 'https://kurochat-angel-mondragons-projects.vercel.app/public/uploads/' });

const saveImage = (file) => {
  try {
    const newPath = `/tmp/uploads/${file.originalname}`;
    const returnPath = `/uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return returnPath;
  } catch (error) {
    console.error('Error al guardar la imagen:', error);
    return null;
  }
};

app.post('/upload', upload.single('file'), (req, res) => {
  const path = saveImage(req.file);
  
  if (!path) {
    return res.status(500).json({ error: 'Error al guardar la imagen' });
  }

  res.json({ path: path, status: 200 });
});

// Exporta la app para Vercel en lugar de usar app.listen()
module.exports = app;