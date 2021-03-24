//Deklarera variabler som tagits från DOM
const info = document.querySelector(".search-info");
const searchBtn = document.querySelector(".btn");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const form = document.querySelector(".container");
const infoText = document.querySelector(".info");
const footer = document.querySelector(".footer");
let countryChoise = document.querySelector(".country-search");


//funktion för att Ta data från API med info om Corona  lägger till resultatet i json och använder datan för att skriv ut meddelande.
const requestData = (choice) => {
    fetch(`https://covid-api.mmediagroup.fr/v1/cases/?country=${choice}`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data.All) // //Console.loggar datan man får ut...

        infoText.innerHTML = `<h2><u>${data.All.country}</u>:</h2>
        <br><p>There has been ${data.All.confirmed} confirmed infected by the virus. </p>
        <p>At this point ${data.All.deaths} have died due to corona. </p>
        <p>They have confirmed ${data.All.recovered} recovered from the disease. </p>
        <p>The population of ${data.All.country} is ${data.All.population}. </p>
        <br>
        <h6><small>The last updated information came in at: </h6>
        <h5>${data.All.updated}</small></h5>`
       
    })

    // Ifall man skriver in fel i sökfältet så skrivs errorn ut.
    .catch(error => {
        console.log("Error!")
        infoText.innerHTML = `<h3><u>Error</u></h3>
        <p>Make sure that the first letter is in uppercase, and the country name in english.</p>`})
}

// funktion för att öppna rutan med info, tar även bort lite saker i bakgrunden för att de ska se lite renare ut.
const openModal = () => {
    info.classList.remove("hide");
    overlay.classList.remove("hide");
    form.classList.add("hide");
    footer.classList.add("hide");
}

//funktion som stänger rutan med info. Lägger till formuläret osv igen.
const closeModal = () => {
    info.classList.add("hide");
    overlay.classList.add("hide");
    form.classList.remove("hide");
    footer.classList.remove("hide");
}

//Lägg till en eventlisternet med click för sökknappen. preventDefault gör så att sidan inte laddar om vid submit.
//Lägger till valet man gjort när man sökt på i countryChoise.value. 
//Anropar openModal-funktionen och funktionen som tar data från API
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let choice = countryChoise.value;
    requestData(choice);
    openModal();
});

//Stänga knappen i boxen stänger ner boxen igen.
btnCloseModal.addEventListener("click", closeModal);
//Stäng boxen genom att trycka på overlay.
overlay.addEventListener("click", closeModal);
//stäng boxen om man trycker på escape-knappen.
document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && !info.classList.contains("hide")){
        closeModal();
    }
});