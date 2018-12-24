(function($){
	//jquery的插件方法
	$.fn.tab = function(options){
		var set = {
			//事件trigger：点击click 鼠标放上去 mouseover（click）
			trigger:"click",
			//动画效果effect：渐隐渐现 fade  向左滚动 left  向上滚动 top（fade）
			effect:"fade",
			// 选项卡标题 包裹Class titcell:（“.hd”）
			titcell:".hd",
			// 选项卡标题单个对象Class tittag:（“a”）
			tittag:"a",
			// 选项卡内容包裹Class maincell：（“.bd”）
			maincell:".bd",
			// 选项卡内容Class  maintag ：（“.con”）
			maintag:".con",
			// title的选中样式curclass：“on”（"on"）
			curclass:"on",
			// 默认显示第几个选项卡defaultindex：选项卡的下标（0）
			defaultindex:0,
			// 是否自动播放autoplay：false不自动播放，true自动播放（false）
			autoplay:false,
			// 自动播放间隔delay：毫秒（1000）只有将自动播放设置为true的时候才会生效
			delay:"1000",
			// 切换效果的速度speed：毫秒（500）
			speed:"500"
		}
		$.extend(set,options);
		// 获取选项卡标题包裹的对象
		var titcell = $(set.titcell);
		// 获取选项卡标题作用对象
		var tittag = titcell.find(set.tittag);
		// 获取选项卡内容包裹对象
		var maincell = $(set.maincell);
		// 获取选项卡内容的单个对象
		var maintag = maincell.find(set.maintag);
		// 获取每个选项卡内容区的宽度
		var mainWidth = maintag.eq(0).width();
		//获取选项卡的个数
		var mainLength = maintag.length;

		//执行默认显示第几个
		tittag.eq(set.defaultindex).addClass(set.curclass).siblings().removeClass(set.curclass);
		maintag.eq(set.defaultindex).show().siblings().hide();

		if(set.effect == "left"){
			maincell.width(mainWidth*mainLength).css({"position":"absolute"});
			maintag.css({"float":"left","display":"block"});
		}

		tittag.each(function(i){
			// 给选项卡标题绑定事件，事件是传进来的值
			tittag.eq(i).on(set.trigger,function(){
				// 通过点击的下标来给标题添加class
				tittag.eq(i).addClass(set.curclass).siblings().removeClass(set.curclass);
				switch(set.effect){
					case "fade":maintag.eq(i).fadeIn().siblings().fadeOut();
					break;
					case "left":maincell.stop().animate({"left":-(i-1)*mainWidth},set.speed)
					break;
				}

			})
		})

	}
})(jQuery)