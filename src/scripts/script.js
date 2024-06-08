import { events } from './events.js';
import { subjectIcons, getSubjectIcon } from './icons.js';

document.getElementById('theme-switch').addEventListener('change', function() {
  document.body.classList.toggle('light-mode');
});

const modal = document.getElementById("eventModal");
const span = document.getElementsByClassName("close")[0];

function showEventDescription(title, description, link, subject) {
  const icon = getSubjectIcon(subject);
  if (link === undefined) {
    document.getElementById('eventDescription').innerHTML = `
    <i class="fas ${icon} megaIcon"></i>
    <h1>${title}</h1><br><h5>${subject}</h5><br>${description}<br><p class="no-link">No hay link disponible</p>`;
    modal.style.display = "block";
  } else {
    document.getElementById('eventDescription').innerHTML = `
    <i class="fas ${icon} megaIcon"></i>
    <h1>${title}</h1><br><h5>${subject}</h5><br>${description}<br><a href="${link}" target="_blank">Link de utilidad</a>`;
    modal.style.display = "block";
  }
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
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
        const iconClass = getSubjectIcon(event.subject);
        eventElement.innerHTML = `<i class="fas ${iconClass}"></i> ${event.description}`;
        eventElement.classList.add('event', event.tipo);
        eventElement.onclick = () => showEventDescription(event.description, event.fullDescription, event.link, event.subject, event.subject);
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
    const iconClass = getSubjectIcon(event.subject);
    if (event.link === undefined) {
      eventElement.innerHTML = `
        <i class="fas ${iconClass} megaIcon"></i>
        <h3>${event.description}</h3> 
        <p><strong>Fecha:</strong> ${formatDate(event.date)}</p>
        <p><strong>Asignatura:</strong> ${event.subject}</p>
        <p>${event.fullDescription}</p>
        <center><a href="#" class="btn btn-secondary">No hay link disponible</a></center>
      `;
    } else {
      eventElement.innerHTML = `
        <i class="fas ${iconClass} megaIcon"></i>
        <h3>${event.description}</h3>
        <p><strong>Fecha:</strong> ${formatDate(event.date)}</p>
        <p><strong>Asignatura:</strong> ${event.subject}</p>
        <p>${event.fullDescription}</p>
        <center><a href="${event.link}" target="_blank" class="btn btn-primary">Ver más información</a></center>
      `;
    }
    modalBody.appendChild(eventElement);
  });

  const modal = new bootstrap.Modal(document.getElementById('upcoming-events-modal'));
  modal.show();
}

window.displayUpcomingEventsModal = displayUpcomingEventsModal;

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

let searchInput = document.getElementById('search');
let c1 = document.getElementById('c1');
let c2 = document.getElementById('c2');
let c3 = document.getElementById('c3');
let ct = document.getElementById('ct');
let sr = document.getElementById("search-results");

searchInput.addEventListener("focusin", () => {
  // c1.classList.add('blur');
  c2.classList.add('blur');
  c3.classList.add('blur');
  ct.classList.add('blur');
  sr.style.display = "block";
});

searchInput.addEventListener("focusout", (i) => {
  setTimeout(() => {
    if (!searchInput.contains(document.activeElement) && !searchResults.contains(document.activeElement)) {
      c2.classList.remove('blur');
      c3.classList.remove('blur');
      ct.classList.remove('blur');
      searchResults.style.display = "none";
    }
  }, 200);
});

let searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', () => {
  searchResults.innerHTML = '';
  let searchText = searchInput.value.trim().toLowerCase();
  let filteredEvents = events.filter(event => event.description.toLowerCase().includes(searchText));
  if (searchText === '') {
    return;
  }
  filteredEvents.forEach(event => {
    let resultElement = document.createElement('div');
    resultElement.classList.add('search-result');
    const iconClass = getSubjectIcon(event.subject);
    resultElement.innerHTML = `
      <div class="event ${event.tipo} p-2"><i class="fas ${iconClass}"></i> ${event.description}</div>
    `;
    resultElement.addEventListener('click', () => {
      showEventDescription(event.description, event.fullDescription, event.link, event.subject);
    });
    searchResults.appendChild(resultElement);
  });
});
