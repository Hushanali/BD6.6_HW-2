const express = require('express');
const { getGames, getGameById } = require('./controllers/index');
const app = express();

app.use(express.json());

// 1
app.get('/games', (req, res) => {
  let games = getGames();
  res.json(games);
});

// 2
app.get('/games/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let game = getGameById(id);
  res.json(game);
});

module.exports = {
  app,
};
