(function () {
    function ColorPicker(el) {
        this.el = el;
    }
    ColorPicker.NUM_255 = 255;
    ColorPicker.NUM_0 = 0;
    ColorPicker.WIDTH = 200;
    ColorPicker.HEIGHT = 160;
    ColorPicker.unit = ColorPicker.WIDTH / 6;
    ColorPicker.matrix = [
        [255,   0,   0,  0,  1,  0],
        [255, 255,   0, -1,  0,  0],
        [  0, 255,   0,  0,  0,  1],
        [  0, 255, 255,  0, -1,  0],
        [  0,   0, 255,  1,  0,  0],
        [255,   0, 255,  0,  0, -1]
    ]
    ColorPicker.prototype = {
        init() {
            this.refs = {};
            this.createDom();
            this.initParams();
            this.bindEvent();
        },
        createDom() {
            let arr = [[ 'div', {class:'panel', ref: 'panel'}, [
                    ['div', {class:'hue'}, [
                        ['div', {class:'saturation mask', ref:'saturation'}, [
                            ['div', {class:'white mask'}, []],
                            ['div', {class:'black mask'}, []],
                            ['div', {class:'pointer', ref:'pointer'}, [
                                ['div', {}, []]
                            ]],
                        ]]
                    ]],
                    ['div', {class:'slider'}, [
                        ['div', {class:'bar'}, [
                            ['div', {class:'mark', ref:'mark'}, [
                                ['div', {class:'scale'}, []]
                            ]]
                        ]]
                    ]],
                    ['div', {class:'info',ref:'info'}, []]
                ]
            ]]
            this.dom = this.vnode2Dom(arr);

            window.dom = this.refs;
            this.el.appendChild(this.dom);
        },
        vnode2Dom(arr, node) {
            if (!node) {
                node = document.createDocumentFragment();
            }
            arr.forEach(elt => {
                let [el, attr, cont] = elt;
                let obj = document.createElement(el);
                Object.entries(attr).forEach(el => {
                    let [name, val] = el;
                    if (name === 'ref') {
                        this.refs[val] = obj;
                    } else {
                        obj.setAttribute(name, val);
                    }

                })
                if (typeof cont === 'undefined' || typeof cont === 'string') {
                    obj.innerHTML = cont || '';
                } else if (Array.isArray(cont)) {
                    if (cont.length) {
                        this.vnode2Dom(cont, obj)
                    }
                }
                node.appendChild(obj)
            })
            return node
        },
        initParams() {
            this.isSlider = false;
            this.isHue = false;
            this.pointerX = 0;
            this.pointerY = 0;
            this.markX = 0;
            this.hueVal = [255, 0, 0];   
            this.startTop = this.refs.saturation.getBoundingClientRect().top
            this.startLeft = this.refs.saturation.getBoundingClientRect().left                
        },
        bindEvent() {
            let self = this;
            this.refs.panel.addEventListener('mousedown', e => {
                let { clientX, clientY, target }  = e;
                if (target.classList.contains('bar')
                    || target.classList.contains('scale')
                    || target.classList.contains('mark')) {
                        self.isSlider = true;
                        self.updateMark(clientX - self.startLeft);
                        self.updateHue(self.pointerX, self.pointerY);
                        return;
                    }
                if (target.classList.contains('Hue')
                    || target.classList.contains('mask')) {
                        self.isHue = true;
                        self.updateHue(clientX - self.startLeft, clientY - self.startTop);
                    }
            })
            window.addEventListener('mouseup', e => {
                self.isSlider = false;
                self.isHue = false;
            })
            window.addEventListener('mousemove', e => {
                let { clientX, clientY } = e;
                if (self.isHue) {
                    self.pointerX = clientX - self.startLeft;
                    self.pointerY = clientY - self.startTop;
                    self.updateHue(self.pointerX, self.pointerY);
                }
                if (self.isSlider) {
                    self.markX = clientX - self.startLeft;
                    self.updateHue(self.pointerX, self.pointerY);
                    self.updateMark(self.markX);
                }
            })
        },
        getDiff(val, ox, oy) {
            const WIDTH = ColorPicker.WIDTH - 1;
            const HEIGHT = ColorPicker.HEIGHT - 1;
            let A = ColorPicker.NUM_255 + (ox / (WIDTH)) * (val - ColorPicker.NUM_255);
            let B = A + oy / (HEIGHT) * (ColorPicker.NUM_0 - A) | 0;
            return B;
        },
        updateHue(cx, cy) {
            const WIDTH = ColorPicker.WIDTH - 1;
            const HEIGHT = ColorPicker.HEIGHT - 1;
            let X = Math.max(0, Math.min(WIDTH, cx));
            let Y = Math.max(0, Math.min(HEIGHT, cy));
            this.refs.pointer.style.left = X + 'px';
            this.refs.pointer.style.top = Y + 'px';
            let r = this.getDiff(this.hueVal[0], X, Y);
            let g = this.getDiff(this.hueVal[1], X, Y);
            let b = this.getDiff(this.hueVal[2], X, Y);
            this.refs.info.innerHTML = `rgb(${r} ${g} ${b})`
        },
        updateMark(cx) {
            const WIDTH = ColorPicker.WIDTH - 1;
            const unit = ColorPicker.unit;
            let X = Math.max(0, Math.min(WIDTH, cx));
            this.refs.mark.style.left = X + 'px';
            let lvl = X / unit | 0;
            let offset = X % unit;
            let s = ColorPicker.matrix[lvl];
            let t = offset / unit * 255;
            let r = s[0] + s[3] * t | 0;
            let g = s[1] + s[4] * t | 0;
            let b = s[2] + s[5] * t | 0;
            this.refs.saturation.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            this.hueVal = [r, g, b];
        }
    }
    window.ColorPicker = ColorPicker;
}())