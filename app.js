const btn = document.querySelector(".add-btn")
const closebtn = document.querySelector(".close-btn")
const popup = document.querySelector(".add-book-window")

btn.addEventListener("click",()=>
{
    popup.classList.remove("hidden");
    console.log(popup)
})

closebtn.addEventListener("click",()=>
{
    document.querySelector(".add-book-window").classList.add("hidden");
})