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
    .catch(err => console.log(err));
}

function loadData(data){
    greetingListItems.innerHTML="";
    console.log(data);
    console.log(data[2]);
    for(let i=0;i<data.length;i++){
        console.log(i);
        console.log(data[i]);
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