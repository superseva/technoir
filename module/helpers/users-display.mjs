export class DiceTableDisplay{
    element;
    player;
    diceCharged;
    diceDischarged;

    get chargedDice() {
        if (this.player.isGM) {
            return this.player.getFlag('technoir', 'chargedPushDice') ?? 0;
        }
        else if (this.player.character) {
            return this.player.character.chargedPushDice ?? 0;
        }
        else {
            return 'X';
        }
    }

    get dischargedDice() {
        if (this.player.isGM) {
            return this.player.getFlag('technoir', 'dischargedPushDice') ?? 0;
        }
        else if (this.player.character) {
            return this.player.character.dischargedPushDice ?? 0;
        }
        else {
            return 'X';
        }
    }

    constructor(element){
        const userId = element.dataset.userId;
        const player = game.users.get(userId, { strict: true });
        if (!player.isGM && !player.character)
            return;
        this.element = element;
        this.player = player;
        this._initialize();
    }

    _initialize() {
        this.diceCharged = document.createElement('span');
        this.diceCharged.classList.add('dice-charged-count');
        //this.diceCharged.innerHTML = "3";
        

        this.diceDischarged = document.createElement('span');
        this.diceDischarged.classList.add('dice-discharged-count');
        //this.diceDischarged.innerHTML = "1";

        if (game.user?.isGM) {
            this._initGameMaster();
        }
        else {
            this._initPlayer();
        }

        this.element.append(this.diceCharged);
        this.element.append(this.diceDischarged);
    }

    _initGameMaster() {
        this.diceCharged.classList.add('dice-charged-gm');
        this.diceCharged.innerHTML = this.chargedDice.toString();    
        
        this.diceDischarged.classList.add('dice-charged-gm');
        this.diceDischarged.innerHTML = this.dischargedDice.toString();
    }

    _initPlayer() {
        this.diceCharged.innerHTML = this.chargedDice.toString();
        this.diceDischarged.innerHTML = this.dischargedDice.toString();
    }

}