const path = require('path')

// import router
const { Router } = require('express')
const router = new Router()

// import controller
const controller = require("../controllers/products")

// middleware
const auth = require('../middlewares/auth')


// passport
const passport = require('passport')


// gzip compression
const compression = require('compression')


// GET Main
router.get('/', auth, (req, res) => {
    const { firstName } = req.user
    res.render('main', { firstName })
})


// GET Login
router.get('/login', (req, res) => res.render('login'))
router.get('/loginzip', compression(), (req, res) => res.render('login'))


// POST Login
//router.post('/login', loginUser)
router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))


// GET Register
router.get('/register', (req, res) => res.render('register'))


// POST Register
router.post("/register",
    passport.authenticate("register", {
        successRedirect: "/",
        failureRedirect: "/register",
        failureFlash: true
    })
)


router.get('/logout', auth, (req, res) => {
    const { firstName } = req.user
    console.log(firstName);

    req.logOut()
    res.render("logout", { firstName })
    // const { name } = req.session.user
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.log(err);
    //         res.send(err)
    //         return
    //     }
    // })
    // res.render('logout', { name })
})


// save product
router.post("", controller.post)

module.exports = router