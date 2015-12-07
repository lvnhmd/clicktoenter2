$(document).ready(function() {
  
  
	// sitemenu
	var $trigger = $('[data-trigger="trigger-menu"]');
	var	$body = $('body');
  var $menuBar = $('.menu-bar');
  
  $('[data-trigger="toggle-submenu"]').on('click', toggleSubmenu);
  $trigger.on('click', toggleMenu);
  
  
  function toggleSubmenu (e) {
    $('.submenu-open').add(e.target).toggleClass('submenu-open').next('ul').slideToggle(200);
  }

  function toggleMenu(e) {
    e.preventDefault();
    $body.toggleClass('menu-open');
  };

  // Shopify Product form requirement
  
  selectCallback = function(variant, selector) {
    var $product = $('#product-' + selector.product.id);    
    
    console.log(variant);
    // BEGIN SWATCHES
    if (variant) {
      for (i=0;i<variant.options.length;i++) {
        jQuery('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] +'"]').prop('checked', true);
      }      
    }
    // END SWATCHES
    
    
    if (variant && variant.available == true) {
      if(variant.compare_at_price > variant.price){
        $('.compare-price', $product).html(Shopify.formatMoney(variant.compare_at_price, $('form', $product).data('money-format')))        
      } else {
        $('.compare-price', $product).text('')
      } 
      $('.product-price', $product).html(Shopify.formatMoney(variant.price, $('form', $product).data('money-format'))) 
      $('.add', $product).removeClass('disabled').removeAttr('disabled').val('ADD TO CART');
    } else {
      var message = variant ? "SOLD OUT" : "Out of Stock";
      $('.compare-price', $product).text('')
      $('.product-price', $product).text(message);
      $('.add', $product).addClass('disabled').attr('disabled', 'disabled').val(message); 
    } 
  }; 
  
  
  
  // Quantity values
  
  $('.up').click(function(e){
    e.preventDefault();
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($('input[name='+fieldName+']').val());
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $('input[name='+fieldName+']').val(currentVal + 1);
    } else {
      // Otherwise put a 0 there
      $('input[name='+fieldName+']').val(1);
    }
  });
  $(".downer").click(function(e) {
    e.preventDefault();
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($('input[name='+fieldName+']').val());
    // If it isn't undefined or its greater than 0
    if (!isNaN(currentVal) && currentVal > 1) {
      // Decrement one
      $('input[name='+fieldName+']').val(currentVal - 1);
    } else {
      // Otherwise put a 0 there
      $('input[name='+fieldName+']').val(1);
    }
  }); 
  
  
  
  if ( $(this).width() < 740 ) {
    $('#logo').insertBefore('#search');
  }  
  
  if ( $(this).width() > 740 ) {
    $('.product-index-inner').hover(function(){ $(this).children('.product-modal').show(); }, function(){ $(this).children('.product-modal').hide(); })
    
    // Flipping Images
    $('.product-index-inner').each(function(){
      if($(this).find('img').length > 1) {
        $(this).find('.img2').hide().css('display', 'none');
        $(this).hover(function(){
          $(this).find('.img2').stop(true,true).fadeIn("3000");
          $(this).find('.img1').stop(true,true).fadeOut("3000").css("display", "none");
        }, function(){
          $(this).find('.img2').stop(true,true).fadeOut("3000").css("display", "none");
          $(this).find('.img1').stop(true,true).fadeIn("3000");
        });
      }
    });  
    
    
  }
  
  // Help old browsers with placeholders for inputs 
  $('input, textarea').placeholder();
  
  
  
  
  // Call Flexslider globally
  $('.flexslider').flexslider({
    animation: "fade",
    controlNav: false,
    slideshowSpeed: 4000,
    directionNav: true
  });  
  
  
  // Sweet Selects
  $(".coll-filter").selecter();
  
  
  
  // Call Fancybox for product modal + stop scroll to top 
  $('.product-modal').fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    }
  });
  
  
  
  
  
  
  
  // Call Fancybox globally on all elements with class fancybox
  $(".fancybox").fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    }
  });  
  
  
  
  
});

