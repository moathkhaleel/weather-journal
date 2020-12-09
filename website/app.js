/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f118de9b6ccce462a1e01c0e9bb5932d';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings') .value;
    
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

    //creating an API call
    getZip(baseURL, zip, apiKey) 

    .then(function(data) {
        postData('/addWeather', data = {temp: data.main.temp, date: newDate, feelings: feelings})
        updateUI()
    })
}

const postData = async (url, data) => {
     const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    });
    try {
        const newData = await response.json();
        return newData
    } catch(eror) {
        console.log("error", error);
    } 
};

const getZip = async (baseURL, zip, key) => {
    const res = await fetch(baseURL+zip+key) 
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all')
    try {
        const allData = await request.json()
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.feelings;
    } catch(error) {
        console.log("error", error)
    }
}
// Create a new date instance dynamically with JS
