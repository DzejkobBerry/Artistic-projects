const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // zmień z DEVIL_NODEJS_PORT na PORT

// Ustawienie silnika szablonów EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware dla plików statycznych
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Artistic Projects - Creativity without limits',
        currentPage: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us - Artistic Projects',
        currentPage: 'about'
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        title: 'Our Services - Artistic Projects',
        currentPage: 'services'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio', {
        title: 'Our Portfolio - Artistic Projects',
        currentPage: 'portfolio'
    });
});

app.get('/process', (req, res) => {
    res.render('process', {
        title: 'Our Process - Artistic Projects',
        currentPage: 'process'
    });
});

// Remove this entire block:
// app.get('/contact', (req, res) => {
//     res.render('contact', {
//         title: 'Contact Us - Artistic Projects',
//         currentPage: 'contact'
//     });
// });

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server działa na porcie ${PORT}`);
});