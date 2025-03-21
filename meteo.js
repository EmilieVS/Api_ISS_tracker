const infos = document.querySelector("#meteoDashboard")
const urlMeteo = "https://api.open-meteo.com/v1/forecast?latitude=45.7485&longitude=4.8467&hourly=temperature_2m'"

async function getMeteoData () {
    try{
const dataMeteo = await fetch(urlMeteo);
const reponseMeteo = await dataMeteo.json()
console.log(reponseMeteo)

    }
    catch (error){
        console.log("erreur Api")
    }
}

getMeteoData()