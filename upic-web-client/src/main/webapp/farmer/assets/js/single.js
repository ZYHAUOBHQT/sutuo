$(function() {
	$(".check").click(function() {
		$(this).addClass("check-active");
		$(this).siblings().removeClass("check-active");

	})

	$(".line.shop").click(
			function() {
				if ($(this).hasClass('line-active')) {
					return;
				}
				$(this).addClass("line-active");
				$(this).parent().siblings().children().removeClass(
						"line-active");
				centerSearchShop.method = $(this).attr('id');
				getByAjax("shop", centerSearchFarmer, searchPoFarmer);

				var $clicked = $(".am-parent.am-open");
				var $parent = $clicked.parent();
				var $subMenu = $clicked.next('.am-menu-sub');

				$parent.toggleClass('am-open');
				$subMenu.collapse('toggle');
				$parent.siblings('.am-parent').removeClass('am-open').children(
						'.am-menu-sub.am-in').collapse('close');
			})
	/**
	 * 主题被点点击事件
	 */
	$(".am-panel-bd.shop-theme").click(function() {
		searchPoShop.themetzShop = $(this).attr("id");
		searchPoShop.projectShop = "";
		searchPoShop.themeName="";
		getByAjax("shop", centerSearchShop, searchPoShop);
		$(".am-parent.am-open").removeClass("am-open");
		$("#model").removeClass("am-in");
	})

	/**
	 * 项目被点点击事件
	 */
	$(".am-panel-bd.shop-theme").click(function() {
		searchPoShop.projectShop = $(this).attr("id");
		searchPoShop.themetzShop = "";
		searchPoShop.themeName="";
		getByAjax("shop", centerSearchShop, searchPoShop);
		$(".am-parent.am-open").removeClass("am-open");
		$("#model").removeClass("am-in");
	})
	$("#OkShop").click(function() {
		centerSearchShop.pageNumStr = 1;
		// 获取时间段
		var timeIds = $(".check.check-active.shop.time").attr("id");
		centerSearchShop.timeId = timeIds;
		if (timeIds === "empty") {
			centerSearchShop.timeId = "";
		}
		// 获取生态圈
		var biospheres = $(".check.check-active.shop.district").attr("id");
		searchPoShop.biosphere = biospheres;
		if (biospheres === "district_empty") {
			searchPoShop.biosphere = "";
		}
		var peopleNum = $(".check.check-active.shop.people").attr("id");
		if (peopleNum != "shoppeo_empty") {
			centerSearchShop.peopleNum = peopleNum;
		}
		var methodIds = $(".line.line-active.shop").attr("id");
		var c = methodIds.split("_");
		centerSearchShop.method = c[1];
		getByAjax("shop", centerSearchShop, searchPoShop);
		$(".am-parent.am-open").removeClass("am-open");
		$("#model").removeClass("am-in");
	})
	//初始化加载
	getByAjax("shop", centerSearchShop, searchPoShop);
	
	//主题确定
	$("#Oktheme").click(function() {
		centerSearchShop.pageNumStr = 1;
		// 获取主题
		var themes = $(".check.check-active.theme").attr("id");
		searchPoShop.themetzShop = themes;
		if (themes === "empty") {
			searchPoShop.themetzShop = "";
		}
		getByAjax("shop", centerSearchShop, searchPoShop);
		$(".am-parent.am-open").removeClass("am-open");
		$("#model1").removeClass("am-in");
	})
	//项目确定
	$("#OkProject").click(function() {
		centerSearchShop.pageNumStr = 1;
		// 获取主题
		var projects = $(".check.check-active.project").attr("id");
		searchPoShop.projectShop = projects;
		if (projects === "empty") {
			searchPoShop.projectShop = "";
		}
		getByAjax("shop", centerSearchShop, searchPoShop);
		$(".am-parent.am-open").removeClass("am-open");
		$("#model1").removeClass("am-in");
	})
})



function getCookie(name) {
	var arr = document.cookie.split(';');
	var i = 0;
	for (i = 0; i < arr.length; i++) {
		// arr2->['username', 'abc']
		var arr2 = arr[i].split('=');

		if (arr2[0] == name) {
			var getC = decodeURIComponent(arr2[1]);
			return getC;
		}
	}
	return '';
}

var centerSearchShop = {
	keyWord : keywords,
	searchClass : "SearchPo",
	t : "",
	desc : "",
	returnType : "shop",
	pageNumStr : 1,
	numPerPageStr : 10,
	method : "1",
	timeId : "",
	peopleNum : "",
	x : "",
	y : "",
	field1 : "",
	field2 : "",
	field3 : "",
	field4 : "",
	field5 : ""
};

