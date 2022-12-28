import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import 'dotenv/config'
import faker from './Faker/productosFaker.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', './public/views');

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const mongoURlString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`;

app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoURlString,
        mongoOptions: advancedOptions
    }),
    secret: 'coder19dic',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

app.get('/productos', (req, res) => {
    if (req.session.user) {
        const list = faker()
        res.render('Productos', {
            list
        })
    } else {
        res.redirect('/login')
    }
})

app.get('/login', (req, res) => {
    const {
        userName
    } = req.body
    req.session.user = userName
    res.render('login')
})
app.get('/logout', (req, res) => {
    const userName = req.session.user
    req.session.destroy()
    res.render('logOut', {
        userName
    })
})
app.post('/login', (req, res) => {
    const {
        userName
    } = req.body
    req.session.user = userName
    res.redirect('/productos')
})

const PORT = 8080;
//Levantando el servidor
const server = app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`)
});
server.on('error', (error) => {
    console.log('Server error:', error)
});