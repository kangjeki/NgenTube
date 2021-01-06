export default function BoosterFunction() {
	let doc = document; 
	window.log = e => console.log(e);
	window.LOG = e => console.log(e);

	window.query = function(tg) {
		return doc.querySelector(tg); 
	};
	window.queryAll = function(tg) {
		return doc.querySelectorAll(tg); 
	};
	window.jcEvent = function(el, eventName, callback) {
		el.addEventListener(eventName, function(ev) {
			if (typeof callback == 'function') {
				callback(ev);
			} else { throw Error('callback is not function')}	
		});
	};
	
	window.newTag = function(el) {
		return doc.createElement(el);
	};
	window.newText = function(tx) {
		return doc.createTextNode(tx);
	};
	window.refreshPage = function() {
		let loc = window.location;
		window.location.href = loc;
	};
	window.backPage = function() {
		window.history.back();
	};
	window.forwardPage = function() {
		window.history.forward();
	};
	JSON.identify = function(data) {
		return ( data[0] === "{" || data[0] === "[" ) ? true : false;
	};
	let __ajaxSet = (ajax, response, prg) => {
		const xhr = new XMLHttpRequest(); 
		xhr.onreadystatechange = function() {
			if (xhr.status == 200) {
				if ( xhr.readyState == 4 ) {
					response(xhr.responseText, xhr);
				}
			}
			else { response(false, xhr) }
		};
		jcEvent(xhr.upload, 'progress', e => {
			let load = e.loaded,
				total = e.total;
			let percent = (load / total) * 100;
			prg(Math.floor(percent), e);
		});

		ajax(xhr);
	};
	let __ajaxSetOnload = (ajax, response, prg) => {
		const xhr = new XMLHttpRequest(); 
		xhr.onload = function() {
			if (xhr.status == 200) {
				if ( xhr.readyState == 4 ) {
					response(xhr.response, xhr);
				}
			}
			else { response(false, xhr) }
		};
		jcEvent(xhr.upload, 'progress', e => {
			let load = e.loaded,
				total = e.total;
			let percent = (load / total) * 100;
			prg(Math.floor(percent), e);
		});
		ajax(xhr);
	};
	let __xInit = tg => {
		return ( tg !== null && tg !== false && tg !== undefined ) ? true : false;
	};
	window.ajax = {
		GET : (cf, res, prg) => {
			let xhr = __ajaxSet( xhr => { 
				let sn = ( __xInit(cf.send) ) ? "?" + cf.send : "";
				if ( cf.type ) {
					xhr.responseType = cf.type;
				};
				xhr.open('GET', cf.url + sn, true);
				xhr.send();	
			}, (r, ra) => {
				res(r, ra);
			}, (pr, ev) => {
				(typeof prg == "function") ? ( __xInit(prg) ) ? prg(pr, ev) : prg(false, false) : false;
			});
		},
		POST : (cf, res, prg) => {
			__ajaxSet( xhr => {
				if ( cf.type ) {
					xhr.responseType = cf.type;
				};
				xhr.open('POST', cf.url, true);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.send(cf.send);	
			}, (r, ra) => {
				res(r, ra);
			}, (pr, ev) => {
				(typeof prg == "function") ? ( __xInit(prg) ) ? prg(pr, ev) : prg(false, false) : false;
			});
		},
		UPLOAD : (cf, res, prg) => {
			__ajaxSet( xhr => {
				if ( cf.type ) {
					xhr.responseType = cf.type;
				};
				xhr.open('POST', cf.url, true);
				xhr.send(cf.send);	
			}, (r, ra) => {
				res(r, ra);
			}, (pr, ev) => {
				(typeof prg == "function") ? ( __xInit(prg) ) ? prg(pr, ev) : prg(false, false) : false;
			});
		},
		ONLOAD : (cf, res, prg) => {
			let xhr = __ajaxSetOnload( xhr => { 
				let sn = ( __xInit(cf.send) ) ? "?" + cf.send : "";
				cf.method = (!cf.method) ? "GET" : cf.method;
				xhr.open(cf.method, cf.url + sn, true);
				cf.type = (!cf.type) ? "text" : cf.type;
				xhr.responseType = cf.type;
				xhr.send();
			}, (r, ra) => {
				res(r, ra);
			}, (pr, ev) => {
				(typeof prg == "function") ? ( __xInit(prg) ) ? prg(pr, ev) : prg(false, false) : false;
			});
		}
	};

	window.getFullScreen = function(elem) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} 
		else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} 
		else if (elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen();
		} 
		else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		}
	};

	window.closeFullScreen = function() {
		if (doc.exitFullscreen) {
			doc.exitFullscreen();
		} 
		else if (doc.mozCancelFullScreen) {
			doc.mozCancelFullScreen();
		} 
		else if (doc.webkitExitFullscreen) {
			doc.webkitExitFullscreen();
		} 
		else if (doc.msExitFullscreen) {
			doc.msExitFullscreen();
		}
	};

	window.array_unique = function(array) {
		if ( typeof array == "object" ) {
			return [... new Set(array)];
		}
		else {
			LOG("Error!, typeof not object");
		}
	};

	window.formReporter = function(msg) {
		localStorage.setItem("__form_reporter", msg);
	};

	document.querySelectorAll('*').forEach( els => {
		if ( els.tagName !== "SCRIPT" && els.tagName !== "LINK" && els.tagName !== "META" 
			&& els.tagName !== "STYLE" && els.tagName !== "TITLE" ) {
			els.event = function(ev,cb) {
				if ( this !== null ) {
					if ( typeof this == 'object' ) { 
						this.addEventListener(ev, e => { 
							if (typeof cb == 'function') {
								cb(e);
							} else { throw Error('callback is not function')}	
						})
					}
					else { throw Error('Type Not Object!')}	
				}
			};
			els.existClass = function(cls) {
				if ( this !== null ) {
					if ( typeof this == 'object' ) {
						return ( (this).classList.contains(cls) ) ? true : false;
					}
					else { throw Error('Type Not Object!')}	
				}
			};

			els.removeClass = function(cls) {
				if ( this !== null ) {
					if ( typeof this == 'object' ) {
						( (this).classList.contains(cls) ) ? (this).classList.remove(cls) : LOG('Class Not Exist!');
					}
					else { throw Error('Type Not Object!')}	
				}
			};

			els.addClass = function(cls) {
				if ( this !== null ) {
					if ( typeof this == 'object' ) {
						( (this).classList.contains(cls) ) ? LOG('Class is Exist!') : (this).classList.add(cls);
					}
					else { throw Error('Type Not Object!')}	
				}
			};

			els.toggleClass = function(cls) {
				if ( this !== null ) {
					if ( typeof this == 'object' ) {
						(this).classList.toggle(cls);
					}
					else { throw Error('Type Not Object!')}	
				}
			};
		};
	});
	window.ucfirst = function(str) {
		return ( typeof str !== 'string' ) ? '' : str.charAt(0).toUpperCase() + str.slice(1);
	}
};
