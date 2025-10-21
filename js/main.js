let toggle = document.querySelector('.nav-toggle');
let menu = document.querySelector('.nav-menu');

// if (!toggle || !menu) {
//     console.log('⚠️ Nav toggle or menu not found in DOM.');
//   }
console.log(toggle);
console.log(menu);

toggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('open');
  });

menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  console.log("Navigation menu script loaded.");