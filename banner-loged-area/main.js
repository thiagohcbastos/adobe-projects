var checkLink = setInterval(() => {
    var bannerEstudantes = document.querySelector('[data-testid="banner-slide-imagem-banner-1787334784368-8e187a38d1d7"]')
    var linkBannerEstudantes = document.querySelector('[data-testid="banner-slide-link-banner-1787334784368-8e187a38d1d7"]')

    console.log('checking banner...')
    if (linkBannerEstudantes) {
        clearInterval(checkLink)
        linkBannerEstudantes.href = ''
        bannerEstudantes.src = ''

        linkBannerEstudantes.addEventListener('click', () => {
            //Dipach Event to DataLayer
            document.dispatchEvent(
                new CustomEvent("ClickBannerAT", {
                    "detail": document.DataLayer
                })
            );
        })
    }
}, 500)