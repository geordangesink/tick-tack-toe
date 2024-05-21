let fieldsArray = [0,1,2,3,4,5,6,7,8];
let fields = document.querySelectorAll(".field");

fields.forEach((field,i) => field.addEventListener("click", async function(){
    if ( fieldsArray.includes(i) ){
        field.src = "resources/images/x.webp";
        console.log("test");
        await madeMove(i);
    }
}))

async function madeMove(num){
    let fieldsTemp = fieldsArray;
    fieldsArray.forEach(field => field = "x")
    
    await new Promise(resolve => setTimeout(5000, resolve));

    fieldsArray = fieldsTemp;
    fieldsArray[num] = "x";
}