const MOON = '🌙';
const SUN = '☀️';
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';
const DEFAULT_MODE = DARK_MODE;

const btn = document.querySelector('#theme-switcher');

init();

function init() {
    let storedMode = sessionStorage.getItem('mode');
    if (!storedMode) {
        storedMode = DEFAULT_MODE;
        sessionStorage.setItem('mode', DEFAULT_MODE);
    }
    setMode(storedMode);
}

function setMode(mode = DEFAULT_MODE) {
    if (mode === DARK_MODE) {
        btn.textContent = SUN;
        document.body.classList.add(DARK_MODE);

    } else if (mode === LIGHT_MODE) {
        btn.textContent = MOON;
        document.body.classList.remove(DARK_MODE);
    }
}

btn.addEventListener('click', function () {
    let mode = sessionStorage.getItem('mode');
    if (mode) {
        let newMode = mode == DARK_MODE ? LIGHT_MODE : DARK_MODE;
        setMode(newMode);
        sessionStorage.setItem('mode', newMode);
    }
});


////////////////REJSEPLANEN>>>>>>>>>>>>>>>>

document.addEventListener('DOMContentLoaded', ()=>{
    //fetch the data as soon as the page has loaded
    let url = "http://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=751429003&id2=751401302&id3=751401301&id4=751429004&id5=751454901&id6=751454902&offsetTime=1";
    fetch(url)
    .then(response=>response.text())
    .then(data=>{
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");
        console.log(xml);
       ListDepartures(xml);
    });
})

function ListDepartures(xmllist){
    let list = document.getElementById('departure');
    let departureBoard = xmllist.getElementsByTagName('Departure')
    for(let i=0; i<departureBoard.length; i++){
        let li = document.createElement('li');
        let Departure2 = departureBoard[i].firstChild.nodeValue;
        let line = departureBoard[i].getAttribute('line');
        let stop = departureBoard[i].getAttribute('stop');
        let direction = departureBoard[i].getAttribute('direction');
        let time = departureBoard[i].getAttribute('time');
        let filename = "buslogo" + line + ".png";
        let text = '<img src="' + filename + '" width="30">'
        li.innerHTML = text;
        li.innerHTML += `&nbsp Busnr: ${Departure2} ${line} <br>&nbsp Fra:  ${stop} &nbsp-&nbsp mod: ${direction} <br>&nbsp Afgang tidspunkt: ${time}`;
        li.innerHTML += `&nbsp <a href="https://www.google.com/maps/dir/?api=1&origin=${stop}&destination=${direction}&travelmode=transit" target="_blank">Se på kort her</a></p>`;
        list.appendChild(li);
        if (i == 19)
          break;
    }
}
setInterval(function() { window.location.reload() }, 60000);

let clear = document.getElementById("clear");
clear.addEventListener('click', function(){
    localStorage.removeItem("mode");
    sessionStorage.removeItem("mode")
});
