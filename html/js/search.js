(function() {
	let btnCari, inCari, videoPlayer, videoId, pageController, initPage, 
		videoTitle, countViews, playListSidebar;

	let streamHost = 'app/streams.php',
		getStreamsHost = 'app/get_streams.php',
		getSearchHost = 'app/get_search.php';
		getVideoInfoHost = 'app/get_videoInfo.php'
		hostWatch = 'http://localhost:8888/watch.php?v=';

	let elemList, titleList, viewsList, chanelName, rollInfo = 0;

	let passHomeContent;

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
			fetch( getVideoInfoHost + "?video_id=" + arrVideoId[rollInfo] ).then( res => {
				res.json().then( jres => {
					dtInfo = jres.player_response.videoDetails;
					//console.log(jres);
					if ( rollInfo < arrVideoId.length ) {
						setPlayList.html(arrVideoId[rollInfo], {title: dtInfo.title, chanel: dtInfo.author, views: jcApp.numberFormat(dtInfo.viewCount), thumbnail: dtInfo.thumbnail.thumbnails[0].url});
					
						rollInfo += 1;
						setPlayList.videoInfo(arrVideoId);
					}
				})
			})		
		}
	};

	function getSearchKeyword(videoId) {
		fetch( getSearchHost + "?page=search&keyword=" + videoId ).then( res => {
			res.json().then( jres => {
				setPlayList.videoInfo(jres);
			});
		})
	};

	function getListHomepage(videoId) {
		//console.log('ini home');
		fetch( getSearchHost + "?page=home" ).then( res => {
			res.json().then( jres => {
				//console.log(JSON.parse(jres[0]));
				// jres.forEach( dt0 => {
				// 	dt0 = JSON.parse(dt0);
				// 	dt0 = dt0.content.videoRenderer;

				// 	setPlayList.html(dt0.videoId, {title: dt0.title.runs[0].text, chanel: dt0.ownerText.runs[0].text, views: dt0.viewCountText.simpleText, thumbnail: dt0.thumbnail.thumbnails[0].url});
				// })


				setPlayList.videoInfo(jres);
			});
		})
	};

	function onLoadPage(Res) {
		initPage = window.location.href.toString().split('search.php?keyword=');
		if ( initPage.length == 1 ) {
			getListHomepage(false)
		} else {
			getSearchKeyword(initPage[1]);
		}

		
	};

	function initYtStreams(Res) {
		playListSidebar = query('#playlist');
		// init function
		onLoadPage(Res);
	};

	document.addEventListener("readyApps", Res => {
		initYtStreams(Res);
	});	
}())
