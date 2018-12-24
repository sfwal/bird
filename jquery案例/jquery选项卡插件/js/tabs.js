(function($){
	//jquery插件方法
	$.fn.tabs = function(options){
		// 定义参数，如果用户没有传参数，就用默认
		var parameter = {
			// 事件trigger：点击click 鼠标放上去 mouseover（click）
			trigger:"click",
			// 动画效果effact：渐隐渐现 fade  向左滚动 left  向上滚动 top（fade）
			effect:"fade",
			// title的选中样式curclass：“on”（"on"）
			curClass:"on",
			// 默认显示第几个选项卡defaultindex：选项卡的下标（0）
			defaultIndex:0,
			// 选项卡标题包裹Class  titcell:（“.hd”）
			titCell:".hd",
			// 选项卡标题单个对象Class  tittag:（“a”）
			titTag:"a",
			// 选项卡内容包裹Class maincell：（“.bd”）
			mainCell:".bd",
			// 选项卡内容Class  maintag ：（“.con”）
			mainTag:".con",
			//动画执行速度
			speed:"500",
			//是否自动播放
			autoPlay:false,
			//自动播放时间间隔
			delay:"1000"

		}
		// jquery方法，扩展jquery对象
		$.extend(parameter,options);
		var j=0;
		//选项卡标题包裹的jquery对象
		var titCell = $(parameter.titCell);
		// 选项卡标题单个对象
		var titTag = titCell.find(parameter.titTag);
		//选项卡内容包裹jquery对象
		var mainCell = $(parameter.mainCell);
		// 选项卡内容单个对象
		var mainTag = mainCell.find(parameter.mainTag);
		//获取单个内容对象的宽度
		var mainWidth = mainTag.eq(0).outerWidth();
		//获取单个内容对象的高度
		var mainHeight = mainTag.eq(0).outerHeight();
		//获取标题对象的高度
		var titHeight = titCell.outerHeight();
		//获取内容对象的长度
		var mainLength = mainTag.length;
		//默认显示第几个(标题样式)
		//$('.tab .hd a').eq(0).addClass("on").siblings().removeClass("on");
		titTag.eq(parameter.defaultIndex).addClass(parameter.curClass).siblings().removeClass(parameter.curClass);
		// 默认显示第几个（显示内容）
		//$('.tab .bd .con').eq(0).show().siblings().hide();
		mainTag.eq(parameter.defaultIndex).show().siblings().hide();

		if(parameter.effect == "fade"){
			mainTag.css({"position":"absolute"});
		}
		if(parameter.effect == "left"){
			mainCell.parent().css({"position":"relative","overflow":"hidden"});
			mainCell.width(mainWidth*mainLength).css({"position":"absolute","left":-parameter.defaultIndex*mainWidth});
			mainTag.css({"float":"left","display":"block"});
		}
		if(parameter.effect == "top"){
			mainCell.parent().css({"position":"relative","overflow":"hidden"});
			titCell.css({"position":"relative","z-index":"999","background":"#fff"});
			mainCell.css({"position":"absolute","top":-parameter.defaultIndex*mainHeight+titHeight});
			mainTag.css({"float":"none","display":"block"});
		}

		//鼠标事件切换
		titTag.each(function(i){
			titTag.eq(i).on(parameter.trigger,function(){
				//点击的时候切换标题选中的class样式
				titTag.eq(i).addClass(parameter.curClass).siblings().removeClass(parameter.curClass);
				//当动画参数等于fade，执行渐隐渐现。
				if(parameter.effect == "fade"){
					// $('.tab .bd .con').eq(index).stop(false,true).fadeIn().siblings().stop(false,true).fadeOut();
					mainTag.eq(i).stop(false,true).fadeIn().siblings().stop(false,true).fadeOut();
				}
				//当动画参数等于left，执行水平滚动。
				if(parameter.effect == "left"){
					mainCell.stop().animate({"left":-i*mainWidth},parameter.speed);
				}
				//当动画参数等于top，执行垂直滚动。
				if(parameter.effect == "top"){
					mainCell.stop().animate({"top":-i*mainHeight+titHeight},parameter.speed);
				}
			})
		})

		//是否自动播放
		if(parameter.autoPlay){
			var move = function(){
				if(parameter.trigger == "click"){
					titTag.eq(j).click();
				}
				if(parameter.trigger == "mouseover"){
					titTag.eq(j).mouseover();
				}
				j++;
				if(j==mainLength){j=0}
			}
			setInterval(move,parameter.delay);
		}


	}
})(jQuery)