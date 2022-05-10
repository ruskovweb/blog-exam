export function validatePost(post) {
    if (post.title == null || post.title === "") {
        return false;
    }

    if (post.description == null || post.description === "") {
        return false;
    }

    return true;
}
