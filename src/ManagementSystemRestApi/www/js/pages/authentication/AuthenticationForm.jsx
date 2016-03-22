import React from "react";
import FMUI from 'formsy-material-ui';
import AppText from '../../components/common/AppText.jsx';
import ServerError from '../../components/common/ServerError.jsx';
import AuthenticationActions from "../../actions/authentication/AuthenticationActions";
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import { browserHistory } from 'react-router';

export default class AuthenticationForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleValid = this.handleValid.bind(this);
        this.handleInvalid = this.handleInvalid.bind(this);
        this.submitForm = this.submitForm.bind(this);

        this.validation = {
            username: {
                errors: {
                    isEmail: "O nome do usuário deve ser um e-mail",
                    isRequired: "O campo é obrigatório",
                },
                rules: {
                    isEmail: true,
                    isRequired: true
                }
            },
            password: {
                errors: {
                    minLength: "A senha deve ter no mínimo 6 caractéres.",
                    maxLength: "A senha deve ter no máximo 20 caractéres.",
                    isRequired: "O campo é obrigatório",
                },
                rules: {
                    maxLength: 20,
                    minLength: 6,
                    isRequired: true
                }
            }
        };

        this.state = {
            canSubmit: true,
            serverErrors: []
        };
    }

    componentWillMount() {
        AuthenticationStore.on("authenticationChanged", this.handleAuthenticationChange.bind(this));
    }

    componentWillUnmount() {
        AuthenticationStore.removeListener("authenticationChanged", this.handleAuthenticationChange.bind(this));
    }

    handleAuthenticationChange(err, credentials) {
        if (err) {
            console.log("err", err);
        }
        else {
            if (credentials.isAuthenticated) {
                if (this.props.onAuthenticationSuccess && typeof this.props.onAuthenticationSuccess == 'function') {
                    this.props.onAuthenticationSuccess(credentials);
                }
                else {
                    browserHistory.push("favorites");
                }
            }
        }
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

    setServerErrors(newServerErrors) {
        if (Array.isArray(newServerErrors)) {

            this.setState({
                serverErrors: newServerErrors
            });

            if (newServerErrorr.length > 0) {

                if (this.props.onServerError && typeof this.props.onServerError == 'function') {
                    this.props.onServerError(newServerErrors);
                }
            }
        }
    }

    submitForm(model) {
        AuthenticationActions.authenticate(model);
    }

    render() {
        let { username, password } = this.validation;
        let {hideServerErrors} = this.props;
        let errors = [];

        if (!hideServerErrors) {
            errors = this.state.serverErrors.map((error, index) => {
                return <ServerError key={index} message={error}/>;
            });
        }

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
                        validationErrors={username.errors}
                        validations={username.rules}/>
                </div>
                <div class="form-group">
                    <AppText
                        hintText="Senha"
                        id="password"
                        type="password"
                        name="password"
                        floatingLabelText="Senha(*)"
                        validationErrors={password.errors}
                        validations={password.rules}/>
                </div>
                <div class="form-group">
                    {errors}
                </div>
                <button type="submit" disabled={!this.state.canSubmit} class="button button-full button-primary">Entrar</button>
            </Formsy.Form>
        );
    }
}
