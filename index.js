const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
particlesOnScreen = 245;
particles = [];
w = 0;
h = 0;
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

random = (min, max) => {
    return min + Math.random() * (max - min + 1);
};

clientResize = (ev) => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};
window.addEventListener("resize", clientResize);

createSnowFlakes = () => {
    for(let i = 0; i < particlesOnScreen; i++){
        particles.push({
            x: Math.random() * w,  
            y: Math.random() * h,  
            opacity: Math.random(),  
            speedX: random(-11, 11),  
            speedY: random(7, 15),    
            radius:random(0.5, 4.2),
        })
    }
};

drawSnowFlakes = () => {
    for(let i = 0; i < particles.length; i++){    
        var gradient = ctx.createRadialGradient(  
            particles[i].x,   
            particles[i].y,   
            0,                     
            particles[i].x,   
            particles[i].y,   
            particles[i].radius  
            );

            gradient.addColorStop(0, "rgba(255, 255, 255," + particles[i].opacity + ")");  // white
            gradient.addColorStop(.8, "rgba(210, 236, 242," + particles[i].opacity + ")");  // bluish
            gradient.addColorStop(1, "rgba(237, 247, 249," + particles[i].opacity + ")");   // lighter bluish
          
            ctx.beginPath(); 
            ctx.arc(
            particles[i].x,  
            particles[i].y,  
            particles[i].radius,  
            0,                         
            Math.PI*2,                 
            false                     
            );

        ctx.fillStyle = gradient;   
        ctx.fill();                 
    }
};

moveSnowFlakes = () => {
    for (let i = 0; i < particles.length; i++) {
        particles[i].x += particles[i].speedX;     
        particles[i].y += particles[i].speedY;     

        if (particles[i].y > h) {                                                                               
            particles[i].x = Math.random() * w * 1.5;
            particles[i].y = -50;
        }
    }
};

updateSnowFall = () => {
    ctx.clearRect(0, 0, w, h);
    drawSnowFlakes();
    moveSnowFlakes();
};

setInterval(updateSnowFall, 50);
createSnowFlakes();