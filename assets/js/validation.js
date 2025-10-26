/*
==============================================
VALIDATION - Sistema de Validação Avançada
==============================================

Sistema completo de validação de formulários com:
- Validação em tempo real
- Feedback visual imediato
- Mensagens de erro personalizadas
- Verificação de consistência de dados
- Estados visuais (sucesso/erro/aviso)

==============================================
*/

class FormValidator {
    constructor() {
        this.validators = {
            required: this.validateRequired,
            email: this.validateEmail,
            cpf: this.validateCPF,
            phone: this.validatePhone,
            minLength: this.validateMinLength,
            maxLength: this.validateMaxLength,
            number: this.validateNumber,
            positiveNumber: this.validatePositiveNumber,
            url: this.validateURL,
            date: this.validateDate,
            minValue: this.validateMinValue,
            maxValue: this.validateMaxValue,
            match: this.validateMatch
        };

        this.errorMessages = {
            required: 'Este campo é obrigatório',
            email: 'Email inválido',
            cpf: 'CPF inválido (formato: 000.000.000-00)',
            phone: 'Telefone inválido (mínimo 10 dígitos)',
            minLength: 'Mínimo de {min} caracteres',
            maxLength: 'Máximo de {max} caracteres',
            number: 'Deve ser um número válido',
            positiveNumber: 'Deve ser um número positivo',
            url: 'URL inválida',
            date: 'Data inválida',
            minValue: 'Valor mínimo: {min}',
            maxValue: 'Valor máximo: {max}',
            match: 'Os campos não coincidem'
        };
    }

