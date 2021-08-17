const {validationResult} = require('express-validator')

exports.createBlogPost = (req, res, next) => {
    const title = req.body.title
    // const image = req.body.image
    const body = req.body.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const err = new Error('Invalid value!')
        err.errorStatus = 400
        err.data = errors.array()
        throw err
    }

    const result = {
        message: "Create Blog Post Succeed",
        data: {
            id: 1,
            title: "post title",
            image: "imagefile.jpg",
            body: "lorem ingsun jalaran saka kulina",
            created_at: "17/08/2021",
            author: {
                uid: 1,
                name: "person name"
            }
        }
    }
    res.status(201).json(result)
}