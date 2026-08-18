


//javascript
(function() {
  // 1. Configuração: defina a data/hora exata do término da oferta
  // Formato: Ano, Mês (0 = Jan, 11 = Dez), Dia, Hora, Minuto, Segundo
  const DATA_FINAL = new Date(2026, 7, 20, 23, 59, 59).getTime();

  // 2. Criação do elemento visual da contagem na página
  const container = document.createElement('div');
  container.id = 'ab-countdown';

  let card_course = document.querySelector('[data-testid="course-header-card"]')
  let style_countdown = document.createElement('style')
  let countdown_div = document.createElement('div')
  countdown_div.id = 'countdown-card'

  style_countdown.innerHTML = `
    #countdown-card{
        background-color: #46C8C8;
        padding: 10px 10px;
        border-radius: 1rem 1rem 0 0;
        display: flex;
        align-items: center;
    }

    #countdown-icon{
        margin-right: 10px;
    }

    .countdown-text{
        font-size: 16px;
        font-weight: 500;
        margin: 0;
        margin-bottom: 5px;
    }

    .countdown-text .bold-text__span{
        font-weight: 700;
        text-transform: uppercase;
    }

    .countdown__p{
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
    }

    #countdown-numbers #ab-countdown{
        background-color: #D0F1F1;
        padding: 5px;
        border-radius: 8px;
        font-weight: 700;
        margin-right: 7px;
    }

    @media (max-width: 768px){
    .countdown-text{
        font-size: 14px;
    }
    .countdown__p{
        font-size: 14px;
    }
}
  `

  document.head.appendChild(style_countdown)

  countdown_div.innerHTML = `
    <div id="countdown-icon">
        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.32 19.98C11.74 19.98 11.16 19.76 10.72 19.32L4.24 12.85C4.1 12.71 4.02 12.52 4.02 12.32V4.77002C4.02 4.36002 4.36 4.02002 4.77 4.02002H12.31C12.51 4.02002 12.7 4.10002 12.84 4.24002L19.32 10.72C20.19 11.6 20.19 13.03 19.32 13.91L13.91 19.32C13.47 19.76 12.89 19.98 12.31 19.98H12.32ZM5.52 12.01L11.78 18.26C12.08 18.55 12.56 18.55 12.85 18.26L18.26 12.85C18.55 12.56 18.55 12.08 18.26 11.78L12 5.52002H5.52V12V12.01ZM8.5 9.75002C7.81 9.75002 7.25 9.19002 7.25 8.50002C7.25 7.81002 7.81 7.25002 8.5 7.25002C9.19 7.25002 9.75 7.81002 9.75 8.50002C9.75 9.19002 9.19 9.75002 8.5 9.75002Z" fill="#000000"></path> </g></svg>
    </div>
    <div id="countdown-content">
        <div id="container-countdown-content">
            <p class="countdown-text">Oferta <span class="bold-text__span">Formatura</span> termina em:</p>
            <p class="countdown__p"><span id="countdown-numbers"></span> Aproveite!</p>
        </div>
    </div>
  `

  card_course.parentNode.style.backgroundColor = '#ffffff'
  card_course.parentNode.style.borderRadius = '1rem'
  
  card_course.parentNode.insertBefore(countdown_div, card_course)
  // Insira o elemento onde desejar na landing page (exemplo: topo do body)
  document.querySelector('[id="countdown-numbers"]').appendChild(container);

  // 3. Função de atualização contínua
  function atualizarContador() {
    const agora = Date.now();
    const diferenca = DATA_FINAL - agora;

    // Se o tempo expirou
    if (diferenca <= 0) {
      container.innerHTML = "Oferta Encerrada!";
      clearInterval(intervalo);
      return;
    }

    // Cálculos de conversão do tempo restante
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Formatação com zero à esquerda quando necessário
    const hFormat = String(horas).padStart(2, '0');
    const mFormat = String(minutos).padStart(2, '0');
    const sFormat = String(segundos).padStart(2, '0');
    const dFormat = String(dias).padStart(2, '0');

    // Exibição amigável
    const textoDias = dias > 0 ? `${dFormat}d ` : '';
    container.innerHTML = `${textoDias} : ${hFormat}h : ${mFormat}m : ${sFormat}s`;
  }

  // Executa imediatamente para não haver delay visual e atualiza a cada 1 segundo
  atualizarContador();
  const intervalo = setInterval(atualizarContador, 1000);
})();