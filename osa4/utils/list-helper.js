/**
 * File contains helper functions
 * 
 */



const dummy = (blogs) => {
    return 1;
}


const totalLikes = (blogs) => {
    return blogs.reduce((sum, x) => sum + x.likes, 0);
}

const favoriteBlog = (blogs) => {
    return [...blogs].sort((a, b) => a.likes - b.likes).reverse()[0];
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}