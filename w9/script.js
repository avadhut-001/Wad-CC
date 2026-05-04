function getdata() {
    let city = document.getElementById('city').value.trim().toLowerCase();


    let data = {
        'pune': { temp: '30C', humidity: '60%', condition: 'sunny' },
        "mumbai": { temp: "32°C", humidity: "70%", condition: "Humid" },
        "delhi": { temp: "35°C", humidity: "50%", condition: "Hot" },
        "bangalore": { temp: "25°C", humidity: "65%", condition: "Cloudy" }
    }

    setTimeout(function() {

        if(data[city]){
            document.getElementById('result').innerHTML=
            "Temp:"+ data[city].temp + "<br>"+
            "Humidity:" + data[city].humidity + "<br>"+
            "Condition:" + data[city].condition + "<br>"
        }
        else{
            document.getElementById('result').innerHTML = "City Not Found!";
        }
    },500)
}