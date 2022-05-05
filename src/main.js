

async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY)
    const data = await res.json();

    const movies = data.results;
    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview_movieList');

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie_container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie_img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        );
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });

} 

async function getCategoriesPreview() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();

    const categories = data.genres;
    categories.forEach(category => {
        const PreviewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview_list');
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category_container');

        const categoryTitle = document.createElement('H3');
        categoryTitle.classList.add('category_title')
        categoryTitle.setAttribute('id',`id${category.id}` )// esto vincula c/id con los estilos del css o sea le da la estructura para ser "visto" por los estilos
        
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        PreviewCategoriesContainer.appendChild(categoryContainer);

    });
}
getTrendingMoviesPreview();
getCategoriesPreview();

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