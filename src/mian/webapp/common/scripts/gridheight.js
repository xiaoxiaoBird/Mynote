hwui().require(function($, hwui) {
	//$("div[name=dataGrid]").css("overflow-y","auto");
	var height = window.screen.height - 325 + "px";
	//固定高度
	$("div[name=dataGrid]").css("height",height);
	//最大高度
	$("div[name=dataGrid]").css("max-height",height);
});