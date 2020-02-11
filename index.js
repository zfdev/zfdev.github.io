const qs = function(selector) {
    return document.querySelector(selector);
}
const body = qs('body');
body.style.filter = 'blur(6px)';