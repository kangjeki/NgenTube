(function() {
	let videoId, pageController, initPage, 
		videoTitle, countViews, playListSidebar;

	let streamHost = 'app/streams.php',
		getStreamsHost = 'app/get_streams.php',
		getPlayListHost = 'app/get_playlist.php';
		getVideoInfoHost = 'app/get_videoInfo.php'
		hostWatch = 'http://localhost:8888/watch.php?v=';

	let elemList, titleList, viewsList, chanelName, rollInfo = 0;


	var setPlayList = {
		html : function(vid, inf) {
			elemList = document.createElement('div');
			elemList.classList.add("list");
			elemList.innerHTML = `
				<a href="${hostWatch + vid}">
					<div class="row">
						<div class="col-5">
							<img src="${inf.thumbnail}" width="100%">
						</div>
						<div class="col-7">
							<div class="title">
								<p style="font-weight: bold; font-size: 15px">${inf.title}</p>
							</div>
							<div class="chanel">
								<p style="font-size: 15px;">${inf.chanel}</p>
							</div>
							<div class="views">
								<p style="font-size: 12px">${inf.views} x ditonton</p>
							</div>
						</div>
					</div>
				</a>
			`;
			playListSidebar.append(elemList);
		},
		videoInfo : function(arrVideoId) {
			//console.log(arrVideoId[rollInfo]);
			if ( arrVideoId[rollInfo] == videoId ) {
				rollInfo += 1;
				setPlayList.videoInfo(arrVideoId);
			}
			else {
				fetch( getVideoInfoHost + "?video_id=" + arrVideoId[rollInfo] ).then( res => {
					res.json().then( jres => {
						dtInfo = jres.player_response.videoDetails;
						//console.log(jres);
						if ( rollInfo < arrVideoId.length - 1) {
							setPlayList.html(arrVideoId[rollInfo], {title: dtInfo.title, chanel: dtInfo.author, views: jcApp.numberFormat(dtInfo.viewCount), thumbnail: dtInfo.thumbnail.thumbnails[0].url});
						
							rollInfo += 1;
							setPlayList.videoInfo(arrVideoId);
						}
					})
				})	
			}
		}
	};

	function getPlayListVideo(videoId) {
		fetch( getPlayListHost + "?video_id=" + videoId ).then( res => {
			res.json().then( jres => {
				setPlayList.videoInfo(jres);
			});
		})
	};

	function playStreams(videoId) {
		fetch( getStreamsHost + "?video_id=" + videoId ).then( res => {
			res.json().then( jres => {
				data = jres.data;
				videoTitle.innerHTML = data.videoDetails.title;
				countViews.innerHTML = jcApp.numberFormat(data.videoDetails.viewCount) + ' x dilihat';
				videoPlayer.poster = data.videoDetails.thumbnail.thumbnails[3].url;
				if (jres.links.length != 0) {
					videoPlayer.src = jres.links[0].url;
					videoPlayer.addEventListener("loadeddata", e => {
						videoPlayer.play();
					});;	
				} else {
					alert("Gagal Memuat Video!\nSumber Video Tidak Ada atau Format Tidak didukung!");
				}
			})
		})
	};

	function onLoadPage(Res) {
		initPage = window.location.href.toString().split('?');
		if ( initPage.length == 0 ) {
			return;
		};

		initPage = initPage[1].split('=');
		pageController = initPage[0];

		if ( pageController == "v" ) {
			videoId = initPage[1];
			playStreams(videoId);
			getPlayListVideo(videoId);
		}
	};

	function eventHandler(Res) {
		btnCari.addEventListener("click", _ => {
			
		});
	};

	function initYtStreams(Res) {
		btnCari = query('#btn-search');
		inCari = query('#in-search');
		videoPlayer = query('#video');
		videoTitle = query('#player .title-video p');
		countViews = query('#player .views-video p');
		playListSidebar = query('#playlist');

		// init function
		eventHandler(Res);
		onLoadPage(Res);
	};

	document.addEventListener("readyApps", Res => {
		initYtStreams(Res);
	});	
}())
