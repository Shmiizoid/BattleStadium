/* Require modules
--------------------------------------------------------------- */
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

/* Create the Express app
--------------------------------------------------------------- */
const app = express();


/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Middleware (app.use)
--------------------------------------------------------------- */
//example of a custom middleware function
function customMiddleware(req, res, next) {
    // Perform some logic or tasks here
    console.log('Custom middleware executed');
    next(); // Invoke the next middleware function
  }

  app.use(connectLiveReload());
  /* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

  //tell express what middleware functions to run
app.use(express.static('public'))
app.use(customMiddleware)


/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    // console.log('I will run whenever the user requests to see the home page')
    res.render('home')
});

app.get('/about', function (req, res) {
    // console.log('I will run whenever the user requests to see the about page')
    res.render('about')
});

/* Tell the app to "listen" or run on the specified port
--------------------------------------------------------------- */
app.listen(3000, function () {
    console.log('Your app is running on port 3000...');
});