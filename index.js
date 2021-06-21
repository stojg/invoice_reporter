const parser = require('./parser.js')
const readline = require('readline');
const fs = require('fs');

// example rate, replace with yours
const RATE = 50

const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};

const round = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

const readInterface = readline.createInterface({
    input: fs.createReadStream(process.argv[2]),
    output: false,
    console: false
});

const summary = {}

readInterface.on('line', function (line) {
    const parsed = parser.parse(line)
    if (parsed === null) {
        return
    }
    if (typeof parsed !== 'object') {
        console.log(parsed)
        return
    }
    if (!summary.hasOwnProperty(parsed[1])) {
        summary[parsed[1]] = 0.0
    }
    summary[parsed[1]] += parsed[0]
    console.log(line.padEnd(80, " ") + colours.fg.green + '(' + round(parsed[0]) + ')' + colours.fg.white)
});

// tax brackets
const t14 = 14000
const t48 = 48000
const t70 = 70000

const effectiveTax = (income) => {
    const d = Math.max(income - t70, 0)
    const c = Math.max(income - d - t48, 0)
    const b = Math.max(income - d - c - t14, 0)
    const a = Math.max(income - d - c - b, 0)
    const tax = a * 0.105 + b * 0.175 + c * 0.30 + d * 0.33
    return (tax / income)
}

readInterface.on('close', function () {
    console.log("-".padEnd(90, "-"))

    let total = 0
    for (const property in summary) {
        total += summary[property]
        console.log(`${property}: ${colours.fg.green + round(summary[property]) + colours.fg.white} hours`);
    }

    // real shoddy estimation of taxes etc
    const subtotal = total*RATE
    const gst = subtotal * 0.15
    const fee = subtotal * 0.01
    const effectiveIncomeTax = subtotal * effectiveTax(subtotal * 52/2)
    const acc = subtotal * 0.01685522788
    const afterTax = subtotal - effectiveIncomeTax - acc - fee
    console.log(`\ntotal: ${colours.fg.green + round(total) + colours.fg.white} hrs`)
    console.log(`\n------------`)
    console.log(`subtotal: \$${round(subtotal)}`)
    console.log(`total: \$${round(subtotal + gst)} (\$${round(gst)} gst)\n`)
    console.log(`hnry: \$${round(fee)}`)
    console.log(`acc: \$${round(acc)}`)
    console.log(`income tax: \$${round(effectiveIncomeTax)}`)
    console.log("---")
    console.log(`income: \$${round(afterTax)}\n`)
})






