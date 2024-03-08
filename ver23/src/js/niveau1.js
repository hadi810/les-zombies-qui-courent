import * as fct from "/src/js/fonctions.js";



var player;
var gom;
var y;
var rr=1;
var recs;
var sante=5;
var blcs;
var sante_txt;
var gameOver=false;
var zom;
var score=0;
var waveCount =0;
var players;
var balles_txt;
var score_txt;
var balles=35;
var route;
var clavier;
var shots;
var peutTirer = true;
var tir,tnkv,mz,bgv;


function tirer (player) {
  if (peutTirer == true) {
    tir.play(); 
    var k=shots.create(player.x, player.y, "img_shot");
    shots.setVelocityY(400);
    k.body.allowGravity=false;
      peutTirer = false; // on désactive la possibilté de tirer
      balles-=1;
      rr=1;
  balles_txt.setText("Balles: " + balles);
      // on la réactive dans 2 secondes avec un timer
      var t;
      t = this.time.delayedCall(190,
         function () {
          peutTirer = true;
      },
      null, this);  
  }
} 


function createWave() {
  for (var i = 0; i < 5 + waveCount * 2; i++) { // Ajuster le nombre de joueurs par vague selon votre besoin
    var a = Phaser.Math.Between(150, 550);
    var b = Phaser.Math.Between(620, 660);
     zom = players.create(a, b, 'img_zombie');
    
    zom.direction = Phaser.Math.Between(-70, 70);
    zom.vitesse = ((waveCount + 1)/3)*(-20);
    zom.setBounce(1);
    zom.setVelocityX(zom.direction);
  zom.setVelocityY(zom.vitesse);
  }
  waveCount++;
}
  
function kill(shott,zomb){
  mz.play(); 
  shott.anims.play("death", true);
zomb.disableBody(true, true);


score+=1;
score_txt.setText("score: "+score);
if(players.countActive(true)==0){
  createWave();
}
}

function losss()
{
 
  player.setTint(0xff0000);
sante_txt.setText("sante: 0");
gom.setText("Game Over");



}

function reload(tank,rec){
rec.disableBody(true,true);
balles+=10;
balles_txt.setText("Balles: " + balles);


}



export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("img_tank", "src/assets/tank.png");
    this.load.image("img_road", "src/assets/route.png");
    this.load.image("img_blc", "src/assets/bloc.png");
    this.load.image("img_rec","src/assets/kkk.png");
    this.load.image("img_shot", "src/assets/shot.png");
    this.load.tilemapTiledJSON("gau", "src/assets/gauche.json");  
    this.load.image("laroute_img", "src/assets/laroute.png");
    this.load.spritesheet("img_death", "src/assets/death.png",{
      frameWidth: 30,
      frameHeight: 28 });
    this.load.spritesheet("img_zombie", "src/assets/zombie.png", {
      frameWidth: 32,
      frameHeight: 40 
    });

    this.load.audio('tir', 'src/assets/tir.mp3');
    this.load.audio('tnkv', 'src/assets/tnkv.mp3');
    this.load.audio('bgv', 'src/assets/bgv.mp3');
    this.load.audio('mz', 'src/assets/mz.mp3');
  
  }

  create() {

tir=this.sound.add('tir');
mz=this.sound.add('mz');
bgv=this.sound.add('bgv');
tnkv=this.sound.add('tnkv');

    route=this.add.tileSprite(400, 300, 800, 600,"img_road");
    blcs = this.physics.add.staticGroup();
    blcs.create(136,300,"img_blc");
    blcs.create(710,300,"img_blc");
    player = this.physics.add.sprite(400, 120, "img_tank"); 
    players = this.physics.add.group();
    recs= this.physics.add.group();
    player.setCollideWorldBounds(true); 
    player.body.allowGravity=false;
    clavier = this.input.keyboard.createCursorKeys(); 
    shots = this.physics.add.group();
    balles_txt = this.add.text(16, 16, "balles: "+balles, { fontSize: "32px", fill: "#000" });
    score_txt=this.add.text(16,40,"score: 0", { fontSize: "32px", fill: "#000" });
    sante_txt=this.add.text(16,64,"sante: "+sante,{ fontSize: "32px", fill: "#000" });
    gom=this.add.text(284,300,"",{ fontSize: "64px", fill: "#ff0000", 
  fontWeight: "bold" });
    shots.setVelocityY(400);
  
    this.anims.create({
      key: "zombie_tourne_gauche",
      frames: this.anims.generateFrameNumbers("img_zombie", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: 1
    });
  
    this.anims.create({
      key: "zombie_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_zombie", { start: 4, end: 7 }),
      frameRate: 5,
      repeat: 1
    });
  
    this.anims.create({
  key: "death",frames: this.anims.generateFrameNumbers("img_death",{ start: 0, end: 2 })
  , frameRate: 3,
  repeat: 3
  
    });
    
  recs.setVelocityY(20);
  
    this.physics.add.collider(player, blcs); 
    this.physics.add.collider(players, blcs); 
    this.physics.add.overlap(shots,players,kill,null,this);
    this.physics.add.overlap(player,recs,reload,null,this)
  bgv.play(); 
    createWave();
  
  }

  update() {
    
    if (gameOver) {
      return;
    } 
   
    if (clavier.right.isDown == true) {
      player.setVelocityX(480);
      
    }else if (clavier.left.isDown == true) {
      player.setVelocityX(-480);
      
    } else {
      player.setVelocityX(0);
     
    }
  if(clavier.space.isDown&&balles>0){
    
  tirer.call(this,player);
  }
  route.tilePositionY += -3.8;
  
  
  players.children.iterate(function (zom) {
    
    if (zom.body.velocity.x > 1) {
      zom.anims.play("zombie_tourne_droite", true);
    } else {
      zom.anims.play("zombie_tourne_gauche", true);
    }
  });
  
  players.children.iterate(function (zomb){
  if(zomb.y<player.y){
    zomb.y+=10;
    sante-=1;
    sante_txt.setText("sante: "+sante);
    zomb.disableBody(true,true);
    if(players.countActive(true)==0){
      createWave();
    }
    //if(sante==0){losss();}
  }
  
  })
  
  if(balles%8==0&&rr==1)
  {
    rr=0;
    var t= Phaser.Math.Between(200, 600);
     y=recs.create(t, 0, 'img_rec');
     y.setVelocityY(25);
    y.body.allowGravity=false;
  }
  
  if(sante<=0){losss();
    this.physics.pause();
    gameOver = true;}
  
  }
}
