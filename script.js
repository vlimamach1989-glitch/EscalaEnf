document.addEventListener('DOMContentLoaded', () => {
  // Alternar visibilidade da senha
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      
      // Altera o tipo de input
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      
      // Alterna o ícone
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  }

  // Prevenção de envio do formulário para demonstração
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      alert(`Tentando realizar login com o usuário: ${username}`);
    });
  }
});



//Gerencia
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza a data/hora
    const dateElement = document.getElementById('hslDateTime');
    if (dateElement) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('pt-BR', options);
    }

    // Controle do Menu Mobile (Hamburguer)
    const hamburger = document.getElementById('hslHamburger');
    const sidebar = document.getElementById('hslSidebar');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('hsl-show-menu');
        });
    }

    // Troca dinâmica de conteúdo das abas ao clicar no menu
    const menuItems = document.querySelectorAll('.hsl-nav-item');
    const tabContents = document.querySelectorAll('.hsl-tab-content');

    // Mapeamento dos índices do menu para os IDs das abas correspondentes
    const tabIds = ['tab-geras', 'tab-usuario', 'tab-monitoros', 'tab-informacoes', 'tab-inteligente', 'tab-gestos', 'tab-humanizado'];

    menuItems.forEach((item, index) => {
        if (!item.classList.contains('hsl-logout')) {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove a classe ativa de todos os itens do menu
                menuItems.forEach(el => el.classList.remove('hsl-active'));
                // Adiciona a classe ativa no item clicado
                item.classList.add('hsl-active');

                // Esconde todas as seções de conteúdo
                tabContents.forEach(tab => tab.classList.remove('hsl-active-tab'));

                // Mostra apenas a seção correspondente ao menu clicado
                if (tabIds[index]) {
                    const targetTab = document.getElementById(tabIds[index]);
                    if (targetTab) {
                        targetTab.classList.add('hsl-active-tab');
                    }
                }

                // Fecha o menu no mobile automaticamente após o clique
                if (sidebar) {
                    sidebar.classList.remove('hsl-show-menu');
                }
            });
        }
    });
});

//COLABORADOR
document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       1. LÓGICA DO CALENDÁRIO DINÂMICO
       ========================================== */
    let dataAtual = new Date(); // Pega a data atual do sistema

    const tituloMesAno = document.querySelector(".hsl-calendar-header h3");
    const gridCalendario = document.querySelector(".hsl-calendar-grid");
    const botoesNav = document.querySelectorAll(".hsl-cal-nav"); // Seleciona os botões de seta

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    function renderizarCalendario() {
        if (!gridCalendario || !tituloMesAno) return; // Segurança caso o elemento não esteja na tela

        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();

        // Atualiza o texto do mês e ano no topo
        tituloMesAno.textContent = `${nomesMeses[mes]} ${ano}`;

        // Mantém os nomes dos dias da semana fixos e limpa as células numéricas antigas
        const diasSemanaHTML = `
            <div class="hsl-cal-day-name">Dom</div>
            <div class="hsl-cal-day-name">Seg</div>
            <div class="hsl-cal-day-name">Ter</div>
            <div class="hsl-cal-day-name">Qua</div>
            <div class="hsl-cal-day-name">Qui</div>
            <div class="hsl-cal-day-name">Sex</div>
            <div class="hsl-cal-day-name">Sáb</div>
        `;
        gridCalendario.innerHTML = diasSemanaHTML;

        // Descobre o dia da semana em que o mês começa e quantos dias o mês tem
        const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
        const totalDiasMes = new Date(ano, mes + 1, 0).getDate();
        const totalDiasMesAnterior = new Date(ano, mes, 0).getDate();

        // Preenche os dias cinzas (do final do mês anterior)
        for (let i = primeiroDiaSemana; i > 0; i--) {
            const diaAnterior = totalDiasMesAnterior - i + 1;
            const celula = document.createElement("div");
            celula.classList.add("hsl-cal-cell", "hsl-muted");
            celula.textContent = diaAnterior;
            gridCalendario.appendChild(celula);
        }

        // Preenche os dias do mês atual
        for (let dia = 1; dia <= totalDiasMes; dia++) {
            const celula = document.createElement("div");
            celula.classList.add("hsl-cal-cell");
            celula.textContent = dia;

            // Destaca o dia de hoje (com o estilo vermelho que configuramos)
            const hoje = new Date();
            if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
                celula.classList.add("hsl-blue-event");
            }

            gridCalendario.appendChild(celula);
        }
    }

    // Adiciona o evento de clique nas setas de navegação do calendário
    if (botoesNav.length >= 2) {
        botoesNav[0].addEventListener("click", () => {
            dataAtual.setMonth(dataAtual.getMonth() - 1); // Volta um mês
            renderizarCalendario();
        });

        botoesNav[1].addEventListener("click", () => {
            dataAtual.setMonth(dataAtual.getMonth() + 1); // Avança um mês
            renderizarCalendario();
        });
    }

    // Executa a renderização inicial do calendário
    renderizarCalendario();


    /* ==========================================
       2. LÓGICA DAS ABAS DO MENU LATERAL
       ========================================== */
    const itensMenu = document.querySelectorAll(".hsl-nav-item");
    const secoesPagina = document.querySelectorAll(".hsl-conteudo-pagina");

    itensMenu.forEach(item => {
        item.addEventListener("click", (e) => {
            
            // SE FOR O BOTÃO DE SAIR, PERMITE IR PARA O login.html E IGNORA O RESTO
            if (item.classList.contains("hsl-logout")) {
                return; 
            }

            e.preventDefault(); // Evita o comportamento padrão do link para as abas

            // 1. Remove a classe 'hsl-active' de todos os botões e adiciona no clicado
            itensMenu.forEach(nav => nav.classList.remove("hsl-active"));
            item.classList.add("hsl-active");

            // 2. Pega o ID da seção correspondente
            const targetId = item.getAttribute("data-target");

            // 3. Esconde todas as seções de conteúdo
            secoesPagina.forEach(secao => {
                secao.style.display = "none";
            });

            // 4. Mostra apenas a seção selecionada
            const secaoAtiva = document.getElementById(targetId);
            if (secaoAtiva) {
                secaoAtiva.style.display = "block";
            }

            // 5. Fecha o menu lateral automaticamente no mobile ao trocar de aba
            const sidebar = document.querySelector(".hsl-sidebar");
            if (sidebar && sidebar.classList.contains("hsl-show-menu")) {
                sidebar.classList.remove("hsl-show-menu");
            }
        });
    });
});