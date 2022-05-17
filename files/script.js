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
}

let canvas = $('canvas')
let c = canvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight

canvas.width = width
canvas.height = height

c.fillStyle = '#CCC'
c.strokeStyle = '#CCC'

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

class Object {
    
//for a quad    x, y,  'quad',  width, height (square or rectangle)
//for a circle  x, y, 'circle', radius, angle( in radians )

    constructor(x, y, type, a, b, srokeStyle, fillStyle, vx, vy) {
        
        this.x = x;
        this.y = y;

        this.vx = vx;
        this.vy = vy;

        this.type = type;

        switch (this.type) {
            case 'quad':{
                this.w = a;
                this.h = b;
                break
            }
            case 'circle':{
                this.r = a;
                this.a = b;
                break
            }
            case 'fillCircle':{
                this.r = a;
                this.a = b;
                break
            }
        }

        this.srokeStyle = srokeStyle;
        this.fillStyle = fillStyle;

        this.render = ()=>{

            c.strokeStyle = this.srokeStyle;
            c.fillStyle = this.fillStyle;

            switch (this.type) {
                case 'quad': {
                    c.fillRect(this.x, this.y, this.w, this.h);
                    break;
                }
                case 'circle': {
                    c.beginPath();
                    c.arc(this.x, this.y, this.r, 0, this.a, false);
                    c.stroke();
                    break;
                }
                case 'fillCircle': {
                    c.beginPath();
                    c.arc(this.x, this.y, this.r, 0, this.a, false);
                    c.fill();
                    c.stroke();
                    break;
                }

            }
        }

        this.update = ()=>{
            this.x += this.vx
            this.y += this.vy
        }
    }
}

let step = 0 ;

function loop(){

//     --loop--

    requestAnimationFrame(loop)

//   --updates--
    
    step++

    if ( step < 100 & step % 3 == 0 ){
        circles.push(new Object( rdm(width), rdm(height), 'fillCircle', random( 5, 25), 8, '#fff2', '#fff'+rdm(4), rdmAround(1), rdmAround(1)))
    }

    if ( canvas.width != window.innerWidth | canvas.height != window.innerHeight ){
        width = window.innerWidth
        height = window.innerHeight - 9    
        canvas.width = width
        canvas.height = height
    }


    if ( mouse.z ) circles.push( new Object( mouse.x, mouse.y, 'fillCircle', random( 5, 25), 8, '#fff2', '#fff'+rdm(4), rdmAround(1)*2, rdmAround(1)*2) )
    if ( step % 10 == 0 & mouse.onScreen ) circles.push( new Object( mouse.x, mouse.y, 'fillCircle', random( 5, 25), 8, '#fff2', '#fff'+rdm(4), rdmAround(1.5), rdmAround(1.5)) )
    
    for ( let i in circles ){
        circles[i].update()
        if( i < circles.length - 1000 ){
            circles.shift()
        }
    }

//   --rendering--

    c.clearRect( 0, 0, width, height)
    for ( let i in circles ){
        circles[i].render()
    }

}

let circles = []
let cursor = new Object()














loop()