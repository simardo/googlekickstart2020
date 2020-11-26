type StepFn = (a: Allocations, s: string) => void;

type Allocations = {
    count: number;
    currentCase: number;
    nextHouseMoney: number[];
    output: string[];
    nextStep: StepFn | undefined;
}

function stepHouses(a: Allocations, s: string): void {
    const sortedHousePrices: number[] = s.split(' ').map(ss => Number.parseInt(ss)).sort((a, b) => a - b);

    let spent: number = 0;
    let h: number = 0;
    let total: number = 0;
    while (spent < a.nextHouseMoney[1] && h < a.nextHouseMoney[0]) {
        spent += sortedHousePrices[h];
        if (spent <= a.nextHouseMoney[1]) {
            total++;
        }
        h++;
    }

    a.output.push(`Case #${a.currentCase}: ${total}`);

    if (a.count === a.currentCase) {
        console.log(a.output.join('\n'));
        a.nextStep = undefined;
    } else {
        a.nextStep = stepHouseMoney;
    }
}

function stepHouseMoney(a: Allocations, s: string): void {
    a.currentCase++;
    a.nextHouseMoney = s.split(' ').map(ss => Number.parseInt(ss));
    a.nextStep = stepHouses;
}

function stepCount(a: Allocations, s: string): void {
    a.count = Number.parseInt(s);
    a.nextStep = stepHouseMoney;
}

var allocations: Allocations = {
    count: 0,
    currentCase: 0,
    nextHouseMoney: [],
    output: [],
    nextStep: stepCount
};

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', line => {
    if (allocations.nextStep !== undefined) {
        allocations.nextStep(allocations, line);
    }
});

// `3
// 4 100
// 20 90 40 90
// 4 50
// 30 30 10 10
// 3 300
// 999 999 999`.split('\n').forEach(line => {
//     if (allocations.nextStep !== undefined) {
//         allocations.nextStep(allocations, line);
//     }
// });
