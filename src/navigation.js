let maxPage;
let page = 1;

let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value}`;
})
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
})
arrowBtn.addEventListener('click', () => {
    //esto es para volver atras en el historial al tocar la flecha
    //reto hacer que si vuy de otra pagin"platzi por ejemplo"a una url de una categorya..hacer que la flecha de atras nos devuleva al home y no a la pagina de platzi 
    // headerTitle.classList.add("inactive");
    location.hash = window.history.back();;
})
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener("scroll", infiniteScroll, {passive: false});


function navigator() {

     if(infiniteScroll){
        window.removeEventListener("scroll", infiniteScroll);
        infiniteScroll = undefined;
     }

     if(location.hash.startsWith('#trends')){
        trendsPage();
    } else if(location.hash.startsWith('#search=')) {
         searchPage();
     } else if (location.hash.startsWith('#movie=')) {
         movieDetailsPage();
     } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
         homePage();
     }
     document.body.scrollTop = 0;
     document.documentElement.scrollTop = 0;

     if(infiniteScroll){
        window.addEventListener("scroll", infiniteScroll,{ passive: false});
     }
}
function trendsPage() {

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerSection.classList.remove('header_container--long');
    searchForm.classList.add('inactive');
    // headerSection.classList.remove('opacidad');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header_arrow--white');
    arrowBtn.classList.add('opacidad');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerText = `Tendencias`;

    getTrendingMovies();

    infiniteScroll = getPaginatedTrendingMovies;
}
function searchPage() {

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    headerSection.classList.remove('header_container--long');
    searchForm.classList.remove('inactive');
    // headerSection.classList.remove('opacidad');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header_arrow--white');
    arrowBtn.classList.add('opacidad');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    footer.classList.remove("inactive");

    // {'#search', 'buscador'}
    const [_, query] = location.hash.split('=') ;
    getMoviesBySearch(query);
}
function movieDetailsPage() {

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    headerSection.classList.add('header_container--long');
    searchForm.classList.add('inactive');

    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header_arrow--white');
    arrowBtn.classList.add("opacidad")
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    footer.classList.add("inactive");

    //['#movie', 'id']
    const [_, movieId] = location.hash.split('=') ;
    getMovieById(movieId);
    onViewPort.observe(movieDetailSection)
}
function categoriesPage() {

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    headerSection.classList.remove('header_container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header_arrow--white');
    arrowBtn.classList.add("opacidad");

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    footer.classList.remove("inactive");
    
    // {'#category', 'id-name'}
    const [_, categoryData] = location.hash.split('=') ;
    const [categoryId, categoryName] = categoryData.split('-');
    //tiene que ser un array en este caso para funcionar...no confundir con objeto
    
    headerCategoryTitle.innerText = `${categoryName}`

    getMoviesByCategory(categoryId);
}
function homePage() {

    headerSection.classList.remove('header_container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header_arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    footer.classList.remove("inactive");



    getTrendingMoviesPreview();
    getCategoriesPreview();
}