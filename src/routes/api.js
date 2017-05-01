const fs = require('fs');
const path = require('path');

module.exports = function(router) {

    //RESTFUL API
    router.get('/weeks', (req, res) => {
    const mockdata = fs.readFileSync(path.resolve(__dirname, './../database/mockdata.json'));
    const weeks = JSON.parse(mockdata).weeks;
    res.status(200).json(weeks)
})

    router.get('/lessons/:lesson_id/posts', (req, res) => {
        const mockdata = fs.readFileSync(path.resolve(__dirname, './../database/mockdata.json'));
        const posts     = JSON.parse(mockdata).posts
                            .filter(function(post) {
                                return post.lessons.find(function(lesson) {
                                    return lesson.id === req.params.lesson_id
                                })
                            })
        if(posts.length) {
            res.status(200).json(posts)
        } else {
            res.status(404).send()
        }
    })

    return router;

}
