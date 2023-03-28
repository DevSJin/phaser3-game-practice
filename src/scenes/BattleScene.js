import Phaser from 'phaser';
// import logoImg from './assets/logo.png';
import background1 from '../assets/images/background.png'
import playerImg from '../assets/spritesheets/player.png'
import Config from '../Config';

export default class BattleScene extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.image('logo', logoImg);
        this.load.image('background1', background1)
        // this.load.image('player', playerImg)
        this.load.spritesheet('player', playerImg, {
            frameWidth: 32,
            frameHeight: 36,
        }) // 사진 나누기!
    }
      
    create ()
    {
        // const logo = this.add.image(400, 150, 'background1');
      
        // this.tweens.add({
        //     targets: logo,
        //     y: 450,
        //     duration: 2000,
        //     ease: "Power2",
        //     yoyo: true,
        //     loop: -1
        // });
        this.background1 = this.add.image(0, 0, 'background1')
        this.background1.setOrigin(0, 0)
        // setOrigin 좌측 상단을 기준으로,

        // this.player = this.add.image(Config.width / 2, Config.height / 2, 'player')
        // this.player.setOrigin(0.5, 1)
        
        // this.player.flipY = false // 이미지 위아래 뒤집기
        // this.player.flipX = false // 좌우 뒤집기
        // this.player.angle += 20 // 각도 조절

        this.player = this.add.sprite(Config.width / 2, Config.height / 2, 'player')
        
        this.player.flipX = false
        
        this.add.text(30, 30, "상진 월드에 오신것을 환영합니다!" ,{
            font: '25px sans',
            fill: '#f5e99f'
        }) // 텍스트 추가

        this.anims.create({
            key: "player_anim",
            frames: this.anims.generateFrameNumbers('player'),
            frameRate: 12,
            repeat: -1
        }) // 움직이는 애니메이션 만들기
        this.anims.create({
            key: "player_idle",
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 0
            }),
            frameRate: 1,
            repeat: 0
        })
        this.player.play("player_anim") // 플레이어에 애니메이션 동작시키기

        this.keyboardInput = this.input.keyboard.createCursorKeys() // keyboardInput에 어떤 키보드 키를 눌렀는지 정보를 갖게됨
        this.player.moving = false

    }

    update() 
    {
        this.move(this.player)
    }

    move(player) {
        const PLAYER_SPEED = 0.6
        // player.x -= PLAYER_SPEED
        if (this.keyboardInput.left.isDown || this.keyboardInput.right.isDown || this.keyboardInput.up.isDown || this.keyboardInput.down.isDown) {
            console.log("press")
            if (!player.moving) {
                player.play("player_anim")
            }
            player.moving = true
        } else {
            if (player.moving) {
                player.play("player_idle")
            }
            player.moving = false
        }

        if (this.keyboardInput.left.isDown) {
            player.x -= PLAYER_SPEED
            player.flipX = false
        } else if (this.keyboardInput.right.isDown) {
            player.x += PLAYER_SPEED
            player.flipX = true
        }
        if (this.keyboardInput.up.isDown) {
            player.y -= PLAYER_SPEED
        } else if (this.keyboardInput.down.isDown) {
            player.y += PLAYER_SPEED
        }
    }
}