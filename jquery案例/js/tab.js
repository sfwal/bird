(function($){
	$.fn.tab = function(options){
		var setting = {
			//鼠标触发元素包裹对象
			titCell:".tabs_nav",
			//鼠标触发元素
			titTag:"li",
			//内容元素包裹对象
			mainCell:".tabs_con",
			//内容元素
			mainTag:".con",
			//触发方式  mouseover  ，click
			trigger:"mouseover",
			//触发tit显示class名称
			curClass:"on",
			//动画效果 fade top left
			effect:"left",
			//是否自动播放
			autoPlay:false,
			//默认显示第几个
			defaultIndex:0
		};
		$.extend(setting,options);
		var titCell = $(setting.titCell);
		var titTag = titCell.find(setting.titTag);
		var mainCell = $(setting.mainCell);
		var mainTag = mainCell.find(setting.mainTag);
		//选项卡个数
		var length = titTag.length;
		//选项卡内容区宽度
		var mainWidth = mainCell.eq(0).width();
		var mainHeight = mainCell.eq(0).height();
		var curTag = titTag.eq(setting.defaultIndex);
		curTag.addClass(setting.curClass).siblings().removeClass(setting.curClass);
		mainTag.eq(setting.defaultIndex).show().siblings().hide();

		if(setting.effect == "left"){
			mainCell.css({"width":length*mainWidth,"position":"absolute",});
			mainTag.css({"float":"left","display":"block"});
		}

		titTag.each(function(i){
			titTag.eq(i).on(setting.trigger,function(){
				titTag.eq(i).addClass(setting.curClass).siblings().removeClass(setting.curClass);
				switch(setting.effect){
					case "fade":mainTag.eq(i).fadeIn().siblings().fadeOut();
					break;
					case "left":mainCell.animate({"left":-i*mainWidth+"px"},500);
				}
			})
		})

	}
})(jQuery)