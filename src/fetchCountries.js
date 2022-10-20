
export function fetchCountries(name,page) {
    const arrCountries = fetch(`https://pixabay.com/api/?key=23818596-d5461ac6688865132aed17576&q=${name}&image_type=photo&orientation=horizontal&safesearch =true&page=${page}&per_page=40`)
return arrCountries.then( response=> {
if(!response.ok){
    throw new Error(response.status)
}
console.log(response);
return response.json();
})
}








// export function fetchCountries(name,page) {
//     const arrCountries = fetch(`https://pixabay.com/api/?key=23818596-d5461ac6688865132aed17576&q=${name}&image_type=photo&orientation=horizontal&safesearch =true&page=${page}&per_page=40`)
// return arrCountries.then( response=> {
// if(!response.ok){
//     throw new Error(response.status)
// }
// console.log(response);
// return response.json();
// })
// }

