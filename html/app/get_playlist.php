<?php
require __DIR__ . '/../vendor/autoload.php';
$client = new YouTube\Browser;

if ( isset( $_GET["video_id"] ) ) {
	$videoId = $_GET["video_id"];
	$res = $client->get("https://www.youtube.com/watch?v={$videoId}");
	
	filterStreams( urldecode($res) );
}

function filterStreams( $res ) {
	preg_match_all('|ideoId":"(.*)"|U', $res, $matches);
	//preg_match_all('|{"itag":(.*)}|U', $res, $matches);
	//$match = stripslashes($matches[1]);
	// $ret = json_decode($match, true);
	$arr = [];
	foreach( array_unique($matches[1]) as $ar ) {
		$arr[] = $ar;
	}
	echo json_encode( $arr );
	//var_dump($matches);
}