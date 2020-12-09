projectData = {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('website'));

const port = 8080;
const server = app.listen(port, listening);
function listening() {
    console.log('server running');
};


app.get('/sending', fetchData)
function fetchData(request,response) {
    response.send(projectData)
}

app.post('/saveWeather', fetchWeather);
function fetchWeather(request, response) {
    dataLogged = {
        input: request.body.feelings, 
        temp: request.body.temp,
        date: request.body.date
    }

    projectData = dataLogged
    response.send(projectData)
}
