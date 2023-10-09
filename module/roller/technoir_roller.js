export class TechnoirRoller {

    static async roll({ rollName = "Technoir Roll", dieAction = 1, diePush = 0, dieHurt = 0, actor = null, item = null, options={} } = {}) {

        let formula = `${dieAction}da + ${diePush}dp + ${dieHurt}dh`;

        console.warn(formula)
        let roll = new Roll(formula);
        await roll.evaluate({ async: true });

        //console.warn(roll)
        //console.warn(roll.dice)

        await TechnoirRoller.parseRoll({rollname: rollName, roll: roll, actor: actor, item:item, options: options})
    }

    static async parseRoll({ rollname = "Technoir Roll", roll = null, actor = null, item = null, options={} }) {       

        let canceledValues = [];
        let hurtValues = roll.dice[2].results.map(r=>{
            return r.result;
        })

        // Filter out ACTION dice that are canceled
        let actionDice = roll.dice[0].results.map(r=>{
            if(hurtValues.includes(r.result)) canceledValues.push(r.result)
            return {result:r.result, canceled:hurtValues.includes(r.result)};
        })

        // Filter out PUSH dice that are canceled
        let pushDice = roll.dice[1].results.map(r=>{
            if(hurtValues.includes(r.result)) canceledValues.push(r.result)
            return {result:r.result, canceled:hurtValues.includes(r.result)};
        })

        // Filter out HURT dice that are canceled
        let hurtDice = roll.dice[2].results.map(r=>{
                 return {result:r.result, canceled: canceledValues.includes(r.result)}
        })

        //let leftoverDiceValues = [...actionDice.filter(i=>!i.canceled), ...pushDice.filter(i=>!i.canceled), ...hurtDice.filter(i=>!i.canceled)].map(r=>r.result);
        let leftoverDiceValues = [...actionDice.filter(i=>!i.canceled), ...pushDice.filter(i=>!i.canceled)].map(r=>r.result);
        leftoverDiceValues.push(0) // add 0 as a value if everything else gets canceled.
        let result = Math.max(...leftoverDiceValues);

        // Mark success dice
        [...pushDice, ...actionDice].forEach(d=>{
            if(d.result==result) d.success=true;
        })

        let occurances = -1; // start at -1 sp the first found doesn't count
        leftoverDiceValues.forEach(i=>{
            if (i==result) occurances++
        })

        if(occurances>0)
            result += occurances/10
        
        result = parseFloat(result)

        //console.warn(`LEFTOVER IS ${leftoverDiceValues}`)
        //console.warn(`RESULT IS ${result}`)

        await TechnoirRoller.sendToChat({
            rollname: rollname,
            roll: roll,
            result: result,
            actionDice: actionDice,
            pushDice: pushDice,
            hurtDice: hurtDice,
            actor: actor,
            item: item, 
            options:options
        });
    }

    static async sendToChat({ rollName = "Technoir Roll", roll = null, result = 0, actionDice = [], pushDice = [], hurtDice = [], actor = null, item = null, options={} } = {}) {

        let rollData = {
            rollName: rollName,
            roll: roll,
            result: result,
            actionDice: actionDice,
            pushDice: pushDice,
            hurtDice: hurtDice,
            actor:actor,
            item:item
        }

        const html = await renderTemplate("systems/technoir/templates/chat/roll.html", rollData);
        let TNRoll = {
            rollName: rollName,
            roll: roll,
            actionDice: actionDice,
            pushDice: pushDice,
            hurtDice: hurtDice,
            actor:actor,
            item:item
        }       

       // let speaker = {actor:actor._id}
        let chatData = {
            user: game.user.id,
            speaker: options.speaker || ChatMessage.getSpeaker({actor: this}),
            rollMode: game.settings.get("core", "rollMode"),
            content: html,
            flags: { technoir: TNRoll },
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            roll: roll,
        };
        if (["gmroll", "blindroll"].includes(chatData.rollMode)) {
            chatData.whisper = ChatMessage.getWhisperRecipients("GM");
        } else if (chatData.rollMode === "selfroll") {
            chatData.whisper = [game.user];
        }
        await ChatMessage.create(chatData);
    }

}