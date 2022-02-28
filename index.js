const express = require('express');
const config = require('./config/config');
const expressConfig = require('./config/express');
const routes = require('./routes');
const app = express();

expressConfig(app);
// this is equal on:  --->   const expressConfig = require('./config/express'); + expressConfig(app);
//require('./config/express')(app) 

app.use(routes);
// app.use(routes({options})); // Това се прави в случай, че искаме да добавиме някакви опции, като това трябва да бъде съобразено и с експорта от файра с раутовете module.exports = options => router; Прави се ако има нужда.

app.listen(config.PORT, ()=> console.log(`Server is running on port ${config.PORT}...`));