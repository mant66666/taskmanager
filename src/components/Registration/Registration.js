import { useState } from 'react';
import { addNewUser } from '../../api/addNewUser';

export default function Registration({ onBack, setCurrentForm }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();

        const newUser = await addNewUser(firstName, lastName, role, login, password);

        if (!newUser) {
            setHasError(true);
            return;
        }

        onSubmit?.(newUser);
        onBack();
    };
    

    return (
        <section className="registration">
            <form className="registration__form" onSubmit={handleSubmit}>
                <h1 className="registration__title">Регистрация</h1>

                <div className="registration__fields">
                    <div className="registration__field">
                        <label className="registration__label" htmlFor="registration-first-name">
                            Имя
                        </label>
                        <input
                            id="registration-first-name"
                            className="registration__input"
                            type="text"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            placeholder="Введите имя"
                            autoComplete="given-name"
                            required
                        />
                    </div>

                    <div className="registration__field">
                        <label className="registration__label" htmlFor="registration-last-name">
                            Фамилия
                        </label>
                        <input
                            id="registration-last-name"
                            className="registration__input"
                            type="text"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            placeholder="Введите фамилию"
                            autoComplete="family-name"
                            required
                        />
                    </div>

                    <div className="registration__field">
                        <label className="registration__label" htmlFor="registration-role">
                            Роль
                        </label>
                        <input
                            id="registration-role"
                            className="registration__input"
                            type="text"
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                            placeholder="Например, Backend Developer"
                            required
                        />
                    </div>

                    <div className="registration__field">
                        <label className="registration__label" htmlFor="registration-company">
                            Компания
                        </label>
                        <input
                            id="registration-company"
                            className="registration__input"
                            type="text"
                            value={company}
                            onChange={(event) => setCompany(event.target.value)}
                            placeholder="Введите название компании"
                        />
                    </div>

                    <div className="registration__field">
                        <label className="registration__label" htmlFor="registration-login">
                            Логин
                        </label>
                        <input
                            id="registration-login"
                            className="registration__input"
                            type="text"
                            value={login}
                            onChange={(event) => {
                                setLogin(event.target.value);
                                setHasError(false);
                            }}
                            placeholder="Придумайте логин"
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="registration__field">
                        <label className="registration__label" htmlFor="registration-password">
                            Пароль
                        </label>
                        <input
                            id="registration-password"
                            className="registration__input"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Придумайте пароль"
                            autoComplete="new-password"
                            minLength="6"
                            required
                        />
                    </div>
                </div>

                {hasError && (
                    <p className="registration__error">
                        Такой логин уже существует
                    </p>
                )}

                <button className="registration__submit" type="submit">
                    Создать аккаунт
                </button>

                <button className="registration__company-button" type="button" onClick={() => setCurrentForm("company")} >
                    Регистрация компании
                </button>

                <button className="registration__back" type="button" onClick={onBack}>
                    Назад ко входу
                </button>
            </form>
        </section>
    );
}
