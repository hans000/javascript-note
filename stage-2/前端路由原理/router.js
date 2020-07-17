(function(window) {
    function router(config = {}) {
       init(config)
    }
    function init(config) {
        initEvent(config)
    }
    function initEvent(config) {
        if (config.mode === 'history') {
            window.addEventListener('popstate', () => {

            })
            window.addEventListener('pushstate', () => {

            })
            window.addEventListener('popstate', () => {
                
            })
        } else {
            window.addEventListener('hashchange', () => {
                console.log(location.hash);
            })
            window.addEventListener('load', () => {
                console.log(location.hash);
            }) 
        }
    }



    window.Router = router
})(window)