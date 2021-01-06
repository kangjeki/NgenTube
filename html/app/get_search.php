<?php
require __DIR__ . '/../vendor/autoload.php';
$client = new YouTube\Browser;

if ( ! isset( $_GET["page"] ) ) {
	echo json_encode(["response" => false]);
	die();
}

if ( $_GET["page"] == "home" ) {
	$res = $client->get("https://www.youtube.com/?hl=id&gl=ID");
	filterStreams($res);
}

if ( $_GET["page"] == "search" ) {
	if ( isset( $_GET["keyword"] ) ) {
		$keyword = str_replace(' ', '+', $_GET["keyword"]);
		$res = $client->get("https://www.youtube.com/results?search_query={$keyword}");
		filterStreams($res);
	}
}

function filterStreams1($res) {
	preg_match_all('|{"richItemRenderer":(.*)},{"rich|U', $res, $matches);
	echo json_encode( $matches[1] );
}


function filterStreams($res) {
	preg_match_all('|videoId":"(.*)"|U', $res, $matches);
	$arr = [];
	foreach( array_unique($matches[1]) as $ar ) {
		$arr[] = $ar;
	}
	echo json_encode( $arr );
}
