document.addEventListener('DOMContentLoaded', () => {
  const listItems = document.querySelectorAll('section.card-container article.card ul li');

  function parseDateFromText(text) {
    // Extract date in format dd/mm or dd/mm/yyyy from text
    const dateRegex = /(\d{2})\/(\d{2})(?:\/(\d{4}))?/;
    const match = text.match(dateRegex);
    if (!match) return null;
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // JS months 0-based
    const year = match[3] ? parseInt(match[3], 10) : new Date().getFullYear();
    return new Date(year, month, day);
  }

  function daysBetween(date1, date2) {
    const diffTime = date1.getTime() - date2.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const today = new Date();
  listItems.forEach(li => {
    const dueDate = parseDateFromText(li.textContent);
    if (!dueDate) return;

    const daysLeft = daysBetween(dueDate, today);

    if (daysLeft < 0) {
      // Past due date
      li.classList.add('due-past');
    } else if (daysLeft <= 2) {
      // Due very soon
      li.classList.add('due-soon');
    } else if (daysLeft <= 7) {
      // Due in medium time
      li.classList.add('due-medium');
    } else {
      // Due later
      li.classList.add('due-late');
    }
  });
});


// Botão para alternar tema claro/escuro
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('botao-tema');
    const body = document.body;

    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    };

    const toggleTheme = () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    };

    themeToggleButton.addEventListener('click', toggleTheme);

    applySavedTheme();
});