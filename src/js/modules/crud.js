let uri = `${location.href}/v1`;
let myForm = document.querySelector("#myForm");
let myTbody = document.querySelector("#myTbody");

const showData = async(data) => {
    let plantilla = "";
    if(data){
    data.forEach(val => {
        plantilla += /*html*/`
        <tr class = "eachProduct" id="${val._id}">
            <td contenteditable id="productName">${val.name}</td>
            <td contenteditable id="productBrand">${val.brand}</td>
            <td contenteditable id="productDesc">${val.description}</td>
            <td><img src="../storage/img/${val.imagen}" height="100"></td>
            <td>
                <button id="btnEdit" class="btn"> edit </button>
                <button id="btnDelete" class="btn"> delete </button>
            </td>
        </tr>
        `;
    })}
    return plantilla;
}


addEventListener('DOMContentLoaded', async()=>{
    let peticion = await fetch(uri);
    let res = await peticion.json();
    if(res.data){
        if(res.status == 200) myTbody.innerHTML = await showData(res.data);
        editOrDeleteButtons();
    }else{
        myTbody.innerHTML = await showData();
        editOrDeleteButtons();;
}})


myForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    let data = new FormData(e.target);
    let config = {
      method: e.target.method,
      body: data
    }
    
    let peticion = await fetch(uri, config);
    let res = await peticion.json();

    let peticion1 = await fetch(uri);
    let res1 = await peticion1.json();
    if(res1.status == 200) myTbody.innerHTML = await showData(res1.data);
    editOrDeleteButtons();
    if(res.status == 401) location.href = "/login";
  })


const editOrDeleteButtons = async()=>{

    let eachProduct = document.querySelectorAll(".eachProduct");
    eachProduct.forEach(dict => {
        let btnEdit = dict.querySelector("#btnEdit");
        let btnDelete = dict.querySelector("#btnDelete");
        
        btnEdit.addEventListener('click', async e => {
            let productName = dict.querySelector("#productName");
            let productBrand = dict.querySelector("#productBrand");
            let productDesc = dict.querySelector("#productDesc");
            let data = {name: productName.innerHTML, brand: productBrand.innerHTML, description: productDesc.innerHTML}
            console.log(data)
            let config = {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              }
              let peticion = await fetch(`${location.href}/v1/${dict.id}`, config);
              console.log(await peticion.json());
              let peticion1 = await fetch(uri);
            let res1 = await peticion1.json();
            if(res1.data){
                if(res1.status == 200) myTbody.innerHTML = await showData(res1.data);
                editOrDeleteButtons();
            }else {
                myTbody.innerHTML = await showData();
                editOrDeleteButtons();
            }    
            
        })

        btnDelete.addEventListener('click', async e => {  
            let config = {
                method: "DELETE",
                header:{ 'Content-Type': 'application/json' }
              }
              let peticion = await fetch(`${location.href}/v1/${dict.id}`, config);
              let peticion1 = await fetch(uri);
            let res1 = await peticion1.json();
            if(res1.data){
                if(res1.status == 200) myTbody.innerHTML = await showData(res1.data);
                editOrDeleteButtons();
            }else {
                myTbody.innerHTML = await showData();
                editOrDeleteButtons();
            }              
        })



    })


}




