{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }

  function makeString(o) {
    return o.join('')
  }

  function makeFloat(o) {
    return parseFloat(o)
  }
}

start = line

line = separator / weekday / report / anything

separator = separator:[-]+ { return null }

anything = thing:.* { return makeString(thing) }

weekday = weekday:word " " month:word " " date:integer { return weekday + " " + month + " " + date }

report = left:timeRange [ |-]+ right:string { return [left, right.toLowerCase()] }

timeRange = hoursRange / hours

hours = time

hoursRange = left:time middle:timeRangeDivider right:time { return right - left }

timeRangeDivider = left:ws "-" right:ws

time = left:integer [:\.] right:integer { return ((left * 60) + right) / 60  }

ws = [ \t]*

number = float / integer

integer = digits:[0-9]+ { return makeInteger(digits); }

float = left:[0-9] +. right:[0-9]+ { return makeFloat(left+'.'+right) }

word = chars:[a-zA-Z]+ { return makeString(chars); }

string = chars:.* { return makeString(chars); }

