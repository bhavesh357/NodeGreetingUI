let notificationFlag=true;
let dropdownNotification = document.getElementById('notificationDropdown');


let toolsFlag=true;
let dropdownTools = document.getElementById('toolsDropdown');

function toggleNotification(){
    toolsFlag = true;
    toggleDropdown(dropdownTools,'-100px');
    if(notificationFlag){
        toggleDropdown(dropdownNotification,'30px');
        notificationFlag = false;
    }else{
        toggleDropdown(dropdownNotification,'-100px');
        notificationFlag = true;
    }
}

function toggleTools(){
    notificationFlag = true;
    toggleDropdown(dropdownNotification,'-100px');
    if(toolsFlag){
        toggleDropdown(dropdownTools,'30px');
        toolsFlag = false;
    }else{
        toggleDropdown(dropdownTools,'-100px');
        toolsFlag = true;
    }
}

function toggleDropdown(dropdown,value){
    dropdown.style.top=value;
}

let listFlag=true;
let greetingList=document.getElementById('greeting-list');
let greetingListItems=document.getElementById('greeting-list-items-list');

function showList(){
    console.log(greetingList);

    if(listFlag){
        loadGreetingData();
        greetingList.style.display='block';
        editFlag=true;
        deleteFlag=true;
        let editButtons= document.getElementsByClassName('greeting-list-item-edit');
        let deleteButtons = document.getElementsByClassName('greeting-list-item-delete');
        addFlag=false;
        showAdd();
        editFormFlag=false;
        showEditForm();
        hideButtons(editButtons);
        hideButtons(deleteButtons);
        listFlag=false;
    }else{
        greetingList.style.display='none';
        listFlag=true;
    }
}

function loadGreetingData(){
    fetch('http://localhost:3000/greetings')
    .then(data => {return data.json()})
    .then(res => {
        console.log(res);
        loadData(res);
    })
    .catch(err => {return err});
}

function loadData(data){
    greetingListItems.innerHTML="";
    console.log(data);
    console.log(data[2]);
    for(let i=0;i<data.length;i++){
        let item="<div class=\"col-md-4\"><div class=\"col-md-12  greeting-list-item\"><div  onclick=\"editGreeting('"+data[i]._id+"')\" class=\"greeting-list-item-btn greeting-list-item-edit\">"+
                "<img class=\"greeting-list-item-btn\" src=\"./img/icons/pen.svg\">"+
            "</div>"+
                "<div class=\"greeting-list-item-id\">ObjectId("+data[i]._id+")</div>"+
            "<div class=\"greeting-list-item-greeting greeting-list-item-data\">"+
                "<div class=\"greeting-list-item-greeting-text\">"+data[i].message+"</div>"+
                "<div class=\"greeting-list-item-greeting-info\">(Greeting)</div>"+
            "</div>"+
            "<div class=\"greeting-list-item-name greeting-list-item-data\">"+
                "<div class=\"greeting-list-item-greeting-text\">"+data[i].firstName+" "+data[i].lastName+"</div>"+
                "<div class=\"greeting-list-item-greeting-info\">(Name)</div>"+
            "</div>"+
            "<div class=\"greeting-list-item-time\">15 mins ago</div>"+
            "<div onclick=\"deleteGreeting('"+data[i]._id+"')\" class=\"greeting-list-item-btn greeting-list-item-delete\">"+
                "<img  class=\"greeting-list-item-btn\" src=\"./img/icons/delete.svg\">"+
            "</div>"+
            "</div>"+
        "</div>";
        greetingListItems.innerHTML+=item;
    }
}
let editFormFlag=true;
let editForm= document.getElementById('editList');
function editGreeting(id){
    showList();
    console.log(editForm);
    fetch('http://localhost:3000/greeting/'+id)
    .then(data => { return data.json()})
    .then(res => {
        loadEditForm(res);
    })
    .catch(err => {return err});
}

function showEditForm(){
    if(editFormFlag){
        editForm.style.display="block";
        editFormFlag=false;
    }else{
        editForm.style.display="none";
        editFormFlag=true;
    }
}

function validateEdit(){
    let firstName=document.getElementById('firstName');
    let lastName=document.getElementById('lastName');
    let message=document.getElementById('greetingMessage');
    let isFirstNameProper=validateName(firstName);
    let isLastNameProper=validateName(lastName);
    let isMessageProper= validateMessage(message);
    console.log([isFirstNameProper,isLastNameProper,isMessageProper])
    if( isMessageProper && isLastNameProper && isFirstNameProper){
        updateData(currentEditingId,firstName.value,lastName.value,message.value);
    }
}

