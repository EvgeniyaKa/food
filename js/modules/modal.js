function showModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    
    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
 };
 
 function closeModal(modalSelector) {
     const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
 };

function modal(treggerSelector, modalSelector, modalTimerId) {
     // Modal

     const trigger = document.querySelectorAll(treggerSelector),
     modalWindow = document.querySelector(modalSelector);
    //  btnClose = document.querySelector('[data-close]');
   

trigger.forEach(item => {
       item.addEventListener('click', () => showModal(modalSelector, modalTimerId));
   });

// btnClose.addEventListener('click', () => closeModal(modalSelector));

modalWindow.addEventListener('click', (e) => {
   if(e.target === modalWindow || e.target.getAttribute('data-close') == '') {
       closeModal(modalSelector);
   };
});

document.addEventListener('keydown', (e) => {
   if(e.code === "Escape" && modalWindow.classList.contains('show')) {
       closeModal(modalSelector);
   }
});

// const modalTimer = setTimeout(showModal, 10000);

function showModalByScroll() {
   if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
       showModal(modalSelector, modalTimerId);
       window.removeEventListener('scroll', showModalByScroll);
   }
}

window.addEventListener('scroll', showModalByScroll);

};

export default modal;
export {showModal};
export {closeModal};