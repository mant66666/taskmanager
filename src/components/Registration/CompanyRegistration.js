import { useState } from 'react';
import { registerCompany } from '../../api/registerCompany';
export default function CompanyRegistration({ onBack}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    async function handleSubmit(event) {
    event.preventDefault();

    const result = await registerCompany(
        firstName,
        lastName,
        login,
        password,
        company
    );
    }
    return (
        <section className="company-registration">
            <form className="company-registration__form" onSubmit={handleSubmit}>
                <p className="company-registration__eyebrow">Новая команда</p>
                <h1 className="company-registration__title">Регистрация компании</h1>
                <p className="company-registration__description">
                    Создайте пространство для команды и управляйте общими задачами.
                </p>

                <div className="company-registration__field">
                    <label className="company-registration__label" htmlFor="company-registration-first-name">
                        Имя
                    </label>
                    <input
                        className="company-registration__input"
                        id="company-registration-first-name"
                        type="text"
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="Введите имя"
                        autoComplete="given-name"
                        required
                    />
                </div>

                <div className="company-registration__field">
                    <label className="company-registration__label" htmlFor="company-registration-last-name">
                        Фамилия
                    </label>
                    <input
                        className="company-registration__input"
                        id="company-registration-last-name"
                        type="text"
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Введите фамилию"
                        autoComplete="family-name"
                        required
                    />
                </div>

                <div className="company-registration__field">
                    <label className="company-registration__label" htmlFor="company-registration-login">
                        Логин
                    </label>
                    <input
                        className="company-registration__input"
                        id="company-registration-login"
                        type="text"
                        onChange={(event) => setLogin(event.target.value)}
                        placeholder="Придумайте логин"
                        autoComplete="username"
                        required
                    />
                </div>

                <div className="company-registration__field">
                    <label className="company-registration__label" htmlFor="company-registration-password">
                        Пароль
                    </label>
                    <input
                        className="company-registration__input"
                        id="company-registration-password"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Придумайте пароль"
                        autoComplete="new-password"
                        minLength="6"
                        required
                    />
                </div>

                <div className="company-registration__field">
                    <label className="company-registration__label" htmlFor="company-name">
                        Название компании
                    </label>
                    <input
                        className="company-registration__input"
                        id="company-name"
                        type="text"
                        onChange={(event) => setCompany(event.target.value)}
                        placeholder="Например, Dodo Team"
                        autoComplete="organization"
                    />
                </div>

                <button className="company-registration__submit" type="submit">
                    Создать компанию
                </button>
                <button className="registration__back" type="button" onClick={onBack}>
                    Назад ко входу
                </button>
                
            </form>
        </section>
    );
}
