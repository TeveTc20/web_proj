// const express = require('express');
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const path = require('path');
// const mongoose = require('mongoose')
// const kitRouter = require('./routes/router')
// const session=require('express-session')
// // const newLocal= require('custom-env')
// // newLocal.env(process.env.NODE_ENV,'./config')
// const dbUrl = "mongodb+srv://tevetc20:3wzhPn4JkbWXSXLe@cluster0.4fyo9bq.mongodb.net/db?retryWrites=true&w=majority"

// mongoose.connect(dbUrl,
// {
//  useNewUrlParser: true,
//   useUnifiedTopology: true,
//  });


// const app = express();

// app.set('view engine','ejs');
// app.use(cors())
// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(session({ secret: 'mySecretKey', resave: true, saveUninitialized: true }));
// app.use('/',kitRouter);
// app.use(express.urlencoded({extended:false}))
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, "views")))

// //  app.listen(8080)
// const http=require('http').Server(app)
// http.listen(8082)

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose')
const kitRouter = require('./routes/router')
const session = require('express-session')
const http = require('http');

const dbUrl = "mongodb+srv://tevetc20:3wzhPn4JkbWXSXLe@cluster0.4fyo9bq.mongodb.net/db?retryWrites=true&w=majority"

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const server = http.createServer(app); // Create an HTTP server

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'mySecretKey', resave: true, saveUninitialized: true }));
app.use('/', kitRouter);
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "views")));

//socket----------------------------------------------------

const socketIO = require('socket.io');
const io = socketIO(server); 
io.on('connection', (socket) => {
  console.log('A user connected');

  
  const adInterval = setInterval(() => {
    socket.emit('showAd')
  }, 30000); 

  socket.on('disconnect', () => {
    clearInterval(adInterval);
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 8080');
});
