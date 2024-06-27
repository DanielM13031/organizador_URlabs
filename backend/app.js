const express = require('express')
const app = express();



// settings

app.set('port', process.env.PORT || 4000);


// routes





// static files





// start the server
app.listen(app.get('port'), () => console.log('Server on port', app.get('port')))