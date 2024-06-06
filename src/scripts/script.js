
document.getElementById('theme-switch').addEventListener('change', function() {
  document.body.classList.toggle('light-mode');
});

let events = [
  { date: "2024-06-04", description: "Fotovoz", fullDescription: "Los estudiantes de forma individual deberán realizar una página webque posea su autobiografía de sus días a través del método FotoVoz, es importante que para realizar dicha actividad los estudiantes posean 8 fotos distribuidas en 2 días. Para ello deberán utilizar HTML, CSS y JavaScript, además deberán utilizar Bootstrap para la creación de dicha página, por otra parte debe contar con un menú que permita movernos entre los dos días, idealmente us  ar una letra distinta a las que entrega el sistema.", tipo: "trabajo", link: "https://classroom.google.com/u/1/c/NjU5NTU4NDMwODc5/a/NjgzNTA4NjE2NjA1/details", subject: "Diseño de Prototipos Web"},
  // { date: "2024-06-06", description: "Prueba Historia", fullDescription: `<b>Contenidos</b>: <br>- Los locos años 20<br>- Las ideologías totalitarias<br>-Crisis de 1929<br>-Gobierno de Arturo Alessandri<br>-Frente Popular`, tipo: "prueba", subject: "Historia"},
  { date: "2024-06-14", description: "Prueba Ciencias para la Ciudadanía", fullDescription: "Prueba Semestral de Ciencias para la Ciudadanía", tipo: "prueba", subject: "Ciencias para la Ciudadanía", link:"https://classroom.google.com/u/1/c/NjAxMTM5MDAxNDM2/a/Njk0NzYxNjIwNTY0/details"},
  { date: "2024-06-13", description: "Prueba Historia", fullDescription: `<b>Contenidos</b>: <br>- Los locos años 20<br>- Las ideologías totalitarias<br>-Crisis de 1929<br>-Gobierno de Arturo Alessandri<br>-Frente Popular`, tipo: "prueba", subject: "Historia"},
  { date: "2024-06-11", description: "Proyecto Design Thinking", fullDescription: `Elaborar un informe sobre "<b>Proyecto de (Nombre de la problemática)</b>", para ello dispone de los conocimientos adquiridos en la asignatura además de contar con la ayuda de internet para la elaboración del proyecto. `, tipo: "informe", tipo: "informe", link: "https://classroom.google.com/u/1/c/NjU5NTU4NDMwODc5/a/NjgwMDQwNzI0NTkz/details", subject: "Diseño de Prototipos Web"},
  { date: "2024-06-08", description: "Ejercicios Matemática de Medidas de Dispersión", fullDescription: "Trabajo grupal de ejercicios en grupo sobre medidas de dispersión, traer ejercicios terminados este día.", tipo: "trabajo", subject: "Matemáticas"},
  { date: "2024-06-13", description: "Entrega Certificado JavaScript 2", fullDescription: "Entregar el certificado del curso de Jovenes Programadores JavaScript 2 con máximo esta fecha.", subject: "Diseño de Prototipos Web", link: "https://classroom.google.com/u/1/c/NjU5NTU4NDMwODc5/a/NjgzOTU2MDI4MjQx/details", tipo: "trabajo"},
  { date: "2024-06-08", description: "Ensayo Lenguaje", fullDescription: "Realizar ensayo con temática escogida en clases, y subirla a classroom.", link: "https://classroom.google.com/u/1/c/NjkyNDI4NjY3ODU3/a/NjgwMzM4NTkxMDAw/details", tipo: "ensayo", subject: "Lenguaje"},
  { date: "2024-06-08", description:"Informe de Base de Datos ABP, ETAPA I y II", fullDescription: "Modelado de la base de datos del caso propuesto ABP. Entrega de diseño y diccionario de datos", subject:"Bases de Datos", link: "https://classroom.google.com/u/1/c/NjU5NDcyMzE5MDA2/a/Njk0MjI2NDg2OTU0/details", tipo:"informe"}
];

