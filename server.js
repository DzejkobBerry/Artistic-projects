const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
const PORT = process.env.PORT || 3000; // zmień z DEVIL_NODEJS_PORT na PORT

// Middleware kompresji - musi być przed innymi middleware
app.use(compression({
    level: 6, // Poziom kompresji (1-9, 6 to dobry balans)
    threshold: 1024, // Kompresuj tylko pliki większe niż 1KB
    filter: (req, res) => {
        // Kompresuj wszystko oprócz już skompresowanych formatów
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// Ustawienie silnika szablonów EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware dla plików statycznych z cache headers
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1y', // Cache na rok dla plików statycznych
    etag: true,
    lastModified: true
}));

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

app.get('/cooperation', (req, res) => {
    res.render('cooperation', {
        title: 'Cooperation - Artistic Projects',
        currentPage: 'cooperation'
    });
});

// Redirect do poczty
app.get('/poczta', (req, res) => {
    res.redirect('https://zimbra1.mail.ovh.net');
});

// Usuń lub zakomentuj ten blok:
// app.get('/process', (req, res) => {
//     res.render('process', {
//         title: 'Our Process - Artistic Projects',
//         currentPage: 'process'
//     });
// });

// Remove this entire block:
// app.get('/contact', (req, res) => {
//     res.render('contact', {
//         title: 'Contact Us - Artistic Projects',
//         currentPage: 'contact'
//     });
// });

// Uruchomienie serwera (tylko lokalnie, nie na Vercel)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server działa na porcie ${PORT}`);
    });
}

// Export dla Vercel
module.exports = app;