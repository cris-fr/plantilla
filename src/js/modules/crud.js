let uri = `${location.href}/v1`;
let myForm = document.querySelector("#myForm");
let myTbody = document.querySelector("#myTbody");

const showData = async(data) => {
    console.log(data);
    let plantilla = "";
    data.forEach(val => {
        plantilla += /*html*/`
        <tr id="${val._id}">
            <td contenteditable>${val.name}</td>
            <td>${val.name}</td>
            <td>${val.brand}</td>
            <td>${val.description}</td>
            <td><img src="${val.imagen}" height="100"></td>
            <td>
                <a href="#" class="btn"> edit </a>
                <a href="#" class="btn"> delete </a>
            </td>
        </tr>
        `;
    })
    return plantilla;
}


addEventListener('DOMContentLoaded', async()=>{
    let peticion = await fetch(uri);
    let res = await peticion.json();
    if(res.status == 200) myTbody.innerHTML = await showData(res.data);
})


myForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    let data = new FormData(e.target);
    let config = {
      method: e.target.method,
      body: data
    }
    console.log(uri)
    let peticion = await fetch(uri, config);
    let res = await peticion.json();

    let peticion1 = await fetch(uri);
    let res1 = await peticion1.json();
    if(res1.status == 200) myTbody.innerHTML = await showData(res1.data);

    if(res.status == 401) location.href = "/login";
  })



