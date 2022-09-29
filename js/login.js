let valor
let form = document.querySelector("#ingresar")
form.addEventListener("submit",obtenerNip)

function obtenerNip(e){
    e.preventDefault()
    let nip = document.querySelector("#nip").value
    alert("mi valor: "+nip)
    if (nip=1234) {
        location.href="pages/menu.html"
    } else {
        alert("No se puede entrar")
    }
}


