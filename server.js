const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });
app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

const db = require('./db');
const Product = db.models.User;

const port = process.env.PORT || 3000;

app.use((req, res, next)=> {
    res.locals.path = req.url;
    next();
  });

app.get('/', (req, res, next)=> {
    res.render('index', { title: 'Home' });
  });

app.use('/users', require('./routes/users'));

app.listen(port, () => console.log(`listening on port ${port}`));

db.sync().then(()=> db.seed());

