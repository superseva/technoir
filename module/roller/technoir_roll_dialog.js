export class TechnoirRollDialog extends Dialog {

    constructor(rollName, dieAction, diePush, dieHurt, actor, item, dialogData = {}, options = {}) {

        super(dialogData, options);
        this.dieAction = dieAction;
        this.diePush = diePush;
        this.dieHurt = dieHurt;
        this.actor = actor;
        this.item = item;
        this.options.classes = ["dice-icon"];

    }

    activateListeners(html) {
        super.activateListeners(html);

        html.on('click', '.roll', (event) => {
            let dieAction = html.find('[name="dieAction"]').val();
            let diePush = html.find('[name="diePush"]').val();
            let dieHurt = html.find('[name="dieHurt"]').val();           
            game.technoir.TechnoirRoller.roll({ 
                rollname: this.rollName, 
                dieAction: dieAction, 
                diePush: diePush, 
                dieHurt: dieHurt,
                actor: this.actor,
                item: this.item })
        });
    }

    static async createDialog({ rollName = "Technoir Roll", dieAction = 1, diePush = 0, dieHurt = 0, actor = null, item = null } = {}) {
        let dialogData = {}
        dialogData.rollName = rollName;
        dialogData.dieAction = dieAction;
        dialogData.diePush = diePush;
        dialogData.dieHurt = dieHurt;
        dialogData.actor = actor;
        dialogData.item = item;
        const html = await renderTemplate("systems/technoir/templates/dialogs/technoir_roll_dialog.html", dialogData);
        let d = new TechnoirRollDialog(rollName, dieAction, diePush, dieHurt, actor, item, {
            title: rollName,
            content: html,
            buttons: {
                roll: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "ROLL"
                }
            }
        });
        d.render(true);
    }

}