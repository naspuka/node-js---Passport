const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bycrypt = require('bcryptjs');

// Login Page
router.get('/login', (req, res) =>{
    res.render('login');
});

// Register Page
router.get('/register', (req, res) =>{
    res.render('register');
});

// Register handler
router.post('/register', (req, res) =>{
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // check required fields
    if(!name || !email || !password || !password2){
        errors.push({ message: 'Please fill in all fields' });
    }
    // check password match
    if(password !== password2){
        errors.push({ message: 'Password do not match' });
    }
    // check password lenght
    if(password.length < 6 ){
        errors.push({ message: 'Password should be at least 6 characters long' });
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation of data
        User.findOne({ email })
        .then(user =>{
            if(user){
                console.log('user found: ', user)
                errors.push({ message: 'Email is already registered' })
                return res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                newUser.save()
                .then( user =>{
                    console.log('saved the user', user);
                res.sendStatus(201);
                }).catch( err => console.log(err));
            }
        });
    }
})

module.exports = router;