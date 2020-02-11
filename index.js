const qs = function(selector) {
    return document.querySelector(selector);
}
const body = qs('body');
const footer = qs('footer');
const content = qs('.main-content');
const PASSWORD_BASE = 'jasonSurvival';

const checkPassRecord = function() {
    return localStorage.getItem('isPass');
}

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
const today = new Date();
const dynamicPassword = function() {
    const month = (today.getMonth() + 1) > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
    const date = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
    return PASSWORD_BASE + month + date;
}

class Dialog {
    constructor(config = {}) {
        this.config = config;
        this.check = this.check.bind(this);
        this.clear = this.clear.bind(this);
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
                    <div class="message"></div>
                </div>
            </div>
        `;
    }
    check() {
        if (this.input.value && (this.input.value.trim() === dynamicPassword())) {
            this.hide();
            localStorage.setItem('isPass', true);
        } else {
            this.message.textContent = 'The password is incorrect!';
        }
    }
    clear() {
        this.message.textContent = '';
    }
    render() {
        body.insertAdjacentHTML('beforeend', this.template());
        this.container = qs('.dialog-container');
        this.content = qs('.dialog-container .content');
        this.button = qs('.dialog-container .content button');
        this.input = qs('.dialog-container .content input');
        this.message = qs('.dialog-container .content .message');

        this.content.style.width = this.config.width + 'px';
        this.content.style.height = this.config.height + 'px';
    }
    bindEvent() {
        this.button.addEventListener('click', this.check);
        this.input.addEventListener('focus', this.clear);
    }
    show() {

    }
    hide() {
        this.container.hidden = true;
        page.show();
    }
}

if (!checkPassRecord()) {
    page.hide();
    const dialog = new Dialog({
        width: 240,
        height: 80,
    });
}