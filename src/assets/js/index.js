"use-strict"

var clicame = true;
var youSpinMe;
var lastAngle = 0;

function updateClicame() {
    if (clicame) {
        youSpinMe = setInterval(aPorElBote, 100);
        clicame = false
            // setTimeout(() => {
            //     clearInterval(youSpinMe)
            // }, 8000);
        lastAngle = -1
    } else {
        clearInterval(youSpinMe)
        clicame = true

    }
    return lastAngle
}

function aPorElBote() {
    let angle = Math.floor(Math.random() * 360) + 360;

    lastAngle = angle - 360;

    spinMe(angle);
}

function spinMe(angle) {

    var $elem = $('#ruleta');
    var duration = 100;
    $({ deg: 0 }).animate({ deg: angle }, {
        duration: duration,
        step: function(now) {
            $elem.css({
                'transform': 'rotate(' + now + 'deg)'
            });
        }
    });
}