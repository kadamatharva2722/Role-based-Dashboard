const express = require('express');
const app = express();
const { ConnectToMongoDB } = require('./connections');
const path = require('path');
const { restrictUserLogin } = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const port = 4000;

//Routes
const staticRouter = require('./routes/static');
const userRoute = require('./routes/user');
const accessRoute = require('./routes/access');

//Connections
ConnectToMongoDB('mongodb://127.0.0.1:27017/Role-basedDashboard');

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());       

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

app.use('/', staticRouter);
app.use('/user', userRoute);
app.use('/access', restrictUserLogin, accessRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});