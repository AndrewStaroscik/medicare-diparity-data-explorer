export default (e) => {
  let aboutToggle = document.getElementById('about-button');
  let about = document.getElementById('about'); 

  if (e.target.id == 'about-close') {
    aboutToggle.style.visibility = 'visible';
    about.style.display = 'none';
  } else {
    aboutToggle.style.visibility = 'hidden';
    about.style.display = 'block';
  }


}