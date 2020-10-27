const foreground = document.getElementById("main");
const addTaskBtn = document.getElementById("addTask");

//add an editable text-box when Add Task button is clicked
addTaskBtn.addEventListener("click", function(e){
    foreground.append(addTaskBox());
});

function addTaskBox(e){
//    addTaskBtn.value="pressed";
    var input = document.createElement('input');
    input.type="text";
    input.name="test";

    return input;
}
