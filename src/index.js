import './styles/style.css';
import navComponent from './components/nav';
import headerComponent from './components/home';
import menuComponent from './components/menu';
import contactComponent from './components/contact';

const content = document.querySelector('#content');
content.append(navComponent(), headerComponent());

const btns = document.querySelectorAll('nav button');
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const val = e.target.textContent;
    console.log(val);
    if (val === 'Home') {
      content.innerHTML = '';
      content.append(navComponent(), headerComponent());
    } else if (val === 'Menu') {
      content.innerHTML = '';
      content.append(navComponent());
      console.log('work in progress...');
    } else {
      content.innerHTML = '';
      content.append(navComponent());
      console.log('work in progress 2...');
    }
  });
});
