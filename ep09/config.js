export default {
    build: {
        contents: "contents",
        pages: "pages",
        dist: "dist",
        contentsSlug: 'post',
    },
    site: {title: 'ITS My Blog!!!!!!', author: 'Jieun Wang'},
    updatePost(post) {
       post.created_at = post.created_at.toLocaleDateString();
       return post;
    }
};
