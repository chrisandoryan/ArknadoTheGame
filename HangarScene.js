var HangarScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function HangarScene () {
            Phaser.Scene.call(this, { key: 'HangarScene' });
        },
    createArk: async function () {
        this.sys.DialogModalPlugin.init();
        this.sys.DialogModalPlugin.setText('Great, let\'s create new Ark for you. Any cool name? ', true);
        let arkname = await waitInput();
        this.sys.DialogModalPlugin.setText(arkname + '? Cool enough. Now tell me its Attack Point (AP).', true);
        let attackpoint = await waitInput();
        this.sys.DialogModalPlugin.setText('What about its Hitpoint (HP)?', true);
        let hitpoint = await waitInput();
        this.sys.DialogModalPlugin.setText('Amazing. Last, any special skill? ', true);
        let skill = await waitInput();
        this.sys.DialogModalPlugin.setText('Done. Uploading Ark data to the server.. Please wait.', true);
        await sleep(3000);
        
        request('/ark/create', {
            ark_name: arkname,
            attack: attackpoint,
            skill: skill,
            hitpoint: hitpoint,
            token: localStorage.getItem('jwt')
        })
        .done(async (e) => {
            this.sys.DialogModalPlugin.setText('Badass! Your new Ark has been delivered to the Hangar. ', true);
            await sleep(2000);
        })
        .fail((e) => {
            this.sys.DialogModalPlugin.setText('Error. Message: ' + e.responseText, true);
        });
    },
    preload: function () {
        this.load.scenePlugin('DialogModalPlugin', 'dialog_plugin.js');
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