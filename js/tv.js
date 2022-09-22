function showlist(){
	whichEl = eval("list");
	if (whichEl.style.display == "none") {
		eval("list.style.display=\"\";");
		idFlag.innerHTML = "<div class='close'><a href='#' title='关闭列表'></a></div>";
	}
	else {
		eval("list.style.display=\"none\";");
		idFlag.innerHTML = "<div class='open'><a href='#' title='打开列表'></a>";
	}
}
