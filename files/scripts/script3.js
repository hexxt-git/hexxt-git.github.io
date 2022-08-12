function rdm (max){
    return Math.floor(Math.random()*(max +1));
};
function random ( min, max, floor){
    if (floor) return Math.floor((Math.random()*(max - min + 1)) + min);
    return (Math.random()*(max - min)) + min;
};
function rdmAround (x, floor){
    if (floor) return Math.floor( Math.random()* x * 2 - x )
    return Math.random()* x * 2 - x
}
function write (input){
    console.log('%c' +  JSON.stringify(input), 'color: #8BF');
    return void 0;
};
function error (input){
    console.log('%c' + JSON.stringify(input), 'color: #F54;');
    return void 0;
};
function $ (id){
    return document.getElementById(id);
};
function randomColor (){
    return `hsl( ${rdm(360)}, ${random( 20, 70, true)}%, 50%)`
};
function getCircle( x, y, r){
    let circle = []
    for( let x1 = -r-1 ; x1 < r+1 ; x1++){
        for( let y1 = -r-1 ; y1 < r+1 ; y1++){
            if(Math.sqrt(Math.pow(x1,2)+Math.pow(y1,2))<=r) circle.push({x:x+x1, y:y+y1})
        }
    }
    return circle
};

let canvas = $('canvas')
let c = canvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight + 25
let res = 12

let w = Math.floor(width / res)
let h = Math.floor(height / res)

canvas.width = width
canvas.height = height


let mouse = {
    x: width/2,
    y: height/2,
    z: false,
    onScreen: false,
}
window.addEventListener( 'mousemove', ( event)=>{
    mouse.x = event.x
    mouse.y = event.y
})
window.addEventListener( 'mousedown', ()=>{
    mouse.z = true
})
window.addEventListener( 'mouseup', ()=>{
    mouse.z = false
})
document.body.addEventListener( 'mouseenter', ()=>{
    mouse.onScreen = true
})
document.body.addEventListener ( 'mouseleave', ()=>{
    mouse.onScreen = false
})

let step = 0

function loop(){

    setTimeout(()=>{
        requestAnimationFrame(loop)
        step++
    }, 50)

    c.fillStyle = '#FFF3'
    c.strokeStyle = '#FFF4'
    
    if ( canvas.width != window.innerWidth | canvas.height != window.innerHeight + 25 ){
        width = window.innerWidth
        height = window.innerHeight + 25
        canvas.width = width
        canvas.height = height
        w = Math.floor(width / res)
        h = Math.floor(height / res)
        data = []
        for( x = 0 ; x < w ; x++ ){
            data.push([])
            for( y = 0 ; y < h ; y++ ){
                data[x].push(rdm(1))
            }
        }
    }
    
    c.clearRect( 0, 0, width, height)
    copy = eval(JSON.stringify(data))
    for( x = 0 ; x < w ; x++ ){
        for( y = 0 ; y < h ; y++ ){
            neighbors = -1
            for( x1 = x-1 ; x1 <= x+1 ; x1++ ){
                for( y1 = y-1 ; y1 <= y+1 ; y1++ ){
                    if(data[x1]==undefined) continue
                    if(data[x1][y1]) neighbors++
                }
            }
            if (data[x][y]){
                if( neighbors != 2 & neighbors != 3 ){
                    copy[x][y] = 0
                }
            } else {
                if(neighbors == 3){
                    copy[x][y] = 1
                }
            }
        }
    }
    data = copy
    for( x = 0 ; x < w ; x++ ){
        for( y = 0 ; y < h ; y++ ){
            if(data[x][y]){
                c.beginPath()
                c.arc( x*res, y*res, res/2, 0, 8, 0)
                c.fill()
                c.stroke()
            }
        }
    }

    if(mouse.z&mouse.onScreen){
        circle = getCircle( Math.floor(mouse.x/res), Math.floor(mouse.y/res), 2)
        for(i in circle){
            if(rdm(3)){
                if(data[circle[i].x][circle[i].y]) data[circle[i].x][circle[i].y] = 0
                else data[circle[i].x][circle[i].y] = 1
            }
        }
    } else {
        circle = getCircle( Math.floor(mouse.x/res), Math.floor(mouse.y/res), 2)
        for(i in circle){
            if(rdm(0.2)){
                if(data[circle[i].x][circle[i].y]) data[circle[i].x][circle[i].y] = 0
                else data[circle[i].x][circle[i].y] = 1
            }
        }
    }


    for( x = 0 ; x < w ; x++ ){
        for( y = 0 ; y < h ; y++ ){
            if(rdm(0.0001)){
                data[x][y] = 1
                data[x+1][y+1] = 1
            }
        }
    }

}

let data = []
for( x = 0 ; x < w ; x++ ){
    data.push([])
    for( y = 0 ; y < h ; y++ ){
        data[x].push(!rdm(2))
    }
}




loop()