function updateData(id,firstName,lastName,message){
    console.log(id,firstName,lastName,message);
    let greeting={
        firstName: firstName,
        lastName: lastName,
        message: message
    }
    const otherParams={
        headers:{
            "content-type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify(greeting),
        method: "PUT"
    };
    fetch('http://localhost:3000/greeting/'+id,otherParams)
    .then(data => {return data.json()})
    .then(res => {
        console.log(res);
        showList();
    })
    .catch(err => {return err});
}

const nameRegex=/^[A-Z][a-z]{2,10}$/;
const messageRegex=/^[A-Za-z ]{5,50}$/;

function validateName(name){
    if(nameRegex.test(name.value)) {
        return true;
    }else{
        name.value=""
        name.placeholder="Enter Proper Name";
        return false;
    }
}

function validateMessage(message){
    if(messageRegex.test(message.value)) {
        return true;
    }else{
        message.value="";
        message.placeholder="Enter Proper Message";
        return false;
    }
}

let currentEditingId;

function loadEditForm(data){
    showEditForm();
    currentEditingId=data._id;
    document.getElementById('firstName').value=data.firstName;
    document.getElementById('lastName').value=data.lastName;
    document.getElementById('greetingMessage').value=data.message;
}

function deleteGreeting(id){
    console.log(id);
    const otherParams={
        headers:{
            "content-type":"application/json; charset=UTF-8"
        },
        method: "DELETE"
    };
    fetch('http://localhost:3000/greeting/'+id,otherParams)
    .then(data => {return data.json()})
    .then(res => {
        console.log(res);
        loadGreetingData();
    })
    .catch(err => console.log(err));
}

let editFlag=true;

function showEdit(){
    let editButtons= document.getElementsByClassName('greeting-list-item-edit');
    let deleteButtons = document.getElementsByClassName('greeting-list-item-delete');
    if(!listFlag && editFlag){
        hideButtons(deleteButtons);
        deleteFlag=true;
        showButtons(editButtons);
        editFlag=false;
    }else{
        hideButtons(editButtons)
        editFlag=true;
    }
}

let deleteFlag=true;

function showDelete(){
    let editButtons= document.getElementsByClassName('greeting-list-item-edit');
    let deleteButtons = document.getElementsByClassName('greeting-list-item-delete');
    if(!listFlag && deleteFlag){
        hideButtons(editButtons);
        editFlag=true;
        showButtons(deleteButtons);
        deleteFlag=false;
    }else{
        hideButtons(deleteButtons)
        deleteFlag=true;
    }
}

function showButtons(buttons){
    console.log(buttons);
    for(let i=0;i<buttons.length;i++){
        buttons[i].style.display="block";
    }
}

function hideButtons(buttons){
    console.log(buttons);
    for(let i=0;i<buttons.length;i++){
        buttons[i].style.display="none";
    }
}

let addFlag=true;


let addForm= document.getElementById('addList');

function showAdd(){
    if(addFlag){
        if(!listFlag){
            showList();
        }
        addForm.style.display="block";
        let firstName=document.getElementById('firstNameAdd');
        let lastName=document.getElementById('lastNameAdd');
        firstName.value="";
        lastName.value="";
        addFlag=false;
    }else{
        addForm.style.display="none";
        addFlag=true;
    }
}


function validateAdd(){
    let firstName=document.getElementById('firstNameAdd');
    let lastName=document.getElementById('lastNameAdd');
    let isFirstNameProper=validateName(firstName);
    let isLastNameProper=validateName(lastName);
    if( isLastNameProper && isFirstNameProper){
        addData(currentEditingId,firstName.value,lastName.value);
    }
}
function addData(id,firstName,lastName){
    console.log(id,firstName,lastName);
    let greeting={
        firstName: firstName,
        lastName: lastName,
    }
    const otherParams={
        headers:{
            "content-type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify(greeting),
        method: "POST"
    };
    fetch('http://localhost:3000/greeting/',otherParams)
    .then(data => {return data.json()})
    .then(res => {
        console.log(res);
        showList();
    })
    .catch(err => {return err});
}