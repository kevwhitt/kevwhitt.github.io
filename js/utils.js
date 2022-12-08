export function renderWithTemplate(parent, template, data, callback) {
    const clone = template.content.cloneNode(true);
    if (callback) {
        clone = callback(clone, data);
    }
    parent.appendChild(clone);
}

function convertToText(res) {
    if (res.ok) {
        return res.text();
    } else {
        throw new Error('No path');
    }
}

export async function loadTemplate(path) {
    const html = await fetch(path).then(convertToText);
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
}

export async function loadHeaderFooter() {
    const header = await loadTemplate('../partials/header.html');
    const footer = await loadTemplate('../partials/footer.html');
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    renderWithTemplate(headerElement, header);
    renderWithTemplate(footerElement, footer);
}