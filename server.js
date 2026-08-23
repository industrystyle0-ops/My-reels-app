const express = require('express');
const multer = require('multer');
const Datastore = require('nedb-promises');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const db = Datastore.create({ filename: 'reels.db', autoload: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

app.get('/api/reels', async (req, res) => {
  try {
    const reels = await db.find({}).sort({ createdAt: -1 });
    res.json(reels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reels', upload.single('video'), async (req, res) => {
  try {
    const newReel = {
      videoUrl: `/uploads/${req.file.filename}`,
      caption: req.body.caption || '',
      likes: 0,
      createdAt: new Date()
    };
    const savedReel = await db.insert(newReel);
    res.json(savedReel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
