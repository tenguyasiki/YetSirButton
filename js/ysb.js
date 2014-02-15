jQuery(document).ready( function($){
	// 全ての記事ノードについて下記の処理を行い、いいね件数を表示させる
	var ysb = YetSirButton;
	$('.ysbAnchor').each( function(i){
		var anchorNode = this;
		ysb.getCount().done( function(json){
			var url = json.id;
			var count = json.shares;
			var buttonText = "やっとさー！(" + count + ")";
			var shareTag = ysb.composeShareTag(url, "", buttonText);
			$(anchorNode).append(shareTag);
		})
		.fail( function(e){
			console.log("request failed : " + e);
		});
	});
});

var YetSirButton = {};

// やっとさーボタン用のタグを構築して返す。
YetSirButton.composeShareTag = function(url, title, text){
	var href = 'http://www.facebook.com/sharer.php?display=popup&u=' + url + '&t=' + title;
	var tag = $('<a>' + text  + '</a>');
	tag.on('click', function(){
		window.open(href,"windowname","width=670,height=340");
	});
	return tag;
};

//<a href="popup.html" onClick="javascript:window.open('popup.html','windowname','width=340,height=670');return false;">開く</a>



// graph apiを呼び出していいね件数を取得する
YetSirButton.getCount = function(url){
	var dfr = $.Deferred();
	
	// graph api
	// http://graph.facebook.com/?id=http://hello-apis.blogspot.jp/2013/02/facebookapi.html
	var url = "http://creators-db.net/entry/";
	//var url = location.href;
	
	var api_url = "http://graph.facebook.com/?id=" + url;
	$.ajax({
		url : api_url,
		dataType: "json",
		success : dfr.resolve
	});
	return dfr.promise();
};
