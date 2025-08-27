import Phaser from "phaser";
class Example extends Phaser.Scene {
    preload () {
        
    }

    create () {
        
    }
};


function GamePage () {
    const config = {
        type: Phaser.AUTO,
        width: 800,                                 
        height: 600,
        scene: Example,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        }
    };

    const game = new Phaser.Game(config);

    return (
        <></>
    );
}

export default GamePage;