const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0;
    blogs.forEach(blog => likes+=blog.likes)
    return likes
}

const favouriteBlog = (blogs) => {
    let fav = blogs.reduce((a, b) => (a.likes > b.likes) ? a : b, {})
    if (fav){
        fav = 
            {
                title: fav.title,
                author: fav.author,
                likes: fav.likes
            }
    }
    return fav
}

const mostBlogs = (blogs) => {
    let authors = blogs.map(blog => blog.author)
    const count = (arr, value) => arr.filter(val => val === value).length
    let authorsWithBlogs = []
    authors.forEach(a => {
        let countblogs = count(authors, a)
        let author = ({author:a, blogs:countblogs})
        authorsWithBlogs.push(author)
    })
    let author = authorsWithBlogs.reduce((a,b) => (a.blogs > b.blogs) ? a : b, {})
    return author

}

const mostLikes = (blogs) => {
    let authors = blogs.map(blog => blog.author)
    const likesForAuthor = (array, author) => {
        let blogsForAuthor = array.filter(b => b.author === author)
        let likes = blogsForAuthor.reduce((a,b) => a + b.likes,0)
        return likes
    }
    let authorsWithLikes = []
    authors.forEach(a => {
        let likes = likesForAuthor(blogs,a)
        let author = ({author:a, likes:likes})
        authorsWithLikes.push(author)
    })
    let author = authorsWithLikes.reduce((a,b) => (a.likes > b.likes) ? a : b, {})
    return author
}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}