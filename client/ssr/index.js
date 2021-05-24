require('dotenv').config({path: '../.env'});

const path = require('path');
const express = require('express');
const GlobalConfig = require('./global-config');
const viewEngine = require('./view-engine');

const app = express();

app.engine('svelte', viewEngine);
app.set('views', GlobalConfig.pagesPath);
app.set('view engine', 'svelte');

app.use('/static', express.static(path.resolve(__dirname, '..', 'public')));

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.listen(GlobalConfig.PORT, () => {
  console.log(`server has started at http://localhost:${GlobalConfig.PORT}`);
});
