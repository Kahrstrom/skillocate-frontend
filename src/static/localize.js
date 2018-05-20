const staticTexts = {
    sv: {
        loginForm: {
            title: 'Logga in',
            subheader: 'Logga in för att ta del av alla coola saker',
            labelEmail: 'E-post',
            placeholderEmail: 'Din registrerade e-post',
            labelPassword: 'Lösenord',
            placeholderPassword: 'Ditt registrerade lösenord',
            textSubmitButton: 'Logga in',
            signupText: 'Har du inte ett konto? Registrera dig {link} här!',
            requiredValidation: 'Obligatoriskt',
            emailValidation: 'E-postadressen är inte giltig',
            shortPasswordWarning: 'Det var ett väldigt kort lösenord...'
        },
        publicRoute: {
            loggedInMessage: 'Du är redan inloggad!'
        }
    },
    en: {
        loginForm: {
            title: 'Logga in',
            subheader: 'Logga in för att ta del av alla coola saker',
            labelEmail: 'E-post',
            placeholderEmail: 'Din registrerade e-post',
            labelPassword: 'Lösenord',
            placeholderPassword: 'Ditt registrerade lösenord',
            textSubmitButton: 'Logga in',
            signupText: 'Har du inte ett konto? Registrera dig {link} här!',
            requiredValidation: 'Required',
            emailValidation: 'That email is not valid',
            shortPasswordWarning: 'That was an awfully short password...',
        },
        publicRoute: {
            loggedInMessage: 'Du är redan inloggad!'
        },
    },
}

class Localize {
    constructor() {
        this.languages = [
            'sv',
            'en',
        ]
        this.defaultLanguage = 'en'
    }

    validateLanguage(language) {
        return this.languages.indexOf(language) > -1
    }

    getTexts(language = this.defaultLanguage, component) {
        if (!this.validateLanguage(language)) {
            return { texts: {}, status: 'error', message: 'Language does not exist' }
        }
        const texts = staticTexts[language][component]
        if (!texts) {
            return { texts: {}, status: 'error', message: 'Code does not exist' }
        }
        return { texts, status: 'success' }
    }
}

export default new Localize()
