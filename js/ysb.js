jQuery(document).ready( function($){
	// 全ての記事ノードについて下記の処理を行い、いいね件数を表示させる
	var ysb = YetSirButton;
	$('.ysbAnchor').each( function(i){
		var anchorNode = this;
		ysb.getCount().done( function(json){
			var url = json.id;
			var count = json.shares;
			var buttonText;
			if(count > 0)
			{
				buttonText = "やっとやっと！";
			}
			else
			{
				buttonText = "やっとさー！";
			}
			var anchorTag = ysb.composeAnchorTag(url, "", buttonText);
			$(anchorNode).append(anchorTag);
		})
		.fail( function(e){
			console.log("request failed : " + e);
		});
	});
});

var YetSirButton = {};

// やっとさーボタン用のタグを構築して返す。
YetSirButton.composeAnchorTag = function(url, title, text){
	var tag = '<a href="http://www.facebook.com/sharer.php?u=' + url 
		+ '&t=' + title
		+ '" target="_blank" rel="nofollow">'
		+ text  + '</a>';
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
