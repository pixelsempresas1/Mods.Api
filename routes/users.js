const express = require('express');
const router = express.Router();
const passport = require('passport');
const { recaptcha_key_1, recaptcha_key_2 } = require('../lib/settings');

const Recaptcha = require('express-recaptcha').RecaptchaV2;

const recaptcha = new Recaptcha(recaptcha_key_1, recaptcha_key_2);

const { getHashedPassword, randomText } = require('../lib/function');
const { checkUsername, addUser } = require('../database/db');
const { notAuthenticated, captchaRegister, captchaLogin } = require('../lib/auth');

router.get('/', notAuthenticated, (req, res) => {
    addVisitor()
    res.render('login2', {
        layout: 'login2'
    });
});

router.get('/entrar', notAuthenticated, recaptcha.middleware.render, (req, res) => {
    res.render('login2', {
    recaptcha: res.recaptcha,
        layout: 'login2'
    });
});

router.post('/entrar', recaptcha.middleware.verify, captchaLogin, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/docs',
        failureRedirect: '/usuario/entrar',
        failureFlash: true,
    })(req, res, next);
});

router.get('/registrar', notAuthenticated, recaptcha.middleware.render, (req, res) => {
    res.render('register', {        
    recaptcha: res.recaptcha,
        layout: 'layouts/main'  
    });
});


router.post('/registrar', recaptcha.middleware.verify, captchaRegister, async (req, res) => {
    try {
        let {username, password, confirmPassword } = req.body;
        if (password.length < 6 || confirmPassword < 6) {
            req.flash('error_msg', 'A senha deve ter pelo menos 6 caracteres');
            res.redirect('/usuario/registrar');
        }
        if (password === confirmPassword) {
            let checking = await checkUsername(username);
            if(checking) {
                req.flash('error_msg', 'Já existe um usuário com o mesmo nome que você colocou');
                res.redirect('/usuario/registrar');
            } else {
                let hashedPassword = getHashedPassword(password);
                let apikey = randomText(8);
                addUser(username, hashedPassword, apikey);
                req.flash('success_msg', 'Agora você está registrado e pode fazer o login');
                res.redirect('/usuario/entrar');
            }
        } else {
            req.flash('error_msg', 'Senha não corresponde.');
            res.redirect('/usuario/registrar');
        }
    } catch(err) {
        console.log(err);
    }
})

router.get('/sair', (req,res) => {
    req.logout();
    res.redirect('/usuario/entrar');
});

module.exports = router;
