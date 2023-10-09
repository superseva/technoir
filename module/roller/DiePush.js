export default class DiePush extends Die {

    constructor(termData) {
        termData.faces = 6;
        super(termData);
    }

    static DENOMINATION = 'p';

    /** @override */
    // getResultLabel(result) {
    //     return {
    //         "1": '<img src="systems/ac2d20/assets/dice/d1.webp" />',
    //         "2": '<img src="systems/ac2d20/assets/dice/d2.webp" />',
    //         "3": '<img src="systems/ac2d20/assets/dice/d3.webp" />',
    //         "4": '<img src="systems/ac2d20/assets/dice/d4.webp" />',
    //         "5": '<img src="systems/ac2d20/assets/dice/d5.webp" />',
    //         "6": '<img src="systems/ac2d20/assets/dice/d6.webp" />'
    //     }[result.result];
    // }

    // static values = {
    //     1: 1,
    //     2: 2,
    //     3: 0,
    //     4: 0,
    //     5: "<img width='24' height='24' style='border: none' src='systems/ac2d20/assets/dice/d5.webp'/>",
    //     6: "<img width='24' height='24' style='border: none' src='systems/ac2d20/assets/dice/d6.webp'/>",
    // };

}