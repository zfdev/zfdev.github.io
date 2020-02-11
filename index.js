const qs = function(selector) {
    return document.querySelector(selector);
}
const body = qs('body');
const footer = qs('footer');
const content = qs('.main-content');


class Page {
    hide() {
        document.documentElement.style.overflowY = 'hidden';
        body.style.overflowY = 'hidden';
        content.style.filter = 'blur(6px)';
        footer.hidden = true;
        body.style.height = '100%';
    }
    show() {
        document.documentElement.style.overflowY = 'auto';
        body.style.overflowY = 'auto';
        content.style.filter = 'blur(0px)';
        footer.hidden = false;
        body.style.height = 'auto';
    }

}

const page = new Page();

page.hide();

class Dialog {
    constructor(config = {}) {
        this.config = config;
        this.check = this.check.bind(this);
        this.init();
    }
    init() {
        this.render();
        this.bindEvent();
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
    check() {
        if (this.input.value === 'jason') {
            this.hide();
        }
    }
    render() {
        body.insertAdjacentHTML('beforeend', this.template());
        this.container = qs('.dialog-container');
        this.content = qs('.dialog-container .content');
        this.button = qs('.dialog-container .content button');
        this.input = qs('.dialog-container .content input');

        this.content.style.width = this.config.width + 'px';
        // this.content.style.height = this.config.height + 'px';
    }
    bindEvent() {
        this.button.addEventListener('click', this.check);
    }
    show() {

    }
    hide() {
        this.container.hidden = true;
        page.show();
    }
}

const dialog = new Dialog({
    width: 240,
    // height: 80,
});