<?php
require __DIR__ . '/../vendor/autoload.php';
use YouTube\YouTubeDownloader;

$yt = new YouTubeDownloader();
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if ( isset( $_GET["video_id"] ) ) {
	$res = $yt->getVideoInfo($_GET["video_id"]);
	$error = $yt->getLastError();
	echo json_encode( $res );

	// echo json_encode([
	// 	'links' => $res["response"],
	// 	'data' => $res["data"],
	// 	'error' => $error
	// ], JSON_PRETTY_PRINT);
}