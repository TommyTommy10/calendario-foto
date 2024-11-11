document.addEventListener('DOMContentLoaded', function() {
  const calendar = document.getElementById('calendar');
  const fileInput = document.getElementById('fileInput');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const currentMonthSpan = document.getElementById('currentMonth');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const closeModal = document.getElementsByClassName('close')[0];
  const toggleTheme = document.getElementById('toggleTheme');
  const loginContainer = document.getElementById('login-container');
  const usernameInput = document.getElementById('username');
  const loginBtn = document.getElementById('login-btn');
  
  let selectedDay = null;
  let currentDate = new Date();
  let username = '';

  loginBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
      loginContainer.style.display = 'none';
      calendar.style.display = 'grid';
      createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    } else {
      alert('Per favore, inserisci un nome utente.');
    }
  });

  function createCalendar(year, month) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    calendar.innerHTML = '';
    currentMonthSpan.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      calendar.appendChild(emptyCell);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('day');
      dayCell.textContent = i;

      const savedImage = localStorage.getItem(`photo-${username}-${year}-${month}-${i}`);
      if (savedImage) {
        const img = document.createElement('img');
        img.src = savedImage;
        img.addEventListener('click', () => showImageModal(savedImage));
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
        img.addEventListener('click', () => showImageModal(e.target.result));
        img.style.width = '100%';
        selectedDay.dayCell.appendChild(img);

        localStorage.setItem(`photo-${username}-${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`, e.target.result);
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

  function showImageModal(imageSrc) {
    modal.style.display = "block";
    modalImg.src = imageSrc;
  }

  closeModal.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  toggleTheme.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Inizialmente nascondiamo il calendario finché l'utente non
