
$(document).ready(function() {

	$('.header__bottom__container__left__consult--right').on('click', function(){
		$('.header__bottom__container__left__consult--send-cv').slideToggle(100);
	});

	$('.header__bottom__container__right__about__item--left').on('mouseenter', function() {
		$('.header__bottom__container__right__about__item--right.active').removeClass('active');
		$(this).next().addClass('active');
	});

	(function() {
		function prof( element ) {
			$('.professions__salary').css('opacity', '0');
			$('#professions-list li span.active').removeClass('active');
			var professionStart = element.find('span').addClass('active');
			$('.professions__salary .professions__salary__selected--prof').text(professionStart.text());
			$('.professions__salary .professions__salary__selected--sal').text(professionStart.data('cost'));
			$('.professions__salary').animate({opacity: 1},400);
		}
		prof($('#professions-list li').eq(0));

		$('#professions-list li').on('click', function(){
			prof( $(this) );
		});
	})();

	function addBodyEventCloseSlide( element, close_fn ) {
		var element_class = element.attr('class');
		var random_s = Math.random().toString(36).substring(7);

		$('body').on('click.'+random_s,function(e) {
			if ( $(e.target).is(element) || $(e.target).closest('.' + element_class).is(element) ) {
				return false;
			} else {

				$('body').unbind('click.'+random_s);
				close_fn();
			}
		});
	}

	$('.consult--right').on('click', function(e) {
		e.stopPropagation();

		var consult = $(this).closest('.consult');

		if( consult.hasClass('js-active') ) {
			consult.removeClass('js-active');
			consult.find('.consult--send-cv').slideUp(100);
		} else {
			consult.addClass('js-active');
			consult.find('.consult--send-cv').slideDown(100);
			addBodyEventCloseSlide( consult, function(){
				consult.removeClass('js-active');
				consult.find('.consult--send-cv').slideUp(100);
			} );
		}


	});

	$('.questions__wrap__link li').on('click', function(){
		var curIndex = $(this).index();
		var tabContent = $('.questions__wrap__content li').eq(curIndex);

		$('.questions__wrap__link li.js-active').removeClass('js-active');
		$(this).addClass('js-active');

		$('.questions__wrap__content li.js-active').removeClass('js-active').css('display','none');
		tabContent.addClass('js-active').css('display','flex');
	});

	function initMap() {
		var uluru = {lat: -25.363, lng: 131.044};
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 4,
			center: uluru
		});
		var marker = new google.maps.Marker({
			position: uluru,
			map: map
		});
	}

});
