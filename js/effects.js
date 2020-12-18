
(function($){

	//Форма регистрации
	var registr = function(){
		var $form = $('.authorization-form');
		var $close = $('.why-register .close');
		var $link = $('.why-registr-link');

		var chek = false;
		$('.why-register-container').hover(function(){
			if($form.hasClass('hidden') == false)
				$form.stop(true, true).animate({height: '-=7px'}, 200);
		}, function(){
			if($form.hasClass('hidden') == false)
				$form.stop(true, true).animate({height: '+=7px'}, 200);
		});

		$link.click(function(e) {
			e.preventDefault();
			if ($form.hasClass('hidden') == false) {
				$(this).children('span').text('Вернуться к авторизации');
				$form.stop(true,true).animate({height: '6px'}, function(){
					$close.stop(true,true).fadeIn(200);
				});
				$form.addClass('hidden');
			} else {
				$(this).children('span').text('Зачем мне регистрироваться?');
				$close.stop(true,true).fadeOut(200);
				$form.stop(true,true).animate({height: '183px'});
				$form.removeClass('hidden');
			}
		});
		$close.click(function(e){
			e.preventDefault();
			$link.children('span').text('Зачем мне регистрироваться?');
			$close.stop(true,true).fadeOut(200);
			$form.stop(true,true).animate({height: '183px'});
			$form.removeClass('hidden');
		});

		var $dropItem = $('.user-menu .drop-item a');
		$dropItem.click(function(e){
			e.preventDefault();
			$(this).parent('.drop-item').toggleClass('active');
			$(this).next('.sub-menu').stop(true, true).slideToggle(200, function(){
				$(function(){
					$('.user-menu-container.main-page').jScrollPane();
				});
			});
		});
	}

	//форма поиска
	var search = function(){
		var $searchText = $('.search-text');
		$searchText.focus(function(){
			$(this).animate({
				'width': '+=220px'
			}, 250);
			$(this).next('.search-submit').css('background-position','left top');
		});
		$searchText.blur(function(){
			$(this).animate({
				'width': '-=220px'
			}, 250);
			$(this).next('.search-submit').css('background-position','left bottom');
		});
	}
	

	
	

	//читать дальше
	var readMore = function(){
		var $read = $('.read-more');
		$read.click(function(event) {
			event.preventDefault();
			if ($(this).prev('.hidden-text').is(':hidden')) $(this).children('span').text('Свернуть');
			else $(this).children('span').text('Читать еще');
			$(this).toggleClass('active');
			$(this).prev('.hidden-text').stop(true, true).slideToggle(500);
		});
	}

	$(function(){
		$('.projects-pager').jScrollPane();
	});



	// Включаем все эффекты на странице
	$(document).ready(function() {

		registr();//Форма регистрации
		search(); //Поиск
		readMore(); //Читать еще

		/*$('.contact-information, .contact-information-footer').click(function(e) {
			e.preventDefault();
			// $('#map').arcticmodal();
			var c = $('<div class="map" id="map" />');
			c.html($('.map').html());
			$.arcticmodal({
				content: c
			});
		});*/

		$('.current-events').masonry({
			columnWidth: 205,
			gutter: 6,
			itemSelector : '.news-block'
		});
		$('.last-events').masonry({
			columnWidth: 205,
			gutter: 6,
			isFitWidth: true,
			itemSelector : '.news-block'
		});
		$('.future-events').masonry({
			columnWidth: 205,
			gutter: 6,
			isFitWidth: true,
			itemSelector : '.news-block',
		});

		// Слайдер новостей
		$('.latest-news').bxSlider({
			mode: 'vertical',
			captions: false,
			pager: false,
			auto: true,
			pause: 5000,
			speed: 700,
			onSlideNext: function() {
				$('.latest-news li').stop(true, true).fadeOut(250, function(){
					$(this).stop(true, true).fadeIn(250);
				});
			},
			onSlidePrev: function() {
				$('.latest-news li').fadeOut(250, function(){
					$(this).fadeIn(250);
				});
			}
		});
		//Проекты ДИМСИ
		$('.projects-slider').bxSlider({
			mode: 'fade',
			captions: false,
			controls: false,
			auto: true,
			pause: 5000,
			speed: 500,
			pagerCustom: '.projects-pager',
			onSlideAfter: function(){
				var paneHeight = $('.projects-pager .jspPane').outerHeight();
				var maxScrollPane = paneHeight - 253;
				var dragHeight = $('.projects-pager .jspDrag').outerHeight();
				var maxScrollDrag = 250 - dragHeight;
				var $active = $('.tab.active');
				var activeTop = $active.position().top;
				var activeHeight = $active.outerHeight();
				if ( activeTop < maxScrollPane) {
					per = ((activeTop + 3)*100)/maxScrollPane;
					scroll = maxScrollDrag*per/100;
					if ( $('.projects-pager .jspDrag.jspActive').length == 0) {
						$('.projects-pager .jspDrag').animate({'top':(scroll-3)+'px'}, 300);
						$('.projects-pager .jspPane').animate({'top':-(activeTop-3)+'px'}, 300);
					}
				}
				if ( activeTop > maxScrollPane) {
					if ( $('.projects-pager .jspDrag.jspActive').length == 0) {
						$('.projects-pager .jspDrag').animate({'top':maxScrollDrag+'px'}, 300);
						$('.projects-pager .jspPane').animate({'top':-maxScrollPane+'px'}, 300);
					}
				}
			}
		});
		//Наши тесты
		$('.our-tests-caruosel').bxSlider({
			captions: false,
			pager: false,
			auto: true,
			pause: 7000,
			minSlides: 4,
  			maxSlides: 4,
  			slideWidth: 190,
  			slideMargin: 20,
  			moveSlides: 1,
  			nextText: '&rarr;',
  			prevText: '&larr;'
		});
		//Новости и соботия
		var slider = $('.news-slider').bxSlider({
			mode: 'fade',
			captions: false,
			auto: false,
			pager: false,
			controls: false,
			speed: 400,
			onSliderLoad: function(){
				$('.news-pager .page_1').addClass('active');
				var height = $('.current-events').outerHeight();
				$('.news-container .bx-viewport').css({
					'height':height+'px'
				});
			}
		});
		$('.news-pager .page_1').click(function() {
			$('.news-pager a').removeClass('active');
			slider.goToSlide(0);
			var height = $('.current-events').outerHeight();
			$('.news-container .bx-viewport').stop(true, true).animate({
				'height':height+'px'
			});
			$(this).addClass('active');
			return false;
		});
		$('.news-pager .page_2').click(function() {
			$('.news-pager a').removeClass('active');
			slider.goToSlide(1);
			var height = $('.last-events').outerHeight();
			$('.news-container .bx-viewport').stop(true, true).animate({
				'height':height+'px'
			});
			$(this).addClass('active');
			return false;
		});
		$('.news-pager .page_3').click(function() {
			$('.news-pager a').removeClass('active');
			slider.goToSlide(2);
			var height = $('.future-events').outerHeight();
			$('.news-container .bx-viewport').stop(true, true).animate({
				'height':height+'px'
			});
			$(this).addClass('active');
			return false;
		});
	});
})(jQuery);


