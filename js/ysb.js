jQuery(document).ready( function($){
	// 全ての記事ノードについて下記の処理を行い、いいね件数を表示させる
	var ysb = YetSirButton;
	$('.ysbAnchor').each( function(i){
		var anchorNode = this;
		ysb.getCount().done( function(json){
			var url = json.id;
			var count = json.shares;
			var sirText = "やっとさー！(" + count + ")";
			var sirTag = ysb.composeShareTag(url, "", sirText);
			$(anchorNode).append(sirTag);
			
			//var yetText = "やっとやっと！(" + count + ")";
			//var yetTag = ysb.composeLikeTag(url, "", yetText);
			//$(anchorNode).append(yetTag);
		})
		.fail( function(e){
			console.log("request failed : " + e);
		});
	});
});

var YetSirButton = {};

// やっとさーボタン用のタグを構築して返す。
//<a href="popup.html" onClick="javascript:window.open('popup.html','windowname','width=340,height=670');return false;">開く</a>
YetSirButton.composeShareTag = function(url, title, text){
	var href = 'http://www.facebook.com/sharer.php?display=popup&u=' + url + '&t=' + title;
	var tag = $('<a>' + text  + '</a>');
	tag.on('click', function(){
		window.open(href,null,"width=670,height=340");
	});
	return tag;
};

// やっとやっとボタン用のタグを構築して返す
//https://www.facebook.com/plugins/like.php?href=[]&width&layout=button&action=like&show_faces=true&share=false&height=35&appId=1420156181559607
YetSirButton.composeLikeTag = function(url, title, text){
	var href = 'http://www.facebook.com/plugins/like.php?href=' + url + '&width=80&layout=button&action=like&show_faces=true&share=false&height=35&appId=1420156181559607';
	var tag = $('<iframe src="' + href + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:35px;" allowTransparency="true">' + text  + '</a>');
	/*
	tag.on('click', function(){
		window.open(href,null,"width=650,height=450");
	});
	*/
	return tag;
};

// graph apiを呼び出していいね件数を取得する
YetSirButton.getCount = function(url){
	var dfr = $.Deferred();
	
	// graph api
	// http://graph.facebook.com/?id=http://hello-apis.blogspot.jp/2013/02/facebookapi.html
	//var url = "http://creators-db.net/entry/";
	var url = location.href;
	
	var api_url = "http://graph.facebook.com/?id=" + url;
	$.ajax({
		url : api_url,
		dataType: "json",
		success : dfr.resolve
	});
	return dfr.promise();
};
