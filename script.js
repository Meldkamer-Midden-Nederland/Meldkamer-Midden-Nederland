/*Klok in topbar*/

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    const currentTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById("clock").textContent = currentTime;
}

setInterval(updateClock, 1000);
updateClock();

/*Meldkamer Inputs*/

const selectElement = document.getElementById("soort-melding");

const tekstElement = document.getElementById("soort-melding-tekst");

selectElement.addEventListener("change", function() {
    const geselecteerdeOptie = selectElement.value;
    
    tekstElement.textContent = geselecteerdeOptie;
});


const locatieInput = document.getElementById('locatie');
const locatieTekst = document.getElementById('locatie-tekst');

locatieInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') { 
        locatieTekst.textContent = locatieInput.value;
        locatieInput.value = '';
    }
});


const prioPolitie = document.getElementById('prio-politie');
const prioBrandweer = document.getElementById('prio-brandweer');
const prioAmbulance = document.getElementById('prio-ambulance');
const prioTekst = document.getElementById('prio-tekst');

let politieTekst = '';
let brandweerTekst = '';
let ambulanceTekst = '';

prioPolitie.addEventListener('change', function () {
    const selectedValue = prioPolitie.value; 
    if (selectedValue === 'Prio 1 met') {
        politieTekst = 'Politie: Prio 1 met';
    } else if (selectedValue === 'Prio 1 zonder') {
        politieTekst = 'Politie: Prio 1 zonder';
    } else if (selectedValue === 'Prio 2') {
        politieTekst = 'Politie: Prio 2';
    } else if (selectedValue === 'Prio 3') {
        politieTekst = 'Politie: Prio 3';
    }
    updatePrioTekst(); 
});

prioBrandweer.addEventListener('change', function () {
    const selectedValue = prioBrandweer.value; 
    if (selectedValue === 'Prio 1') {
        brandweerTekst = 'Brandweer: Prio 1';
    } else if (selectedValue === 'Prio 2') {
        brandweerTekst = 'Brandweer: Prio 2';
    } else if (selectedValue === 'Prio 3') {
        brandweerTekst = 'Brandweer: Prio 3';
    }
    updatePrioTekst();
});

prioAmbulance.addEventListener('change', function() {
    const selectedValue = prioAmbulance.value;
    if (selectedValue === 'A1') {
        ambulanceTekst = 'Ambulance: A1';
    } else if (selectedValue === 'A2') {
        ambulanceTekst = 'Ambulance: A2';
    }
    updatePrioTekst();
});

function updatePrioTekst() {
    const teksten = [];
    if (politieTekst) teksten.push(politieTekst);
    if (brandweerTekst) teksten.push(brandweerTekst);
    if (ambulanceTekst) teksten.push(ambulanceTekst);
    prioTekst.textContent = teksten.join(', ');
}


const incidentKanaal = document.getElementById('incident-kanaal');
const incidentTekst = document.getElementById('incident-tekst');

incidentKanaal.addEventListener('change', function() {
    const selectedValue = incidentKanaal.value;
    if (selectedValue === 'Incident kanaal 1&2') {
        incidentTekst.textContent = 'kanaal 1&2';
    } else if (selectedValue === 'Incident kanaal 3&4') {
        incidentTekst.textContent = 'kanaal 3&4';
    } else if (selectedValue === 'Incident kanaal 5&6') {
        incidentTekst.textContent = 'kanaal 5&6';
    } else if (selectedValue === 'Incident kanaal 7&8') {
        incidentTekst.textContent = 'kanaal 7&8';
    } else if (selectedValue === 'Incident kanaal 9&10') {
        incidentTekst.textContent = 'kanaal 9&10';
    } else if (selectedValue === 'Incident kanaal 11&12') {
        incidentTekst.textContent = 'kanaal 11&12';
    } 
});

/*Functie van een melding aanmaken*/

document.addEventListener('DOMContentLoaded', function () {
    const meldingAanmakenKnop = document.getElementById('melding-aanmaken');
    const meldingenContainer = document.getElementById('meldingen-container');
    const meldingTextarea = document.getElementById('melding-tekst');
    const soortMelding = document.getElementById('soort-melding');
    const incidentKanaal = document.getElementById('incident-kanaal');

    const prioPolitie = document.getElementById('prio-politie');
    const prioBrandweer = document.getElementById('prio-brandweer');
    const prioAmbulance = document.getElementById('prio-ambulance');
    const locatieInput = document.getElementById('locatie');

    const soortMeldingTekst = document.getElementById('soort-melding-tekst');
    const locatieTekst = document.getElementById('locatie-tekst');
    const prioTekst = document.getElementById('prio-tekst');
    const incidentTekst = document.getElementById('incident-tekst');

    meldingAanmakenKnop.addEventListener('click', function () {
        const politiePrio = prioPolitie.value;
        const brandweerPrio = prioBrandweer.value;
        const ambulancePrio = prioAmbulance.value;
        const locatie = locatieInput.value.trim();
        const soortMeldingInfo = soortMelding.value;
        const meldingTekst = meldingTextarea.value.trim();
        const incidentKanaalInfo = incidentKanaal.value;

        if (
            politiePrio === 'Prio Politie' &&
            brandweerPrio === 'Prio Brandweer' &&
            ambulancePrio === 'Prio Ambulance' &&
            locatie === '' &&
            meldingTekst === ''
        ) {
            alert('Vul alle velden in om een melding aan te maken!');
            return;
        }

        const nieuweMelding = document.createElement('div');
        nieuweMelding.classList.add('melding-item');

        nieuweMelding.innerHTML = `
            <div class="melding-header">
                <h3>${soortMeldingInfo}</h3>
            </div>
            <div class="melding-body">
                <p><strong>Incident Kanaal:</strong> ${incidentKanaalInfo}</p>
                <input type="text" id="melding-input" placeholder="Koppel eenheden...">
                <div class="button-container">
                    <button class="delete-btn">Verwijderen</button>
                    <button class="selecteren-btn">Selecteren</button>
                </div>
            </div>
        `;

        meldingenContainer.appendChild(nieuweMelding);

        // Reset de inputs in het formulier
        prioPolitie.value = 'Prio Politie';
        prioBrandweer.value = 'Prio Brandweer';
        prioAmbulance.value = 'Prio Ambulance';
        locatieInput.value = '';
        soortMelding.value = 'Soort melding';
        meldingTextarea.value = 'INTK112\nDienst:\nTijd:\nMelder:\n----------------------------------------------------------------------------------------------------------------------------------------\n\n\n----------------------------------------------------------------------------------------------------------------------------------------\nSignalement:\n\n----------------------------------------------------------------------------------------------------------------------------------------\nEenheden:\n\n----------------------------------------------------------------------------------------------------------------------------------------\nInzet update:';

        soortMeldingTekst.textContent = '';
        locatieTekst.textContent = '';
        prioTekst.textContent = '';
        incidentTekst.textContent = '';
        // Voeg event listener toe aan de delete button
        const deleteBtn = nieuweMelding.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            nieuweMelding.remove();
        });
    });
});


