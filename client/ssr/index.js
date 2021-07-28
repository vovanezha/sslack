require('dotenv').config();

const express = require('express');
const GlobalConfig = require('./global-config');
const viewEngine = require('./view-engine');

const app = express();

app.engine('svelte', viewEngine);
app.set('views', GlobalConfig.paths.pages);
app.set('view engine', 'svelte');

app.use(GlobalConfig.staticFilesPrefix, express.static(GlobalConfig.paths.static));

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/signin', (req, res) => {
  res.render('signin');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.listen(GlobalConfig.PORT, () => {
  console.log(`server has started at http://localhost:${GlobalConfig.PORT}`);
});
