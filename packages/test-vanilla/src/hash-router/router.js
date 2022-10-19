class Router {
    routers = []
    add(path, render) {
        this.routers.push({
            path,
            render,
        })
    }
    listen(callback) {
        window.addEventListener('hashchange', () => {
            this.handle(callback)
        })
        this.handle(callback)
    }
    handle(callback) {
        const hash = (location.hash || '/').replace(/^#\/?/, '/')
        for (const router of this.routers) {
            if (router.path === hash) {
                callback(router.render())
                return 
            }
        }
    }
    navigate(path) {
        location.hash = path
    }
}