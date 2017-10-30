
$(document).ready(function() {

	$('.header__bottom__container__left__consult--right').on('click', function(){
		$('.header__bottom__container__left__consult--send-cv').slideToggle(100);
	});

	$('.header__bottom__container__right__about__item--left').on('mouseenter', function() {
		$('.header__bottom__container__right__about__item--right.active').removeClass('active');
		$(this).next().addClass('active');
	});

});
