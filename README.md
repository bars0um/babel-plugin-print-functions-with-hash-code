# babel-plugin-print-functions-with-hash-code

A babel plugin that will perform a simple hash on all function names and produce a file listing functions/hash codes.

The use case for this was that we had generic error handling functions that needed to display a message to users
that could eventually be used to map back the error to a function somewhere in our code.

The solution was to have that function display a hash-code for the function name. The user can then report this
code and we would check exactly where the error started.

```
// return caller's caller
function getFuncName() {
  return getFuncName.caller.caller.name;
}

// Example of our code

GenericHandler(callback){
     showDialog( "You have tread on shifty sands, please report this to HQ: " + hashCode(getFuncName()))
}

```

The resulting functionHashes.txt file will contain the list of functions that the hash code can be compared to.
