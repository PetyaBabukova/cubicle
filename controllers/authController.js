const {Router} = require('express');
// const {Router} = require('express').Router; // можем да го вземем ратъра така, без да го деструктурираме - обикновено при по стара версия на ноуд

const router = Router();
// const router = require ('express').Router(); //може и така
const authService = require('../services/authService');


router.get('/login', (req, res)=>{
    res.render('login');
});

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    try {
         let token = await authService.login({username, password});

         console.log(token);

         res.end();

    } catch (error) {
        res.render('login', {error});
    }
});

router.get('/register', (req, res)=>{
    res.render('register');
});

router.post('/register', async (req,res)=> {
//validate
const {username, password, repeatPassword} = req.body;

if (password !== repeatPassword) {
    res.render('register', {message: 'Password missmatch'});
    return;
}
    
//ако е асинхронна ф-ия задължително трабва try/catch
    try {
        let user = await authService.register({username, password});

        res.redirect('/login');

    } catch (error) {
        res.render('register', {error});
    }
})

module.exports = router;