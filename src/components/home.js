export default function headerComponent() {
  const header = document.createElement('header');

  const leftDiv = document.createElement('div');
  leftDiv.classList.add('left');
  const rightDiv = document.createElement('div');
  rightDiv.classList.add('right');

  const textDiv = document.createElement('div');
  const btnDiv = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.textContent = 'Taste our delicious moroccan Couscous';

  const p = document.createElement('p');
  p.textContent =
    'Among the best Moroccan chefs in the world, serving you something beyond flavor.';

  const btn = document.createElement('button');
  btn.textContent = 'Our menu';

  const img = document.createElement('img');

  img.src = '../src/assets/couscous.jpg';
  textDiv.append(h1, p);
  btnDiv.append(btn);
  leftDiv.append(textDiv, btnDiv);
  rightDiv.appendChild(img);
  header.append(leftDiv, rightDiv);

  return header;
}
