export class Component {
    constructor() {
      this.props = Object.create(null);
      this.children = [];
      this.state = null;
    }
    get type() {
      return this.constructor.name;
    }
    get vdom() {
      return this.render().vdom;
    }
    setAttribute(name, value) {
      this.props[name] = value;
    }
    mountTo(range) {
      this.range = range;
      this.update();
    }
    update() {
      const vdom = this.vdom;
  
      if (this.oldVdom) {
        const isSameNode = (node1, node2) => {
          if (node1.type !== node2.type) {
            return false;
          }
          if (Object.keys(node1.props).length !== Object.keys(node2.props).length) {
            return false;
          }
          for (let name in node1.props) {
            const p1 = node1.props[name];
            const p2 = node2.props[name];
            // if (typeof p1 === 'function' && typeof p2 === 'function' && p1.toString() === p2.toString()) {
            //   continue;
            // }
            if (typeof p1 === 'object' && typeof p2 === 'object' && JSON.stringify(p1) === JSON.stringify(p2)) {
              continue;
            }
            if (p1 !== p2) {
              return false;
            }
          }
          return true;
        };
  
        const isSameTree = (node1, node2) => {
          if (!isSameNode(node1, node2)) {
            return false;
          }
          if (node1.children.length !== node2.children.length) {
            return false;
          }
          for (let i = 0; i < node1.children.length; i++) {
            if (!isSameTree(node1.children[i], node2.children[i])) {
              return false;
            }
          }
          return true;
        };
  
        const replace = (newTree, oldTree) => {
          if (isSameTree(newTree, oldTree)) {
            return false; 
          }
          if (!isSameNode(newTree, oldTree)) {
            newTree.mountTo(oldTree.range);
            return;
          }
          for (let i = 0; i < newTree.children.length; i++) {
            if (i < oldTree.children.length) {
              replace(newTree.children[i], oldTree.children[i]);
            } else {
              // const range = document.createRange();
              // if (oldTree.children.length) {
              //   range.setStartAfter(element.lastChild);
              //   range.setEndAfter(element.lastChild);
              // newTree.mountTo()
            }
          }
        };
  
        if (replace(vdom, this.oldVdom) === false) {
          return;
        }
      } else {
        vdom.mountTo(this.range);
      }
  
      this.oldVdom = vdom;
    }
    appendChild(vchild) {
      this.children.push(vchild);
    }
    setState(state) {
      const merge = (oldState, newState) => {
        for (let p in newState) {
          if (typeof newState[p] === 'object' && newState[p] !== null) {
            if (Array.isArray(newState[p])) {
              oldState[p] = [];
            }
            else if (typeof oldState[p] !== 'object') {
              oldState[p] = {};
            }
            merge(oldState[p], newState[p]);
          } else {
            oldState[p] = newState[p];
          }
        }
      };
      if (!this.state && state) {
        this.state = {};
      }
      merge(this.state, state);
      this.update();
    }
  }
  
  class ElementWrapper {
    constructor(type) {
      this.type = type;
      this.props = Object.create(null);
      this.children = [];
    }
    get vdom() {
      return this;
    }
    setAttribute(name, value) {
      this.props[name] = value;
    }
    appendChild(vchild) {
      this.children.push(vchild.vdom);
    }
    mountTo(range) {
      this.range = range;
  
      const placeholder = document.createComment('placeholder');
      const endRange = document.createRange();
      endRange.setStart(range.endContainer, range.endOffset);
      endRange.setEnd(range.endContainer, range.endOffset);
      endRange.insertNode(placeholder);
  
      range.deleteContents();
  
      const element = document.createElement(this.type);
  
      for (let name in this.props) {
        const value = this.props[name];
        if (name.match(/^on([\S]+)$/)) {
          const eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase());
          element.addEventListener(eventName, value);
        } else if (name === 'className') {
          element.setAttribute('class', value);
        } else {
          element.setAttribute(name, value);
        }
      }
  
      for (let child of this.children) {
        const range = document.createRange();
        if (element.children.length) {
          range.setStartAfter(element.lastChild);
          range.setEndAfter(element.lastChild);
        } else {
          range.setStart(element, 0);
          range.setEnd(element, 0);
        }
        child.mountTo(range);
      }
  
      range.insertNode(element);
    }
  }
  
  class TextWrapper {
    constructor(content) {
      this.root = document.createTextNode(content);
      this.type = '#text';
      this.props = Object.create({ content });
      this.children = [];
    }
    get vdom() {
      return this;
    }
    mountTo(range) {
      this.range = range;
  
      range.deleteContents();
      range.insertNode(this.root);
    }
  }
  
  export const ToyReact = {
    createElement(type, attributes, ...children) {
      let element;
      if (typeof type === 'string') {
        element = new ElementWrapper(type);
      } else {
        element = new type();
      }
      for (let name in attributes) {
        element.setAttribute(name, attributes[name]);
      }
  
      const insertChildren = (children) => {
        for (let child of children) {
          if (Array.isArray(child)) {
            insertChildren(child);
          } else {
            if (!(child instanceof Component ||
                  child instanceof ElementWrapper ||
                  child instanceof TextWrapper)) {
              child = String(child);
            }
            if (typeof child === 'string') {
              child = new TextWrapper(child);
            }
            element.appendChild(child);
          }
        }
      };
  
      insertChildren(children);
  
      return element;
    },
    render(vdom, element) {
      const range = document.createRange();
      if (element.children.length) {
        range.setStartAfter(element.lastChild);
        range.setEndAfter(element.lastChild);
      } else {
        range.setStart(element, 0);
        range.setEnd(element, 0);
      }
      vdom.mountTo(range);
    }
  }
  
  export default ToyReact;