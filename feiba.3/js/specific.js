//uncomment the line below for iSales's presentations (for iRep leave it commented)
MainModule.setPlatform('ORACLE');

//disable text/elements selection and touch events
MainModule.disableSelection().useTouchEvents(false); 

$(function(){
	// open the calculator chart
	$('#chartPlus').click(function() {
		/* Act on the event */
		$('#chartImgPlus').removeClass('chartImgMain').addClass('chartImgCalc');
		$('#chartPlus').hide();
		$('#chartClose').removeClass('hidden');
		$('.barrelContent').show();
	});
	// close calculator chart
	$('#chartClose').click(function() {
		/* Act on the event */
		$('#chartImgPlus').addClass('chartImgMain').removeClass('chartImgCalc');
		$('#chartPlus').show();
		$('#chartClose').addClass('hidden');
		$('.barrelContent').hide();
	});
	$('#lessThan100Plus').click(function() {
		$('#popText1, .plusPopText, #lessThan100Plus').addClass('hidden');
		$('#popText2, .plusPop70Text, #lessThan70Plus').removeClass('hidden');
		$('#chartLess100').removeClass('chartLess100Pop').addClass('chartLess70Pop');
		$('#bulletPopText').removeClass('lessThan100Bullet').addClass('lessThan70Bullet');
	});
	$('#lessThan70Plus').click(function() {
		$('#popText1, .plusPopText, #lessThan100Plus').removeClass('hidden');
		$('#popText2, .plusPop70Text, #lessThan70Plus').addClass('hidden');
		$('#chartLess100').addClass('chartLess100Pop').removeClass('chartLess70Pop');
		$('#bulletPopText').addClass('lessThan100Bullet').removeClass('lessThan70Bullet');
	});
});
// hide back Content
function hideBack() {
	// body...
	$('#topContent, #ssiText1').hide();
	$('.bottomText').css('top', '438px');
	// $('.ssiHeadline').addClass('ssiHeadPos');
	// $('#ssiText1').addClass('bulletPop');
	// $('#ssiText2').addClass('bulletPop2');
	// $('.ssiHeadPos').css('top', '15px');
	$('#ssiText2').show();
}
//show Back content
function showBack() {
	// body...
	if(!$('#avModal_lipidParamContent').is(':visible')
	|| !$('#avModal_ldlLessThan70Content').is(':visible')){
		$('#topContent, #ssiText1').show();
		$('#ssiText2').hide();
		$('.bottomText').css('top', '433px');
		// $('.ssiHeadline').removeClass('ssiHeadPos');
		// $('#ssiText1').removeClass('bulletPop');
		// $('#ssiText2').removeClass('bulletPop2');
		// $('.ssiHeadPos').css('top', '18px');
	}
	else{
		$('.whitePatch').hide();
	}
	
}

// show patch Content
function showPatch() {
	// body...
	$('.whitePatch').show();
}

// hide patch Content
function hidePatch() {
	// body...
	$('.whitePatch').hide();
}

$('.plusLipidPos,.plusPos1').bind('touchend', function() {
	/* Act on the event */
	$('.whitePatch').hide();
});

$('.plusPos70,.plusPos').bind('touchend', function() {
	/* Act on the event */
	$('.whitePatch').show();
});


// Barrell Animation
var barrelFunctionality={
	initialized: false,
	timers: {
		ldl: null
	},
	init: function(){
		this.initialized = true;
		$('#barrelSelect').iPhonePicker({ width: '55px', imgRoot: 'img/big/'});
		$('#uipv_ul_barrelSelect').bind('click touchstart',function(e){
			clearTimeout(barrelFunctionality.timers.ldl);
		 	var selectedValue = parseInt(e.target.textContent);
		 	var atorva = 0.69;
		 	var crestor = 0.89;

			barrelFunctionality.timers.ldl=setTimeout(function(){
				$('#barrelContainer').hide();
			    $('#barrelValueA').text(selectedValue);
			    $('#barrelValueB').text(Math.round(selectedValue*atorva));
			    $('#barrelValueC').text(Math.round(selectedValue*crestor));
			},500);
		});
		
		$('#uipv_ul_barrelSelect').bind('touchend',function(){
			barrelFunctionality.timers.ldl=setTimeout(function(){
				clearTimeout(barrelFunctionality.timers.ldl);
				var selectedValue=$('#barrelSelect option').eq(selectedIndex).val();
			 	var atorva = 0.69;
			 	var crestor = 0.89;
			 	
				$('#barrelSelect option').removeAttr('selected');
				$('#barrelSelect option').eq(selectedIndex).attr('selected', 'selected');
				$('#barrelContainer').hide();
			    $('#barrelValueA').text(selectedValue);
			    $('#barrelValueB').text(Math.round(selectedValue*atorva));
			    $('#barrelValueC').text(Math.round(selectedValue*crestor));
			},1000);
		});

		$('#uipv_ul_barrelSelect').bind('touchmove',function(){
			clearTimeout(barrelFunctionality.timers.ldl);
		});
		$('#barrelValueA').bind('click touchstart', function() {
			clearTimeout(barrelFunctionality.timers.ldl);
			$('#barrelContainer').show();
		});
	},
};


$('.fisrtPlusPos').click(function() {
	/* Act on the event */
	$('.cholestrolMaindv').hide();
	$('.cholestrolDiscrip, .lowerCholes').show();
});

$('.secondPlusPos').click(function() {
	/* Act on the event */
	$('.absoptionMaindv').hide();
	$('.absorptionlDiscrip, .lowerCholes').show();
});

function hide_popup(){
	$('#def').hide();
	$('#ref').hide();
	$('#ssi').hide();
}

$('#footer01').click(function() {
  hide_popup();
	$('#ref').show();
});

$('#footer03').click(function() {
  hide_popup();
	$('#def').show();
});

$('#footer05').click(function() {
  hide_popup();
	$('#ssi').show();
});

$('#ssi-close, #def-close, #ref-close').click(function() {
	hide_popup();
});

barrelFunctionality.init();