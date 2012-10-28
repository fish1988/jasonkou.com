var slideData = {
	title : '网页幻灯片开发',
	config : {
		slideId : 'slide',
		canvasId : 'myCanvas',
		ctrlId : 'slideCtrl',
		remoteControl : true
	},
	slides : [{
		title : '封面',
		id : 'cover',
		border : false,
		content : '<section class="title">'
				+ '<h1 class="slideTitle">node开发</h1>'
				+ '<h2><a href="//weibo.com/sanshuiqing" target="_blank">@ 三水清</a></h2>'
				+ '<h3>博客：<a href="//js8.in" target="_blank">JS8.IN</a></h3>'
				+ '<h3>webSlide：<a href="https://github.com/ksky521/webSlide/" target="_blank">Git</a></h3>'
				+ '</section>'
	}, {
		title : '测试标题',
		remark : '这里是备注内容哦',
		parse : true,
		content : '# 标题1\n' + '## 标题2\n' + '### 标题3\n' + '#### 标题4\n'
				+ '##### 标题5\n' + '##### 标题6\n'
	}, {
		title : '测试列表',
		remark : '这里是备注内容哦',
		parse : true,
		content : '## 标题二\n' + '* 列表1\n' + '* 列表1\n' + '* 列表1\n' + '* 列表1\n'
				+ '* 列表1\n' + '* 列表1\n'
	}]
};