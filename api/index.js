const express = require('express');
const path = require('path');
const ejs = require("ejs");
const bodyParser = require('body-parser');
const routes = require('./routes/router')
const middlewaresErr = require('./middlewares/errors');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', routes);

app.use(middlewaresErr.notFound);
app.use(middlewaresErr.catchErrors);


app.listen(process.env.port || 3000, () => {
    console.log(`Server is up!`);
});