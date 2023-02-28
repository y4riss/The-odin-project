const express = require('express');
const url = require('url');
const needle = require('needle');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.static('public'));

const WEATHER_URL = process.env.WEATHER_URL;
const WEATHER_KEY_NAME = process.env.WEATHER_KEY_NAME;
const WEATHER_KEY_VALUE = process.env.WEATHER_KEY_VALUE;

const IMG_URL = process.env.IMG_URL;
const IMG_KEY_NAME = process.env.IMG_KEY_NAME;
const IMG_KEY_VALUE = process.env.IMG_KEY_VALUE;

app.get('/weather', async (req, res) => {
  try {
    const params = new URLSearchParams({
      [WEATHER_KEY_NAME]: [WEATHER_KEY_VALUE],
      ...url.parse(req.url, true).query,
    });
    const data = await needle('get', `${WEATHER_URL}?${params}`);
    res.status(200).json(data.body);
  } catch (error) {
    res.status(500).json({error})
  }
});

app.get('/img', async (req, res) => {
    try {
      const params = new URLSearchParams({
        [IMG_KEY_NAME]: [IMG_KEY_VALUE],
        ...url.parse(req.url, true).query,
      });
      const data = await needle('get', `${IMG_URL}?${params}`);
      res.status(200).json(data.body);
    } catch (error) {
        res.status(500).json({error})

    }
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
