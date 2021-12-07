/*
 * avModal jQuery Plugin v1.6
 * Displays inline content in dynamic popups
 * 
 * Author: Juan Carlos Rojas
 * Email: juan.c.rojas.vargas@accenture.com
 * Creation date: March, 2013
 * Copyright (c) 2013 Accenture
 * 
 * Contributors:
 *		Sajid Mullah		<sajid.mullah@accenture.com>
 *		<new contributor>	<email address>
 * 
 * Last update: December 17, 2013 <juan.c.rojas.vargas>
 * 
 */

(function($){
	$.fn.avModal = function(objCustomSettings){
		var avModalUniqueID = 0, modalName = 'avModal', objGlobalSettings = $.extend({
			zIndex: 				90000,
			animationSpeed: 		0,
			overlayOpacity: 		1,
			appendTo: 				'body',
			preventDefault: 		true,
			defaultWidth: 			700,
			defaultHeight: 			500,
			debug: 					false,
			theme: 					'avModal',
			swap: 					false,
			marginRight: 			0,
			marginBottom: 			0,
			marginLeft: 			0,
			marginTop: 				0,
			useTouchEvents: 		false
		}, objCustomSettings);
				
		var methods = {
			consoleLog: function(message){
				if(objGlobalSettings.debug === true) console.log(message);
			},
			getMaxIndex: function(){
				var maxIndex = 1;

				$("body *").each(function(){
					var elementIndex = parseInt($(this).css('z-index'));
					if (elementIndex > maxIndex) maxIndex = elementIndex;
				});

				return (maxIndex + 1);
			}
		};
		
		this.each(function(){
			var bindedEvents = 'click' + (objGlobalSettings.useTouchEvents === true ? ' touchstart' : '');
			$(this).bind(bindedEvents, function(e){				
				if(objGlobalSettings.preventDefault === true) e.preventDefault();											
				avModalUniqueID = methods.getMaxIndex() + 1;
																
				var $this = $(this), objCallbacks = $.Callbacks(),
				
				objElementSettings={
					height: 				$this.attr('data-height') || objGlobalSettings.defaultHeight,
					width: 					$this.attr('data-width') || objGlobalSettings.defaultWidth,
					href: 					$this.attr('href') || $this.attr('data-href'),
					overlay: 				$this.attr('data-overlay'),
					overlayOpacity: 		$this.attr('data-overlayOpacity'),
					overlayBackground: 		$this.attr('data-overlayBg'),
					appendTo: 				$this.attr('data-appendTo') || objGlobalSettings.appendTo,
					id: 					avModalUniqueID,
					zIndex:					$this.attr('data-zIndex') || objGlobalSettings.zIndex,
					theme: 					$this.attr('data-theme') || objGlobalSettings.theme,
					onDestroyEvent: 		$this.attr('data-onDestroy') || null,
					onCloseEvent: 			$this.attr('data-onClose') || null,
					onShowEvent: 			$this.attr('data-onShow') || null,
					onLaunchEvent: 			$this.attr('data-onLaunch') || null,
					onReadyEvent: 			$this.attr('data-onReady') || null,
					onSwap:					$this.attr('data-onSwap') || null,
					left: 					$this.attr('data-left') || null,
					top: 					$this.attr('data-top') || null,
					swap: 					$this.attr('data-swap') || objGlobalSettings.swap.toString(),
					title: 					$this.attr('data-title') || null,
					events:					$this.attr('data-eventsObject') ? eval($this.attr('data-eventsObject')) : null,
					marginRight:			$this.attr('data-marginRight') || objGlobalSettings.marginRight,
					marginBottom:			$this.attr('data-marginBottom') || objGlobalSettings.marginBottom,
					marginTop:				$this.attr('data-marginTop') || objGlobalSettings.marginTop,
					marginLeft:				$this.attr('data-marginLeft') || objGlobalSettings.marginLeft
				};

				var $contentProperties = $('<div>', {
					class: objElementSettings.theme + 'Content',
					css: {
						display:		'none',
						opacity:		0,
						height: 		0,
						width: 			0,
						overflow: 		'hidden',
						position: 		'absolute',
						marginBottom: 	parseInt(objElementSettings.marginBottom),
						marginRight: 	parseInt(objElementSettings.marginRight)
					}
				}).prependTo('body');
				
				if($('#' + modalName + '_' + (objElementSettings.href.replace('#', ''))).length > 0){
					methods.consoleLog('Modal ' + objElementSettings.href + ' already exists');																							
					if (objElementSettings.swap === 'true'){
						methods.consoleLog('Swapping pop-up');
						$('#' + modalName + '_' + (objElementSettings.href.replace('#', '')) + 'Overlay').css('z-index', methods.getMaxIndex());
						$('#' + modalName + '_' + (objElementSettings.href.replace('#', ''))).css('z-index', methods.getMaxIndex());
						
						if(objElementSettings.onSwap){
							methods.consoleLog('Triggering onSwap event (defined in tag)');
							objCallbacks.fire(eval(objElementSettings.onSwap));
						}else if(objElementSettings.events && objElementSettings.events.onSwap){
							methods.consoleLog('Triggering onSwap event (defined in object)');
							objCallbacks.fire(objElementSettings.events.onSwap());
						}
					}
				}else{
					if(objElementSettings.onLaunchEvent){
						methods.consoleLog('Triggering onLaunch event (defined in tag)');
						objCallbacks.fire(eval(objElementSettings.onLaunchEvent));
					}else if(objElementSettings.events && objElementSettings.events.onLaunch){
						methods.consoleLog('Triggering onLaunch event (defined in object)');
						objCallbacks.fire(objElementSettings.events.onLaunch());
					}
					if(objElementSettings.overlay != 'false'){
						$('<div>', {
							class:  objElementSettings.theme+'Overlay',
							id: 	modalName + '_' + objElementSettings.href.replace('#', '') + 'Overlay',
							css:{
								opacity: 		0,
								'z-index': 		methods.getMaxIndex(),
								'background': 	objElementSettings.overlayBackground || ''
							}
						}).appendTo(objElementSettings.appendTo).stop(true, true).animate({
							opacity: objElementSettings.overlayOpacity || objGlobalSettings.overlayOpacity
						}, objGlobalSettings.animationSpeed);
					}
					
					var $objAvModal = $('<div>', {					
						class:              objElementSettings.theme + 'Wrapper',
						id: 				modalName + '_' + objElementSettings.href.replace('#', ''),
						css:{
							opacity: 		0,
							display: 		'block',
							left: 			objElementSettings.left?objElementSettings.left+'px':'50%',
							top: 			objElementSettings.top?objElementSettings.top+'px':'50%',
							'z-index': 		methods.getMaxIndex(),
							marginLeft: 	!objElementSettings.left ? - (objElementSettings.width / 2) + 'px' : 0,
							marginTop: 		!objElementSettings.top ? - (objElementSettings.height / 2) + 'px' : 0,
							height: 		objElementSettings.height + 'px',
							width: 			objElementSettings.width + 'px'
						}
					}).append(
						$('<div>',{
							class: 	objElementSettings.theme + 'CloseButton',
							id: 	modalName + '_' + objElementSettings.href.replace('#', '') + 'Close',
							css: {
								'z-index': avModalUniqueID + 1
							}
						}).bind(bindedEvents, function(e){							
							e.preventDefault();
							if(objElementSettings.onCloseEvent){
								methods.consoleLog('Triggering onClose event (defined in tag)');
								objCallbacks.fire(eval(objElementSettings.onCloseEvent));
							}else if(objElementSettings.events && objElementSettings.events.onClose){
								methods.consoleLog('Triggering onClose event (defined in object)');
								objCallbacks.fire(objElementSettings.events.onClose());
							}
							$('#' + modalName + '_' + objElementSettings.href.replace('#', '') +
							'Overlay').stop(true, true).animate({
								opacity: 0
							},objGlobalSettings.animationSpeed, function(){
								$(this).remove();
							});
							$('#' + modalName + '_' + objElementSettings.href.replace('#', '')).stop(true, true).animate({
								opacity: 0
							}, objGlobalSettings.animationSpeed, function(){
								$(this).remove();
								if(objElementSettings.onDestroyEvent){
									methods.consoleLog('Triggering onDestroy event (defined in tag)');
									objCallbacks.fire(eval(objElementSettings.onDestroyEvent));
								}else if(objElementSettings.events && objElementSettings.events.onDestroy){
									methods.consoleLog('Triggering onDestroy event (defined in object)');
									objCallbacks.fire(objElementSettings.events.onDestroy());
								}
							});
						})
					).append(
						$('<div>', {
							class: 	objElementSettings.theme + 'Content',
							css:{
								height: 	objElementSettings.height - (
												parseInt($contentProperties.css('margin-top')) +
												parseInt($contentProperties.css('margin-bottom')) +
												parseInt($contentProperties.css('padding-bottom')) +
												parseInt($contentProperties.css('padding-top'))
											) +'px',
	                			width: 		objElementSettings.width - (
			                					parseInt($contentProperties.css('margin-left')) +
												parseInt($contentProperties.css('margin-right')) +
												parseInt($contentProperties.css('padding-right')) +
												parseInt($contentProperties.css('padding-left'))
											) + 'px',
								border: 	'none',
								marginTop: 	parseInt(objElementSettings.marginTop),
								marginLeft: parseInt(objElementSettings.marginLeft)
							}
						}
					).append(
						$('<div>', {						
								class: 	objElementSettings.theme + 'Title',
								id: 	modalName + '_' + objElementSettings.href.replace('#', '') + 'Title',
								html: 	objElementSettings.title
							}
						)
					).append(
						$(objElementSettings.href).children().clone(true, true)
					)).stop(true,true).animate({
						opacity: 1
					}, objGlobalSettings.animationSpeed, function(){
						if(objElementSettings.onShowEvent){
							methods.consoleLog('Triggering onShow event (defined in tag)');
							objCallbacks.fire(eval(objElementSettings.onShowEvent));
						}else if(objElementSettings.events && objElementSettings.events.onShow){
							methods.consoleLog('Triggering onShow event (defined in object)');
							objCallbacks.fire(objElementSettings.events.onShow());
						}
					}).appendTo(objElementSettings.appendTo || objGlobalSettings.appendTo);
					
					if(objElementSettings.title === null){
						$('#' + modalName + '_' + objElementSettings.href.replace('#', '') + 'Title').remove();
					}
					
					if(objElementSettings.onReadyEvent){
						methods.consoleLog('Triggering onReady event (defined in tag)');
						objCallbacks.fire(eval(objElementSettings.onReadyEvent));
					}else if(objElementSettings.events && objElementSettings.events.onReady){
						methods.consoleLog('Triggering onReady event (defined in object)');
						objCallbacks.fire(objElementSettings.events.onReady());
					}
					
					var modalClass = '.' + objElementSettings.theme + 'Content';
					
					$('body').on({
						touchstart: function(e){
							var $this = $(this), scrollHeight = $this.get(0).scrollHeight -
								(
									parseInt($this.css('margin-top')) +
									parseInt($this.css('margin-bottom')) +
									parseInt($this.css('padding-bottom')) +
									parseInt($this.css('padding-top'))
								);						
							if(!(scrollHeight > $this.height())){
								e.stopPropagation(); e.preventDefault();
							}else{
								if(e.currentTarget.scrollTop === 0){
									e.currentTarget.scrollTop = 1;
								}else if(e.currentTarget.scrollHeight === e.currentTarget.scrollTop +
								e.currentTarget.offsetHeight){
									e.currentTarget.scrollTop-=1;
								}
							}
						},
						touchmove: function(e){
							e.stopPropagation();
						},
						touchend: function(e){
							e.stopPropagation();
						}
					}, modalClass);
				}
			});
		});
	};
})(jQuery);