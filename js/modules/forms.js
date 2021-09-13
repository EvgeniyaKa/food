import {closeModal, showModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
     // Forms

     const forms = document.querySelectorAll(formSelector);

     const message = {
         loading: 'img/form/spinner.svg',
         success: 'Спасибо! Скоро мы свяжемся с вами',
         failure: 'Что-то пошло не так...'
     };
 
     forms.forEach(item => {
         bindPostData(item);
     });
 
     function bindPostData(form) {
         form.addEventListener('submit', (e) => {
             e.preventDefault();
 
             let statusMessage = document.createElement('img');
             statusMessage.src = message.loading;
             statusMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
             // statusMessage.textContent = message.loading;
             // form.append(statusMessage);
             form.insertAdjacentElement('afterend', statusMessage);
 
             // const request = new XMLHttpRequest(); //XMLHttpRequest
             // request.open('POST', 'server.php');  //XMLHttpRequest
             const formData = new FormData(form);
 
             // отправка в формате json
 
             // const obj = {};
             // formData.forEach(function(value, key) {
             //     obj[key] = value;
             // });
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
             // fetch('server.php', {
             //     method: "POST",
             //     headers: {
             //         'Content-type': 'application/json'
             //     },
             //     body: JSON.stringify(obj)
                 
             // })
             postData('http://localhost:3000/requests', json)
             .then(data => {
                 console.log(data);
                 showThanksModal(message.success)
                 statusMessage.remove();
             }).catch(() => {
                 showThanksModal(message.failure)
             }).finally(() => {
                 form.reset();
             });
             // request.setRequestHeader('Content-type', 'application/json'); //XMLHttpRequest   
             // const formData = new FormData(form);
 
             // отправка в формате json
 
             // const obj = {};
             // formData.forEach(function(value, key) {
             //     obj[key] = value;
             // });
 
             // const json = JSON.stringify(obj);
             // //
             // request.send(json);
 
             // request.addEventListener('load', () => {
             //     if(request.status === 200) {
             //         // statusMessage.textContent = message.success;
             //         console.log(request.response);
             //         showThanksModal(message.success)
             //         form.reset();
             //         statusMessage.remove();
             //         // setTimeout(() => {
             //         //     statusMessage.remove();
             //         // }, 2000);
             //     } else {
             //         // statusMessage.textContent = message.failure; 
             //         showThanksModal(message.failure)
             //     }
             // })
         });
     }
 
     function showThanksModal (message) {
         const prevModalDilog = document.querySelector('.modal__dialog');
     
         prevModalDilog.classList.add('hide');
         showModal('.modal', modalTimerId);
 
         const thenksModal = document.createElement('div');
         thenksModal.classList.add('modal__dialog');
         thenksModal.innerHTML = `
             <div class="modal__content">
                 <div class="modal__close" data-close>&times;</div>
                 <div class="modal__title">${message}</div>
             </div>
         `;
 
         document.querySelector('.modal').append(thenksModal);
         setTimeout(() => {
             thenksModal.remove();
             prevModalDilog.classList.add('show');
             prevModalDilog.classList.remove('hide');
             closeModal('.modal');
         }, 4000);
     };
 
    //  fetch('http://localhost:3000/menu')
    //      .then(data => data.json())
    //      .then(res => console.log(res))
 
};

export default forms;