function cosineSimilarity(user1, user2) {
    const movies = Object.keys(user1);
    
    const dotProduct = movies.reduce((acc, movie) => {
        return acc + user1[movie] * user2[movie];
    }, 0);
    
    const magnitude1 = Math.sqrt(Object.values(user1).reduce((acc, rating) => acc + rating ** 2, 0));
    const magnitude2 = Math.sqrt(Object.values(user2).reduce((acc, rating) => acc + rating ** 2, 0));
    
    return dotProduct / (magnitude1 * magnitude2);
}
module.exports = (currentUser, users) => {
    const user1 = {
        ...currentUser.ratedMovies.reduce((acc, movie) => {
            acc[`${movie.id}`] = movie.rating;
            return acc;
        }, {})
    };
    const userPreferences = {};
    users.forEach((user) => {
        if (user.ratedMovies && user.ratedMovies.length > 0) {
            userPreferences[user.id] = user.ratedMovies.reduce((acc, movie) => {
                acc[movie.id] = movie.rating;
                return acc;
            }, {});
        }
    });

    const similarities = {};
    
    for (const user in userPreferences) {
            similarities[user] = cosineSimilarity(user1, userPreferences[user]);
    }
    
    const sortedUsers = Object.keys(similarities).sort((a, b) => similarities[b] - similarities[a]);
    
    const recommendations = {};
    
    // Generate recommendations based on the most similar users
    sortedUsers.forEach((user) => {
        // console.log(userPreferences[user])
        for (const movie in userPreferences[user]) {
            if (!(movie in user1) && !(movie in recommendations)) {
                recommendations[movie] = userPreferences[user][movie];
            }
        }
    });
    
    // Sort the recommendations by rating
    const sortedRecommendations = Object.keys(recommendations).sort((a, b) => recommendations[b] - recommendations[a]);
    return sortedRecommendations;
}

