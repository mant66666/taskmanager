import { useState } from 'react';
import { useUserData } from '../UserContext';
import { checkAuthorisation } from '../../api/checkAuthorisation';

export default function Authorization() {
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const { login } = useUserData();

    async function handleSubmit(event) {
        event.preventDefault();

        const authorizedUser = await checkAuthorisation(loginValue, passwordValue);

        if (authorizedUser) {
            login(authorizedUser);
        }
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
                        className="authorization__input"
                        type="text"
                        placeholder="Введите логин"
                        onChange={(event) => setLoginValue(event.target.value)}
                    />
                </div>

                <div className="authorization__field">
                    <label className="authorization__label" htmlFor="auth-password">
                        Пароль
                    </label>
                    <input
                        id="auth-password"
                        className="authorization__input"
                        type="password"
                        placeholder="Введите пароль"
                        onChange={(event) => setPasswordValue(event.target.value)}
                    />
                </div>

                <button className="authorization__button" type="submit">
                    Войти
                </button>
            </form>
        </section>
    );
}
