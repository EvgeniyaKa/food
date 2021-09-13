function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
    // Слайдер 

    const prev = document.querySelector(prevArrow),
    slider = document.querySelector(container),
    next = document.querySelector(nextArrow),
    sliderImg = document.querySelectorAll(slide),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slidsWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidsWrapper).width;
let sliderIndex = 1;

//slider 2
let offset = 0;
if(sliderImg.length < 10) {
  total.textContent = `0${sliderImg.length}`;
  current.textContent = `0${sliderIndex}`;
} else {
  total.textContent = sliderImg.length;
  current.textContent = sliderIndex;
}

slidesField.style.width = 100 * sliderImg.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidsWrapper.style.overflow = 'hidden';


sliderImg.forEach(item => {
  item.style.width = width;
})

slider.style.position = 'relative';
const indicators = document.createElement('ol'),
    dots = [];

indicators.classList.add('carousel-indicators');

slider.append(indicators);

for(let i = 0; i < sliderImg.length; i++) {
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i + 1);
  dot.classList.add('dot');
  if(i == 0) {
      dot.style.opacity = 1;
  }
  indicators.append(dot);
  dots.push(dot);
}

function deleteNotDigits(str) {
  return +str.replace(/\D/g, '');
}
  next.addEventListener('click', () => {
      if(offset == deleteNotDigits(width) * (sliderImg.length - 1)) {
          offset = 0;
      } else {
          offset += deleteNotDigits(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (sliderIndex == sliderImg.length) {
          sliderIndex = 1;
      } else {
          sliderIndex++;
      }

      if(sliderImg.length < 10) {
          current.textContent = `0${sliderIndex}`;
      } else {
          current.textContent = sliderIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[sliderIndex - 1].style.opacity = 1;
  });

  prev.addEventListener('click', () => {
      if(offset == 0) {
          offset = deleteNotDigits(width) * (sliderImg.length - 1);
      } else {
          offset -= deleteNotDigits(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (sliderIndex == 1) {
          sliderIndex = sliderImg.length;
      } else {
          sliderIndex--;
      }

      if(sliderImg.length < 10) {
          current.textContent = `0${sliderIndex}`;
      } else {
          current.textContent = sliderIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[sliderIndex - 1].style.opacity = 1;
  });

  dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
          const slideTo = e.target.getAttribute('data-slide-to');
          slideIndex = slideTo;
          offset = deleteNotDigits(width) * (slideTo - 1);

          slidesField.style.transform = `translateX(-${offset}px)`;

          if(sliderImg.length < 10) {
              current.textContent = `0${sliderIndex}`;
          } else {
              current.textContent = sliderIndex;
          }
          dots.forEach(dot => dot.style.opacity = '.5');
          dots[sliderIndex - 1].style.opacity = 1;
      });
  });

  function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
  }

// Слайдер 1
// let sliderIndex = 1;

// showSlides(sliderIndex);

// if(sliderImg.length < 10) {
//     total.textContent = `0${sliderImg.length}`;
// } else {
//     total.textContent = sliderImg.length;
// }
// function showSlides(n) {
//     if (n > sliderImg.length) {
//         sliderIndex = 1;
//     }

//     if (n < 1) {
//         sliderIndex = sliderImg.length;
//     }

//     sliderImg.forEach(item => item.style.display = 'none');

//     sliderImg[sliderIndex - 1].style.display = 'block';

//     if(sliderImg.length < 10) {
//         current.textContent = `0${sliderIndex}`;
//     } else {
//         current.textContent = sliderIndex;
//     }
// }

// function plusSlides (n) {
//     showSlides(sliderIndex += n);
// }

// prev.addEventListener('click', () => {
//     plusSlides(-1);
// })

// next.addEventListener('click', () => {
//     plusSlides(1);
// })

};

export default slider;