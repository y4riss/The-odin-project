import './styles/style.css';
import navComponent from './components/nav';
import headerComponent from './components/home';

const content = document.querySelector('#content');
content.insertBefore(navComponent(), content.firstChild);
content.appendChild(headerComponent());
