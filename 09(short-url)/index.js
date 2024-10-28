const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')
const { connectToMongoDB } = require('./connect')
const { restrictToLoggedUseronly } = require('./middelwares/auth')
const urlRoute = require('./routers/url')
const URL = require('./models/url');
const staticRoute = require('./routers/staticRouter')
const userRoute = require('./routers/user')
const  app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log('Mongodb connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended:false }))
app.use(cookieParser());
app.use('/shorturl', restrictToLoggedUseronly ,urlRoute)
app.use('/', staticRoute)
app.use('/user', userRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitedHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
        );

        if (!entry) {
            return res.status(404).send('URL not found');
        }

        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error while finding URL:', error);
        return res.status(500).send('Internal server error');
    }
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`))