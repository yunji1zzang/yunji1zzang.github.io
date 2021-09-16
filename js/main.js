$(function(){				// jQuery 플러그인 : bxSlider 플러그인 적용 예시
	$(".main-visual-slide").bxSlider({
		auto:true,
		pause:3000,
		autoHover:true,
		autoControls:true,
		autoControlsCombine:true
	});

	$("#notice-tab-wrap h4 a").on("click", tabmenu);
	function tabmenu(e) {
		e.preventDefault();
		var $ts = $(this);
		var $next = $ts.parent().next();
		if($next.is(":hidden")){
			$("#notice-tab-wrap h4 a").removeClass("on");
			$ts.addClass("on");
			$("#notice-tab-wrap > div:visible").hide();
			$next.show();
		}
	}

	// isotope() 메서드를 사용하여 isotope 플러그인을 적용하고 객체 형태로 옵션을 설정함
	$('.grid').isotope({
		// options
		itemSelector: '.grid-item',
		layoutMode: 'fitRows'
	});    
});