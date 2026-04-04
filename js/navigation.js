// navigation.js

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu li a');

  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
  }

 
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('show');
    });
  });

  
  const visitedPages = JSON.parse(sessionStorage.getItem('visitedPages')) || [];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';


  if (!visitedPages.includes(currentPage)) {
    visitedPages.push(currentPage);
    sessionStorage.setItem('visitedPages', JSON.stringify(visitedPages));
  }

 
  navLinks.forEach(link => {
    link.classList.remove('active', 'visited');

    const href = link.getAttribute('href');
    const linkPage = href.split('/').pop().split('#')[0];

    if (linkPage === currentPage) {
      
      link.classList.add('active');
    } else if (visitedPages.includes(linkPage)) {
      
      link.classList.add('visited');
    }
  
  });
});

(function () {
  const panels = Array.from(document.querySelectorAll('.gallery-panel'));
  let order = [0, 1, 2, 3];

  const slotStyles = [
    // left
    {
      transform: 'perspective(900px) rotateY(32deg) translateX(-38%) scale(0.82)',
      zIndex: '1',
      opacity: '1',
      clipPath: 'polygon(0 0, 100% 4%, 100% 96%, 0 100%)',
      cursor: 'pointer',
      display: 'block'
    },
    // center
    {
      transform: 'perspective(900px) rotateY(0deg) translateX(0%) scale(1)',
      zIndex: '3',
      opacity: '1',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      cursor: 'default',
      display: 'block'
    },
    // right
    {
      transform: 'perspective(900px) rotateY(-32deg) translateX(38%) scale(0.82)',
      zIndex: '1',
      opacity: '1',
      clipPath: 'polygon(0 4%, 100% 0, 100% 100%, 0 96%)',
      cursor: 'pointer',
      display: 'block'
    },
    // hidden 
    {
      transform: 'perspective(900px) rotateY(0deg) scale(0.5)',
      zIndex: '0',
      opacity: '0',
      clipPath: 'none',
      cursor: 'default',
      display: 'none'
    }
  ];

  function applyLayout(animate) {
    panels.forEach((panel, panelIdx) => {
      const slot = order.indexOf(panelIdx);
      const s = slotStyles[slot];
      panel.style.transition = animate
        ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease, clip-path 0.5s ease'
        : 'none';
      panel.style.transform     = s.transform;
      panel.style.zIndex        = s.zIndex;
      panel.style.opacity       = s.opacity;
      panel.style.clipPath      = s.clipPath;
      panel.style.cursor        = s.cursor;
      panel.style.display       = s.display;
    });
  }

  applyLayout(false);

  panels.forEach((panel, panelIdx) => {
    panel.addEventListener('click', () => {
      const slot = order.indexOf(panelIdx);
      if (slot === 1) return; 

      if (slot === 0) {
        
        order.unshift(order.pop());
      } else if (slot === 2) {
        order.push(order.shift());
      }
      applyLayout(true);
    });
  });
})();

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-icon').textContent = '+';
    });

    // open 
    if (!isOpen) {
      item.classList.add('open');
      btn.querySelector('.faq-icon').textContent = '×';
    }
  });
});

