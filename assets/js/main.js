/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

// Theme toggle functionality
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtain the current theme by validating the dark-theme class
const getCurrentTheme = () => document.body.getAttribute('data-theme') === darkTheme ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// Validate if the user previously chose a topic
if (selectedTheme) {
    // Set the theme and icon based on the stored preference
    document.body.setAttribute('data-theme', selectedTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'remove' : 'add'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Toggle the dark theme
    document.body.setAttribute('data-theme', getCurrentTheme() === 'dark' ? 'light' : 'dark')
    themeButton.classList.toggle(iconTheme)
    
    // Save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 



// Contact form configuration
const FORM_CONFIG = {
    scriptUrl: 'https://script.google.com/macros/s/AKfycbxwJzIG4OVhHbZay8_UIxt_YggJbEc6FKuKNeUaFMHS3rR3vu7IrTGL00JKwvZCLaD9MQ/exec', // Replace with your Google Apps Script URL
    formId: 'contactForm',
  };
  
  // Contact form handler
  function initContactForm() {
    const form = document.getElementById(FORM_CONFIG.formId);
    if (!form) return;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      };
  
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
  
      try {
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
  
        // Send data to Google Apps Script
        const response = await fetch(FORM_CONFIG.scriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(data),
        });
  
        const responseText = await response.text();
        console.log('Server Response:', responseText);
  
        if (responseText !== 'Success') {
          throw new Error(responseText || 'Failed to submit the form');
        }
  
        // Reset form and show success message
        form.reset();
        alert('Thank you! Your message has been sent successfully.');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Sorry, there was an error sending your message. Please try again later.');
      } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }
  
  // Initialize the contact form when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initContactForm);

/*===== CERTIFICATE SLIDER NAVIGATION =====*/
document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.getElementById('sliderContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!sliderContainer || !prevBtn || !nextBtn) return;
  
  const items = sliderContainer.querySelectorAll('.certification-item');
  const gap = 20; // gap from CSS
  let currentIndex = 0;
  const maxIndex = items.length - 1;
  
  // Get item width dynamically
  const getItemWidth = () => {
    if (items.length === 0) return 300;
    const firstItem = items[0];
    const computedStyle = window.getComputedStyle(firstItem);
    return firstItem.offsetWidth + parseInt(computedStyle.marginLeft || 0) + parseInt(computedStyle.marginRight || 0);
  };
  
  // Calculate how many items are visible
  const getVisibleItems = () => {
    const wrapper = sliderContainer.parentElement;
    const containerWidth = wrapper.offsetWidth;
    const itemWidth = getItemWidth();
    return Math.max(1, Math.floor(containerWidth / (itemWidth + gap)));
  };
  
  const updateSlider = () => {
    const itemWidth = getItemWidth();
    const itemWidthWithGap = itemWidth + gap;
    const translateX = -currentIndex * itemWidthWithGap;
    sliderContainer.style.transform = `translateX(${translateX}px)`;
    
    // Disable/enable buttons based on position
    const visibleItems = getVisibleItems();
    const maxScrollIndex = Math.max(0, maxIndex - visibleItems + 1);
    
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    prevBtn.disabled = currentIndex === 0;
    
    nextBtn.style.opacity = currentIndex >= maxScrollIndex ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentIndex >= maxScrollIndex ? 'none' : 'auto';
    nextBtn.disabled = currentIndex >= maxScrollIndex;
  };
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    const visibleItems = getVisibleItems();
    const maxScrollIndex = Math.max(0, maxIndex - visibleItems + 1);
    if (currentIndex < maxScrollIndex) {
      currentIndex++;
      updateSlider();
    }
  });
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Reset to start if current position is invalid
      const visibleItems = getVisibleItems();
      const maxScrollIndex = Math.max(0, maxIndex - visibleItems + 1);
      if (currentIndex > maxScrollIndex) {
        currentIndex = maxScrollIndex;
      }
      updateSlider();
    }, 250);
  });
  
  // Initialize
  updateSlider();
});

