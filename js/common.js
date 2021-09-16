// js 설정
// 반응형 웹은 기기 종류에 따라 최적화된 UI 디자인을 제공해야 함.
// 그러기 위해, 기기마다 너비를 감지하여 <html> 태그의 class 값을 각각 'pc', 'tablet', 'mobile'로 설정하였음.
// 데스크탑 pc는 1009px 이상, 테블릿 tablet은 801px 이상 1008px 이하, 모바일은 800px 이하로 설정하였음.

(function(win, $){
	var $html = $("html");	
	// 반응형 웹의 deviceSize에 사용할 값을 객체 속성으로 등록합니다.
	var deviceSize = {
		pc:1009,
		tablet:801,
		mobile:800
	};
	// 매개변수에 전달된 값이 "scroll" 이면 스크롤바가 생성되고 너비값을 반환합니다.
	function scrollShowHide(status) {
		$html.css({"overflow-y":status});
		return $html.width();    
	}

	var sc_w1 = scrollShowHide("hidden"),
					sc_w2 = scrollShowHide("scroll"),
					sc_w3 = sc_w1 - sc_w2;

	if(sc_w3 > 0) {
					deviceSize.pc = deviceSize.pc -  sc_w3;
					deviceSize.tablet = deviceSize.tablet -  sc_w3;
					deviceSize.mobile = deviceSize.mobile -  sc_w3;
	}
	//console.log(deviceSize.pc);

	// 브라우저의 창 너비가 변하면 창의 너비를 w_size에 저장합니다.
	$(win).on("resize", function() {
		var w_size = $(win).width();

		// 브라우저의 창 너비가 데스크톱의 너비보다 크거나 같으면 실행합니다.
		if(w_size >= deviceSize.pc 
		&& !$("html").hasClass("pc")) {
			$html.removeClass("mobile tablet").addClass("pc");
			scrollShowHide("scroll");
		
		// 태블릿 사이즈인 경우 실행합니다.
		} else if(w_size < deviceSize.pc 
		&& w_size >= deviceSize.tablet 
		&& !$("html").hasClass("tablet")) {
			$html.removeClass("mobile pc").addClass("tablet");
			scrollShowHide("scroll");

		// 모바일 사이즈인 경우 실행합니다.
		} else if(w_size <= deviceSize.mobile 
		&& !$html.hasClass("mobile")) {
			$html.removeClass("pc tablet").addClass("mobile");
			var menu_pos = parseInt($(".mobile-menu-wrap").css("left"));
			if(menu_pos >= 0) {
							scrollShowHide("hidden");
						}
		}
	});

	// 문서가 로딩될 때 resize 이벤트가 발생합니다.
	// 이때, 설정한 deviceSize에 맞는 class 값을 생성합니다.
	$(function(){
					$(win).trigger("resize");

					// 데스크탑 pc, 태블릿 tablet은 마우스 포인터를 상위 메뉴에 올리면 gnbPlay를 호출합니다.
					$(document).on("mouseover focus",
					".pc #gnb>ul>li>a, .tablet #gnb>ul>li>a", 
					gnbPlay);

					// 모바일은 상위 메뉴를 터치하면 gnbPlay를 호출합니다.
					$(document).on("click",
					".mobile #gnb>ul>li:not(.no-sub)>a", 
					gnbPlay);
					
					function gnbPlay() {
						var $ts = $(this);
						if($("html").hasClass("mobile")) {
							$(".mobile #gnb>ul>li>a").removeClass("on");
							$("#gnb ul ul:visible").slideUp(300);
							if($ts.next().is(":hidden")) {
											$ts.addClass("on");
											$ts.next().stop(true,true).slideDown(300);
							}
						} else {
								$("#gnb ul ul:visible").slideUp(300);
								$ts.next().stop(true,true).slideDown(300);
						}
					} 

					$(document).on("mouseleave",
					".pc #gnb, .tablet #gnb", gnbleave);
					function gnbleave() {
						$("#gnb ul ul:visible").slideUp(300);
						$("#gnb>ul>li>a").removeClass("on");
					}

					$(".mobile-menu-open button").on("click", function() {
						$(".mobile-menu-wrap").animate({"left":0}, 200);
						scrollShowHide("hidden");
					});

					$(".mobile-menu-close button").on("click", function() {
						$(".mobile-menu-wrap").animate({"left":"-1000px"}, 200);
						scrollShowHide("scroll");
						gnbleave();
					});
	});
}(window, jQuery));