var searchPoShop = {
	searchType : "",
	playType : "",
	firstTypeName : "",
	firstTypeId : "",
	secondTypeName : "",
	secondTypeId : "",
	biosphere : "",
	city : cityName,
	themeName : themes,// 玩乐、特产
	shopTheme : "",// 主烧烤
	themetzShop : "",// 主题 亲子
	projectShop : projects,// 项目 
	field1 : "",
	field2 : "",
	field3 : "",
	field4 : "",
	field5 : ""
};
var isFlagFarmer = true;
var isFlagShop = true;
function getByAjax(type, searchParent, search) {
	searchParent.t = JSON.stringify(search);
	var datas = JSON.stringify(searchParent);
	$.ajax({
		type : "POST",
		url : searchUrl,
		dataType : "json",// (可以不写,默认)
		data : {
			data : datas
		},
		beforeSend : function(XMLHttpRequest) {
			progress.inc();
		},
		success : function(datas, textStatus) {
			pageCount = datas.pageCount;

			var data = datas.recordList;
			// 如果为空了
			jugeAndDeal(type, data);
			searchParent.pageNumStr = searchParent.pageNumStr + 1;
		},
		complete : function(XMLHttpRequest, textStatus) {
			progress.done(true);
		},
		error : function() {
			alert("加载失败请重试");
			progress.done(true);
		}
	});
	function jugeAndDeal(type, data) {
		if (type === "farmer") {
			var htmls = "";
			for (var i = 0; i < data.length; i++) {
				htmls += "<div class='boxs'><div class='box3'><img src='"
						+ data[i].storeHeadPic + "'/><div class='right'>"
						+ data[i].storeName + "</div></div>";
				htmls += "<div class='box4' style='background-image:url("
						+ data[i].backPic
						+ "); background-size:contain'><span class='tab'>人均:"
						+ data[i].avgCost + "元 </span></div>";
				htmls += "<div class='box5'>"
						+ data[i].title
						+ "<span class='span2' onClick='goStoreByStoreNumber('"
						+ data[i].storeNumber
						+ "')'>进店逛逛<i class='am-icon-chevron-right'></i></span></div></div>";
			}
			if (centerSearchFarmer.pageNumStr == 1) {
				$("#farmerIn").html(htmls);
			} else {
				$("#farmerIn").append(htmls);
			}
		} else if (type === "shop") {
			var htmls = "";
			for (var i = 0; i < data.length; i++) {
				htmls += "<a href='"
						+ ctx
						+ "/shop/searchBySN.do?shopNumber="
						+ data[i].shopNumber
						+ "'><table id='tb-one'><tr><td><img class=''am-radius' alt='140*140'src='"
						+ data[i].shopHeadPic + "'></td><td class='td-sd'>";
				htmls += "<div class='tt'>" + data[i].shopName
						+ "</div> <span class='place'>" + data[i].city + "·"
						+ data[i].district
						+ "</span><div><span class='people'>";
				
				if(data[i].shopPrice==0){
					htmls+="询价";
				}else{
					if(data[i].peopleNum==1){
						htmls += data[i].shopPrice + "元/人";	
					}else{
						htmls += data[i].shopPrice + "元/"+ data[i].peopleNum +"人";
					}
//				htmls+=data[i].shopPrice + "元/" + data[i].peopleNum;
				}
				htmls += "</span></div>";
				if (data[i].project != "isEmpty") {
					var a = data[i].project.split(",");
					for (var j = 0; j < a.length; j++) {
						if(a[j]!=""&&a[j]!=''){
						htmls += "<div class='bigbord'><ul><li class='bord'>";
						htmls += a[j];
						htmls += "</li></ul></div>";
						}
					}
				}
				htmls += "</td></tr></table></div></a>";
			}

			if (centerSearchShop.pageNumStr == 1) {
				$("#shopIn").html(htmls);
			} else {
				$("#shopIn").append(htmls);
			}
		}
	}

	/** 滚动条* */
	var totalheight = 0;// 定义一个总的高度变量
	$(window)
			.scroll(
					function() {
						totalheight = parseFloat($(window).height())
								+ parseFloat($(window).scrollTop());// 浏览器的高度加上滚动条的高度
						if ($(document).height() <= totalheight) // 当文档的高度小于或者等于总的高度的时候，开始动态加载数据
						{

							if ($(".am-active.mr-ff").attr("id") === "farmers") {
								// 如果已经加载完毕
								if (!isFlagFarmer) {
									$("#notAnyMoreFarmer").show();
									return;
								}
								getByAjax("farmer", centerSearchFarmer,
										searchPoFarmer);
							} else if ($(".am-active.mr-ff").attr("id") === "shop") {
								if (!isFlagShop) {
									$("#notAnyMoreShop").show();
									return;
								}
								getByAjax("shop", centerSearchShop,
										searchPoShop);
							}
						}
					});
	/**
	 * 根据商家编号获取商家信息
	 */
	function goStoreByStoreNumber(obj) {
		location.href = ctx + '/store/' + obj + '/searchBySM.do';
	}

	/**
	 * searchType:项目或者主题 type:类型 shop farmer content:内容
	 */
	function loadPage(searchType, type, content) {
		if (searchType === 'project') {
			if (type === 'shop') {
				searchPoShop.searchType = content;
				getByAjax("shop", centerSearchShop, searchPoShop);
			} else if (type === 'farmer') {
				searchPoFarmer.searchType = content;
				getByAjax("farmer", centerSearchFarmer, searchPoFarmer);
			}
		} else if (searchType === 'theme') {
			if (type === 'shop') {
				searchPoShop.themeName = content;
				getByAjax("shop", centerSearchShop, searchPoShop);
			} else if (type === 'farmer') {
				searchPoFarmer.themeName = content;
				getByAjax("farmer", centerSearchFarmer, searchPoFarmer);
			}
		}
	}
}