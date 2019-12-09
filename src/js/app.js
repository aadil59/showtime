// ======================= JSON RESPONSE TO LOAD DATA BY FETCH
let headingTitle = document.querySelector('.heading-section');
let popularMoviesBtn = document.getElementById('getPopularmovies');
let currentmoviesBtn = document.getElementById('currentmoviesBtn');
const getData = () => {
    const jsonURL = "https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&api_key=69705aee3fca5c731bd07fa027719283";
    let movieContainer = document.querySelector('.movie-list-wrapper .row')
    fetch(jsonURL)
        .then(res => res.json())
        .then(data => {
            // console.log(data.results);
            //________________ TEMPLETE LITERALS FOR LOAD ALL DATA
            const drawDOM = () => {
                let output = '';
                data.results.forEach(function (item) {
                    output += `<div class="col"><figure class="card">
                    <img src="http://image.tmdb.org/t/p/w500/${item.poster_path}" alt="" />
                    <figcaption>
                        <h4 class="title">${item.title}</h4>
                        <span class="date">${item.release_date}</span>
                    </figcaption>
                </figure></div>`;
                });
                movieContainer.innerHTML = output;
            };
            drawDOM();
        });
    headingTitle.innerHTML = 'Popular Movies';
};
getData();
// MODAL
var modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    showModal = document.querySelector('.show-modal'),
    close = document.querySelector('.close');

/*show modal and set dimensions based on window */
showModal.addEventListener('click', function () {
    // alert('show');
    overlay.style.display = "block";;
    modal.classList.add('modal-open');
});
/*close on click of 'x' */
close.addEventListener('click', function () {
    overlay.style.display = "none";
});
/* close on click outside of modal */
overlay.addEventListener('click', function (e) {
    if (e.target !== this) return;
    overlay.style.display = "none";
});

//Float Label and SEARCH MOVIE
let inputBox = document.querySelector(".form-control"),
    btnSubmitSearch = document.getElementById('SearchMovieBtn');

if (inputBox.value) {
    inputBox.classList.add("float-label-up");
}
inputBox.addEventListener('keyup', function () {
    let count = inputBox.value.length;
    // console.log(count);
    if (count == 0) {
        inputBox.classList.remove("float-label-up");
    } else {
        inputBox.classList.add("float-label-up");
    }
});
const searchMovie = () => {
    overlay.style.display = "none";
    headingTitle.innerHTML = inputBox.value;
    const jsonURL = `https://api.themoviedb.org/3/search/movie?&query='${inputBox.value}'&sort_by=popularity.desc&api_key=69705aee3fca5c731bd07fa027719283`;
    let movieContainer = document.querySelector('.movie-list-wrapper .row')
    fetch(jsonURL)
        .then(res => res.json())
        .then(data => {
            //________________ TEMPLETE LITERALS FOR LOAD ALL DATA
            const drawDOM = () => {
                let output = '';
                data.results.forEach(function (item) {
                    output += `<div class="col"><figure class="card">
                        <img src="http://image.tmdb.org/t/p/w500/${item.poster_path}" alt="" />
                        <figcaption>
                            <h4 class="title">${item.title}</h4>
                            <span class="date">${item.release_date}</span>
                        </figcaption>
                    </figure></div>`;
                });
                movieContainer.innerHTML = output;
            };
            drawDOM();
        });
    inputBox.value = '';
}

// TIME DIFF FOR FINDING THE RELEVENT MOVIES IN THEATERS NOW
const getTodayDate = () => {
    let today = new Date();
    let day = '' + today.getDate();
    let month = '' + (today.getMonth() + 1);
    let year = today.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

const getLastMonthDate = () => {
    let today = new Date();
    let day = '' + today.getDate();
    let month = '' + today.getMonth();
    let year = today.getFullYear();
    if (month == '1') month = '12', year--;
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}
const filterGetInTheater = () => {
    headingTitle.innerHTML = 'Movies in Theaters Now';
    const jsonURL = `https://api.themoviedb.org/3/discover/movie?&primary_release_date.gte=${getLastMonthDate()}&primary_release_date.lte=${getTodayDate()}&sort_by=popularity.desc&api_key=69705aee3fca5c731bd07fa027719283`;
    let movieContainer = document.querySelector('.movie-list-wrapper .row')
    fetch(jsonURL)
        .then(res => res.json())
        .then(data => {
            //________________ TEMPLETE LITERALS FOR LOAD ALL DATA
            const drawDOM = () => {
                let output = '';
                data.results.forEach(function (item) {
                    output += `<div class="col"><figure class="card">
                        <img src="http://image.tmdb.org/t/p/w500/${item.poster_path}" alt="" />
                        <figcaption>
                            <h4 class="title">${item.title}</h4>
                            <span class="date">${item.release_date}</span>
                        </figcaption>
                    </figure></div>`;
                });
                movieContainer.innerHTML = output;
            };
            drawDOM();
        });
}

popularMoviesBtn.addEventListener('click', getData);
btnSubmitSearch.addEventListener('click', searchMovie);
currentmoviesBtn.addEventListener('click', filterGetInTheater);