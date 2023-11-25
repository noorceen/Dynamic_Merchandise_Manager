let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'create' ;
let tmp;


//get total : calculer le total
function getTotal(){
    if(price.value != ''){
        let result =( +price.value + +taxes.value + +ads.value ) - +discount.value ;
        total.innerHTML = result ;
        total.style.background='#040' ;
    }
    else {
        total.innerHTML = 'Enter Price !';
        total.style.background='#a00d02'
    }
}







//create product : after clicking on create + save in localstorage
//array is the best place to save data
// input : .value || other like total : .innerHTML
//data 1)interface 2)array 3)localstorage if you wanna update.. you will aplie it in the array
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}
else{
    dataPro=[];
}

submit.onclick = function(){
    let newPro = {
        title : title.value.toLowerCase() ,
        price : price.value ,
        taxes : taxes.value ,
        ads : ads.value ,
        discount : discount.value ,
        total : total.innerHTML ,
        count : count.value ,
        category : category.value.toLowerCase() ,

    }
    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 100){
    if(mood == 'create'){
        //count : able to create many product with same proprieties
        if(newPro.count > 1){
            for(let i = 0 ; i < newPro.count ; i++){
                dataPro.push(newPro);
            }
        }
        else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[tmp] = newPro ;
        mood = 'create' ;
        submit.innerHTML = 'Create' ;
        count.style.display = 'block' ;
    }
    clearData()
    }

    //save locaalstorage
    localStorage.setItem('product',JSON.stringify(dataPro))
    console.log(newPro) ;

    
    showData()
}






//clean inputs : after clicking on create delete the data just in the screen
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background='#a00d02'
}





//read data : after clicking on create show the data in a table
function showData(){
    let table ='' ;
    for(let i = 0 ; i < dataPro.length ; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

        ` ;
    }
    // ajouter le table dans tbody
    document.getElementById('tbody').innerHTML = table ;
    let btnDelete = document.getElementById('deleteAll')
    if(dataPro.length > 0){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">Delte All (${dataPro.length})</button>
        `
    }
    else{
        btnDelete.innerHTML= '' ;
    }

}
showData()





//delete
//1-delete : some
function deleteData(i){
    
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData() ;
}

//2-delete : all
function deleteAll(){
    localStorage.clear() ;
    dataPro.splice(0);
    showData()

}






//update
function updateData(i){
    title.value = dataPro[i].title ;
    price.value = dataPro[i].price ;
    taxes.value = dataPro[i].taxes ; 
    ads.value = dataPro[i].ads ;
    discount.value = dataPro[i].discount ;
    getTotal();
    count.style.display = 'none' ;
    // price.value = dataPro[i].price ; 
    // price.value = dataPro[i].price ;
    category.value = dataPro[i].category ;
    submit.innerHTML = 'Update'
    mood = 'update' ;
    tmp = i ;
    scroll({
        top:0,
        behavior:'smooth',
    })


}






//search
//par defaut le recherche se fait par titre
let searchMood = 'title' ;
function getSearchMood(id){
    let search = document.getElementById('search') ;
    if(id == 'searchTitle'){
        searchMood = 'title' ;
        
    }
    else{
        searchMood =  'category' ;
        

    }
    search.placeholder = 'Search By '+ searchMood ;
    search.focus();
    search.value = '';
    showData() 
}


function searchData(value){
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++){
    if(searchMood == 'title'){
        
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        
                ` ;
            }
        
    }
    else{
        
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        
                ` ;
            }
        
    }
    document.getElementById('tbody').innerHTML = table ;
}

}




//clean data <3