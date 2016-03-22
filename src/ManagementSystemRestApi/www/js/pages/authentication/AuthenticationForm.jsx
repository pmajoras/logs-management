import React from "react";
import FMUI from 'formsy-material-ui';
import AppText from '../../components/common/AppText.jsx';

export default class AuthenticationForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleValid = this.handleValid.bind(this);
        this.handleInvalid = this.handleInvalid.bind(this);
        this.submitForm = this.submitForm.bind(this);

        this.errors = {
            usernameErrors: {
                isEmail: "O nome do usuário deve ser um e-mail",
                isRequired: "O campo é obrigatório",
            },
            passwordErrors: {
                minLength: "A senha deve ter no mínimo 6 caractéres.",
                maxLength: "A senha deve ter no máximo 20 caractéres.",
                isRequired: "O campo é obrigatório",
            }
        };
        this.rules = {
            usernameRules: {
                isEmail: true,
                isRequired: true
            },
            passwordRules: {
                maxLength: 20,
                minLength: 6,
                isRequired: true
            }
        };

        this.state = {
            canSubmit: true
        };
    }

    handleValid() {
        this.setState({
            canSubmit: true
        });
    }

    handleInvalid() {
        if (this.state.canSubmit) {
            this.setState({
                canSubmit: false
            });
        }
    }

    submitForm(model) {
        console.log("MOdel", model);
    }

    render() {
        let { usernameErrors, passwordErrors } = this.errors;
        let { usernameRules, passwordRules } = this.rules;

        return (
            <Formsy.Form
                onValid={this.handleValid}
                onInvalid={this.handleInvalid}
                onValidSubmit={this.submitForm}>
                <div class="form-group">
                    <AppText
                        hintText="Email"
                        id="username"
                        type="email"
                        name="username"
                        floatingLabelText="Email(*)"
                        validationErrors={usernameErrors}
                        validations={usernameRules}/>
                </div>
                <div class="form-group">
                    <AppText
                        hintText="Senha"
                        id="password"
                        type="password"
                        name="password"
                        floatingLabelText="Senha(*)"
                        validationErrors={passwordErrors}
                        validations={passwordRules}/>
                </div>
                <button type="submit" disabled={!this.state.canSubmit} class="button button-full button-primary">Entrar</button>
            </Formsy.Form>
        );
    }
}
