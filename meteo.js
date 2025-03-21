const infos = document.querySelector("#meteoDashboard")
const urlMeteo = "" //Trouver un bonne API Meteo : regarder sur Moodle

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

//getMeteoData()