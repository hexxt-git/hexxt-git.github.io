let scroller = document.getElementById('landing-scroller')
let Height = window.Height - 66 // todo do this

scroller.addEventListener('click', ()=>{
    window.scrollTo(Height)
})