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

  
const mostBlogs = (blogs) => {
    const listCopy = sortByAuthor(blogs);

    // count postings.
    let prevAuthor = null;
    let authorID = -1;
    let perAuthorPost = [];

    listCopy.forEach(blogPost => {
        if(prevAuthor == null || blogPost.author.toLowerCase() != prevAuthor){
            prevAuthor = blogPost.author.toLowerCase();
            authorID++;
            perAuthorPost[authorID] = {author: blogPost.author, blogs: 0};
        }
        perAuthorPost[authorID].blogs += 1;
    });

    return perAuthorPost.sort((a, b) => a.blogs - b.blogs).reverse()[0];
}

const mostLikes = (blogs) => {
    const listCopy = sortByAuthor(blogs);

    // count likes.
    let prevAuthor = null;
    let authorID = -1;
    let perAuthorPost = [];

    listCopy.forEach(blogPost => {
        if(prevAuthor == null || blogPost.author.toLowerCase() != prevAuthor){
            prevAuthor = blogPost.author.toLowerCase();
            authorID++;
            perAuthorPost[authorID] = {author: blogPost.author, likes: 0};
        }
        perAuthorPost[authorID].likes += blogPost.likes;
    });

    return perAuthorPost.sort((a, b) => a.likes - b.likes).reverse()[0];
}

const sortByAuthor = (blogs) => {
    // sort list to author aplphabetical order
    return [...blogs].sort((a, b) => {
        if(a.author.toLowerCase() < b.author.toLowerCase()){
            return -1;
        }else if(a.author.toLowerCase() > b.author.toLowerCase()){
            return 1;
        }else{
            return 0;
        }
    });
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}