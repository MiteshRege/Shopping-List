const ItemForm = document.getElementById("item-form");
const ItemInput = document.getElementById("item-input");
const Itemlist = document.getElementById("item-list");
const clearbtn = document.getElementById("clear")
const filterelem= document.getElementById("filter")
const additem = (e) =>{
    e.preventDefault();
    // Validating the input
    const newitem = ItemInput.value; 
   if (newitem === "") {
    alert("Please enter something!!");
    return;
   }
    //    Creating a List item 
   const li  = document.createElement("li");
   li.appendChild(document.createTextNode(newitem));

   const button = createButton("remove-item btn-link text-red");
   li.appendChild(button);
    //   Adding  New Item using DOM
   Itemlist.appendChild(li)
   ItemInput.value = ""
   updateUI();
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

const removeitem = e =>{
    
    if (e.target.parentElement.classList.contains("remove-item")){
            e.target.parentElement.parentElement.remove();
    }
    updateUI();
};
const clearitem = e =>{
    while (Itemlist.firstChild){
        // Itemlist.innerHTML='';
        Itemlist.removeChild(Itemlist.firstChild)
    }
    updateUI();
};

const updateUI=()=>{
    const items = Itemlist.querySelectorAll("li");
    if (items.length === 0){
        clearbtn.style.display = 'none';
    } 
    else{
        clearbtn.style.display = 'block';
    }
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

//  Event Listerners
ItemForm.addEventListener("submit",additem)
Itemlist.addEventListener("click",removeitem)
clearbtn.addEventListener("click",clearitem)
filterelem.addEventListener("input",filteritem)



updateUI();








