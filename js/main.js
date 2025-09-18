'use strict';

// Бурген меню
const burgerMenuElement = document.getElementById('burger-menu');
const mobileNavElement = document.getElementById('mobile-nav');

burgerMenuElement.addEventListener('click', function () {
	burgerMenuElement.classList.toggle('selected');
	if (burgerMenuElement.classList.contains('selected')) {
		document.body.classList.add('body-lock');
		mobileNavElement.classList.add('selected');
	} else {
		mobileNavElement.classList.remove('selected');
		document.body.classList.remove('body-lock');
	}
});

// Акордеон
const mobileNavParentLinkElements =
	document.querySelectorAll('.list-parent__link');
console.log(mobileNavParentLinkElements);
mobileNavParentLinkElements.forEach(function (el) {
	el.addEventListener('click', function () {
		el.classList.toggle('selected');
		const content = el.nextElementSibling;
		if (el.classList.contains('selected')) {
			content.style.maxHeight = content.scrollHeight + 'px';
		} else {
			content.style.maxHeight = '0';
		}
	});
});

//Запит до json файлу та рендер карток з товарами
fetch('./../data/products.json')
	.then((response) => response.json())
	.then((data) => {
		const cardContainerElement = document.getElementById('card-container');

		data.forEach((product) => {
			cardContainerElement.insertAdjacentHTML(
				'beforeend',
				templateCard(product)
			);
		});
		// зміна кольору сердечок на картках з товаром
		// const favButtonElements = document.querySelectorAll('.card__fav-button');
		// console.log(favButtonElements);
		// favButtonElements.forEach(function (el) {
		// 	el.addEventListener('click', function () {
		// 		console.log('ura');
		// 	});
		// });
		// cardContainerElement.addEventListener('click', function (e) {
		// 	if (e.target.closest('.card__fav-button')) {
		// 		console.log('ura');
		// 	}
		// });
		document
			.getElementById('card-container')
			.addEventListener('click', function (e) {
				const button = e.target.closest('.card__fav-button');
				if (button) {
					const icon = button.querySelector('.card__icon');
					icon.classList.toggle('selected');
				}
			});
	})
	.catch((err) => console.error('Помилка завантаження JSON:', err));

function templateCard(card) {
	const colorsHTML = card.colors
		.map((color) => `<div class="card__color card__color--${color}"></div>`)
		.join('');

	return `<div class="swiper-slide">
				<article class="best-sellers__card card">
					<div class="card__image">
						<img
							src="./image/best/best-${card.img}.avif"
							srcset="
								./image/best/best-${card.img}.avif    1x,
								./image/best/best-${card.img}@2x.avif 2x
							"
							alt="${card.title}" />
					</div>
					<button type="button" class="card__fav-button">
						<svg class="card__icon icon icon--favorite">
							<use xlink:href="#favorite"></use>
						</svg>
					</button>
					<div class="card__body">
						<a href="#!" class="card__product-name">
							${card.title}
						</a>
						<div class="card__row-descr-price">
							<div class="card__descr">${card.descr}</div>
							<div class="card__price">$${card.price}</div>
						</div>
						<div class="card__row-color">
							${colorsHTML}
						</div>
					</div>
				</article>
				</div>`;
}
// Налаштування Swiper слайдер
const swiper = new Swiper('.swiper', {
	slidesPerView: 2,
	spaceBetween: 16,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		771: {
			slidesPerView: 3,
			spaceBetween: 24,
		},
	},
});
