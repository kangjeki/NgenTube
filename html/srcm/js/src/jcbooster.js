export default function JcApp() {
	var jc = this;
	let iW = window.innerWidth;

	jc.init = function(Doc) {
		let reStrucLayout = function() {
			const 	header = Doc.querySelector('.header'),
					sidebar = Doc.querySelector('.sidebar'),
					container = Doc.querySelector('.container');
			
			if (header !== null) {
				let mode = header.getAttribute('mode');
				if (mode !== null) {
					if (iW >= 767.98) {
						if (mode == 'fixed') {
							let hH = header.clientHeight;
							header.classList.add('header-fixed');
							container.style.cssText = `margin-top: ${hH}px`;
						};
					}
					else {
						container.removeAttribute('style');
					}
				};
			};
			if (sidebar !== null) {
				let mode = sidebar.getAttribute('mode');
				if (mode !== null) {
					if (mode == "fixed") {
						let nv = Doc.querySelector('.nav');
						let nvR = Doc.querySelector('.nav-right');
						let hH = header.clientHeight;
						if (iW >= 767.98) {
							let fs = sidebar.parentElement.clientWidth;
							sidebar.classList.add('sidebar-fixed');

							let bA = 0;
							let baSelect = sidebar.querySelector('.bar-account');

							if (baSelect !== null) {
								bA = sidebar.querySelector('.bar-account').clientHeight;
								baSelect .style.cssText = `top: ${hH}px; max-width: ${nv.parentElement.clientWidth}px`;
							}
							nv.style.cssText = `top: ${hH + bA}px; max-width: ${nv.parentElement.clientWidth}px;`;

							if (nvR !== null) {
								nvR.style.cssText = `top: ${hH + bA}px; max-width: ${nvR.parentElement.clientWidth}px;`;
							}
						}
						else {
							nv.removeAttribute('style');
							if (nvR !== null) {
								nvR.removeAttribute('style');
							}
						}
					}
				}
			}	
		};
		reStrucLayout();
		window.addEventListener('resize', function() {reStrucLayout()});

		Doc.querySelectorAll('.btn-sidebar').forEach(function(el) {
			let target = el.getAttribute("expand-target");
			if (target !== null) {
				el.addEventListener('click', function() {
					Doc.querySelector(target).classList.toggle('sidebar-show');
				});
			}
		});

		Doc.querySelectorAll('.btn-navbar').forEach(function(el) {
			let target = el.getAttribute("expand-target");
			if (target !== null) {
				el.addEventListener('click', function() {
					Doc.querySelector(target).classList.toggle('navbar-show');
				});
			}
		});

		let __resetBtnToggle = function(rollOn) {
			document.querySelectorAll('.btn-toggle').forEach( el => {
				let verCls = false;
				let inCls = "";
				if ( el.getAttribute('roll') != null && el.getAttribute('roll') == rollOn ) {
					let defCls = el.getAttribute('toggle');
					["-out-", "-noOut-"].forEach( cls => {
						if ( defCls.search(cls) > 0) {
							verCls = cls;
						}
					});
					if ( verCls ) {
						inCls = defCls.replace(verCls, '-');
					}
					else {
						inCls = defCls.replace('btn', 'btn-out');
					};
					if ( el.classList.contains(inCls) ) {
						el.classList.remove(inCls);
						el.classList.add(defCls);
						el.setAttribute('clicked', 'false');
						el.checked = false;	
					}
				}
			});
		};

		Doc.querySelectorAll('.btn-toggle').forEach(function(el) {
			if ( el.getAttribute('toggle') !== null ) {
				let hct = el.getAttribute('toggle');
				el.checked = false;
				el.addEventListener('click', function() {
					let clsOn = false;
					["-out-", "-noOut-"].forEach(cls => {
						( ( hct.search(cls) > 0) ? clsOn = hct.replace(cls, "-") : false ); 
					});
					if ( ! clsOn ) {
						clsOn = hct.replace('btn-', 'btn-out-');
					};

					if ( ! el.checked ) {
						if ( el.getAttribute('roll') != null ) {
							__resetBtnToggle(el.getAttribute('roll'));
						};
						el.classList.remove(hct);
						el.classList.add(clsOn);
						el.setAttribute('clicked', 'true');
						el.checked = true;
					}
					else {
						el.classList.remove(clsOn);
						el.classList.add(hct);
						el.setAttribute('clicked', 'false');
						el.checked = false;
					};
				});
			}
		});

		let reqFullSC = document.querySelector("#btn-full-sc"),
			exitFullSC = document.querySelector("#btn-exit-full-sc");
		if (exitFullSC !== null) {
			reqFullSC.onclick = function() {
				getFullScreen(document.querySelector("html"));
				reqFullSC.classList.toggle('hide-btn-full-sc');
				exitFullSC.classList.toggle('hide-btn-full-sc');
			};
			exitFullSC.onclick = function() {
				closeFullScreen();
				reqFullSC.classList.toggle('hide-btn-full-sc');
				exitFullSC.classList.toggle('hide-btn-full-sc');
			}
		};

		let expandRoll = function(groupRoll) {
			let expandAct = Doc.querySelectorAll('.expanded');
			if (expandAct !== null) {
				expandAct.forEach(function(el) {
					let roll = el.getAttribute("roll");
					if (roll !== null) {
						if (roll == groupRoll) {
							let heightNode = 0;
							el.style.cssText = `height: ${heightNode.toString()}px;`;
							el.classList.remove('expanded');	
						}
					}
				});
			}
		};

		Doc.querySelectorAll('.expand').forEach(function(el) {
			let target = el.getAttribute('expand-target'),
				groupRoll = el.getAttribute('group-roll');
			if (target !== null) {
				el.addEventListener('click', function() {
					let heightNode = 0,
						tg = Doc.querySelector(target),
						node = tg.children,
						exAct = tg.classList.contains('expanded');
					if (exAct == false) {
						for (let i = 0; i < node.length; i++) {
							heightNode += node[i].offsetHeight;
						}
						if (groupRoll !== null) {
							expandRoll(groupRoll);
						}
						tg.setAttribute('style', `height: ${heightNode.toString()}px;`);
						setTimeout( function() {
							tg.classList.add('expanded');
						}, 100);
					}
					else {
						heightNode = 0;
						tg.style.cssText = `height: ${heightNode.toString()}px;`;
						tg.classList.remove('expanded');
					}
				});
				if ( document.querySelector(target).classList.contains("active") ) {
					let evn = document.createEvent('MouseEvent');
						evn.initEvent('click', false, false);
					el.dispatchEvent(evn);
				}
			}

		});

		Doc.querySelectorAll('.table-striped').forEach(function(el) {
			let row = el.querySelectorAll('tr');
			row.forEach(function(elRow, num) {
				if (num % 2 == 0) {
					elRow.style.cssText = 'background: #efefef;';
				}
			});
		});

		Doc.querySelectorAll('.spa-model').forEach(function(el) {
			let mode = el.getAttribute('mode'),
				uriLoad = el.getAttribute('load'),
				inPage = el.getAttribute('active-page'),
				inner_id = el.getAttribute('inner-id');

			el.addEventListener('click', function() {

				if (uriLoad !== null) {
					if (mode !== null) {
						if (mode == "roll-back") {
							let pathURL = window.location.href,
								getPath = pathURL.split("/");
							uriLoad = getPath[getPath.length - 1];
						}

						let splSn = uriLoad.split('?'),
							load = splSn[0],
							sendData = splSn[1];

						if (mode == "sync") {
							window.location.href = load;
						}
						else {
							ajax.GET({url : load, send 	: sendData}, function(res) {
								if ( res ) {
									let innerData = res;
									if ( mode == "roll-back" ) {
										let ndiv = document.createElement('div');
											ndiv.innerHTML = innerData;
										let dataResBack = ndiv.querySelector(inner_id).innerHTML;
										innerData = `<div class='animated fadeInLeft'>${dataResBack}</div>`;
									}
									let innerTarget = query(inner_id);
										innerTarget.innerHTML = innerData;
									jcApp.init(innerTarget);
									jcApp.__spaevent(innerTarget, innerData);
								}
							});
						}
					};		
				}
			});
		});

		Doc.querySelectorAll('.tooltips').forEach(function(el, indk) {
			let atb = el.attributes;
			let place = atb.place.nodeValue,
				tips = atb.tips.nodeValue,
				mode = atb.mode.nodeValue;

			if (place == null || place == undefined) {
				place = "right";
			}
			if (tips == null || tips == undefined) {
				tips = "tooltips active";
			}
			if (mode == null || mode == undefined) {
				mode = "normal";
			}

			let elem = document.createElement('div'),
				txt = document.createTextNode(tips);

			elem.classList.add('tips-active');
			elem.appendChild(txt);
			elem.classList.add('actTip-' + indk.toString());

			let postTips = function(clX, clY, elem, place, callback) {
				let elH = elem.offsetHeight,
					elW = elem.offsetWidth,
					elPd = 10;

				let elX, elY;
				if (place == "top") {
					elY = (clY - elH) - elPd;
					elX = clX - (elW/2); 
				}
				else if (place == "right") {
					elY = clY - (elH/2);
					elX = clX + (elPd * 2);
				}
				else if (place == "bottom") {
					elY = (clY + elH);
					elX = clX - (elW/2) + 10; 
				}
				else if (place == "left") {
					elY = clY - (elH/2);
					elX = (clX - elW) - elPd;
				}
				if (typeof callback == "function") {
					callback({x: elX, y: elY});
				}
			};

			el.addEventListener('mousemove', function(e) {
				let clY = e.clientY,
					clX = e.clientX;
				let elX, elY;
				if (Doc.querySelector('.actTip-' + indk.toString()) == null) {
					el.appendChild(elem);

					postTips(clX, clY, elem, place, function(res) {
						elX = res.x; elY = res.y;
					});
					elem.classList.add('tips-'+mode);
					elem.style.cssText = `padding: 5px 10px; top: ${elY}px; left: ${elX}px; z-index:1250;`;
				}
				else {
					postTips(clX, clY, elem, place, function(res) {
						elX = res.x; elY = res.y;
					});
					elem.style.cssText = `padding: 5px 10px; top: ${elY}px; left: ${elX}px; z-index:1250;`;
				}
				el.addEventListener('mouseleave', function() {
					elem.remove();
				});
			});
		});

		let toggler_hideDropdown = function (drMn) {
			window.onclick = function(ev) {
				if (drMn.classList.contains('show') === true) {
					let atbRoll = drMn.getAttribute("roll");
					if (atbRoll !== null) {
						if (atbRoll == "active") {
							drMn.classList.toggle('show');
						}
					}
				}
			}
		};

		Doc.querySelectorAll('.dropdown').forEach(function(eldr) {
			let btnTgl = eldr.querySelector('.dropdown-toggle'),
				drMn = eldr.querySelector('.dropdown-menu'),
				drCls = eldr.querySelector('.dropdown-close');

			btnTgl.addEventListener('click', function(ev) {
				if (drMn.classList.contains('show') === true) {
					drMn.classList.toggle('show');
				}
				else {
					setTimeout(function() {
						drMn.classList.toggle('show');
					}, 10);
					toggler_hideDropdown(drMn);	
				}
			});
			if (drCls !== null) {
				drCls.addEventListener('click', function() {
					drMn.classList.toggle('show');
				});	
			}
		});

		Doc.querySelectorAll('.dropright').forEach(function(eldr) {
			let btnTgl = eldr.querySelector('.dropdown-toggle'),
				drMn = eldr.querySelector('.dropdown-menu'),
				drCls = eldr.querySelector('.dropdown-close');

			btnTgl.addEventListener('click', function() {
				if (drMn.classList.contains('show') === true) {
					drMn.classList.toggle('show');
				}
				else {
					setTimeout(function() {
						drMn.classList.toggle('show');
					}, 10);
					toggler_hideDropdown(drMn);	
				}
				let cW = btnTgl.clientWidth,
					cH = btnTgl.clientHeight;
				drMn.style.cssText = `top: 0; left: ${cW}px`;
			});
			if (drCls !== null) {
				drCls.addEventListener('click', function() {
					drMn.classList.toggle('show');
				});	
			}
		});

		Doc.querySelectorAll('.dropleft').forEach(function(eldr) {
			let btnTgl = eldr.querySelector('.dropdown-toggle'),
				drMn = eldr.querySelector('.dropdown-menu'),
				drCls = eldr.querySelector('.dropdown-close');

			btnTgl.addEventListener('click', function() {
				if (drMn.classList.contains('show') === true) {
					drMn.classList.toggle('show');
				}
				else {
					setTimeout(function() {
						drMn.classList.toggle('show');
					}, 10);
					toggler_hideDropdown(drMn);	
				}
				let cW = btnTgl.clientWidth,
					cH = btnTgl.clientHeight;
				drMn.style.cssText = `top: 0; right: ${cW}px`;
			});
			if (drCls !== null) {
				drCls.addEventListener('click', function() {
					drMn.classList.toggle('show');
				});	
			}
		});

		Doc.querySelectorAll('.droptop').forEach(function(eldr) {
			let btnTgl = eldr.querySelector('.dropdown-toggle'),
				drMn = eldr.querySelector('.dropdown-menu'),
				drCls = eldr.querySelector('.dropdown-close');

			btnTgl.addEventListener('click', function() {
				if (drMn.classList.contains('show') === true) {
					drMn.classList.toggle('show');
				}
				else {
					setTimeout(function() {
						drMn.classList.toggle('show');
					}, 10);
					toggler_hideDropdown(drMn);	
				}
				let cW = btnTgl.clientWidth,
					cH = btnTgl.clientHeight;
				drMn.style.cssText = `bottom: ${cH}px; left: 0`;
			});
			if (drCls !== null) {
				drCls.addEventListener('click', function() {
					drMn.classList.toggle('show');
				});	
			}
		});

		Doc.querySelectorAll('.modal-toggle').forEach(function(el) {
			el.addEventListener('click', function() {
				let target = el.attributes.target.nodeValue,
					modal = Doc.querySelector(target),
					modalW = modal.getAttribute('modal-width');
				modal.classList.toggle('modal-show');
				
				if ( iW < 767.98 ) {
					modal.querySelector('.modal-block').style.maxWidth = `${iW - 30}px`;
				}
				else {
					modal.querySelector('.modal-block').style.maxWidth = `${modalW}`;
				}
			});
		});

		Doc.querySelectorAll('.slide-pack').forEach(function(el) {
			let frmImage = el.querySelector(".slide-image"),
				nodeListSlide = frmImage.querySelectorAll("li"),
				imgWd = frmImage.querySelectorAll("li img"),
				invSlide = 0;
				
			if ( el.getAttribute("interval") !== null ) {
				invSlide = el.getAttribute("interval");
			}
			else {
				invSlide = 5000;
			}

			imgWd.forEach(function(elImg) {
				elImg.style.width =(frmImage.clientWidth).toString() + "px";
			});

			let rollslide = 1;
			setInterval(function() {
				let wd = nodeListSlide[rollslide - 1].clientWidth,
					transX = wd * rollslide;

				if ( rollslide == nodeListSlide.length ) {
					frmImage.style.cssText = `transform: translateX(${0}px); transition: 0.5s ease-in-out`;
					rollslide = 1;
				}
				else {
					frmImage.style.cssText = `transform: translateX(-${transX}px); transition: 0.5s ease-in-out`;
					rollslide += 1;
				}
				
			}, invSlide);
		});
		
		let getOffset =  function(el) {
			let rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		};

		let scroller = function(postElement) {
			window.scroll({
				top 	: postElement.top,
				left 	: 0
			});
		};

		let scrollerUp = function(actPostTop, topEl, navH) {
			let postRoll = actPostTop;

			let inv = setInterval(function() {
				postRoll -= 15;
				if ( postRoll <= topEl.top - navH) {
					postRoll = topEl.top - navH;
					clearInterval(inv);
				}
				
				scroller({top: postRoll, left: 0});
			}, 1);
		};

		let scrollerDown = function(actPostTop, topEl, navH) {
			let postRoll = actPostTop;

			let inv = setInterval(function() {
				postRoll += 15;
				if ( postRoll >= topEl.top - navH)  {
					postRoll = topEl.top - navH;
					clearInterval(inv);
				}
				scroller({top: postRoll, left: 0});
			}, 1);
		};

		Doc.querySelectorAll(".scroll-switch").forEach(function(el) {
			el.addEventListener('click', function() {
				let target = el.getAttribute('target-scroll'),
					actPostTop = window.pageYOffset,
					postRoll = actPostTop,
					topEl = getOffset( document.querySelector(target) );
				let fixedNavbar = document.querySelector('.header-fixed'),
					navH = 0;

				if (fixedNavbar !== null) {
					navH = fixedNavbar.clientHeight;
				}

				if (actPostTop - navH >= topEl.top) {
					scrollerUp(actPostTop, topEl, navH);
				}

				if (actPostTop - navH <= topEl.top) {
					scrollerDown(actPostTop, topEl, navH);
				}
			});
		});
		
		Doc.querySelectorAll('.input-group').forEach( el => {
			let select = el.querySelector('select');
			if ( select != null && select.getAttribute('autofill') != null ) {
				select.addEventListener('change', e => {
					el.querySelector(select.getAttribute('autofill')).value = select.value;
				});
			}
		});


		let preLoad = Doc.querySelector('body');
		if ( preLoad != null && preLoad.classList.contains('preload') ) {
			preLoad.classList.remove('preload');
		};
	};

	jc.array = {
		unique : function(ary) {
			if ( typeof ary == "object" ) {
				return [... new Set(ary)];
			}
			else {
				throw Error("Error!, typeof not object");
			}
		}
	};

	jc.setForm = function(elem, exc) {
		let formData = "",
		dataForm = {
			status: true,
			data: ""
		};
		elem.querySelectorAll('*').forEach( (el, i) => {
			if ( el.getAttribute('name') != null ) {
				let index = el.getAttribute('name'),
					val = el.value;
				if ( index.replace(/ /g, '') == "" ) {
					dataForm.status = false;
					dataForm.message = "Attrib Name Kosong!";
					return dataForm;
				} 
				if ( el.getAttribute('required') != null) {
					let req = el.getAttribute('required');
					if ( val.length == 0 ) {
						dataForm.status = false;
						dataForm.message = "Value Kosong!";
						dataForm.element = el;
						if ( exc != false ) {
							el.style.border = "0.5px #ff5050 solid";
    						el.style.background = "#ffeeee";
							el.focus();
						}
						return dataForm;
					}
					else { formData += index + "=" + val + ( (i == elem.length -1)? "": "&"); }
				}
				else { formData += index + "=" + val + ( (i == elem.length -1)? "": "&"); }	
			}
		});

		dataForm.data = formData;
		return dataForm;
	};

	jc.setForm = function(elem, exc) {
		return new Promise( function( resolve, reject ) { 
			let formArray = "",
			dataForm = {
				status: true,
				message: "",
				data: ""
			};
			elem.querySelectorAll('*').forEach( (el, i) => {
				if ( el.getAttribute('name') != null ) {
					let index = el.getAttribute('name'),
						val = el.value;
					if ( index.replace(/ /g, '') == "" ) {
						dataForm.status = false;
						dataForm.message = "Attrib Name Kosong!";
						reject(dataForm);
					} 
					if ( el.getAttribute('required') != null) {
						let req = el.getAttribute('required');
						if ( val.length == 0 ) {
							dataForm.status = false;
							dataForm.message = "Value Kosong!";
							dataForm.element = el;
							if ( exc != false ) {
								el.style.border = "0.5px #ff5050 solid";
	    						el.style.background = "#ffeeee";
								el.focus();
							}
							reject(dataForm);
						}
						else { formArray += index + "=" + val + ( (i == elem.length -1)? "": "&"); }
					}
					else { formArray += index + "=" + val + ( (i == elem.length -1)? "": "&"); }	
				}
			});

			dataForm.data = formArray;
			resolve(dataForm);
		});
	};

	jc.setFormArray = function(elem) {
		return new Promise( function( resolve, reject ) { 
			let dataForm = {
				status: true,
				message: "",
				data: []
			};

			let inputCheck = elem.querySelectorAll('*');
			if ( inputCheck.length != 0 ) {
				let indexPass = [];
				let dataPass = [];
				inputCheck.forEach( elIn => {
					if ( elIn.getAttribute('name') != null ) {
						let name = elIn.getAttribute('name');
						if ( ! indexPass.includes(name) ) {
							indexPass.push(name);
						}
						if ( elIn.checked ) {
							let value = elIn.getAttribute('value');
							dataPass.push({index: name, value: value});	
						}
					}
				});
				indexPass.forEach( index => {
					let map = [];
					dataPass.forEach( data => {
						if ( data.index == index ) {
							map.push(data.value);
						}
					});
					dataForm.data.push({index: index, value: map});
				});
			}
			else {
				dataForm.status = false;
				dataForm.message = "No child elements found!";
				reject(dataForm);
			};
			resolve(dataForm);
		});
	}
}
