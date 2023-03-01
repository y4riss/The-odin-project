const capitalize = (str) => {
  let k = '';
  let flag = true;
  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[a-zA-Z]/gi) && flag) {
      k += str[i].toUpperCase();
      flag = false;
    } else k += str[i];
  }
  return k;
};

export default capitalize;
