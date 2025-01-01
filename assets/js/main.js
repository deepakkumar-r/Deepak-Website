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
  