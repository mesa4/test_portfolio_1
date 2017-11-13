$(document).ready(function() {

	$('.header__bottom__container__left__consult--right').on('click', function() {
		$('.header__bottom__container__left__consult--send-cv').slideToggle(100);
	});

	$('.header__bottom__container__right__about__item--left').on('mouseenter', function() {
		$('.header__bottom__container__right__about__item--right.active').removeClass('active');
		$(this).next().addClass('active');
	});

	(function() {
		function prof(element) {
			$('.professions__salary').css('opacity', '0');
			$('#professions-list li span.active').removeClass('active');
			var professionStart = element.find('span').addClass('active');
			$('.professions__salary .professions__salary__selected--prof').text(professionStart.text());
			$('.professions__salary .professions__salary__selected--sal').text(professionStart.data('cost'));
			$('.professions__salary').animate({ opacity: 1 }, 400);
		}

		prof($('#professions-list li').eq(0));

		$('#professions-list li').on('click', function() {
			prof($(this));
		});
	})();

	function addBodyEventCloseSlide(element, close_fn) {
		var element_class = element.attr('class');
		var random_s = Math.random().toString(36).substring(7);

		$('body').on('click.' + random_s, function(e) {
			if ($(e.target).is(element) || $(e.target).closest('.' + element_class).is(element)) {
				return false;
			} else {

				$('body').unbind('click.' + random_s);
				close_fn();
			}
		});
	}

	$('.consult--right').on('click', function(e) {
		e.stopPropagation();

		var consult = $(this).closest('.consult');

		if (consult.hasClass('js-active')) {
			consult.removeClass('js-active');
			consult.find('.consult--send-cv').slideUp(100);
		} else {
			consult.addClass('js-active');
			consult.find('.consult--send-cv').slideDown(100);
			addBodyEventCloseSlide(consult, function() {
				consult.removeClass('js-active');
				consult.find('.consult--send-cv').slideUp(100);
			});
		}


	});

	$('.questions__wrap__link li').on('click', function() {
		var curIndex = $(this).index();
		var tabContent = $('.questions__wrap__content li').eq(curIndex);

		$('.questions__wrap__link li.js-active').removeClass('js-active');
		$(this).addClass('js-active');

		$('.questions__wrap__content li.js-active').removeClass('js-active').css('display', 'none');
		tabContent.addClass('js-active').css('display', 'flex');
	});

	function initMap() {

		var uluru = {
			lat: 48.4433180,
			lng: 35.0361304
		};
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 20,
			center: uluru,
			mapTypeId: 'roadmap',
			disableDefaultUI: true
		});
		var marker = new google.maps.Marker({
			position:   {
				lat: 48.4432090,
				lng: 35.0362304
			},
			icon: {
				size: new google.maps.Size(111,148),
				scaledSize: new google.maps.Size(111,148),
				origin: new google.maps.Point(0,0),
				url: "data:img/png;base64,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",
				anchor: new google.maps.Point(55,148)
			},
			map: map
		});

	}
	initMap();
});
