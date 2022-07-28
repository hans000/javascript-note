class Stage {
  constructor() {
    this.manager = []
    this.init()
  }
  init() {
    this.keydowns = {}
    this.actions = {}
    this.work = true
    this.registAction(' ', this.pause.bind(this))
    this.bindEvent()
    this.update()
  }
  pause() {
    this.work = !this.work
  }
  /**
   * @param {Scene} 添加场景
   */
  add(scene) {
    scene.action = false
    this.manager.push(scene)
  }
  /**
   * @param {Scene} scene 冻结场景
   */
  static freeze(scene) {
    scene.action = false
  }
  /**
   * @param {Scene} scene 解冻场景
   */
  static unfreeze(scene) {
    scene.init()
    scene.action = true
  }
  /**
   * @param {Scene} scene 移出场景
   */
  remove(scene) {
    for (let i = 0; i < this.manager.length; i++) {
      if (scene === this.manager[i]) {
        this.splice(i, 1)
        return
      }
    }
  }
  registAction(key, callback) {
    this.actions[key] = callback;
  }
  bindEvent() {
    window.addEventListener('keyup', ev => {
      this.actions[ev.key] && this.actions[ev.key]();
    })
  }
  /**
   * 更新场景
   */
  update() {
    if (this.work) {
      this.manager.forEach(e => e.action && e.update())
    }
    requestAnimationFrame(this.update.bind(this))
  }
}