export function renderIndex(req, res) {
    res.redirect('/staff');
}

export function renderCarnet(req, res) {
    res.render('carnet');
}

export function renderTemplate(req, res) {
    res.render('template');
}