// ===== CUSTOM ALERT FOR CONTACT FORM =====
document.addEventListener('DOMContentLoaded', function() {
  const submitBtn = document.querySelector('.contact-submit-btn');
  const fullNameInput = document.querySelector('.contact-field input[type="text"]');
  const emailInput = document.querySelector('.contact-field input[type="email"]');
  const messageTextarea = document.querySelector('.contact-field textarea');
  const alertOverlay = document.getElementById('customAlert');
  const closeAlertBtn = document.getElementById('closeAlertBtn');

  function showCustomAlert() {
    if (alertOverlay) {
      alertOverlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function hideCustomAlert() {
    if (alertOverlay) {
      alertOverlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  if (closeAlertBtn) closeAlertBtn.addEventListener('click', hideCustomAlert);
  if (alertOverlay) {
    alertOverlay.addEventListener('click', function(e) {
      if (e.target === alertOverlay) hideCustomAlert();
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const fullName = fullNameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const message = messageTextarea?.value.trim() || '';
      
      let hasError = false;
      let errorMsg = '';
      
      if (!fullName) {
        hasError = true;
        errorMsg = 'Please enter your full name.';
        if (fullNameInput) fullNameInput.style.border = '2px solid #d9534f';
      } else if (fullNameInput) fullNameInput.style.border = '';
      
      if (!email) {
        hasError = true;
        errorMsg = errorMsg || 'Please enter your email address.';
        if (emailInput) emailInput.style.border = '2px solid #d9534f';
      } else if (!isValidEmail(email)) {
        hasError = true;
        errorMsg = 'Please enter a valid email address.';
        if (emailInput) emailInput.style.border = '2px solid #d9534f';
      } else if (emailInput) emailInput.style.border = '';
      
      if (!message) {
        hasError = true;
        errorMsg = errorMsg || 'Please write your message/inquiry.';
        if (messageTextarea) messageTextarea.style.border = '2px solid #d9534f';
      } else if (messageTextarea) messageTextarea.style.border = '';
      
      if (hasError) {
        alert(errorMsg);
        return;
      }
      
      // Clear form
      if (fullNameInput) fullNameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (messageTextarea) messageTextarea.value = '';
      
      showCustomAlert();
    });
  }
});
// ===== BOOKING PAGE VALIDATION =====
(function() {
  
  setTimeout(function() {
    const submitBtn = document.querySelector('.booking-submit-btn');
    if (!submitBtn) return;

    console.log('Booking button found');

    
    const alertOverlay = document.getElementById('bookingAlert');
    const closeAlertBtn = document.getElementById('closeBookingAlert');

    console.log('Alert overlay found:', alertOverlay);

    function showAlert(message, type = 'success') {
      if (alertOverlay) {
        const card = alertOverlay.querySelector('.custom-alert-card');
        const icon = alertOverlay.querySelector('.alert-icon i');
        const title = alertOverlay.querySelector('.alert-title');
        const msg = alertOverlay.querySelector('.alert-message');
        
        card.classList.remove('error', 'warning');
        if (type === 'error') {
          card.classList.add('error');
          icon.className = 'fas fa-exclamation-circle';
          title.textContent = 'Error!';
        } else if (type === 'warning') {
          card.classList.add('warning');
          icon.className = 'fas fa-exclamation-triangle';
          title.textContent = 'Incomplete Form';
        } else {
          icon.className = 'fas fa-check-circle';
          title.textContent = 'Message Sent!';
        }
        msg.textContent = message;
        alertOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        console.log('Modal shown!');
      } else {
        console.log('Modal not found, using browser alert');
        alert(message);
      }
    }

    function hideAlert() {
      if (alertOverlay) {
        alertOverlay.classList.remove('show');
        document.body.style.overflow = '';
      }
    }

    if (closeAlertBtn) {
      closeAlertBtn.addEventListener('click', hideAlert);
    }
    
    if (alertOverlay) {
      alertOverlay.addEventListener('click', function(e) {
        if (e.target === alertOverlay) hideAlert();
      });
    }

    // Get form fields by ID
    const fullNameInput = document.getElementById('bookFullName');
    const contactInput = document.getElementById('bookContact');
    const emailInput = document.getElementById('bookEmail');
    const eventDateInput = document.getElementById('bookEventDate');
    const eventTimeInput = document.getElementById('bookEventTime');
    const venueInput = document.getElementById('bookVenue');
    const guestsInput = document.getElementById('bookGuests');
    const budgetInput = document.getElementById('bookBudget');
    const packageSelect = document.getElementById('bookPackage');

    function isValidEmail(email) {
      return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
    }

    function isValidContact(contact) {
      const digits = contact.replace(/[^0-9]/g, '');
      return digits.length >= 10 && digits.length <= 13;
    }

    function isValidFutureDate(dateStr) {
      const parts = dateStr.split('/');
      if (parts.length !== 3) return false;
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      if (isNaN(month) || isNaN(day) || isNaN(year)) return false;
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate >= today;
    }

    function isValidTime(timeStr) {
      return /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(timeStr);
    }

    function isValidGuests(guests) {
      const num = parseInt(guests, 10);
      return !isNaN(num) && num >= 1 && num <= 1000;
    }

    function removeError(input) {
      if (input) input.style.border = '';
    }

    function addError(input) {
      if (input) input.style.border = '2px solid #d9534f';
    }

   
    const allInputs = [fullNameInput, contactInput, emailInput, eventDateInput, eventTimeInput, venueInput, guestsInput, budgetInput, packageSelect];
    allInputs.forEach(input => {
      if (input) input.addEventListener('input', () => removeError(input));
    });

    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Submit clicked');
      
      let hasError = false;
      let errorMsg = '';

      if (!fullNameInput?.value.trim()) { hasError = true; addError(fullNameInput); } 
      else { removeError(fullNameInput); }

      if (!contactInput?.value.trim()) { hasError = true; addError(contactInput); }
      else if (!isValidContact(contactInput.value.trim())) { hasError = true; errorMsg = 'Please enter a valid contact number.'; addError(contactInput); }
      else { removeError(contactInput); }

      if (!emailInput?.value.trim()) { hasError = true; addError(emailInput); }
      else if (!isValidEmail(emailInput.value.trim())) { hasError = true; errorMsg = 'Please enter a valid email address.'; addError(emailInput); }
      else { removeError(emailInput); }

      if (!eventDateInput?.value.trim()) { hasError = true; addError(eventDateInput); }
      else if (!isValidFutureDate(eventDateInput.value.trim())) { hasError = true; errorMsg = 'Please select a future date for your event.'; addError(eventDateInput); }
      else { removeError(eventDateInput); }

      if (!eventTimeInput?.value.trim()) { hasError = true; addError(eventTimeInput); }
      else if (!isValidTime(eventTimeInput.value.trim())) { hasError = true; errorMsg = 'Please enter a valid time (e.g., 10:30 AM).'; addError(eventTimeInput); }
      else { removeError(eventTimeInput); }

      if (!venueInput?.value.trim()) { hasError = true; addError(venueInput); }
      else { removeError(venueInput); }

      if (!guestsInput?.value.trim()) { hasError = true; addError(guestsInput); }
      else if (!isValidGuests(guestsInput.value.trim())) { hasError = true; errorMsg = 'Please enter a valid number of guests (minimum 1).'; addError(guestsInput); }
      else { removeError(guestsInput); }

      if (!budgetInput?.value.trim()) { hasError = true; addError(budgetInput); }
      else { removeError(budgetInput); }

      if (!packageSelect?.value || packageSelect.value === 'Select Package') { hasError = true; addError(packageSelect); }
      else { removeError(packageSelect); }

      if (hasError) {
        showAlert(errorMsg || 'Please fill out all required fields.', errorMsg ? 'error' : 'warning');
        return;
      }

      // Clear form
      if (fullNameInput) fullNameInput.value = '';
      if (contactInput) contactInput.value = '';
      if (emailInput) emailInput.value = '';
      if (eventDateInput) eventDateInput.value = '';
      if (eventTimeInput) eventTimeInput.value = '';
      if (venueInput) venueInput.value = '';
      if (guestsInput) guestsInput.value = '';
      if (budgetInput) budgetInput.value = '';
      if (packageSelect) packageSelect.selectedIndex = 0;

      showAlert('Thank you! Your reservation has been received. We\'ll get back to you soon.', 'success');
    });
  }, 100); 
})();