(function () {
    function Puzzle(data) {
        this.scale = data.scale || 3;
        this.container = data.container;
        this.space = null;
    }
    Puzzle.prototype = {
        init() {
            let { scale } = this;
            this.tiles = [];
            this.map = Array.from({ length: scale* scale }, (e, i) => i);
            this.val = this.map.toString();
            while (1) {
                this.shuffle(this.map);
                if (this.valid(this.map)) {
                    break;
                }
            }
            this.initDom();
            this.bindEvent();
            return this;
        },
        bindEvent() {
            let self = this;
            window.addEventListener('click', (e) => {
                let tag = e.target;
                if (tag !== self.space &&
                    tag.nodeName === 'LI' &&
                    tag.classList.contains('item')) {

                    if (tag.pos === self.space.pos + self.scale) {
                        self.moveUp();
                    } else if (tag.pos === self.space.pos - self.scale) {
                        self.moveDown();
                    } else if (tag.pos === self.space.pos - 1) {
                        self.moveRight();
                    } else if (tag.pos === self.space.pos + 1) {
                        self.moveLeft();
                    }
                    if (self.finished()) {
                        setTimeout(() => {
                            alert('ok');
                        }, 500);
                    }
                }
            })
            window.addEventListener('keyup', (e) => {
                let code = e.keyCode;
                switch (code) {
                    // left
                    case 37:
                        self.moveLeft();
                        break;
                    // up
                    case 38:
                        self.moveUp();
                        break;
                    // right
                    case 39:
                        self.moveRight();
                        break;
                    // down
                    case 40:
                        self.moveDown();
                        break;
                    default:
                        break;
                }
                if (self.finished()) {
                    setTimeout(() => {
                        alert('ok');
                    }, 500);
                }
            })
        },
        finished() {
            return this.map.toString() === this.val;
        },
        setOffset(node, pos) {
            let { scale, container } = this;
            let w = container.offsetWidth / scale;
            node.style.transform = `translate(${pos % scale * w}px, ${(pos / scale | 0) * w}px)`;
        },
        initDom() {
            let { map, scale, container } = this;
            let self = this;
            let f = document.createDocumentFragment();
            let w = container.offsetWidth / scale;
            map.forEach((e, i) => {
                let li = document.createElement('LI');
                li.classList.add('item');
                li.data = e;
                li.pos = i;
                li.style.width = `${w}px`;
                li.style.height = `${w}px`;
                li.innerHTML = e;
                self.setOffset(li, i);
                let dx = (-e % scale | 0) * w;
                let dy = (-e / scale | 0) * w;
                li.style.backgroundPosition = `${dx}px ${dy}px`;
                if (e === map.length - 1) {
                    li.style.backgroundImage = 'url()';
                    self.space = li;
                }
                self.tiles[e] = li;
                f.appendChild(li);
            })
            container.appendChild(f);
        },
        /**
         * @param {li node} tag 
         */
        exchange(tag) {
            this.setOffset(tag, this.space.pos);
            this.setOffset(this.space, tag.pos);
            this.setOffset(tag, this.space.pos);
            this.setOffset(this.space, tag.pos);
            [tag.pos, this.space.pos] = [this.space.pos, tag.pos];
            [this.map[tag.pos], this.map[this.space.pos]] = [this.map[this.space.pos], this.map[tag.pos]];
        },
        moveDown() {
            let { map, tiles, scale, space } = this;
            let pos = space.pos;
            if (pos - scale >= 0) {
                this.exchange(tiles[map[pos - scale]]);
            }
        },
        moveRight() {
            let { map, tiles, scale, space } = this;
            let pos = space.pos;
            if (pos % scale !== 0) {
                this.exchange(tiles[map[pos - 1]]);
            }
        },
        moveUp() {
            let { map, tiles, scale, space } = this;
            let len = scale* scale;
            let pos = space.pos;
            if (pos + scale < len) {
                this.exchange(tiles[map[pos + scale]]);
            }
        },
        moveLeft() {
            let { map, tiles, scale, space } = this;
            let pos = space.pos;
            if ((pos + 1) % scale !== 0) {
                this.exchange(tiles[map[pos + 1]]);
            }
        },
        shuffle(arr) {
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let m = Math.random() * (len - i) | 0;
                [arr[len - i - 1], arr[m]] = [arr[m], arr[len - i - 1]];
            }
            return arr;
        },
        valid(arr) {
            let count = 0;
            mergeSort(arr);
            return count % 2 === 0;
            function merge(left, right) {
                let tmp = [];
                while (left.length && right.length) {
                    if (left[0] > right[0]) {
                        tmp.push(left.shift());
                        count++;
                    } else {
                        tmp.push(right.shift());
                    }
                }
                return tmp.concat(left, right);
            }
            function mergeSort(arr) {
                let len = arr.length;
                if (len === 1) return arr;
                let mid = len / 2 | 0;
                let left = arr.slice(0, mid);
                let right = arr.slice(mid);
                return merge(mergeSort(left), mergeSort(right));
            }
        }
    }
    window.Puzzle = Puzzle;
}())