var navlinks = document.getElementById("navlinks");
    function showmenu(){
        navlinks.style.right = "0";}

        function hidemenu(){
            navlinks.style.right = "-200px";
    }

    var pull = 0;
    var pull = JSON.parse(localStorage.getItem('pull'));  

                      
   function add() {
if (pull < 500) {
    pull += 1
    const addValue = document.querySelector('.cart-num');
   
 addValue.innerHTML = `(${pull})`; 
 localStorage.setItem('pull',JSON.stringify(pull));
}
   
   
    
   
   }