function factorsOf(n) {
    if(Number.isNaN(Number(n))) {
        throw new RangeError('Argument Error: Value must be an integer');
    }
    if(n < 0) {
        throw new RangeError('Argument Error: Number must be positive');
    }
    if(!Number.isInteger(n)) {
        throw new RangeError('Argument Error: Number must be an integer');
    }
    const factors = [];
    for (let i=1 , max = Math.sqrt(n); i <= max ; i++) {
        if (n%i === 0){
        factors.push(i,n/i);
        }
    }
    return factors.sort((a,b) =>  a - b);
}
//This will fire when the worker receives a message, occurring when the form is submitted
self.addEventListener('message', (event) => {

    const factors = String(factorsOf(Number(event.data))); //The number to be factorized is stored in the event.data
    self.postMessage(factors);
    self.close(); // We then use the close() method to terminate the worker, since its work is done.

}, false);