const foreground = document.getElementById("main");
const addTaskBtn = document.getElementById("addTask");

//add an editable text-box when Add Task button is clicked
addTaskBtn.addEventListener("click", function(e){
    addTaskBox();
});

function addTaskBox(e){
    addTaskBtn.value="pressed";

}
