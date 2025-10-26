/*
==============================================
MASKS - Máscaras de Entrada
==============================================

Máscaras para formatação automática de campos:
- CPF: 000.000.000-00
- Telefone: (00) 00000-0000 ou (00) 0000-0000
- CEP: 00000-000
- Data: 00/00/0000

==============================================
*/

const InputMasks = {
    /**
     * Aplica máscara de CPF
     * Formato: 000.000.000-00
     */
    cpf(value) {
        value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca ponto após os 3 primeiros dígitos
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca ponto após os 6 primeiros dígitos
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca hífen antes dos 2 últimos dígitos
        return value.substring(0, 14); // Limita a 14 caracteres
    },

    /**
     * Aplica máscara de telefone brasileiro
     * Formato: (00) 00000-0000 ou (00) 0000-0000
     */
    phone(value) {
        value = value.replace(/\D/g, ''); // Remove tudo que não é dígito

        if (value.length <= 10) {
            // Telefone fixo: (00) 0000-0000
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        } else {
            // Celular: (00) 00000-0000
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }

        return value.substring(0, 15); // Limita a 15 caracteres
    },

    /**
     * Aplica máscara de CEP
     * Formato: 00000-000
     */
    cep(value) {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        return value.substring(0, 9);
    },

    /**
     * Aplica máscara de data
     * Formato: 00/00/0000
     */
    date(value) {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '$1/$2');
        value = value.replace(/(\d{2})(\d)/, '$1/$2');
        return value.substring(0, 10);
    },

    /**
     * Aplica máscara de moeda brasileira
     * Formato: R$ 0.000,00
     */
    currency(value) {
        value = value.replace(/\D/g, '');
        value = (parseFloat(value) / 100).toFixed(2);
        value = value.replace('.', ',');
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        return value;
    },

    /**
     * Apenas números
     */
    onlyNumbers(value) {
        return value.replace(/\D/g, '');
    },

    /**
     * Remove a máscara, deixando apenas números
     */
    unmask(value) {
        return value.replace(/\D/g, '');
    }
};

/**
 * Inicializa máscaras em campos com data-mask
 * @param {HTMLElement} container - Container onde procurar campos (padrão: document)
 */
function initMasks(container = document) {
    // Máscara de CPF
    container.querySelectorAll('[data-mask="cpf"]').forEach(field => {
        field.addEventListener('input', (e) => {
            e.target.value = InputMasks.cpf(e.target.value);
        });

        // Aplica máscara ao colar
        field.addEventListener('paste', (e) => {
            setTimeout(() => {
                e.target.value = InputMasks.cpf(e.target.value);
            }, 10);
        });
    });

    // Máscara de Telefone
    container.querySelectorAll('[data-mask="phone"]').forEach(field => {
        field.addEventListener('input', (e) => {
            e.target.value = InputMasks.phone(e.target.value);
        });

        field.addEventListener('paste', (e) => {
            setTimeout(() => {
                e.target.value = InputMasks.phone(e.target.value);
            }, 10);
        });
    });

    // Máscara de CEP
    container.querySelectorAll('[data-mask="cep"]').forEach(field => {
        field.addEventListener('input', (e) => {
            e.target.value = InputMasks.cep(e.target.value);
        });

        field.addEventListener('paste', (e) => {
            setTimeout(() => {
                e.target.value = InputMasks.cep(e.target.value);
            }, 10);
        });
    });

    // Máscara de Data
    container.querySelectorAll('[data-mask="date"]').forEach(field => {
        field.addEventListener('input', (e) => {
            e.target.value = InputMasks.date(e.target.value);
        });

        field.addEventListener('paste', (e) => {
            setTimeout(() => {
                e.target.value = InputMasks.date(e.target.value);
            }, 10);
        });
    });

    // Apenas números
    container.querySelectorAll('[data-mask="numbers"]').forEach(field => {
        field.addEventListener('input', (e) => {
            e.target.value = InputMasks.onlyNumbers(e.target.value);
        });
    });
}

// Inicializa máscaras automaticamente quando o DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initMasks());
} else {
    initMasks();
}

// Exporta para uso global
window.InputMasks = InputMasks;
window.initMasks = initMasks;
