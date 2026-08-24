const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let reels = [
  {
    id: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    caption: "UTGRAM पर आपका स्वागत है! 🚀",
    username: "@Bharat_Creator",
    likes: 142,
    likedByMe: false
  },
  {
    id: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    caption: "यह एक शानदार रील है 🔥",
    username: "@Bharat_Creator",
    likes: 89,
    likedByMe: false
  }
];

app.get('/api/reels', (req, res) => {
  res.json(reels);
});

app.post('/api/reels', (req, res) => {
  const { videoUrl, caption, username } = req.body;
  if(videoUrl && caption) {
    reels.unshift({
      id: Date.now(),
      videoUrl,
      caption,
      username: username || "@Bharat_Creator",
      likes: 0,
      likedByMe: false
    });
    res.json({ success: true, message: 'Reel added successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid data' });
  }
});

app.post('/api/reels/like', (req, res) => {
  const { id } = req.body;
  const reel = reels.find(r => r.id == id);
  if (reel) {
    if (!reel.likedByMe) {
      reel.likes += 1;
      reel.likedByMe = true;
    } else {
      reel.likes -= 1;
      reel.likedByMe = false;
    }
    res.json({ success: true, likes: reel.likes, likedByMe: reel.likedByMe });
  } else {
    res.status(404).json({ success: false, message: 'Reel not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
