function play_single_sound() {
    document.getElementById('audiotag1').play();
}

function pause_sound() {
    document.getElementById('audiotag1').pause();
}

function stop_sound() {
    document.getElementById('audiotag1').pause();
    document.getElementById('audiotag1').currentTime = 0;
}