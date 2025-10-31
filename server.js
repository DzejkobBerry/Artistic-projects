const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
const PORT = process.env.PORT || 3000; // zmień z DEVIL_NODEJS_PORT na PORT

// Ustawienie silnika szablonów EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Włącz kompresję gzip dla wszystkich odpowiedzi
app.use(compression());

// Middleware dla plików statycznych z cache
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '7d',
    etag: true
}));

// Favicon routes (explicit to avoid 404s in some environments)
app.get('/favicon.svg', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favicon.svg'));
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Routing
app.get('/', (req, res) => {
    // CDN cache: ISR-like na Vercel dla statycznej strony głównej
    // converted from pure SSR render → CDN-cached HTML for better Fast Origin Transfer
    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.render('index', {
        title: 'Artistic Projects - Creativity without limits',
        currentPage: 'home'
    });
});

app.get('/about', (req, res) => {
    // CDN cache: treści informacyjne – bez danych użytkownika
    // converted from pure SSR render → CDN-cached HTML for better caching performance
    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.render('about', {
        title: 'About Us - Artistic Projects',
        currentPage: 'about'
    });
});

app.get('/services', (req, res) => {
    // CDN cache: strony usług są statyczne
    // converted from pure SSR render → CDN-cached HTML
    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.render('services', {
        title: 'Our Services - Artistic Projects',
        currentPage: 'services'
    });
});

app.get('/portfolio', (req, res) => {
    // CDN cache: HTML w portfolio jest statyczny, obrazy ładowane z CDN
    // converted from pure SSR render → CDN-cached HTML
    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.render('portfolio', {
        title: 'Our Portfolio - Artistic Projects',
        currentPage: 'portfolio'
    });
});

app.get('/cooperation', (req, res) => {
    // CDN cache: strona współpracy – statyczna
    // converted from pure SSR render → CDN-cached HTML
    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
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

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server uruchomiony: http://localhost:${PORT}`);
});

// Export dla Vercel
module.exports = app;