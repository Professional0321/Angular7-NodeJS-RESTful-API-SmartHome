const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const dataRoutes = require('./routes/data');
const alarmRoutes = require('./routes/alarm');
const authRoutes = require('./routes/auth');
const middlewaresErr = require('./middlewares/errors');
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs');
const swaggerdoc = yaml.load('./docs/swagger.yaml');
const passport = require('./config/passport');
const app = express();

passport.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.redirect('/api/api-docs');
})

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerdoc))
app.use('/api/data', dataRoutes);
app.use('/api/alarm', alarmRoutes);
app.use('/api/auth', authRoutes);


app.use(middlewaresErr.notFound);
app.use(middlewaresErr.catchErrors);

app.listen(process.env.port || 3000, () => {
    console.log(`Server is up!`);
});