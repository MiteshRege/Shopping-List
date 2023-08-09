const ItemForm = document.getElementById("item-form");
const ItemInput = document.getElementById("item-input");
const Itemlist = document.getElementById("item-list");

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
   Itemlist.appendChild(li)
   ItemInput.value = ""
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


ItemForm.addEventListener("submit",additem)










