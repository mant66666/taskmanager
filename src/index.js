import { createRoot } from 'react-dom/client';
import App from './App';
import '@assets/styles/main.scss';

const container = document.getElementById('root');

createRoot(container).render(<App />);
