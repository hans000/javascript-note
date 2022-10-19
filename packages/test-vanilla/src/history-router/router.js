class Router {
    routers = []
    add(path, render) {
        this.routers.push({
            path,
            render,
        })
    }
    listen(callback) {
        this.callback = callback
        window.addEventListener('popstate', () => {
            this.handle()
        })
        this.handle()
    }
    handle() {
        const path = (location.pathname || '/')
        for (const router of this.routers) {
            if (router.path === path) {
                this.callback(router.render())
                return 
            }
        }
    }
    navigate(path, options = {
        state: undefined,
        replace: false
    }) {
        if (options.replace) {
            history.replaceState(options.state, '', path)
        } else {
            history.pushState(options.state, '', path)
        }
        this.handle()
    }
}