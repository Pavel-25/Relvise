"use strict"

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');
	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}
} else {
	document.body.classList.add('_pc');
}

//прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto], .menu__sub-link[data-goto]');
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            if(iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
		        iconMenu.classList.remove('_active');
		        menuBody.classList.remove('_active');
            }
            window.scrollTo({
                top: gotoBlockValue,
                behavior:"smooth"
            });
            e.preventDefault();
        }
    }
    
}

//анимация title

const animItems = document.querySelectorAll('._anim-items');  //класс для тайтла
if(animItems.length > 0) {
	window.addEventListener('scroll', animOnSroll);
	function animOnSroll(params) {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if(animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight  / animStart;
			}

			if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('text_active'); //класс анимации
			} else{
				if(!animItem.classList.contains('_anim-items-noreplay')) { //убираем повторную анимацию
					animItem.classList.remove('text_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
	}

	setTimeout(() => {
		animOnSroll();
	}, 500); //задержка при появлении
	
}

// меню бургер 

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}
//настройка слайдера для логотипов

$(document).ready(function() {
	$('.slider').slick({
		arrows:false,
		dots:true,
		slidesToShow:5,
		autoplay:true,
		speed:1500,
		autoplaySpeed:500,
		waitForAnimate:true,
		responsive:[
			{
				breakpoint: 992,
				settings:{
					slidesToShow:4
				}
			},
			{
				breakpoint: 767,
				settings:{
					slidesToShow:3,
					autoplaySpeed:1000,
				}
			},
			{
				breakpoint: 500,
				settings:{
					slidesToShow:2
				}
			}
		]
	});
})

//анимация цифр

var check = 1;
var target = $('.experience__column'); // класс блока для запуска анимации
var targetPos = target.offset().top;
var winHeight = $(window).height();
var scrollToElem = targetPos - winHeight;

$(window).scroll(function() {
  var winScrollTop = $(this).scrollTop();
  if(winScrollTop > scrollToElem && check) {
    $('.number').each(function() {     // класс тега с цифрами
      $(this).prop('Counter', -1).animate({
        Counter: $(this).text()
      },{
        duration: 2500, 
        easing: 'swing',
        step: function(now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
    check = 0;
  }
});

//всплывающее окно

$(document).ready(function(){
	showStartModal();
});

function showStartModal() {
	setTimeout(function() {
		$('#modal1').modal('show');
		$('#modal-yes-btn').on('click', function(){
			$('#modal1').modal('hide');
		})
	}, 10000);
}