<!DOCTYPE html>
<html>

<head>
	<title>ArknadO - The Game</title>
	<script src="//cdn.jsdelivr.net/npm/phaser@3.18.1/dist/phaser.min.js"></script>
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="assets/css/style.css">
	<script src="MainScene.js"></script>
	<script src="HangarScene.js"></script>
</head>
<style media='screen' type='text/css'>
	@font-face {
		font-family: main_font;
		src: url('assets/font/font.ttf');
		font-weight: 400;
		font-weight: bold;
	}
</style>

<body>
	<div id="game"></div>
	<form id="keyboard">
		<input type="text" name="uinput" id="uinput">
		<input type="submit" value="Send">
	</form>
</body>
<script>
	var config = {
		type: Phaser.AUTO,
		parent: 'game',
		width: 800,
		height: 600,
		scene: {
			preload: preload,
			create: create,
			update: update
		}
	};

	// this is an async timeout util (very useful indeed)
	const timeout = async ms => new Promise(res => setTimeout(res, ms));
	let next = false; // this is to be changed on user input

	var game = new Phaser.Game(config);
	game.scene.add('MainScene', MainScene);
	game.scene.add('HangarScene', HangarScene);

	document.getElementById("keyboard").addEventListener('submit', (e) => {
		e.preventDefault();
		next = true
	});

	function request(endpoint, data, method) {
		if (method == "POST") {
			data = JSON.stringify(data);
			return $.ajax({
				url: 'http://localhost:8000' + endpoint,
				dataType: 'json',
				type: method,
				data: data,
				beforeSend: function() {}
			})
		}
		else {
			return $.ajax({
				url: 'http://localhost:8000' + endpoint,
				type: method,
				data: data,
				beforeSend: function() {}
			})
		}
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function waitInput() {
		while (next === false) await timeout(50); // pause script but avoid browser to freeze ;)
		next = false; // reset var
		let data = document.getElementById("uinput").value;
		document.getElementById("uinput").value = "";
		return data;
	}

	function preload() {
		// this.load.image('sky', 'assets/bg/sky.png');
		// this.load.image('cbg', 'assets/bg/cbg.png');
		// this.load.image('cfg', 'assets/bg/cfg.png');
		// this.load.image('btn', 'assets/ui/buttonStock1d.png');
		this.load.scenePlugin('DialogModalPlugin', 'dialog_plugin.js');
		this.load.bitmapFont('main_font', 'assets/font/font.png', 'assets/font/font.fnt');
		//   	this.load.spritesheet('dude', 
		//        'assets/dude.png',
		//     { frameWidth: 32, frameHeight: 48 }
		// );
	}

	async function login(dialogModal, t) {
		dialogModal.init();
		dialogModal.setText('What\'s your name? ', true);
		let uname = await waitInput();
		dialogModal.setText('Cool. Password? ', true);
		let passwd = await waitInput();
		dialogModal.setText('Nice! Please wait.. ', true);
		await sleep(2000);
		request('/user/login', {
				username: uname,
				password: passwd
			}, "POST")
			.done(async (e) => {
				localStorage.setItem('jwt', e['jwt']);
				dialogModal.setText('Success! Welcome back. ', true);
				await sleep(2000);

				game.scene.stop(t);
				game.scene.start('MainScene');
			})
			.fail((e) => {
				dialogModal.setText('Error. Message: ' + e.responseText, true);
			});
	}

	async function register(dialogModal, t) {
		dialogModal.init();
		dialogModal.setText('New guy! How may I call you? ', true);
		let uname = await waitInput();
		dialogModal.setText('Your email? ', true);
		let email = await waitInput();
		dialogModal.setText('Password? (please make it secure) ', true);
		let passwd = await waitInput();
		dialogModal.setText('Splendid. Creating your account.. ', true);
		await sleep(2000);
		request('/user/register', {
				username: uname,
				email: email,
				password: passwd
			}, "POST")
			.done((e) => {
				dialogModal.setText('All clear. Welcome aboard, Cap. ', true);
			})
			.fail((e) => {
				dialogModal.setText('Error. Message: ' + e.responseText, true);
			});
	}

	function create() {
		// let sky = this.add.image(400, 300, 'sky');
		// let cbg = this.add.image(400, 300, 'cbg');
		// let cfg = this.add.image(400, 300, 'cfg');

		this.add.bitmapText(160, 100, 'main_font', 'ArknadO II', 32);
		this.add.text(160, 140, 'The Dawn of Ark Brutality Of The Shark Tornado', {
			fill: '#0f0'
		});

		const loginButton = this.add.text(160, 200, 'Login', {
			fill: '#0f0'
		});
		loginButton.setInteractive()
			.on('pointerdown', () => {
				login(this.sys.DialogModalPlugin, this);
				// this.sys.DialogModalPlugin.init()
				// this.sys.DialogModalPlugin.setText('What\'s your name? ', true);
				// // var name = prompt("Username");
				// await waitInput();
				// this.sys.DialogModalPlugin.setText('Password? ', true);
				// var pass = prompt("Password");
				// this.input.keyboard.on('keydown', (e) => { this.sys.DialogModalPlugin.getInput(e) }, this);
			})
			.on('pointerover', () => {
				loginButton.setStyle({
					fill: '#ff0'
				});
			})
			.on('pointerout', () => {
				loginButton.setStyle({
					fill: '#0f0'
				});
			});

		const regisButton = this.add.text(160, 230, 'Register', {
			fill: '#0f0'
		});
		regisButton.setInteractive()
			.on('pointerdown', () => {
				register(this.sys.DialogModalPlugin, this);
			})
			.on('pointerover', () => {
				regisButton.setStyle({
					fill: '#ff0'
				});
			})
			.on('pointerout', () => {
				regisButton.setStyle({
					fill: '#0f0'
				});
			});

		const exitButton = this.add.text(160, 280, 'Exit', {
			fill: '#0f0'
		})
		exitButton.setInteractive().on('pointerdown', () => {
				
			})
			.on('pointerover', () => {
				exitButton.setStyle({
					fill: '#ff0'
				});
			})
			.on('pointerout', () => {
				exitButton.setStyle({
					fill: '#0f0'
				});
			});

		// this.add.text(50, 520, 'For Playstation 3 - Playstation 2 - Nintendo Switch - Windows XP/Vista', {
		// 	fill: '#fff'
		// });
	}

	function update() {

	}
</script>

</html>