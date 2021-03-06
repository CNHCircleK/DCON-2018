$(function() {

	var timelineBlocks = $('.cd-timeline-block'),
		  offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame)
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}

	var date = new Date(2018, 2, 23, 16);
	var now = new Date();
	var diff = (date.getTime()/1000) - (now.getTime()/1000);
	if (diff < 0) diff = 0;
	var clock = $('.countdown').FlipClock(diff, {
		clockFace: 'DailyCounter',
		countdown: true
	});

  // handle the navigation links
  $('nav ul li a[href^="#"]').on('click', function(e) {
    // prevent default anchor click behavior
    e.preventDefault();

	  // store hash
	  var hash = this.hash;

	  // animate the scrolling
	  $('html, body').animate({
		    scrollTop: $(hash).offset().top - 80
		}, 500);
	});

	filters = [];

  // toggle the documents
  $('#filter span').click(function(){
    var target = '#' + $(this).text().toLowerCase();
    $('span.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#filter ~ div[id]').not(target).fadeOut('fast');
    $(target).delay(200).fadeIn('fast');
  }).each(function(){
		filters.push('#' + $(this).text().toLowerCase());
	});

  // expand the document details for smaller screens
  $('#documents h2').click(function(){
    var target = $(this).next().nextAll();
    if ($(window).width() < 769) target.slideToggle('fast');
  });

	$(window).on('hashchange', function(){
    change();
	}).on('load', function(){
		if (filters.includes(location.hash)) change();
	});

});

function change() {
	$('html, body').animate({
		scrollTop: $('#documents').offset().top - 80
	}, 500);
	var hash  = location.hash,
			count = filters.findIndex(x => x == hash);
	$('#filter span').eq(count).trigger('click');
}
