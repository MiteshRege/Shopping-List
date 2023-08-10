const ItemForm = document.getElementById("item-form");
const ItemInput = document.getElementById("item-input");
const Itemlist = document.getElementById("item-list");
const clearbtn = document.getElementById("clear");
const filterelem= document.getElementById("filter");
const filterbtn = document.getElementById("form-button");
let isAlredyPresent = false;

const onaddingNewItem  = (e) =>{
    e.preventDefault();
    // Validating the input
    const newitem = ItemInput.value; 
    if (newitem === "") {
        alert("Please enter something!!");
        return;
   }

    //   Update button to remove existing item
    if (isEditMode){
       const  itemToEdit = Itemlist.querySelector(".edit-mode");
     // removing item from local storage
       removeItemFromStorege(itemToEdit.textContent);
     // removing item from DOM
       itemToEdit.remove();
    //    isEditMode = false;
       
    } 
    //   Add Item to DOM 
    if(checkItemAlreadyPresent(newitem)){
        isAlredyPresent = true;
        alert(`${newitem} is already present!!`);
        return ;
    }
    else{
            if (isEditMode){
                if (confirm(` Want to update ${newitem} ? `)){
                    isEditMode = false;
                    addItemToDom(newitem);
            
                    //  Add Item to Local Storage   
                    addItemToLocalStorage(newitem);
                    updateUI();
                    ItemInput.value = "";
                }
            }
            else{
                    
                if (confirm(` Want to add ${newitem} ? `)){
                        
                        addItemToDom(newitem);
                
                        //  Add Item to Local Storage   
                        addItemToLocalStorage(newitem);
                        updateUI();
                        ItemInput.value = "";
                    }
                
            }
     }
        
}
    



function createButton(classes){
    const button = document.createElement("button");
    button.className=classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
};


function createIcon(classes){
    const icon = document.createElement("i");
    icon.className=classes;
    return icon;
};

const addItemToDom=(newitem)=>{

    //    Creating a List item 
    const li  = document.createElement("li");
    li.appendChild(document.createTextNode(newitem));
 
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
     //   Adding  li to  DOM
    Itemlist.appendChild(li);
    // ItemInput.value = "";

}

const addItemToLocalStorage=(newitem)=>{
    const listOfItem = getLocalStorageDetails();
    //  Add new Item to Array
    listOfItem.push(newitem)
    // convert array to string usng JSON.stringify
    localStorage.setItem('items',JSON.stringify(listOfItem));

};
const getLocalStorageDetails=()=>{
    let listOfItem;
    if (localStorage.getItem('items') === null){
        listOfItem = [];
    }
    else{
        listOfItem = JSON.parse(localStorage.getItem('items'));
    }

    return listOfItem;
};

const displayItem = ()=>{
    const listOfItem = getLocalStorageDetails();
    listOfItem.forEach((item)=>{
        addItemToDom(item);
    });
    updateUI();
};
const onClickItem=(e)=>{
    if (e.target.parentElement.classList.contains("remove-item")){
        toRemoveItem(e.target.parentElement.parentElement);
    }else{
            setItemToEdit(e.target);
    }
};

const checkItemAlreadyPresent=(newitem)=>{
    const listOfItem = getLocalStorageDetails();
    return listOfItem.includes(newitem);
};

const setItemToEdit=(item)=>{
  isEditMode = true;
  Itemlist.querySelectorAll("li").forEach((i)=>{i.classList.remove('edit-mode')});

  item.classList.add('edit-mode');
  filterbtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item';
  filterbtn.style.backgroundColor='#228B22';
  ItemInput.value = item.textContent;
};

const toRemoveItem =(item)=>{
    if(confirm("Are You Sure ")){
        // Remove Item from Dom
        item.remove();
        // Remove Item form LocalStorage
        removeItemFromStorege(item.textContent)
        updateUI();

        }       
};

const removeItemFromStorege=(item)=>{
    let listOfItem = getLocalStorageDetails();

    // Filter out Item that tobe removed from our array: listOfItem
    listOfItem = listOfItem.filter((i)=> i!== item);
    // Reset to Local storage 
    localStorage.setItem('items',JSON.stringify(listOfItem));
};

function clearitem(e) {
    while (Itemlist.firstChild) {
        // Itemlist.innerHTML='';
        Itemlist.removeChild(Itemlist.firstChild);
    }

    // Clear all items from localstorage
    localStorage.removeItem('items'); // OR localstorage.clear();
    
    updateUI();
}

const updateUI=()=>{
    ItemInput.value = "";
    const items = Itemlist.querySelectorAll("li");
    if (items.length === 0){
        clearbtn.style.display = 'none';
        filterelem.style.display = 'none';
    } 
    else{
        clearbtn.style.display = 'block';
        filterelem.style.display = 'block';
    }

    filterbtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    filterbtn.style.backgroundColor='#333';


    isEditMode = false;

};
const filteritem=(e)=>{
    const enteredText = e.target.value.toLowerCase();
    const items = Itemlist.querySelectorAll("li");
   
    items.forEach((item)=>{
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(enteredText) != -1){
                item.style.display = "flex";
        }
        else{
            item.style.display = "none";
        }
    });
}

function init(){
    //  Event Listerners
    ItemForm.addEventListener("submit",onaddingNewItem);
    Itemlist.addEventListener("click",onClickItem);
    clearbtn.addEventListener("click",clearitem);
    filterelem.addEventListener("input",filteritem);
    document.addEventListener('DOMContentLoaded',displayItem);

    updateUI();
}

init()








