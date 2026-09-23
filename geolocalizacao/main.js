//=========Ceará Code=======================
(function () {
    //======Campus Ceará================
    const arr_unidades_ceara = 
    [{
        'unidade':'Canindé',
        'campusLat': -4.363848296062462,
        'campusLong': -39.302578985406505,
        'link_cta': '',
        'main_text': 'Medicina com infra de ponta e nota máxima em Canindé',
        'description': 'Medicina com infra de ponta e nota máxima em Canindé.'
    },{
        'unidade':'Iguatu',
        'campusLat': -6.407950650419954,
        'campusLong': -39.34028954525934,
        'link_cta': '',
        'main_text': 'Formação médica com parcerias internacionais em Iguatu',
        'description': 'Convênio com a *IFMSA para oportunidade de intercâmbio médico.'
    },{
        'unidade':'Quixadá',
        'campusLat': -4.945212118780749,
        'campusLong': -38.99425185902265,
        'link_cta': '',
        'main_text': 'Medicina nota máxima em Quixadá',
        'description': 'Curso nota 5 no MEC, com prática desde o 1º período e tecnologia de ponta.'
    },
    // {
    //     'unidade':'fametro',
    //     'campusLat': -4.363884773686755,
    //     'campusLong': -39.30278253653176
    // },
    {
        'unidade':'Juazeiro do Norte',
        'campusLat': -7.248135166642439,
        'campusLong': -39.30393302022912,
        'link_cta': '',
        'main_text': '+25 anos formando médicos em Juazeiro do Norte',
        'description': 'Prática desde o 1º período em laboratórios de anatomia com realidade virtual.'
    }
    ]

    //====Calcula Distancia==========
    function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
        const R = 6371;

        const toRad = (graus) => graus * Math.PI / 180;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

        return R * c;
    }

    function filtrarUnidadeMaisProxima(arr_distancia){
        
        let unidade_mais_proxima = arr_distancia.reduce((menor, atual) => atual.distancia < menor.distancia ? atual : menor);

        return unidade_mais_proxima
    }

    function personalizarCampus(campus){
        let main_text = document.querySelector('[data-testid="title"] h1')
        main_text.innerText = campus.main_text

        let description = document.querySelector('[data-testid="description"]')
        description.innerText = campus.description

        let buttonBanner = document.querySelector('[data-testid="banner-button"]')
        let newButton = buttonBanner.cloneNode(true)
        newButton.innerText = 'Conhecer a unidade'
        newButton.href = campus.link_cta
        buttonBanner.parentNode.replaceChild(newButton, buttonBanner);
    }

    //======Captura Localização do usuário=========
    navigator.geolocation.getCurrentPosition(
    function(position) {
        console.log(
        "Geolocation API" +
        "\nLatitude: " + position.coords.latitude +
        "\nLongitude: " + position.coords.longitude +
        "\nPrecisão: " + position.coords.accuracy + " metros"
        );

        // let distancia = calcularDistanciaKm(position.coords.latitude, position.coords.longitude, campusLat, campusLon)
        let arr_distancia = arr_unidades_ceara.map((unidade) => {
            let distancia = calcularDistanciaKm(position.coords.latitude, position.coords.longitude, unidade.campusLat, unidade.campusLong)
            let unidade_e_distancia = {
                'campus': unidade.unidade,
                'distancia': Number(distancia.toFixed(2)),
                'link_cta' : unidade.link_cta,
                'main_text': unidade.main_text,
                'description': unidade.description
            }

            return unidade_e_distancia
        })

        console.log(arr_distancia)
        let unidade_mais_proxima = filtrarUnidadeMaisProxima(arr_distancia)

        console.log('unidade mais proxima: ', unidade_mais_proxima)

        if(unidade_mais_proxima.distancia){
            personalizarCampus(unidade_mais_proxima)
        }else{
            console.log('as unidades estão a mais de 40km')
        }
    },
    function(error) {
        const userLat = Number("${profile.geolocation.latitude}");
        const userLon = Number("${profile.geolocation.longitude}");

        console.log('Lat: ', userLat, '\nLong:', userLon)

        // let distancia = calcularDistanciaKm(userLat, userLon, campusLat, campusLon)
        // console.log("Distancia: ", distancia, "km\n", "Dentro de 40 km: " + (distancia <= 40 ? "SIM" : "NÃO"))
        let arr_distancia = arr_unidades_ceara.map((unidade) => {
            let distancia = calcularDistanciaKm(userLat, userLon, unidade.campusLat, unidade.campusLong)
            let unidade_e_distancia = {
                'campus': unidade.unidade,
                'distancia': Number(distancia.toFixed(2)),
                'link_cta' : unidade.link_cta,
                'main_text': unidade.main_text,
                'description': unidade.description
            }

            return unidade_e_distancia
        })

        console.log(arr_distancia)
        let unidade_mais_proxima = filtrarUnidadeMaisProxima(arr_distancia)

        console.log('unidade mais proxima: ', unidade_mais_proxima)

        if(unidade_mais_proxima.distancia){
            personalizarCampus(unidade_mais_proxima)
        }else{
            console.log('as unidades estão a mais de 40km')
        }
    }
    );
})();