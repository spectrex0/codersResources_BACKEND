// El código original NO está correcto. Aquí está la versión corregida:
function click() {
  const result = confirm("U will be redirected to google.com");
  if(result){
    window.location.href = "https://google.com";
  }else{
    return;
  }
}