/*===== TYPING ANIMATION =====*/
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const phrases = [
    'Artificial Intelligence',
    'Machine Learning',
    'Generative AI',
    'AI Agents',
    'Frontend Development'
  ];

  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100; // Speed of typing (ms)
  let deletingSpeed = 50; // Speed of deleting (ms)
  let pauseTime = 2000; // Pause time after completing a phrase (ms)

  function typeText() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting && currentCharIndex < currentPhrase.length) {
      // Typing forward
      typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      setTimeout(typeText, typingSpeed);
    } else if (!isDeleting && currentCharIndex === currentPhrase.length) {
      // Finished typing, pause before deleting
      isDeleting = true;
      setTimeout(typeText, pauseTime);
    } else if (isDeleting && currentCharIndex > 0) {
      // Deleting backward
      typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      setTimeout(typeText, deletingSpeed);
    } else if (isDeleting && currentCharIndex === 0) {
      // Finished deleting, move to next phrase
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      setTimeout(typeText, 500); // Small delay before starting next phrase
    }
  }

  // Start the typing animation
  typeText();
});

/*===== MOBILE FLIP CARD SUPPORT =====*/
document.addEventListener('DOMContentLoaded', () => {
  // Function to detect if device is touch-enabled
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || 
           (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  };

  // Handle project cards
  const projectCards = document.querySelectorAll('.project__card');
  projectCards.forEach(card => {
    const cardInner = card.querySelector('.project__card-inner');
    const links = card.querySelectorAll('.project__link');
    
    // Only add touch support if it's a touch device
    if (isTouchDevice()) {
      let isFlipped = false;
      
      // Toggle flip on card click/touch (but allow links to work when flipped)
      cardInner.addEventListener('click', (e) => {
        // If clicking on a link and card is already flipped, let the link work
        if (e.target.closest('.project__link') && isFlipped) {
          return; // Allow normal link behavior
        }
        
        // If clicking on a link but card is not flipped, flip it first
        if (e.target.closest('.project__link') && !isFlipped) {
          e.preventDefault();
          e.stopPropagation();
          isFlipped = true;
          cardInner.style.transform = 'rotateY(180deg)';
          card.classList.add('flipped');
          return;
        }
        
        // Toggle flip for any other click on the card
        isFlipped = !isFlipped;
        if (isFlipped) {
          cardInner.style.transform = 'rotateY(180deg)';
          card.classList.add('flipped');
        } else {
          cardInner.style.transform = 'rotateY(0deg)';
          card.classList.remove('flipped');
        }
      });
    }
  });

  // Handle publication cards
  const publicationCards = document.querySelectorAll('.publication__card');
  publicationCards.forEach(card => {
    const cardInner = card.querySelector('.publication__card-inner');
    const links = card.querySelectorAll('.publication__link');
    
    // Only add touch support if it's a touch device
    if (isTouchDevice()) {
      let isFlipped = false;
      
      // Toggle flip on card click/touch (but allow links to work when flipped)
      cardInner.addEventListener('click', (e) => {
        // If clicking on a link and card is already flipped, let the link work
        if (e.target.closest('.publication__link') && isFlipped) {
          return; // Allow normal link behavior
        }
        
        // If clicking on a link but card is not flipped, flip it first
        if (e.target.closest('.publication__link') && !isFlipped) {
          e.preventDefault();
          e.stopPropagation();
          isFlipped = true;
          cardInner.style.transform = 'rotateY(180deg)';
          card.classList.add('flipped');
          return;
        }
        
        // Toggle flip for any other click on the card
        isFlipped = !isFlipped;
        if (isFlipped) {
          cardInner.style.transform = 'rotateY(180deg)';
          card.classList.add('flipped');
        } else {
          cardInner.style.transform = 'rotateY(0deg)';
          card.classList.remove('flipped');
        }
      });
    }
  });
});
  