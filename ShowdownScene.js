var ShowdownScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function ShowdownScene () {
            Phaser.Scene.call(this, { key: 'ShowdownScene' });
        },
    preload: function () {
        this.load.scenePlugin('DialogModalPlugin', 'dialog_plugin.js');
    },
    displaySharkDetail: function (data) {
        console.log(data);
        let banner_loc = data.banner_name;
        let stats = `
            <table frame="box" style="background-color: white;" class="sharkcard eightbit-card cardattack" id="tblstats">
				<thead style="background-color: blue">
					<th><h2>${data.ark_name}</h2></th>
				</thead>
				<tbody>
                    <tr><td><img src="${banner_loc}" alt="" srcset="" style="width:420px;height:420px;">
					<tr><td>
						<center>
							<b>Attack</b>
							<br>
                            ${data.attack}
							<br>                            
						</center>
					</td></tr>
					<tr><td>
						<center>
							<b>Hitpoint</b>
							<br>
                            ${data.hitpoint}
							<br>                            
						</center>
					</td></tr>
					<tr><td>
						<center>
							<b>Skill</b>
							<br>
                            ${data.skill}
							<br>                            
						</center>
                    </td></tr>
                    <tr><td></td></tr>
                    <tr><td></td></tr>
                    <tr><td></td></tr>
                    <tr><td><center><span id="upgrstat"></span></center></td></tr>
				</tbody>
            </table>
        `
        document.getElementById('stats').innerHTML += stats;
    },
    displayArkDetail: function (data) {
        console.log(data);
        let banner_loc = data.banner_name !== null ? `http://localhost:8000/public/images/${data.banner_name}` : "https://vignette.wikia.nocookie.net/duelmasters/images/e/e6/Bolshack_Dragon_artwork.jpg/revision/latest?cb=20111024181931"
        let stats = `
            <table frame="box" style="background-color: white;" class="arkcard eightbit-card" id="tblstats">
				<thead style="background-color: red">
					<th><h2>${data.ark_name}</h2></th>
				</thead>
				<tbody>
                    <tr><td><img src="${banner_loc}" alt="" srcset="" style="width:420px;height:420px;">
					<tr><td>
						<center>
							<b>Attack</b>
							<br>
                            ${data.attack}
							<br>                            
						</center>
					</td></tr>
					<tr><td>
						<center>
							<b>Hitpoint</b>
							<br>
                            ${data.hitpoint}
							<br>                            
						</center>
					</td></tr>
					<tr><td>
						<center>
							<b>Skill</b>
							<br>
                            ${data.skill}
							<br>                            
						</center>
                    </td></tr>
                    <tr><td></td></tr>
                    <tr><td></td></tr>
                    <tr><td></td></tr>
                    <tr><td><center><span id="upgrstat"></span></center></td></tr>
				</tbody>
            </table>
        `
        document.getElementById('stats').innerHTML += stats;
    },
    simulateAttack: async function(ark, shark) {
        while (shark.hitpoint > 0 || ark.hitpoint > 0) {
            let turn = Math.random();
            if (turn > 0.5) { //ark attack
                $('.arkcard').addClass('leftcardattack');
                await sleep(400);
                $('.sharkcard').addClass('cardhit');
                await sleep(600);
                
                $('.arkcard').removeClass('leftcardattack');
                $('.sharkcard').removeClass('cardhit');
            }
            else { //shark attack
                $('.sharkcard').addClass('rightcardattack');
                await sleep(400);
                $('.arkcard').addClass('cardhit');
                await sleep(600);
                
                $('.sharkcard').removeClass('rightcardattack');
                $('.arkcard').removeClass('cardhit');
            }
            await sleep(1000);
        }
    },
    create: async function () {
        // create your world here
        // this.add.image(400, 300, 'bg');
        // this.add.bitmapText(160, 100, 'main_font', 'The Hangar', 28);

        this.sys.DialogModalPlugin.init();
        this.sys.DialogModalPlugin.setText('Picking random Ark to battle the Shark...', true);
        await sleep(3000);

        request('/arks', { token: localStorage.getItem('jwt') }, "GET")
            .done(async (e) => {
                console.log(JSON.parse(e));
                var arks = JSON.parse(e)['data'];

                var chosen = arks[Math.floor(Math.random() * arks.length)];

                this.sys.DialogModalPlugin.setText(chosen.ark_name + ' Ark is ready for battle.', true);

                this.displayArkDetail(chosen);

                var shark = {
                    ark_name: "Shark",
                    attack: "1200",
                    banner_name: "http://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/what-is-baby-shark-1548869443.jpg?crop=0.526xw:1.00xh;0.342xw,0&resize=768:*",
                    hitpoint: "45000",
                    id: "999",
                    skill: "Baby Shark Swarm",
                    userid: "1"
                }

                this.displaySharkDetail(shark);

                this.simulateAttack(chosen, shark);

            })
            .fail((e) => {
                this.sys.DialogModalPlugin.setText('Error. Message: ' + e.responseText, true);
            });

            let backButton = this.add.text(160, 350, 'Run', {
                fill: '#0f0',
            })
            backButton.setInteractive()
            .on('pointerdown', () => {
                game.scene.stop(this);
				game.scene.start('MainScene');
            })
            .on('pointerover', () => {
                backButton.setStyle({
                    fill: '#ff0'
                });
            })
            .on('pointerout', () => {
                backButton.setStyle({
                    fill: '#0f0'
                });
            });

            this.sys.DialogModalPlugin.init();
            this.sys.DialogModalPlugin.setText('Welcome to The Hangar! The Hangar is a place to store all of your Ark machines; and even more, to upgrade them into maximum brutality. Please remember, every Ark can only be upgraded once.', true);


        // const createArkButton = this.add.text(160, 200, '[ Build New ARK ]', {
        //     fill: '#0f0',
        //     fontSize: '20px'
        // });

        // createArkButton.setInteractive()
        //     .on('pointerdown', () => {
        //         this.createArk();
        //     })
        //     .on('pointerover', () => {
        //         createArkButton.setStyle({
        //             fill: '#ff0'
        //         });
        //     })
        //     .on('pointerout', () => {
        //         createArkButton.setStyle({
        //             fill: '#0f0'
        //         });
        //     });

        // const battleButton = this.add.text(160, 230, '[ Showdown Arena ]', {
        //     fill: '#0f0',
        //     fontSize: '20px'
        // });

        // battleButton.setInteractive()
        //     .on('pointerdown', () => {
        //     })
        //     .on('pointerover', () => {
        //         battleButton.setStyle({
        //             fill: '#ff0'
        //         });
        //     })
        //     .on('pointerout', () => {
        //         battleButton.setStyle({
        //             fill: '#0f0'
        //         });
        //     });

        // const hangarButton = this.add.text(160, 260, '[ Access Hangar ]', {
        //     fill: '#0f0',
        //     fontSize: '20px'
        // });

        // hangarButton.setInteractive()
        //     .on('pointerdown', () => {
        //     })
        //     .on('pointerover', () => {
        //         hangarButton.setStyle({
        //             fill: '#ff0'
        //         });
        //     })
        //     .on('pointerout', () => {
        //         hangarButton.setStyle({
        //             fill: '#0f0'
        //         });
        //     });

        // const logoutButton = this.add.text(160, 320, '[ Logout ]', {
        //     fill: '#0f0',
        //     fontSize: '20px'
        // });

        // logoutButton.setInteractive()
        //     .on('pointerdown', () => {
                
        //     })
        //     .on('pointerover', () => {
        //         logoutButton.setStyle({
        //             fill: '#ff0'
        //         });
        //     })
        //     .on('pointerout', () => {
        //         logoutButton.setStyle({
        //             fill: '#0f0'
        //         });
        //     });
    }
});