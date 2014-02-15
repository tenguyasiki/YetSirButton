jQuery(document).ready( function($){
	var ysb = YetSirButton;
	
	// 全ての記事ノードについて下記の処理を行い、いいね件数を表示させる
	$('.ysbAnchor').each( function(i){
		var anchorNode = this;
		ysb.getCount().done( function(json){
			var url = json.id;
			var count = json.shares;
			$(anchorNode).append("<div>count : " + count + "</div>" );
		})
		.fail( function(e){
			console.log("request failed : " + e);
		});
	});
});

var YetSirButton = {};

// graph apiを呼び出していいね件数を取得する
YetSirButton.getCount = function(url){
	var dfr = $.Deferred();
	
	// graph api
	// http://graph.facebook.com/?id=http://hello-apis.blogspot.jp/2013/02/facebookapi.html
	var url = "http://hello-apis.blogspot.jp/2013/02/facebookapi.html";
	
	var api_url = "http://graph.facebook.com/?id=" + url;
	$.ajax({
		url : api_url,
		dataType: "json",
		success : dfr.resolve
	});
	return dfr.promise();
};
