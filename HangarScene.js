var HangarScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function HangarScene () {
            Phaser.Scene.call(this, { key: 'HangarScene' });
        },
    preload: function () {
        this.load.scenePlugin('DialogModalPlugin', 'dialog_plugin.js');
    },
    displayArkDetail: function (data) {
        console.log(data);
        let stats = `
            <table frame="box" style="background-color: white;" class="eightbit-card" id="tblstats">
				<thead style="background-color: red">
					<th><h2>${data.ark_name}</h2></th>
				</thead>
				<tbody>
					<tr><td><img src="https://vignette.wikia.nocookie.net/duelmasters/images/e/e6/Bolshack_Dragon_artwork.jpg/revision/latest?cb=20111024181931" alt="" srcset="" style="width:420px;height:420px;"></td></tr>
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
                    <tr><td style="border:1pt solid black;">
						<center>
							<button onclick="return reqUpgrade(${data.id})" id="btnupgrade" class="eightbit">Upgrade</button>
						</center>
                    </td></tr>
                    <tr><td><center><span id="upgrstat"></span></center></td></tr>
				</tbody>
            </table>
        `
        document.getElementById('stats').innerHTML = stats;
    },
    create: function () {
        // create your world here
        // this.add.image(400, 300, 'bg');
        this.add.bitmapText(160, 100, 'main_font', 'The Hangar', 28);

        request('/arks', { token: localStorage.getItem('jwt') }, "GET")
            .done(async (e) => {
                console.log(JSON.parse(e));
                var span = 0;
                var arks = JSON.parse(e)['data'];

                this.add.text(160, 135, 'Total Ark(s): ' + arks.length, {
                    fill: '#fff',
                    fontWeight: 'bold',
                    fontSize: '15px'
                });

                arks.forEach(ark => {
                    console.log(ark);
                    let arkButton = this.add.text(160, 200 + span, ark['ark_name'], {
                        fill: '#0f0',
                    })
                    arkButton.setInteractive()
                        .on('pointerdown', () => {
                            this.displayArkDetail(ark);
                        })
                        .on('pointerover', () => {
                            arkButton.setStyle({
                                fill: '#ff0'
                            });
                        })
                        .on('pointerout', () => {
                            arkButton.setStyle({
                                fill: '#0f0'
                            });
                        });
                    span += 20;
                });
            })
            .fail((e) => {
                this.sys.DialogModalPlugin.setText('Error. Message: ' + e.responseText, true);
            });

            let backButton = this.add.text(160, 350, 'Back', {
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