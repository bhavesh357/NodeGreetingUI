
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