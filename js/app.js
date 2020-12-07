function getUser()
{
    let localData = JSON.parse(localStorage.getItem("userData"));
    let username = document.getElementById('username').value;
    if(username ===""){
        alert("Please enter user name");
        return;
    }

    let selectedUser = null;
    for(let i = 0;i<localData.length;i++)
    {
        if(localData[i].name === username)
        {
            selectedUser = localData[i];
        }
    }
   
    if(selectedUser != null)
    {
        showGroceryList(selectedUser.groceryList);
        localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    }                
    else
    {
        if(confirm("User doesn't exist. Do you want to create new user?"))
        {
            createUser();
        }
    }
}

function addItemToExistingUser(){
    let selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    let newItem = document.getElementById("grocery").value;
    
    let editItem = document.getElementById("btnAddItem");
    
    if(newItem === '')
    {
        alert("Please enter grocery item.");
        return;
    }

    if(!isNaN(parseInt(editItem.dataset.itemVal)))
    {
        let itemValue = parseInt(editItem.dataset.itemVal);
        for(let i=0; i<selectedUser.groceryList.length; i++)
        {
            if(i === itemValue)
            {
                selectedUser.groceryList[i] = newItem;
            }
        }
        localStorage.setItem("selectedUser",JSON.stringify(selectedUser));
        let localData = JSON.parse(localStorage.getItem("userData"));
        for(let i in localData)
        {
            if(localData[i].name == selectedUser.name)
            {
                localData[i].groceryList = selectedUser.groceryList;
                break;
            }
        }
        localStorage.setItem("userData",JSON.stringify(localData));
        showGroceryList(selectedUser.groceryList);
        editItem.value="Add Item";
        document.getElementById("grocery").value ="";
        editItem.dataset.itemVal="";
        return;
    }

    if(selectedUser.groceryList.length >= 5)   
    {
        alert("Grocery list is full. Delete an item to add new.");
        return;
    }
    else
    {
        selectedUser.groceryList.push(newItem);
        
        let data = JSON.parse(localStorage.getItem("userData"));
        for(let i in data)
        {
            if(data[i].name == selectedUser.name)
            {
                data[i].groceryList = selectedUser.groceryList;
                break;
            }
        }
        
        localStorage.setItem("userData",JSON.stringify(data));
        localStorage.setItem("selectedUser",JSON.stringify(selectedUser));
        showGroceryList(selectedUser.groceryList);
        document.getElementById("grocery").value ="";
    }
}

function clearAll()
{
    document.getElementById("grocery").value = "";
    document.getElementById("username").value = "";
}

function createUser()
{
    let username = document.getElementById("username").value;
    let data = JSON.parse(localStorage.getItem("userData"));
    if(username === "")
    {
        alert("Please enter user name.");
        return;
    }
    if(data.length >= 3)
    {
        data.shift();
    }
    let newUser = {name:username,groceryList:[]}
    data.push(newUser);
    
    localStorage.setItem("userData",JSON.stringify(data));
    localStorage.setItem("selectedUser",JSON.stringify(newUser));

    getUser();
}

function showGroceryList(currentGroceryList)
{
    let tblGrocery = document.getElementById("tblGrocery");
    if(tblGrocery.rows.length > 1)
    {
        for(let i = tblGrocery.rows.length-1; i>=1; i--)
        {
            tblGrocery.deleteRow(i);
        }
    }

    if(currentGroceryList.length > 0)
    {
        tblGrocery.style.display = "block";
    }
    else
    {
        tblGrocery.style.display = "none";
    }

    for(let i=0; i<=currentGroceryList.length-1;i++)
    {
        let row = tblGrocery.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = currentGroceryList[i];
        cell2.innerHTML = "<input type='button' value='Edit' onclick='EditItem("+i+")' />&nbsp<input type='button' value='Delete' onclick='DeleteItem("+i+")'  />";
    }
}

function DeleteItem(index){
    let selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    for(let i=0; i<selectedUser.groceryList.length; i++)
    {
        if(i === index)
        {
            selectedUser.groceryList.splice(i,1);
        }
    }
    localStorage.setItem("selectedUser",JSON.stringify(selectedUser));
    let localData = JSON.parse(localStorage.getItem("userData"));
        for(let i in localData)
        {
            if(localData[i].name == selectedUser.name)
            {
                localData[i].groceryList = selectedUser.groceryList;
                break;
            }
        }
        localStorage.setItem("userData",JSON.stringify(localData));
        showGroceryList(selectedUser.groceryList);
    }

function EditItem(index){
    let selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    for(let i=0; i<selectedUser.groceryList.length; i++)
    {
        if(i === index)
        {
            let btnAdd = document.getElementById("btnAddItem");
            document.getElementById("grocery").value = selectedUser.groceryList[i];
            btnAdd.value = "Edit Item";
            btnAdd.dataset.itemVal = index;
        }
    }
}

