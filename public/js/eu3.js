const button = document.querySelector('.btn');
  button.addEventListener('click',(e)=>{
    e.preventDefault();
    button.classList.add('btn--clicked');
    document.querySelectorAll('span').forEach((element)=>{element.classList.add('expanded')})
    
    
    
    
    /* 
---------------------------------------
setar tempo.
 --------------------------------*/
     setTimeout(()=>{button.classList.remove("btn--clicked")},3500);
     setTimeout(()=>{document.querySelectorAll('span').forEach((element)=>{element.classList.remove('expanded')})},1700)});
