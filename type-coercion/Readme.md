### == allows type conversion

### === doesnt allow type conversion


#### case 1

[] == 0 // true

one of them need to be converted

objects can be converted to primitive

so [].toString() = ""

now,

"" == 0 //true

here "" is converted to number
Number("") = 0

hence [] == 0, first object is converted to string then string is converted to number in this case

