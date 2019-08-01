var ExitScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function ExitScene () {
            Phaser.Scene.call(this, { key: 'ExitScene' });
        },
    preload: function () {
        this.load.scenePlugin('DialogModalPlugin', 'dialog_plugin.js');
    },
    create: async function () {
        // create your world here
        // this.add.image(400, 300, 'bg');
        this.sys.DialogModalPlugin.init();
        this.add.bitmapText(350, 300, 'main_font', 'ArknadO II', 35);

        this.add.text(350, 345, 'Tribute to Bambang19-2 by Petrik Allstars.', {
            fill: '#0f0',
            fontSize: '16px'
        });

        this.add.text(350, 365, 'ArknadO™ by AO18-1 (2019)', {
            fill: '#0f0',
            fontSize: '16px'
        });

        
        await sleep(1200);
        this.sys.DialogModalPlugin.setText("Congratulations. At the very least, you amongst the few who has made this far. What are the odds? A few more days until we mention your initials (fingers crossed), please show us a lot better effort, a lot more spectacularity. Be a proud Bambang19-2 generation, counting on ya.", true);

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