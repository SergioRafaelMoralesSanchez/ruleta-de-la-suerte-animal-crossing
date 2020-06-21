console.log("--------------------------------------------")
var clicame = true;
var youSpinMe;
var lastAngle = 0;
aaryPremios = ["quiebra", "premio", "x2", "1000", "se lo doy", "quiebra", "100", "75", "comodin", "pregunta",
    "500", "ayuda final", "50", "200", "1/2", "pierde turno", "cesta", "25", "mueble", "300"]
function updateClicame() {
    let result = ""
    if (clicame) {
        youSpinMe = setInterval(aPorElBote, 100);
        clicame = false
        // setTimeout(() => {
        //     clearInterval(youSpinMe)
        // }, 8000);
    } else {
        clearInterval(youSpinMe)
        clicame = true
        result = aaryPremios[Math.round(lastAngle / 18) === 20 ? 0 : Math.round(lastAngle / 18)];
    }
    return result
}
function aPorElBote() {
    let angle = Math.floor(Math.random() * 360) + 360;
    var duration = 100;
    lastAngle = angle - 360;

    var $elem = $('#ruleta');

    $({ deg: 0 }).animate({ deg: angle }, {
        duration: duration,
        step: function (now) {
            $elem.css({
                'transform': 'rotate(' + now + 'deg)'
            });
        }
    });
} 