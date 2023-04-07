const sequelize = require("sequelize");
const { Post, User } = require("../Models/user");
const { createPost, getPostById, updatePost, getAllPosts, deletePost, likePost } = require("../Services/postService");

const postController = {}

postController.createPost = async (req, res) => {
    try {
        const { text } = req.body
        const userId = req.user.id;

        await createPost(text, userId)

        return res.redirect('/post/getAll')
    } catch (error) {
        console.log(error)
        return res.send('Cannot create post')
    }
}


postController.getPostById = async (req, res) => {
    try {

        const postId = req.query.postId
        const userId = req.user.id;

        // const [post,user,count] = await Promise.all([
        //     await Post.getOne({ where: { id: postId } }),
        //     await User.findOne({where:{id:userId}}),
        //     await postController.getPostCount()
        // ])



        // if (!post) {
        //     return res.send('post not found')
        // }

        const data = await getPostById(postId, userId)

        return res.render('postDetails', { post: data.post, user: data.user, count: data.count })

    } catch (error) {
        console.log(error)

    }
}


postController.getAllPosts = async (req, res) => {
    try {
        let limit = 20
        let offset = 0
        const userId = req.user.id;

        const data = await getAllPosts(userId, limit, offset)
        
        return res.render('posts', { posts: data.posts, postCount: data.postCount, user: data.user ,userId})

    } catch (error) {
        console.log(error)
        return res.redirect('/')
    }
}

postController.checkPost = async (postId) => {
    try {
        if (!postId) {
            throw 'PostId required'
        }
        const post = await Post.findOne({ where: { id: postId } })

        if (post === false) {
            throw false
        }

        return { post: post ? post : false }
    } catch (error) {
        console.log(error)
        return error
    }
}

postController.updatePost = async (req, res) => {
    try {
        const { postId, text } = req.body

        const userId = req.user.id;

        await updatePost(postId, text, userId)
        return res.redirect('/post/getAll')

    } catch (error) {
        console.log(error)
        return res.status(500).send('faliled to update post')
    }
}

postController.deletePost = async (req, res) => {
    try {
        const { postId } = req.body

        // const checkPost = await postController.checkPost(postId)

        const userId = req.user.id;

        // if (!checkPost) {
        //     return res.send('Post not found')
        // }

        const data = await deletePost(userId, postId)

        if (data === false) {
            return res.redirect('/')
        }

        return res.redirect('/post/getAll')
        // return res.send('post deleted success')

    } catch (error) {
        console.log(error)
        return res.status(500).send('faliled to delete post')

    }
}

postController.likePost = async (req, res) => {

    try {
        const { postId } = req.body
        const userId = req.user.id;

        const data = await likePost(postId, userId)

        return res.redirect('/post/getAll')
    } catch (error) {
        console.log(error)
        return res.status(500).send('faliled to like post')
    }


}



// sequencial and paralle calls



module.exports = postController