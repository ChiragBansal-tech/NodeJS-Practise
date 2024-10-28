const { Router } = require('express');
const multer = require('multer')
const path = require('path')
const router = Router();
const Blog = require('../models/blogs')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function(req, file, cb){
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName);
    },
})

const upload = multer({ storage: storage })

router.get('/add-new', (req, res) => {
    return res.render("addBlog", {
        user: res.user,
    });
});

router.get('./:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    return res.render('blog', {
        user: req.user,
        blog,
    })
})

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { title, body } = req.body;
        const user = req.session.user;

        if (!user) {
            return res.status(401).send('Unauthorized');
        }

        const blog = await Blog.create({
            body,
            title,
            createdBy: user._id,  
            coverImageURL: `/uploads/${req.file.filename}` 
        });

        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;