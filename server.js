const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let reels = [
  {
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    caption: "UTGRAM पर आपका स्वागत है! 🚀"
  },
  {
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    caption: "यह एक शानदार रील है 🔥"
  }
];

app.get('/api/reels', (req, res) => {
  res.json(reels);
});

app.post('/api/reels', (req, res) => {
  const { videoUrl, caption } = req.body;
  if(videoUrl && caption) {
    reels.unshift({ videoUrl, caption });
    res.json({ success: true, message: 'Reel added successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
