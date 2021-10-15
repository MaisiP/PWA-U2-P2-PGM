let principal = $('#principal');
let notice = $('#notice');
//Nombre del repositorio
let swDirectory = "/PWA-U2-P2-PGM/sw.js"

if(navigator.serviceWorker){
    console.log('SW Disponible')
    navigator.serviceWorker.register(swDirectory)
}else{
    console.log('SW No Disponible')
}

$('.btn-seguir').on('click',function (e) {
    e.preventDefault();
    console.log('Botón seguir');
    principal.fadeOut(function () {
        notice.slideDown(1000);
    });
    //notice.fadeIn('slow',function () {
    //    principal.slideUp(1000);
    //})
})

$('.btn-regresar').on('click',function () {
    notice.fadeOut(function () {
        principal.slideDown(1000)
    })
})