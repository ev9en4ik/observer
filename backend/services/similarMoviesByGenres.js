function compareMoviesByGenres(movie1, movie2) {
    // Порівнюємо за кількістю спільних жанрів
    let commonGenres1 = movie1.genre.filter(genre => movie2.genre.includes(genre));
    let commonGenres2 = movie2.genre.filter(genre => movie1.genre.includes(genre));
    
    return commonGenres2.length - commonGenres1.length;
}
module.exports = (targetMovie, allMovies) => {
    // Створіть копію масиву всіх фільмів
    let similarMovies = allMovies.slice();
    
    // Відсортуйте фільми за допомогою функції порівняння
    similarMovies.sort(function (a, b) {
        return compareMoviesByGenres(targetMovie, a) - compareMoviesByGenres(targetMovie, b);
    });
    
    return similarMovies;
}