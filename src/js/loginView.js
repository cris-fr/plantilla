addEventListener('submit', async(e)=>{
    e.preventDefault();
    let peticion = await fetch('/user/v1');
    let res = await peticion.json();
    alert(res);
})