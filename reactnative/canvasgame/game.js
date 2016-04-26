(class Game extends App{
	render(){
		componentWillMount(){
			var FB = {
		            // set up some inital values
		            WIDTH: 320,
		            HEIGHT: 480,
		            scale: 1,
		            // the position of the canvas
		            // in relation to the screen
		            offset: {
		                top: 0,
		                left: 0
		            },
		            // store all bird, touches, pipes etc
		            entities: [],
		            currentWidth: null,
		            currentHeight: null,
		            canvas: null,
		            ctx: null,
		            score: {
		                taps: 0,
		                coins: 0
		            },
		            distance: 0,
					digits:[],
					fonts:[],
		            // we'll set the rest of these
		            // in the init function
		            RATIO: null,
		            bg_grad: "day",
					game:null,
		            currentWidth: null,
		            currentHeight: null,
		            canvas: null,
		            ctx: null,
		            ua: null,
		            android: null,
		            ios: null,
		            gradients: {},
		            init: function () {
		                var grad;
		                // the proportion of width to height
		                FB.RATIO = FB.WIDTH / FB.HEIGHT;
		                // these will change when the screen is resize
		                FB.currentWidth = FB.WIDTH;
		                FB.currentHeight = FB.HEIGHT;
		                // this is our canvas element
		                FB.canvas = document.getElementsByTagName('canvas')[0];
		                // it's important to set this
		                // otherwise the browser will
		                // default to 320x200
		                FB.canvas.width = FB.WIDTH;
		                FB.canvas.height = FB.HEIGHT;
		                // the canvas context allows us to
		                // interact with the canvas api
		                FB.ctx = FB.canvas.getContext('2d');
		                // we need to sniff out android & ios
		                // so we can hide the address bar in
		                // our resize function
		                FB.ua = navigator.userAgent.toLowerCase();
		                FB.android = FB.ua.indexOf('android') > -1 ? true : false;
		                FB.ios = (FB.ua.indexOf('iphone') > -1 || FB.ua.indexOf('ipad') > -1) ? true : false;

		                // setup some gradients
		                grad = FB.ctx.createLinearGradient(0, 0, 0, FB.HEIGHT);
		                grad.addColorStop(0, '#036');
		                grad.addColorStop(0.5, '#69a');
		                grad.addColorStop(1, 'yellow');
		                FB.gradients.dawn = grad;

		                grad = FB.ctx.createLinearGradient(0, 0, 0, FB.HEIGHT);
		                grad.addColorStop(0, '#69a');
		                grad.addColorStop(0.5, '#9cd');
		                grad.addColorStop(1, '#fff');
		                FB.gradients.day = grad;

		                grad = FB.ctx.createLinearGradient(0, 0, 0, FB.HEIGHT);
		                grad.addColorStop(0, '#036');
		                grad.addColorStop(0.3, '#69a');
		                grad.addColorStop(1, 'pink');
		                FB.gradients.dusk = grad;

		                grad = FB.ctx.createLinearGradient(0, 0, 0, FB.HEIGHT);
		                grad.addColorStop(0, '#036');
		                grad.addColorStop(1, 'black');
		                FB.gradients.night = grad;

		                // listen for clicks
		                window.addEventListener('click', function (e) {
		                    e.preventDefault();
		                    FB.Input.set(e);
		                }, false);

		                // listen for touches
		                window.addEventListener('touchstart', function (e) {
		                    e.preventDefault();
		                    // the event object has an array
		                    // called touches, we just want
		                    // the first touch
		                    FB.Input.set(e.touches[0]);
		                }, false);
		                window.addEventListener('touchmove', function (e) {
		                    // we're not interested in this
		                    // but prevent default behaviour
		                    // so the screen doesn't scroll
		                    // or zoom
		                    e.preventDefault();
		                }, false);
		                window.addEventListener('touchend', function (e) {
		                    // as above
		                    e.preventDefault();
		                }, false);

		                // we're ready to resize
		                FB.resize();
						FB.changeState("Splash");
		                
		                FB.loop();

		            },

		            resize: function () {

		                FB.currentHeight = window.innerHeight;
		                // resize the width in proportion
		                // to the new height
		                FB.currentWidth = FB.currentHeight * FB.RATIO;

		                // this will create some extra space on the
		                // page, allowing us to scroll pass
		                // the address bar, and thus hide it.
		                if (FB.android || FB.ios) {
		                    document.body.style.height = (window.innerHeight + 50) + 'px';
		                }

		                // set the new canvas style width & height
		                // note: our canvas is still 320x480 but
		                // we're essentially scaling it with CSS
		                FB.canvas.style.width = FB.currentWidth + 'px';
		                FB.canvas.style.height = FB.currentHeight + 'px';

		                // the amount by which the css resized canvas
		                // is different to the actual (480x320) size.
		                FB.scale = FB.currentWidth / FB.WIDTH;
		                // position of canvas in relation to
		                // the screen
		                FB.offset.top = FB.canvas.offsetTop;
		                FB.offset.left = FB.canvas.offsetLeft;

		                // we use a timeout here as some mobile
		                // browsers won't scroll if there is not
		                // a small delay
		                window.setTimeout(function () {
		                    window.scrollTo(0, 1);
		                }, 1);
		            },
					            
		            // this is where all entities will be moved
		            // and checked for collisions etc
		            update: function () {
		                FB.game.update();
		                FB.Input.tapped = false;
		            },

		            // this is where we draw all the entities
		            render: function () {

		                FB.Draw.rect(0, 0, FB.WIDTH, FB.HEIGHT, FB.gradients[FB.bg_grad]);
						 
		                // cycle through all entities and render to canvas
		                for (i = 0; i < FB.entities.length; i += 1) {
		                    FB.entities[i].render();
		                }
							
						FB.game.render();
						
		            },

		            // the actual loop
		            // requests animation frame
		            // then proceeds to update
		            // and render
		            loop: function () {

		                requestAnimFrame(FB.loop);

		                FB.update();
		                FB.render();
		            },
					changeState: function(state) {    				 
						FB.game = new window[state]();
						FB.game.init();
					}
		        };
		}
		return (
				<Container startTiles={2} size={4}/>
		);
	}
}).run();
