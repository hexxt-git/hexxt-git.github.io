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
function distancePointToPoint( point1, point2){
    let distance = Math.sqrt( Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2) )
    return distance
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
                this.baser = a;
                this.r = a;
                this.a = b;
                break
            }
            case 'fillCircle':{
                this.baser = a;
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

    if ( canvas.width != window.innerWidth | canvas.height != window.innerHeight ){
        width = window.innerWidth
        height = window.innerHeight
        canvas.width = width
        canvas.height = height
    }

    while( circles.length < 700 ){
        circles.push( new Object( rdm(width), rdm(height), 'fillCircle', random( 3, 7), 8, '#fff5', '#fff'+random( 5, 6, true), rdmAround(1, false), rdmAround(1, false) ))
    }

    for ( let i in circles){
        if( distancePointToPoint( circles[i], mouse ) < 100){
            if(circles[i].r < circles[i].baser*6){
                circles[i].r += 0.5
            }
        } else {
            if(circles[i].r > circles[i].baser){
                circles[i].r -= 0.5
            }
        }
    }


    for ( let i in circles ){
        if( circles[i].x+10 < 0 | circles[i].x-10 > width | circles[i].y+10 < 0 | circles[i].y-10 > height ){
            circles.splice( i, 1)
        } else {
            circles[i].update()
        }
    }
    

//   --rendering--

    c.clearRect( 0, 0, width, height)
    for ( let i in circles ){
        circles[i].render()
    }

}

let circles = []














loop()