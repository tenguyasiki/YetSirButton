<?php
/*
	Plugin Name: YetSirButton
	Plugin URI: 
	Description: やっとさーボタン
	Author: Awa creators db
	Version: 0.1
	Author URI: http://creators-db.net/
 *
 * @package WordPress
 * @subpackage YetSirButton
 */
 define('YSB_PLUGIN_NAME', 'YetSirButton');



if ( ! function_exists( 'ysb_init' ) ):
// 初期化：スクリプトファイルをキューに載せる
add_action( 'init', 'ysb_init' );
function ysb_init(){
	wp_deregister_script('jquery');
	wp_enqueue_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', array(), '1.10.2');
	$ysb_script_filepath = plugins_url( YSB_PLUGIN_NAME ) . '/js/jquery.xdomainajax.js';
	$ysb_script_filepath = plugins_url( YSB_PLUGIN_NAME ) . '/js/ysb.js';
	wp_enqueue_script("ysb_js", $ysb_script_filepath);
	
}
endif;

// やっとさーボタンを出力する
if ( ! function_exists( 'ysb_output_anchor' ) ):
add_action('the_content', 'ysb_output_anchor');
function ysb_output_anchor()
{
	$content = get_the_content();
	$url = get_permalink();
	$anchor = sprintf("<div class='ysbAnchor' url='%s'>やっとさー！</div>", $url);
	echo($content . $anchor . "\n");
}
endif;

// OGPタグをヘッダに出力する
/*
if ( ! function_exists( 'ysb_output_ogp' ) ):
add_action('wp_head', 'ysb_output_ogp');
function ysb_output_ogp(){
	// サイト名
	$ogp_site_name = get_bloginfo('name');
	
	// OGPタグの出力 ?>
<meta property='og:title' content='<?php echo $ogp_title; ?>' />
<meta property="og:type" content="<?php echo $ogp_type;?>" />
<meta property="og:url" content="<?php echo $ogp_url; ?>" />
<meta property="og:description" content="<?php echo $ogp_description; ?>"/>
<meta property="og:site_name" content="<?php echo $ogp_site_name; ?>" />
<meta property="og:image" content="<?php echo $ogp_image; ?>" />
	<?php
}
endif; // ysb_output_ogp
*/

