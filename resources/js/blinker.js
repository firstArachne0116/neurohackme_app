var startTime;
var interval;
var index=0;
var colors=['black','white'];
var id = null;
 
function animate(time){
    id = requestAnimationFrame(animate);

    if(!startTime){startTime=time;}
    var elapsed=time-startTime;
    if(elapsed>interval){
        startTime=time;
        canvas.style.backgroundColor=colors[index];
        if(++index>colors.length){index=0;}
    }
}

function startBlink(){
    interval = (1000 / parseFloat(document.getElementById("freqBlink").value)) / 2
    cancelAnimationFrame(id)

    requestAnimationFrame(animate);
}

function stopBlink(){
    cancelAnimationFrame(id)
    canvas.style.backgroundColor='#0080ff'
}