    /**
     * Inicializa validação para um formulário
     * @param {HTMLFormElement} form - Elemento do formulário
     * @param {Object} config - Configurações de validação
     */
    initForm(form, config = {}) {
        if (!form) return;

        const fields = form.querySelectorAll('input, select, textarea');

        fields.forEach(field => {
            // Validação em tempo real (ao digitar)
            if (config.realtime !== false) {
                field.addEventListener('input', () => {
                    this.validateField(field, config);
                });
            }

            // Validação ao sair do campo
            field.addEventListener('blur', () => {
                this.validateField(field, config);
            });

            // Remove mensagem de erro ao focar
            field.addEventListener('focus', () => {
                this.clearFieldError(field);
            });
        });

        // Validação no submit
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form, config)) {
                e.preventDefault();

                // Foca no primeiro campo com erro
                const firstError = form.querySelector('.field-error, .input-error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    /**
     * Valida um campo individual
     * @param {HTMLElement} field - Campo a ser validado
     * @param {Object} config - Configurações de validação
     * @returns {boolean} - true se válido
     */
    validateField(field, config = {}) {
        const rules = this.getFieldRules(field);
        const value = field.value.trim();

        // Limpa erros anteriores
        this.clearFieldError(field);

        // Verifica cada regra
        for (const [ruleName, ruleValue] of Object.entries(rules)) {
            const validator = this.validators[ruleName];

            if (!validator) {
                console.warn(`Validator "${ruleName}" não encontrado`);
                continue;
            }

            const isValid = validator.call(this, value, ruleValue, field);

            if (!isValid) {
                this.showFieldError(field, ruleName, ruleValue, config);
                return false;
            }
        }

        // Campo válido
        this.showFieldSuccess(field);
        return true;
    }

    /**
     * Valida um formulário completo
     * @param {HTMLFormElement} form - Formulário a ser validado
     * @param {Object} config - Configurações de validação
     * @returns {boolean} - true se válido
     */
    validateForm(form, config = {}) {
        const fields = form.querySelectorAll('input:not([type="hidden"]), select, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field, config)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Obtém as regras de validação de um campo
     * @param {HTMLElement} field - Campo do formulário
     * @returns {Object} - Objeto com as regras
     */
    getFieldRules(field) {
        const rules = {};

        // Required
        if (field.hasAttribute('required') || field.dataset.required) {
            rules.required = true;
        }

        // Type-based validation
        if (field.type === 'email') {
            rules.email = true;
        }

        // Data attributes
        if (field.dataset.validate) {
            const validators = field.dataset.validate.split(',');
            validators.forEach(v => {
                const [name, value] = v.trim().split(':');
                rules[name] = value || true;
            });
        }

        // Min/Max Length
        if (field.minLength > 0) {
            rules.minLength = field.minLength;
        }
        if (field.maxLength > 0 && field.maxLength < 524288) { // Valor padrão do HTML5
            rules.maxLength = field.maxLength;
        }

        // Min/Max Value (apenas para inputs numéricos, não para selects)
        if (field.type === 'number' || field.type === 'range') {
            if (field.min !== '') {
                rules.minValue = field.min;
            }
            if (field.max !== '') {
                rules.maxValue = field.max;
            }
        }

        return rules;
    }

    /**
     * Mostra erro em um campo
     * @param {HTMLElement} field - Campo com erro
     * @param {string} ruleName - Nome da regra que falhou
     * @param {*} ruleValue - Valor da regra
     * @param {Object} config - Configurações
     */
    showFieldError(field, ruleName, ruleValue, config = {}) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        // Adiciona classes de erro
        field.classList.add('input-error');
        field.classList.remove('input-success');
        field.setAttribute('aria-invalid', 'true');

        // Cria mensagem de erro
        let errorMessage = this.errorMessages[ruleName];

        // Substitui placeholders na mensagem
        if (typeof ruleValue === 'object') {
            Object.entries(ruleValue).forEach(([key, value]) => {
                errorMessage = errorMessage.replace(`{${key}}`, value);
            });
        } else {
            errorMessage = errorMessage.replace(/\{(min|max)\}/, ruleValue);
        }

        // Mensagem customizada
        if (field.dataset[`error${ruleName.charAt(0).toUpperCase() + ruleName.slice(1)}`]) {
            errorMessage = field.dataset[`error${ruleName.charAt(0).toUpperCase() + ruleName.slice(1)}`];
        }

        // Remove erro anterior se existir
        const oldError = formGroup.querySelector('.field-error-message');
        if (oldError) {
            oldError.remove();
        }

        // Adiciona nova mensagem
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error-message';
        errorElement.textContent = errorMessage;
        errorElement.setAttribute('role', 'alert');
        formGroup.appendChild(errorElement);

        // Ícone de erro
        this.updateFieldIcon(formGroup, 'error');
    }

    /**
     * Mostra sucesso em um campo
     * @param {HTMLElement} field - Campo válido
     */
    showFieldSuccess(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        field.classList.add('input-success');
        field.classList.remove('input-error');
        field.setAttribute('aria-invalid', 'false');

        // Ícone de sucesso
        this.updateFieldIcon(formGroup, 'success');
    }

    /**
     * Limpa erro de um campo
     * @param {HTMLElement} field - Campo a limpar
     */
    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        field.classList.remove('input-error', 'input-success');
        field.removeAttribute('aria-invalid');

        const errorMessage = formGroup.querySelector('.field-error-message');
        if (errorMessage) {
            errorMessage.remove();
        }

        this.updateFieldIcon(formGroup, 'none');
    }

    /**
     * Atualiza ícone do campo
     * @param {HTMLElement} formGroup - Grupo do formulário
     * @param {string} type - Tipo: 'error', 'success', 'none'
     */
    updateFieldIcon(formGroup, type) {
        // Remove ícone anterior
        const oldIcon = formGroup.querySelector('.field-icon');
        if (oldIcon) {
            oldIcon.remove();
        }

        if (type === 'none') return;

        // Adiciona novo ícone
        const icon = document.createElement('span');
        icon.className = `field-icon field-icon-${type}`;
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = type === 'error' ? '✕' : '✓';

        const input = formGroup.querySelector('input, select, textarea');
        if (input) {
            input.parentNode.insertBefore(icon, input.nextSibling);
        }
    }

    // =======================================
    // VALIDADORES INDIVIDUAIS
    // =======================================

    validateRequired(value) {
        return value !== '' && value !== null && value !== undefined;
    }

    validateEmail(value) {
        if (!value) return true; // Deixa 'required' lidar com campo vazio
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    }

    validateCPF(value) {
        if (!value) return true;
        const cleaned = value.replace(/[^\d]/g, '');

        // Validação básica de formato
        if (cleaned.length !== 11) return false;

        // Validação de sequências inválidas
        if (/^(\d)\1{10}$/.test(cleaned)) return false;

        // Validação dos dígitos verificadores
        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleaned.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleaned.substring(10, 11))) return false;

        return true;
    }

    validatePhone(value) {
        if (!value) return true;
        const cleaned = value.replace(/[^\d]/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    }

    validateMinLength(value, minLength) {
        if (!value) return true;
        return value.length >= parseInt(minLength);
    }

    validateMaxLength(value, maxLength) {
        if (!value) return true;
        return value.length <= parseInt(maxLength);
    }

    validateNumber(value) {
        if (!value) return true;
        return !isNaN(value) && !isNaN(parseFloat(value));
    }

    validatePositiveNumber(value) {
        if (!value) return true;
        const num = parseFloat(value);
        return !isNaN(num) && num > 0;
    }

    validateURL(value) {
        if (!value) return true;
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }

    validateDate(value) {
        if (!value) return true;
        const date = new Date(value);
        return date instanceof Date && !isNaN(date);
    }

    validateMinValue(value, minValue) {
        if (!value) return true;
        return parseFloat(value) >= parseFloat(minValue);
    }

    validateMaxValue(value, maxValue) {
        if (!value) return true;
        return parseFloat(value) <= parseFloat(maxValue);
    }

    validateMatch(value, matchFieldId) {
        if (!value) return true;
        const matchField = document.getElementById(matchFieldId);
        return matchField && value === matchField.value;
    }
}

// Exporta instância única do validador (Singleton)
const formValidator = new FormValidator();
