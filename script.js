document.addEventListener('DOMContentLoaded', function() {
  const calendar = document.getElementById('calendar');
  const fileInput = document.getElementById('fileInput');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  let selectedDay = null;
  let currentDate = new Date();

  function createCalendar(year, month) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    calendar.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      calendar.appendChild(emptyCell);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('day');
      dayCell.textContent = i;

      // Controlla se c'è un'immagine salvata
      const savedImage = localStorage.getItem(`photo-${year}-${month}-${i}`);
      if (savedImage) {
        const img = document.createElement('img');
        img.src = savedImage;
        dayCell.appendChild(img);
      }

      dayCell.addEventListener('click', () => handleDayClick(dayCell, year, month, i));
      calendar.appendChild(dayCell);
    }
  }

  function handleDayClick(dayCell, year, month, day) {
    selectedDay = { dayCell, year, month, day };
    fileInput.click();
  }

  fileInput.onchange = function(event) {
    const file = event.target.files[0];
    if (file && selectedDay) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.width = '100%';
        selectedDay.dayCell.appendChild(img);

        // Salva l'immagine nel local storage
        localStorage.setItem(`photo-${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  prevMonthBtn.addEventListener('click', () => changeMonth(-1));
  nextMonthBtn.addEventListener('click', () => changeMonth(1));

  function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
  }

  createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
