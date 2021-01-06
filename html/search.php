
<!DOCTYPE html>
<html>
<head>
	<title>NgenTube Streaming</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="shortcut icon" type="image/png" href="img/favicon.png">
	<link rel="stylesheet" type="text/css" href="srcm/css/jcbooster.rooter.css">
	<link rel="stylesheet" type="text/css" href="srcm/css/jcbooster.animate.css">
	<link rel="stylesheet" type="text/css" href="srcm/css/jcbooster.css">
	<link rel="stylesheet" type="text/css" href="srcm/css/jcbooster.responsive.css">
	<link rel="stylesheet" type="text/css" href="srcm/css/jcbooster.awesome.css">
	<script type="module" src="srcm/js/jcbooster.init.js"></script>
</head>
<body>

<div class="app">
	<div class="header-container" style="background: #fff; margin: 0; padding: 15px;">
		<div class="row">
			<div class="col-2">
				<a href="http://localhost:8888/index.php">
					<img src="img/logo.png" width="120px">
				</a>
			</div>
			<div class="col-8">
				<form action="search.php" method="get">
					<div class="input-group">
						<input type="text" class="input-control" name="keyword" id="in-search">
						<button class="btn btn-secondary" id="btn-search">Cari</button>				
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="container" style="background: #eee">
		<div class="row content-wrapper">
			<div class="col-2">
				
			</div>
			<div class="col-8">
				<div id="content" style="padding: 5px;">
					<div id="playlist" class="p-5">
						
					</div>
				</div>
			</div>
			<div class="col-4">
				
			</div>
		</div>
	</div>

	<div class="footer-container">
		<div class="row">
			<div class="col-12">
				<div class="block-licence">
					<div class="card card-light">
						<div class="block-licence">
							NgenTube copyright: © 2018 - <?= date("Y"); ?> by artaniaga.com 
						</div>
					</div>
				</div>		
			</div>
		</div>
	</div>

</div>	
<script type="text/javascript" src="js/search.js"></script>
</body>
</html>