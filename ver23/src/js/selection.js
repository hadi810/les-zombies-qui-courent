import * as fct from "/src/js/fonctions.js";

/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var cursor; // désigne le sprite du joueur
var clavier; // pour la gestion du clavier

// définition de la classe "selection"
export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" }); // mettre l e meme nom que le nom de la classe
  }

  /***********************************************************************/
  /** FONCTION PRELOAD
/***********************************************************************/

  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  preload() {
    // tous les assets du jeu sont placés dans le sous-répertoire src/assets/
    this.load.image("img_ciel", "src/assets/fond.jpg");
    this.load.image("img_cursor", "src/assets/cursor.png");
    this.load.image("img_porte1", "src/assets/play.png");
  }

  /***********************************************************************/
  /** FONCTION CREATE 
/***********************************************************************/

  /* La fonction create est appelée lors du lancement de la scene
   * si on relance la scene, elle sera appelée a nouveau
   * on y trouve toutes les instructions permettant de créer la scene
   * placement des peronnages, des sprites, des platesformes, création des animations
   * ainsi que toutes les instructions permettant de planifier des evenements
   */
  create() {

    this.add.image(400, 300, "img_ciel");


    /****************************
     *  Ajout des portes   *
     ****************************/
    this.porte1 = this.physics.add.staticSprite(400, 520, "img_porte1");

    /****************************
     *  CREATION DU PERSONNAGE  *
     ****************************/

    // On créée un nouveeau personnage : cursor
    cursor = this.physics.add.sprite(100, 450, "img_cursor");

    /***********************
     *  CREATION DU CLAVIER *
     ************************/
    // ceci permet de creer un clavier et de mapper des touches, connaitre l'état des touches
    clavier = this.input.keyboard.createCursorKeys();
  }

  /***********************************************************************/
  /** FONCTION UPDATE 
/***********************************************************************/

  update() {

    if (clavier.left.isDown) {
      cursor.setVelocityX(-160);
    } else if (clavier.right.isDown) {
      cursor.setVelocityX(160);
    } else {
      cursor.setVelocityX(0);
    }

    if (clavier.up.isDown) {
      cursor.setVelocityY(-160);
    }
    else if (clavier.down.isDown) {
      cursor.setVelocityY(160);
    }
    else {
      cursor.setVelocityY(0);
    }

    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
      if (this.physics.overlap(cursor, this.porte1))
        this.scene.switch("niveau1");
    }
  }
}