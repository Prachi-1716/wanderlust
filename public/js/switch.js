let switchbtn = document.querySelector(".form-check-input");

switchbtn.addEventListener("click", (evt)=>{
    let taxInfo = document.querySelectorAll(".taxInfo");
    
    for (let info of taxInfo){
        info.classList.toggle("hide");
    }
});