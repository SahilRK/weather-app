//IMPORT LIBRARIES
const path = require('path');
const express = require('express');
const hbs = require('hbs');

//IMPORT LOCAL LIBRARIES
const geocode = require('./utils/geocode.js');
const weather = require('./utils/forecast.js');

//Since express returns back a function, we use call the express function and store it 
const app = express();
const port = process.env.PORT || 3000;

//SETUP PATHS FOR EXPRESS CONFIG
//NodeJS provides us two important variables to access the current directory and file. __dirname(current directory) and __filename(current file).
const publicDirectoryPath = path.join(__dirname,'../public');
//To make express point to a custom directory to access handlebar views, we first set the custom directory path
const viewsDirectoryPath = path.join(__dirname,'../templates/views');
//Define partials path
const partialsDirectoryPath = path.join(__dirname,'../templates/partials');
//Bootstrap directory path
const bootstrapDirPath = path.join(__dirname,"../node_modules/bootstrap/dist/css");
//Bootstrap icons path
const bootstrapIconsDirPath = path.join(__dirname,"../node_modules/bootstrap-icons/font")


//SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
//To set allows you to add a value for an app setting in express. The first parameter is a key and second is a value. In this case we set up a view engine with the module handlebars(hbs).
app.set('view engine','hbs');
//We now set the custom path for views.
app.set('views',viewsDirectoryPath);
//Configure partials path for HBS
hbs.registerPartials(partialsDirectoryPath);

//SETUP EXPRESS TO SERVE PUBLIC FILES
//app.use() is used to customise the server. To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express. The root of the site always serves to index.html by default.
app.use(express.static(publicDirectoryPath));

//use bootstrap for css framework
app.use("/css",express.static(bootstrapDirPath));

//use bootstrap icons for icons
app.use('/icons',express.static(bootstrapIconsDirPath));

//let us set up a request handler for rendering dynamic pages
app.get('',(req,res)=>{
    //the render method is used to render dynamic web pages and pass values to it.
    res.render('index',{
        title: "Weather",
        message: "Welcome to my weather app",
        pageIcon: "rainy"
    }) 
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About me",
        message: "This page is about me"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: "Hi there! I am here to help"
    })
})

//Weather forecast handler
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error: "Please provide a city name."
        })
    }
    geocode.getLocationDetails(req.query.location,(geocodeError,geocodeData) => {
        if(geocodeError){
            //if there is an error here, the function returns back from this point and the execution stops
            return res.send({
                error: geocodeError
            });
        }
    
        weather.getWeatherDetails(geocodeData.latitude,geocodeData.longitude,(forecastError,forecastData) => {
            if(forecastError){
                return res.send({
                    error: forecastError
                });
            }
            
            res.send({
                geocodeMessage: geocodeData.message,
                forecastMessage: forecastData.message
            });

        });
    })
})

//To customise error messages for routes of specific sub routes, eg: /help/test, we can use the wildcard with the subroute( /help/*). This helps in targeting much more specific messages for the route errors making the app more user friendly.
app.get('/help/*',(req,res)=>{
    res.render('404',{
        message: "Could not find the help article that was requested for"
    })
})

//******************** NOTE: THIS SHOULD COME LAST BEFORE THE SERVER START HANDLER  ********************************//
//Any route that does not exist is called using a wildcard route (*)
app.get('*',(req,res) => {
    res.render('404',{
        message: 'Page not found'
    });
})

//app.listen(port, callback) is used to start the server. The callback is optional and is used to perform a task once the server is up and running.
app.listen(port, ()=>{
    console.log("Server is running at port "+port);
})