// 23818596-d5461ac6688865132aed17576
import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const lightbox = new SimpleLightbox('.gallery a'); 

const formEl = document.querySelector(".search-form");
const buttonEl = document.querySelector("button");
const inputEl = document.querySelector("input");
const galleryEl = document.querySelector(".gallery")
const btnLoadMoreEl = document.querySelector(".load-more")

let totalHits = "";
let pageNow = "";
buttonEl.disabled = true;

console.log("SimpleLightbox");

buttonEl.addEventListener("click", onPicture)
btnLoadMoreEl.addEventListener("click", onLoadMore)
inputEl.addEventListener("input", onDisabledButton)

let name ="";
let page = 1;

btnLoadMoreEl.classList.add("is-hidden")

function onDisabledButton(e) {
  buttonEl.disabled = false;
}

function onPicture(e) {
  buttonEl.disabled = true;

    e.preventDefault();
    name = inputEl.value.trim()
    

    fetchCountries(name,page)
    .then(data => {
        totalHits = data.totalHits;
        pageNow = totalHits/40;
        console.log("pageNow",pageNow);
        page = 1;
        
      
    if (data.hits.length === 0){
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
    }
    else if (name === ""){
      galleryEl.innerHTML = "";
      btnLoadMoreEl.classList.add("is-hidden");

      return

    }

    else{
        const marcup = createMarkup(data)
        Notify.info(`Hooray! We found ${totalHits} images.`);
        galleryEl.innerHTML = marcup;
        page +=1;
        btnLoadMoreEl.classList.remove("is-hidden")
        lightbox.refresh()
        return}})
    .catch(err => console.log(err))

}

function onLoadMore(el) {
  btnLoadMoreEl.disabled = true;
    fetchCountries(name,page)
    .then(data => {
        const marcup = createMarkup(data)
        galleryEl.insertAdjacentHTML("beforeend", marcup);
        page +=1;
        lightbox.refresh()
        return})
    .catch(err => console.log(err))
    // refresh()
    console.log("page", page);
    console.log("pageNow", pageNow);
    btnLoadMoreEl.disabled = false;
    if (page > pageNow){
        Notify.failure("We're sorry, but you've reached the end of search results.");
        btnLoadMoreEl.classList.add("is-hidden")
    }
}


function  createMarkup(arr) {

    console.log("arr", arr.hits);
    //   console.log("arr.length", arr.hits.length);
    return arr.hits.map(el => `
    <div class="photo-card">
    <a class="gallery__item" href="${el.largeImageURL}">
    <img src="${el.webformatURL}" alt="${el.tags}" class="picture" loading="lazy" width = 200/>
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes <br> ${el.likes}</b>
      </p>
      <p class="info-item">
        <b>Views <br> ${el.views}</b>
      </p>
      <p class="info-item">
        <b>Comments <br> ${el.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads <br> ${el.downloads}</b>
      </p>
    </div>
    
  </div>`
).join('')
}





