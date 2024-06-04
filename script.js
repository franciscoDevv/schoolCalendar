let events = [
  { date: "2024-06-04", description: "Fotovoz", fullDescription: "Los estudiantes de forma individual deberán realizar una página webque posea su autobiografía de sus días a través del método FotoVoz, es importante que para realizar dicha actividad los estudiantes posean 8 fotos distribuidas en 2 días. Para ello deberán utilizar HTML, CSS y JavaScript, además deberán utilizar Bootstrap para la creación de dicha página, por otra parte debe contar con un menú que permita movernos entre los dos días, idealmente usar una letra distinta a las que entrega el sistema.", tipo: "informe", link: "https://classroom.google.com/u/1/c/NjU5NTU4NDMwODc5/a/NjgzNTA4NjE2NjA1/details", subject: "Diseño de Prototipos Web"},
  // { date: "2024-06-06", description: "Prueba Historia", fullDescription: "Descripción", tipo: "prueba", subject: "Historia"},
  // { date: "2024-06-07", description: "Prueba Ciencias para la Ciudadanía", fullDescription: "-", tipo: "prueba", subject: "Ciencias para la Ciudadanía"},
  // { date: "2024-06-07", description: "Proyecto Design Thinking", fullDescription: "-", tipo: "informe", tipo: "informe", link: "https://classroom.google.com/u/1/c/NjU5NTU4NDMwODc5/a/NjgwMDQwNzI0NTkz/details", subject: "Diseño de Prototipos Web"},
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

