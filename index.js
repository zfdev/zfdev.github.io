const qs = function(selector) {
    return document.querySelector(selector);
}
const body = qs('body');
const footer = qs('footer');
const content = qs('.main-content');

const hide = function() {
    document.documentElement.style.overflowY = 'hidden';
    body.style.overflowY = 'hidden';
    content.style.filter = 'blur(6px)';
    footer.hidden = true;
    body.style.height = '100%';
}

const show = function() {
    document.documentElement.style.overflowY = 'auto';
    body.style.overflowY = 'auto';
    content.style.filter = 'blur(0px)';
    footer.hidden = false;
    body.style.height = 'auto';
}

hide();

class Dialog {
    constructor(config = {}) {
        this.config = config;
        this.init();
    }
    init() {
        this.render();
    }
    template() {
        return `
            <div class="dialog-container">
                <div class="mask"></div>
                <div class="content">
                    <h3>Please enter the password:</h3>
                    <input type="text" placeholder="password">
                    <button>Enter</button>
                </div>
            </div>
        `;
    }
    render() {
        body.insertAdjacentHTML('beforeend', this.template());
        this.container = qs('.dialog-container');
        this.content = qs('.dialog-container .content');
        this.content.style.width = this.config.width + 'px';
        // this.content.style.height = this.config.height + 'px';
    }
    show() {

    }
    hide() {

    }
}

const dialog = new Dialog({
    width: 240,
    // height: 80,
});