const modal = document.getElementById("eventModal");
const span = document.getElementsByClassName("close")[0];

function showEventDescription(title, description, link, subject) {
  if(link == undefined) {
    document.getElementById('eventDescription').innerHTML = `<h1>${title}</h1><br><h5>${subject}</h5><br>${description}<br><a href="#">Link de utilidad</a>`;
    modal.style.display = "block";  
  } else {
    document.getElementById('eventDescription').innerHTML = `<h1>${title}</h1><br><h5>${subject}</h5><br>${description}<br><a href="${link}" target="_blank">Link de utilidad</a>`;
    modal.style.display = "block";
  }
}

span.onclick = function() {
modal.style.display = "none";
}

window.onclick = function(event) {
if (event.target == modal) {
  modal.style.display = "none";
}
}

function generateCalendar(month) {
const calendarDiv = document.getElementById('calendar');
calendarDiv.innerHTML = '';
const daysInMonth = new Date(2024, month, 0).getDate();
const firstDayOfMonth = new Date(2024, month - 1, 1).getDay();
const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;

daysOfWeek.forEach(day => {
  const header = document.createElement('div');
  header.textContent = day;
  header.classList.add('day-header');
  calendarDiv.appendChild(header);
});

for (let i = 0; i < firstDayOfMonth; i++) {
  calendarDiv.appendChild(document.createElement('div')); 
}

for (let i = 1; i <= daysInMonth; i++) {
  const dayDiv = document.createElement('div');
  dayDiv.textContent = i;
  dayDiv.classList.add('p-2', 'border', 'mb-2', 'calendar-day');

  if (month === currentMonth && i === currentDay) {
    dayDiv.classList.add('current-day');
  }

  const eventsForDay = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() + 1 === month && eventDate.getDate() === i;
  });

  if (eventsForDay.length > 0) {
    eventsForDay.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.textContent = event.description;
      eventElement.classList.add('event', event.tipo);
      eventElement.onclick = () => showEventDescription(event.description, event.fullDescription, event.link, event.subject);
      dayDiv.appendChild(eventElement);
    });
  }
  calendarDiv.appendChild(dayDiv);
}
}

document.getElementById('month-select').addEventListener('change', function() {
const selectedMonth = parseInt(this.value);
generateCalendar(selectedMonth);
});

generateCalendar(new Date().getMonth() + 1);


function displayUpcomingEventsModal() {
  const upcomingEvents = getUpcomingEvents().slice(0, 5); 
  const modalBody = document.getElementById('upcoming-events-modal-body');
  modalBody.innerHTML = '';

  upcomingEvents.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.classList.add('upcoming-event');
      if(event.link === undefined){
        eventElement.innerHTML = `
          <h3>${event.description}</h3>
          <p><strong>Fecha:</strong> ${formatDate(event.date)}</p>
          <p><strong>Asignatura:</strong> ${event.subject}</p>
          <p>${event.fullDescription}</p>
          <center><a href="#" class="btn btn-secondary">No hay link disponible</a></center>
        `
        modalBody.appendChild(eventElement);
      } else {
        eventElement.innerHTML = `
        <h3>${event.description}</h3>
        <p><strong>Fecha:</strong> ${formatDate(event.date)}</p>
        <p><strong>Asignatura:</strong> ${event.subject}</p>
        <p>${event.fullDescription}</p>
        <center><a href="${event.link}" target="_blank" class="btn btn-primary">Ver más</a></center>
    `;
        modalBody.appendChild(eventElement);
      }
  });

  const modal = new bootstrap.Modal(document.getElementById('upcoming-events-modal'));
  modal.show();
}

function formatDate(dateString) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', options);
}

function getUpcomingEvents() {
  const today = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= today);
  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  return upcomingEvents;
}

window.onload = function() {
  displayUpcomingEvents(); // Muestra las evaluaciones próximas al cargar la página
  // Resto del código...
}
