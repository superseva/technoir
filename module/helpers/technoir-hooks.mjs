import { TechnoirUser } from "../documents/actor.mjs";
import { DiceTableDisplay } from "./users-display.mjs";

export class TechnoirHooks {

    static onGetUserContextOptions(html, context) {
       // console.warn(html)
        //console.warn(context)

        const players = html.find('#players');
        console.warn(players)
        if (!players)
            return;

        context.push(
            {
                name: game.i18n.localize('TECHNOIR.DiceGive'),
                icon: '<i class="fa-solid fa-plus"></i>',
                callback: async (li) => {
                    const selectedUser = game.users?.get(li[0].dataset.userId);
                    await selectedUser.setFlag('technoir', 'chargedPushDice', (selectedUser.getFlag('technoir', 'chargedPushDice') ?? 0) + 1);
                    ui.players?.render(true);
                    //if (game.settings.get('swade', 'notifyBennies')) {
                        //In case one GM gives another GM a benny a different message should be displayed
                        //const givenEvent = selectedUser !== game.user;
                        //createGmBennyAddMessage(selectedUser, givenEvent);
                    //}
                },
            },
            {
                name: game.i18n.localize('TECHNOIR.DiceRefresh'),
                icon: '<i class="fa-solid fa-sync"></i>',
                condition: (li) => game.user.isGM,
                callback: async (li) => {
                    //await game.users?.get(li[0].dataset.userId)?.refreshBennies();
                },
            },
            {
                name: game.i18n.localize('TECHNOIR.AllDiceRefresh'),
                icon: '<i class="fa-solid fa-sync"></i>',
                condition: (li) => game.user.isGM,
                callback: async (li) => {
                    //await PlayerBennyDisplay.refreshAll();
                },
            }
        );
    }


    static async onRenderPlayerList(list, html, options){
        console.warn("TRIGEREDF")
        html[0]
            .querySelectorAll('.player')
            .forEach(player => new DiceTableDisplay(player));
    }

}



