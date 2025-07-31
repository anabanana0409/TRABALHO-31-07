document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const campoSenha = document.getElementById('campo-senha');
    const copiarSenha = document.getElementById('copiar-senha');
    const tamanhoSlider = document.getElementById('tamanho-slider');
    const tamanhoValor = document.getElementById('tamanho-valor');
    const btnDiminuir = document.getElementById('diminuir');
    const btnAumentar = document.getElementById('aumentar');
    const btnGerar = document.getElementById('gerar-senha');
    const checkboxes = document.querySelectorAll('.checkbox');
    const indicadorForca = document.getElementById('indicador-forca');
    const textoForca = document.getElementById('texto-forca');
    const toast = document.getElementById('toast');

    // Conjuntos de caracteres
    const caracteres = {
        maiusculo: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        minusculo: 'abcdefghijklmnopqrstuvwxyz',
        numero: '0123456789',
        simbolo: '!@#$%^&*'
    };

    // Configurações iniciais
    let tamanhoSenha = 12;
    atualizarTamanhoSenha();

    // Event listeners
    tamanhoSlider.addEventListener('input', function() {
        tamanhoSenha = parseInt(this.value);
        atualizarTamanhoSenha();
        gerarSenha();
    });

    btnDiminuir.addEventListener('click', function() {
        if (tamanhoSenha > 4) {
            tamanhoSenha--;
            tamanhoSlider.value = tamanhoSenha;
            atualizarTamanhoSenha();
            gerarSenha();
        }
    });

    btnAumentar.addEventListener('click', function() {
        if (tamanhoSenha < 32) {
            tamanhoSenha++;
            tamanhoSlider.value = tamanhoSenha;
            atualizarTamanhoSenha();
            gerarSenha();
        }
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', gerarSenha);
    });

    btnGerar.addEventListener('click', function() {
        gerarSenha();
        // Efeito de animação
        btnGerar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando...';
        setTimeout(() => {
            btnGerar.innerHTML = '<i class="fas fa-magic"></i> Senha Gerada!';
            setTimeout(() => {
                btnGerar.innerHTML = '<i class="fas fa-magic"></i> Gerar Senha';
            }, 1500);
        }, 500);
    });

    copiarSenha.addEventListener('click', function() {
        if (campoSenha.value) {
            navigator.clipboard.writeText(campoSenha.value);
            mostrarToast();
            // Efeito de confete
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff1493', '#ff85b3', '#d462ff', '#ffffff']
            });
        }
    });

    // Funções
    function atualizarTamanhoSenha() {
        tamanhoValor.textContent = tamanhoSenha;
    }

    function gerarSenha() {
        // Verificar quais opções estão selecionadas
        const opcoesSelecionadas = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.name);

        // Se nenhuma opção estiver selecionada, selecionar letras maiúsculas e minúsculas por padrão
        if (opcoesSelecionadas.length === 0) {
            document.querySelector('input[name="maiusculo"]').checked = true;
            document.querySelector('input[name="minusculo"]').checked = true;
            opcoesSelecionadas.push('maiusculo', 'minusculo');
        }

        // Criar pool de caracteres baseado nas opções selecionadas
        let pool = '';
        opcoesSelecionadas.forEach(opcao => {
            pool += caracteres[opcao];
        });

        // Gerar senha aleatória
        let senha = '';
        for (let i = 0; i < tamanhoSenha; i++) {
            const randomIndex = Math.floor(Math.random() * pool.length);
            senha += pool[randomIndex];
        }

        // Atualizar campo de senha
        campoSenha.value = senha;

        // Atualizar indicador de força
        atualizarForcaSenha(opcoesSelecionadas.length, tamanhoSenha);
    }

    function atualizarForcaSenha(numOpcoes, tamanho) {
        // Calcular força baseado no número de opções selecionadas e tamanho da senha
        const forca = numOpcoes * tamanho;
        
        if (forca < 30) {
            indicadorForca.className = 'fraca';
            textoForca.textContent = 'Fraca';
            textoForca.style.color = 'var(--rosa-escuro)';
        } else if (forca < 60) {
            indicadorForca.className = 'media';
            textoForca.textContent = 'Média';
            textoForca.style.color = 'var(--roxo)';
        } else {
            indicadorForca.className = 'forte';
            textoForca.textContent = 'Forte!';
            textoForca.style.color = 'var(--rosa-neon)';
        }
    }

    function mostrarToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    // Efeito de confete (simplificado)
    function confetti({particleCount, spread, origin, colors}) {
        // Implementação simplificada para demonstração
        console.log('🎉 Confetti effect!');
    }

    // Gerar senha inicial
    gerarSenha();
});