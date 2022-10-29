const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

// Utils
//anotar esto completo y porque lo usamos de la esta forma 

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            const url = entry.target.getAttribute("data-img");
            entry.target.setAttribute("src", url)
        }
    })
})


function createMovies(
    movies, 
    container,
    {
        lazyLoad = false, 
        clean = true
    }) {
    if(clean){
        container.innerHTML = '';
    }

    movies.forEach(movie => {

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie_container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;  
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie_img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? "data-img" : "src", 
        `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        );

        if(!!lazyLoad){
            lazyLoader.observe(movieImg)
        }
        movieImg.addEventListener("error", () => {
            movieImg.classList.add("imageError")
            movieImg.setAttribute("src", "../images/fondoVioleta.png")
            const movieTitleText = document.createTextNode(movieImg.getAttribute("alt"));
            const movieTitle = document.createElement("span")
            movieContainer.appendChild(movieTitle);
            movieTitle.appendChild(movieTitleText);
        })

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}
function createCategories(categories, container) {
  container.innerHTML = '';  

  categories.forEach(category => {
    const categoryContainer = document.createElement('div')
    categoryContainer.classList.add('category_container');

    const categoryTitle = document.createElement('H3');
    categoryTitle.classList.add('category_title')
    categoryTitle.setAttribute('id',`id${category.id}` )// esto vincula c/id con los estilos del css o sea le da la estructura para ser "visto" por los estilos
    categoryTitle.addEventListener('click', () => {
        location.hash = `#category=${category.id}-${category.name}`;
    })
    
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);

});
}

// llamados al API
async function getTrendingMoviesPreview() {
    const { data } = await api(`trending/movie/day`);
    const movies = data.results;

    createMovies(movies, trendingPreviewMovieList, {lazyLoad: true, clean: true});

} 

async function getCategoriesPreview() {
    const { data } = await api(`genre/movie/list`);
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
    const { data } = await api(`discover/movie`, {
        params: {
            with_genres: id,
        }
    });
    const movies = data.results;

    
    createMovies(movies, genericSection, {lazyLoad: true, clean:true});

} 
// getTrendingMoviesPreview(); ahora estas funciones llas llamo desde una funcion en navigation... o sea solo donde cuando estamos en la pagina donde se pueden invocar
// getCategoriesPreview();

// {0- creo la funcion asincrona getCategoriesPreview
// 1- llamo a la api 
// 2- parseola la data de la respuesta en json
// 3- señaliso con una variable las opciones de la api 
// 4- busco por cada item de la api}

// 5- selecciono #trendingPreview .trendingPreview_movieList en una variable
// 6- creo un contenedor para las peliculas y le agrego una clase 
// 7- creo una imagen le agrgo una clase y dos atributos . uno para la url y el otro para la descipcion de la imagen
// 8- agrego la imagen dentro del contenedor de imagenes y ese contenedor lo pongo en la parte de tendencias

// https://image.tmdb.org/t/p/w300${movie.poster_path}

async function getMoviesBySearch(query){
    const { data } = await api('search/movie',  {
        params: {
            query,
        },
    });
    const movies = data.results;
    createMovies(movies, genericSection,{ lazyLoad:true, clean:true});
}
async function getTrendingMovies() {
    const { data } = await api(`trending/movie/day`);
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection, {lazyLoad:  true, clean: true});
}


async function getPaginatedTrendingMovies(){
    const { 
        scrollTop, 
        clientHeight,
        scrollHeight 
    } = document.documentElement;
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;

    if(scrollIsBottom && pageIsNotMax){
        page++
        const {data} = await api("trending/movie/day", {
            params:{
                page,
            },
        });
        const movies = data.results
        createMovies(movies, genericSection,{lazyLoad: true, clean: false})
    }

    
    // const btnLoadMore = document.createElement("button");
    // btnLoadMore.innerText = "cargar más";
    // btnLoadMore.addEventListener("click", getPaginatedTrendingMovies)
    // genericSection.appendChild(btnLoadMore);
}
async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);
    

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    headerSection.style.background = `
        linear-gradient(
            180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%
            ),
        url(${movieImgUrl})
        `;
    headerSection.style.backgroundPosition = 'center';
    headerSection.style.backgroundRepeat = 'no-repeat';
    headerSection.style.backgroundSize = 'cover';

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);

    getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer,{lazyLoad: true, clean: true} );

}