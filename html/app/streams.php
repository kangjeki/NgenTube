<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

set_time_limit(0);
require __DIR__ . '/../vendor/autoload.php';

$url = isset($_GET['url']) ? $_GET['url'] : null;

if ($url == false) {
    die("No url provided");
}

$youtube = new \YouTube\YoutubeStreamer();
$youtube->stream($url);


