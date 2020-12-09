const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f118de9b6ccce462a1e01c0e9bb5932d&units=metric';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(event) {
    const zip = document.getElementById('zip').value;
    const input = document.getElementById('feelings').value;
    
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

    async function getCode(baseURL, zip, key) {
        const res = await fetch(baseURL+zip+key) 
        try {
            const data = await res.json();
            console.log(data)
            return data;
        } catch(error) {
            console.log("error", error);
        }
    }

    async function postData(url, data) {
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

   async function updateUI() {
        const request = await fetch('/sending')
        try {
            const allData = await request.json()
            console.log(allData);
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = allData.temp;
            document.getElementById('content').innerHTML = allData.input;
        } catch(error) {
            console.log("error", error)
        }
    }

    getCode(baseURL, zip, apiKey).then((data) => {
        postData('/saveWeather', data = {temp: data.main.temp, date: newDate, feelings: input})
        updateUI()
    })
}
