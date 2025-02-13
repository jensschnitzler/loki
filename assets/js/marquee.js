function initMarquee(selector_parent = '.marquee--animated', selector_wrapper = '.marquee__wrapper', selector_item = '.marquee__item') {

	const marquees = $(selector_parent).removeClass('marquee--run');

	function addItemToWrapper(item, wrapper) {
		item.clone().appendTo(wrapper);
	}

	marquees.each(function() {

		const marquee = $(this);
		const marquee_width = marquee.width();

		if (marquee.hasClass('marquee--run') && marquee.is('[data-width]') && marquee.attr('data-width') == marquee_width) {
			/* don't do anything! */
		} else {

			marquee.removeClass('marquee--run');
			marquee.attr('data-width', marquee_width);

			let speed = marquee.attr('data-marquee-speed');
			if (!speed || !$.isNumeric(speed) || parseInt(speed) != speed) {
				speed = 80;
			}

			const marquee_wrapper = marquee.find(selector_wrapper).first();
			const marquee_wrapper_width = marquee_wrapper.width();
			marquee_wrapper.attr('data-width', marquee_wrapper_width);

			const marquee_items = marquee_wrapper.find(selector_item);
			const marquee_item = marquee_items.first();
			const marquee_item_width = marquee_item.outerWidth();
			marquee_item.attr('data-width', marquee_item_width);

			const duration = Math.round(marquee_item_width) * speed; // multiply with speed factor
			marquee.css('--duration', duration + 'ms');

			const item_count = Math.max(3, Math.ceil(marquee_wrapper_width / marquee_item_width));
			const add_item_count = item_count - marquee_items.length;
			//console.log('item_count: ' + item_count );

			if (add_item_count > 0) {
				for (var i = 0; i < add_item_count; i++) {
					addItemToWrapper(marquee_item, marquee_wrapper);
				}
			}

			setTimeout(function() {
				marquee.addClass('marquee--run');
			}, 20);

		}

	});

}


initMarquee();
