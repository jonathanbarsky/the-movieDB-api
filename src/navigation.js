searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=';
})
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
})
arrowBtn.addEventListener('click', () => {
    location.hash = '#home';
})
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
     console.log({ location });

     if(location.hash.startsWith('#trends')){
        trendsPage();
    } else if(location.hash.startsWith('#search=')) {
         searchPage();
     } else if (location.hash.startsWith('#movie=')) {
         movieDetailsPagePage();
     } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
         homePage();
     }
     document.body.scrollTop = 0;
     document.documentElement.scrollTop = 0;
}


function trendsPage() {
    console.log('TRENDS!');

    headerSection.classList.remove('header_container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header_arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}
function searchPage() {
    console.log('SEARCH page!');

    headerSection.classList.remove('header_container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header_arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}
function movieDetailsPagePage() {
    console.log('MOVIESS!');

    headerSection.classList.add('header_container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header_arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}
function categoriesPage() {
    console.log('categories!');

    headerSection.classList.remove('header_container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header_arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    // {'#category', 'id-name'}
    const [_, categoryData] = location.hash.split('=') ;
    const [categoryId, categoryName] = categoryData.split('-');
    //tiene que ser un array en este caso para funcionar...no confundir con objeto
    
    headerCategoryTitle.innerText = `${categoryName}`

    getMoviesByCategory(categoryId);
}
function homePage() {
    console.log('Home');

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



    getTrendingMoviesPreview();
    getCategoriesPreview();
}