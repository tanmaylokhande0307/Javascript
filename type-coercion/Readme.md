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

#### case 2


{} == 0 // Uncaught SyntaxError: Unexpected token '=='

gives error

{}.toString() gives error

but

const obj = {}

and now 

obj == 0 // false

because,
obj.toString() = '[object object]'

'[object object]' == 0 // false

hence obj == 0 // false

#### truthy and falsy

in javascript all values are truthy unless they are defined falsy

falsy : 0,"",-0, 0n,false, undefined, null , NAN

hence, 

if([]){
    this code will execute
}