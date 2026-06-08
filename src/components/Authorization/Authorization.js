import { useState } from 'react';
import { useUserData } from '../UserContext';
import { checkAuthorisation } from '../../api/checkAuthorisation';
import Registration from '../Registration/Registration';

export default function Authorization() {
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    
    const [hasError, setHasError] = useState(false);

    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    const { login } = useUserData();

    async function handleSubmit(event) {
        event.preventDefault();

        const authorizedUser = await checkAuthorisation(loginValue, passwordValue);

        if (authorizedUser) {
            login(authorizedUser);
        } else {
            setHasError(true);
        }
    }

    if (isRegistrationOpen) {
        return <Registration onBack={() => setIsRegistrationOpen(false)} />;
    }

    return (
        <section className="authorization">
            <form className="authorization__form" onSubmit={handleSubmit}>
                <div className="authorization__field">
                    <label className="authorization__label" htmlFor="auth-login">
                        Логин
                    </label>
                    <input
                        id="auth-login"
                        className={`authorization__input${hasError ? ' authorization__input--error' : ''}`}
                        type="text"
                        placeholder="Введите логин"
                        onChange={(event) => {
                            setLoginValue(event.target.value);
                            setHasError(false);
                        }}
                    />
                </div>

                <div className="authorization__field">
                    <label className="authorization__label" htmlFor="auth-password">
                        Пароль
                    </label>
                    <input
                        id="auth-password"
                        className={`authorization__input${hasError ? ' authorization__input--error' : ''}`}
                        type="password"
                        placeholder="Введите пароль"
                        onChange={(event) => {
                            setPasswordValue(event.target.value);
                            setHasError(false);
                        }}
                    />
                </div>

                <button className="authorization__button" type="submit">
                    Войти
                </button>

                <button
                    className="authorization__registration"
                    type="button"
                    onClick={() => setIsRegistrationOpen(true)}
                >
                    Регистрация
                </button>
            </form>
        </section>
    );
}
