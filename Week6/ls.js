//read from local storage
export function readFromLS(key){
    return JSON.parse(localStorage.getItem(key));
}
//write in local storage
export function writeToLS(key, data){
    return localStorage.setItem(key, JSON.stringify(data)); //local storage only store strings that's why we use JSON to stringfy the object
}