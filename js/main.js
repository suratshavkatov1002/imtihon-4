let elinputSearch = document.querySelector(".input__search");
let elCardWrapper = document.querySelector(".card__wrapper");
let elCardTemplate = document.querySelector(".card__template").content;
let elForm = document.querySelector(".form");
let elQuyosh = document.querySelector(".header__search-quyosh");
let elBody = document.querySelector(".body");
let elResult = document.querySelector(".result");
let elMoreInfo = document.querySelector(".more__info");

let elLiWrapper = document.querySelector(".bookmark__wrapper");
let elbookmarkTemplate = document.querySelector(".book__template").content;

let elModalWrapper = document.querySelector(".modal__wrapper");
let elModalTem = document.querySelector(".madal__temp").content;




elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    let inputValue = elinputSearch.value.trim()

    fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=10&q=${inputValue}`)
        .then(res => res.json())
        .then(data => renderBook(data.items))

})

elQuyosh.addEventListener("click", function(evt) {
    elBody.classList.toggle("quyosh")
})


function renderBook(array) {
    elCardWrapper.innerHTML = null
    elResult.textContent = array.length
    let newFragment = document.createDocumentFragment();

    for (const item of array) {
        let newCard = elCardTemplate.cloneNode(true);
        newCard.querySelector(".card-title").innerHTML = item.volumeInfo.title;
        newCard.querySelector(".card-img-top").src = item.volumeInfo.imageLinks.thumbnail;
        newCard.querySelector(".after").innerHTML = item.volumeInfo.authors;
        newCard.querySelector(".data").innerHTML = item.volumeInfo.publishedDate;
        newCard.querySelector(".btn__bookmark").dataset.bookId = item.id;
        newCard.querySelector(".more__info").dataset.moreId = item.id
        newFragment.appendChild(newCard);
    }

    elCardWrapper.appendChild(newFragment)

}

elCardWrapper.addEventListener("click", function(evt) {
    let faundet = evt.target.dataset.bookId

    if (faundet) {
        fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=10&q=${faundet}`)
            .then(res => res.json())
            .then(data => renderBookmark(data.items))

    }
})

function renderBookmark(array) {


    let newFragment2 = document.createDocumentFragment();

    for (const item of array) {
        let newCard2 = elbookmarkTemplate.cloneNode(true);
        newCard2.querySelector(".book__name").innerHTML = item.volumeInfo.title;
        newCard2.querySelector(".book__name1").innerHTML = item.volumeInfo.authors;
        newCard2.querySelector(".delete").dataset.delete = item.id;

        newFragment2.appendChild(newCard2);
    }

    elLiWrapper.appendChild(newFragment2)
}


function renderModal(array) {


    let newFragment3 = document.createDocumentFragment();

    for (const item of array) {
        let newCard3 = elModalTem.cloneNode(true);
        newCard3.querySelector(".modal-title").innerHTML = item.volumeInfo.title;
        newCard3.querySelector(".kitob__img2").src = item.volumeInfo.imageLinks.thumbnail;
        newCard3.querySelector(".modal-body").innerHTML = item.volumeInfo.description;
        newCard3.querySelector(".autort").innerHTML = item.volumeInfo.authors;
        newCard3.querySelector(".publised").innerHTML = item.volumeInfo.publishedDate;
        newCard3.querySelector(".publisher").innerHTML = item.volumeInfo.publisher;
        newCard3.querySelector(".categories").innerHTML = item.volumeInfo.categories;

        newFragment3.appendChild(newCard3);
    }

    elModalWrapper.appendChild(newFragment3)


}


elCardWrapper.addEventListener("click", function(evt) {
    let faundet3 = evt.target.dataset.moreId

    if (faundet3) {
        fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=10&q=${faundet3}`)
            .then(res => res.json())
            .then(data => renderModal(data.items))

    }
})



