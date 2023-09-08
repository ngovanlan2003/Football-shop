

export const initFackBookSdk = () => {
    
    if(window.FB) {
        window.FB.XFBML.parse()
    }
    let locale = 'vi_VN'
    window.fbAsyncInit = () => {
        window.FB.init({
            appId: '1815462702244108',
            cookie: true,
            xfbml: true,
            version: 'v2.9'
        })
    }
    (function(d, s, id) {
        console.log(s);
        var js,
        fjs = d.getElementsByTagName(s)[0]
        if(d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = `//connect.facebook.net/${locale}/sdk.js`
        fjs.parentNode.insertBefore(js, fjs)
    })(document, "script", "facebook-jssdk")
}