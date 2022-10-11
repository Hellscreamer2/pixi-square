import { GameObject } from "./GameObject"
import { GameObjectBehavior } from "./GameObjectBehavior"
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication'
import { emitKeypressEvents } from "readline";
import { EventDispacher } from "./EventDispacher";





export class SquareBehavior extends GameObjectBehavior {

    private square: PIXI.Sprite;
    private square1: PIXI.Sprite;
    private velocity: number = 10;
    private ballObjRef: GameObject;




    constructor(gameObjRef: GameObject) {
        super(gameObjRef)
    }
    public destroy() {
        this.square.destroy({ texture: true, baseTexture: true })
        this.gameObjRef.removeChild(this.square)
    }
    public setBallObjRef(gameObj: GameObject) {
        this.ballObjRef = gameObj;
    }
    protected init(): void {
        this.createSquare()
    }
    private createSquare() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xffff00);
        gfx.drawRect(0, 0, 100, 100);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.square);
    }
    private move(delta: number) {
        this.gameObjRef.y += delta * this.velocity;
        if (this.gameObjRef.y + this.gameObjRef.height > GameApplication.getApp().view.height) {
            this.gameObjRef.y = GameApplication.getApp().view.height - this.gameObjRef.height;
        }
    }
    private ballStop() {
        this.ballObjRef.x = 550;
        let executed: boolean = false;
        if (!executed) {
            executed = true;
            EventDispacher.getInstance().getDispacher().emit('updatescore');
        }

    }

    private changeSqColor() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x00ffff);
        gfx.drawRect(0, 0, 100, 100);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square1 = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.square1);
    }



    public update(delta: number) {
        let wasHit: boolean = false;
        // const ball = new PIXI.Rectangle(this.ballObjRef.x, this.ballObjRef.y, this.ballObjRef.width, this.ballObjRef.height)
        // const square = new PIXI.Rectangle(this.gameObjRef.x, this.gameObjRef.y, this.gameObjRef.width, this.gameObjRef.height)
        // if (ball.right >= square.left) {

        if (!wasHit && this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x + this.gameObjRef.width) {
            this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x + this.gameObjRef.width
            wasHit = true;
            // this.gameObjRef.destroy();


            EventDispacher.getInstance().getDispacher().emit('updatescore');
        }

        // if (this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x && this.ballObjRef.x < this.gameObjRef.x + this.gameObjRef.width &&
        //     this.ballObjRef.y + this.ballObjRef.height >= this.gameObjRef.y && this.ballObjRef.y < this.gameObjRef.y + this.gameObjRef.height) {
        //     this.stop();
        //     wasHit = true;


        // }
        if (wasHit) {
            this.changeSqColor();
            this.move(delta);
            this.ballStop();
        }

        // colision manager 
        // state pattern 
        //modular controller
    }

}