/*!
	SlickNav Responsive Mobile Menu
	(c) 2013 Josh Cope
	licensed under GPL and MIT
*/
(function ($, document, window) {
	var
	// default settings object.
	defaults = {
		label: 'Products',
		duplicate: true,
		duration: 200,
		easingOpen: 'swing',
		easingClose: 'swing',
		closedSymbol: '&#9658;',
		openedSymbol: '&#9660;',
		prependTo: '#navigation',
		parentTag: 'a',
		closeOnClick: false,
		allowParentLinks: false
	},
	mobileMenu = 'slicknav',
	prefix = 'slicknav';
	
	$.fn[mobileMenu] = function (options) {
		return this.each(function() {
			var $this = $(this);
			var settings = $.extend({}, defaults, options);
			
			// clone menu if needed
			if (settings.duplicate) {
				var mobileNav = $this.clone();
				//remove ids from clone to prevent css issues
				mobileNav.removeAttr('id');
				mobileNav.find('*').each(function(i,e){
					$(e).removeAttr('id');
				});
			}
			else
				var mobileNav = $this;
			
			// styling class for the button
			var iconClass = prefix+'_icon';
			
			if (settings.label == '') {
				iconClass += ' '+prefix+'_no-text';
			}
			
			if (settings.parentTag == 'a') {
				settings.parentTag = 'a href="#"';
			}
			
			// create menu bar
			mobileNav.attr('class', prefix+'_nav');
			var menuBar = $('<div class="'+prefix+'_menu"></div>');
			//var btn = $('<'+settings.parentTag+' aria-haspopup="true" tabindex="0" class="'+prefix+'_btn"><span class="'+prefix+'_menutxt">'+settings.label+'</span><span class="'+iconClass+'"><span class="'+prefix+'_icon-bar"></span><span class="'+prefix+'_icon-bar"></span><span class="'+prefix+'_icon-bar"></span></span></a>');
			var btn = $('<'+settings.parentTag+' aria-haspopup="true" tabindex="0" class="'+prefix+'_btn"><span class="'+prefix+'_menutxt">'+settings.label+'</span></a>');
			$(menuBar).append(btn);		
			$(settings.prependTo).prepend(menuBar);
			menuBar.append(mobileNav);
			
			// iterate over structure adding additional structure
			var items = mobileNav.find('li');
			$(items).each(function () {
				var item = $(this);
				data = {};
				data.children = item.children('ul').attr('role','menu');
				item.data("menu", data);
				
				// if a list item has a nested menu
				if (data.children.length > 0) {
				
					// select all text before the child menu
					var a = item.contents();
					var nodes = [];
					$(a).each(function(){
						if(!$(this).is("ul")) {
							nodes.push(this);
						}
						else {
							return false;
						}
					});
					
					// wrap item text with tag and add classes
					var wrap = $(nodes).wrapAll('<'+settings.parentTag+' role="menuitem" aria-haspopup="true" tabindex="-1" class="'+prefix+'_item"/>').parent();
					
					item.addClass(prefix+'_collapsed');
					item.addClass(prefix+'_parent');
					
					// create parent arrow
					$(nodes).last().after('<span class="'+prefix+'_arrow">'+settings.closedSymbol+'</span>');
					
				
				} else if ( item.children().length == 0) {
					 item.addClass(prefix+'_txtnode');
				}
				
				// accessibility for links
				item.children('a').attr('role', 'menuitem').click(function(){
					//Emulate menu close if set
					if (settings.closeOnClick)
						$(btn).click();
				});
			});
			
			// structure is in place, now hide appropriate items
			$(items).each(function () {
				var data = $(this).data("menu");
				visibilityToggle(data.children, false);
			});
			
			// finally toggle entire menu
			visibilityToggle(mobileNav, false);
			
			// accessibility for menu button
			mobileNav.attr('role','menu');
			
			// outline prevention when using mouse
			$(document).mousedown(function(){
				outlines(false);
			});
			
			$(document).keyup(function(){
				outlines(true);
			});
			
			// menu button click
			$(btn).click(function (e) {
				e.preventDefault();
				visibilityToggle(mobileNav, true);
			});
			
			// click on menu parent
			mobileNav.on('click', '.'+prefix+'_item', function(e){
				e.preventDefault();
				itemClick($(this));
			});
			
			// check for enter key on menu button and menu parents
			$(btn).keydown(function (e) {
				var ev = e || event;
					if(ev.keyCode == 13) {
					e.preventDefault();
					visibilityToggle(mobileNav, true);
				}
			});
			
			mobileNav.on('keydown', '.'+prefix+'_item', function(e) {
				var ev = e || event;
				if(ev.keyCode == 13) {
					e.preventDefault();
					itemClick($(e.target));
				}
			});
			
			// allow links clickable within parent tags if set
			if (settings.allowParentLinks) {
				$('.'+prefix+'_item a').click(function(e){
						e.stopImmediatePropagation();
				});
			}
			
			// toggle clicked items
			function itemClick(el) {
				var data = el.data("menu");
				if (!data) {
					data = {};
					data.arrow = el.children('.'+prefix+'_arrow');
					data.ul = el.next('ul');
					data.parent = el.parent();
					el.data("menu", data);
				}
				if (el.parent().hasClass(prefix+'_collapsed')) {
					data.arrow.html(settings.openedSymbol);
					data.parent.removeClass(prefix+'_collapsed');
					visibilityToggle(data.ul, true);
				} else {
					data.arrow.html(settings.closedSymbol);
					data.parent.addClass(prefix+'_collapsed');
					visibilityToggle(data.ul, true);
				}
			}

			// toggle actual visibility and accessibility tags
			function visibilityToggle(el, animate) {
				var items = getActionItems(el);
				var duration = 0;
				if (animate)
					duration = settings.duration;
				
				if (el.hasClass(prefix+'_hidden')) {
					el.removeClass(prefix+'_hidden');
					el.slideDown(duration, settings.easingOpen);
					el.attr('aria-hidden','false');
					items.attr('tabindex', '0');
					setVisAttr(el, false);
					
				} else {
					el.addClass(prefix+'_hidden');
					el.slideUp(duration, settings.easingClose, function() {
						el.attr('aria-hidden','true');
						items.attr('tabindex', '-1');
						setVisAttr(el, true);
					});
				}
			}
			
			// set attributes of element and children based on visibility
			function setVisAttr(el, hidden) {
			
				// select all parents that aren't hidden
				var nonHidden = el.children('li').children('ul').not('.'+prefix+'_hidden');
				
				// iterate over all items setting appropriate tags
				if (!hidden) {
					nonHidden.each(function(){
						var ul = $(this);
						ul.attr('aria-hidden','false');
						var items = getActionItems(ul);
						items.attr('tabindex', '0');
						setVisAttr(ul, hidden);
					});
				} else {
					nonHidden.each(function(){
						var ul = $(this);
						ul.attr('aria-hidden','true');
						var items = getActionItems(ul);
						items.attr('tabindex', '-1');
						setVisAttr(ul, hidden);
					});
				}
			}
			
			// get all 1st level items that are clickable
			function getActionItems(el) {
				var data = el.data("menu");
				if (!data) {
					data = {};
					var items = el.children('li');
					var anchors = items.children('a');
					data.links = anchors.add(items.children('.'+prefix+'_item'));
					el.data("menu", data);
				}
				return data.links;
			}
			
			function outlines(state) {
				if (!state) {
					$('.'+prefix+'_item, .'+prefix+'_btn').css('outline','none');
				} else {
					$('.'+prefix+'_item, .'+prefix+'_btn').css('outline','');
				}
			}
		});
	};
}(jQuery, document, window));