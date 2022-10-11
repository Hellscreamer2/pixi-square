

import { Button } from "./Button";
// import { GameApplication } from "./GameApplication";
import { Game } from "./Game";
import { EventDispacher } from "./EventDispacher";

export class Button1 extends Button {
    constructor(label: string) {
        super(label)
    }
    protected init() {
        super.init()
    }


    protected onPointerUp() {
        super.onPointerUp


        EventDispacher.getInstance().getDispacher().emit('changebtnup1')

    }

    protected onPointerDown() {
        super.onPointerDown()
        EventDispacher.getInstance().getDispacher().emit('changebtndown1')

    }


}
