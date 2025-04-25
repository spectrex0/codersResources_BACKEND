import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Ruta para guardar comentarios
const dataDir = path.join(__dirname, '/data', 'feedbacks.json');

if (!fs.existsSync(dataDir)) {
  fs.writeFileSync(dataDir, JSON.stringify([]));
}

app.use(express.static(path.join(__dirname, 'public')));

app.post('/getFeedbacks', (req, res) => {
  const { userName, comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: 'The comment is required.' });
  }

  try {
    const feedbacks = JSON.parse(fs.readFileSync(dataDir, 'utf-8'));

    const newFeedback = { userName, comment };
    feedbacks.push(newFeedback);

    fs.writeFileSync(dataDir, JSON.stringify(feedbacks, null, 2));

    res.status(200).json({ message: 'Comment saved successfully! Thanks for your message.', feedback: newFeedback });
    console.log('Feedback saved:', newFeedback.comment + `\n from ${userName}`);
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

app.get('/feedbacks', (_, res) => {
  try {
    const feedbacks = JSON.parse(fs.readFileSync(dataDir, 'utf-8'));
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error reading feedbacks:', error);
    res.status(500).json({ error: 'Failed to read feedbacks' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend launched`);
});

// Middleware para manejar errores

app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});