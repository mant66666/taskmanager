import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@assets/styles/main.scss';
import { UserProvider } from './components/UserContext';
const container = document.getElementById('root');
createRoot(container).render(
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
);
