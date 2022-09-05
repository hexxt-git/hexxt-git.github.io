function updateMode(){
    if(mode%2){
        document.querySelector('*').style = `
            scrollbar-width: thin;
            scroll-behavior: smooth;
            --color: #111;
            --glass1: #ddc8;
            --glass2: rgba(229, 220, 201, 0.831);
            --glass-shadow: #7e675486;
            --glass-filter: blur(3px);
            --background: linear-gradient( 170deg, rgb(228, 198, 132), rgb(148, 44, 18));
            --text-shadow: #95633bd9;
            --box-shadows: #20120631;
            --list-btn: rgb(219, 117, 58);
            --list-background: linear-gradient( 150deg, rgb(226, 143, 70) 10%, rgb(203, 67, 43));
            --list-item:#ddc9;
        `
    } else {
        document.querySelector('*').style = `
            scrollbar-width: thin;
            scroll-behavior: smooth;
            --color: #bbb;
            --glass1: #161620cc;
            --glass2: #32353688;
            --glass-shadow: rgba(255, 255, 255, 0);
            --glass-filter: blur(1px);
            --background: #09090f;
            --text-shadow: rgba(255, 255, 255, 0.2) 0px 0px 2px;
            --box-shadows: rgba(44, 44, 44, 0.2) 0px 0px 4px;
            --list-btn: #1a1c1f;
            --list-background: #1a1c1f;
            --list-item: #65656988;
            --invert: invert(0.75);
            border-radius: 0px !important;
            -webkit-border-radius: 0px !important;
            -moz-border-radius: 0px !important;
            -ms-border-radius: 0px !important;
            -o-border-radius: 0px !important;
        `
    }
}

let mode;
if (localStorage.getItem('mode') == undefined){
    mode = 0
} else {
    mode = parseInt(localStorage.getItem('mode'))
}
updateMode()

document.getElementById('mode-switch').addEventListener('click', ()=>{
    mode++
    updateMode()
    localStorage.setItem('mode', mode)
})