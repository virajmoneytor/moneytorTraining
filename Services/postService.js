const { Post, User } = require("../Models/user")
const postService = {}
const sequelize = require("sequelize");
const { io } = require("../server");


postService.createPost = async (text, userId) => {

    try {
        const post = await Post.create({
            text,
            userId,
            likeCount: 0,
            likeIds: [userId]
        })

        return true

    } catch (error) {
        console.log(error)
    }

}

postService.findUser = async (userId) => {
    try {
        const user = await User.findOne({ where: { id: userId } })

        return { user: user ? user : null }

    } catch (error) {
        console.log(error)
        return false
    }
}


postService.getPostCount = async () => {
    try {
        const count = await Post.count()

        return { count }
    } catch (error) {
        console.log(error)
        return false
    }
}

postService.getOnePost = async (postId) => {
    try {
        const post = await Post.findOne({ where: { id: postId } })

        if (!post) {
            throw 'post not found'
        }
        return { post }
    } catch (error) {
        console.log(error)
        return false
    }


}


postService.getPostById = async (postId, userId) => {
    try {

        const [post, user, count] = await Promise.all([
            await postService.getOnePost(postId),
            await postService.findUser(userId),
            await postService.getPostCount()
        ])


        return { post, user, count }

    } catch (error) {
        console.log(error)
        return false
    }
}

postService.checkPost = async (postId) => {
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

postService.updatePost = async (postId, text, userId) => {
    try {

        const checkPost = await postService.checkPost(postId)


        if (!checkPost.post) {
            return res.send('Post not found')
        }

        if (checkPost.post.userId !== userId) {
            // return res.send('you do not have this permission') 
            return res.redirect('/post/getAll')
        }

        await Post.update({ text }, { where: { id: postId } })

        // res.redirect('/post/getAll')
        return false
        // return res.send('post updated success')

    } catch (error) {
        console.log(error)
        return false
    }
}

postService.getAllPosts = async (userId, limit, offset) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                require: true
            }],
            attributes: ['id', 'user.username', 'text', 'likeCount'],
            limit,
            offset
        })

        const user = await User.findOne({ where: { id: userId } })

        const postCount = await Post.count()

        return { posts: posts, postCount, user }

    } catch (error) {
        console.log(error)
        return false
    }
}

postService.deletePost = async (userId, postId) => {
    try {

        const checkPost = await postService.checkPost(postId)

        if (!checkPost) {
            return false
        }

        if (checkPost.post.userId !== userId) {
            // return res.send('you do not have this permission')
            return false
        }

        await Post.destroy({ where: { id: postId } })

        return true
        // return res.send('post deleted success')

    } catch (error) {
        console.log(error)
        return false

    }
}

postService.likePost = async (postId, userId) => {

    try {
        const post = await Post.findOne({ where: { id: postId } })

        if (!post.dataValues.likeIds.includes(userId)) {
            await Post.update(
                { likeCount: sequelize.literal('likeCount + 1'), likeIds: sequelize.fn('JSON_ARRAY_APPEND', sequelize.col('likeIds'), '$', userId) },
                { where: { id: postId } }
            )
        }
  
        // const creatorSocket = io.sockets.sockets.get(post.id);

        // if (creatorSocket) {
        //   creatorSocket.emit('post-liked', { postId, liker });
        // }

        return true
    } catch (error) {
        console.log(error)
        return false
    }


}


module.exports = postService