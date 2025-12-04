const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/lyrics', async (req, res) => {
    try {
        const title = req.query.title;
        if (!title) 
            return res.status(400).json({ status: false, message: 'Title is required', creator: 'Chamod Nimsara' });

        const { data } = await axios.get(`https://lrclib.net/api/search?q=${encodeURIComponent(title)}`, {
            headers: {
                referer: `https://lrclib.net/search/${encodeURIComponent(title)}`,
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
            }
        });

        return res.json({ status: true, data, creator: 'Chamod Nimsara' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message, creator: 'Chamod Nimsara' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Lyrics API running on port ${PORT}`));
