let url = "http://universities.hipolabs.com/search?country=";
let btn = document.querySelector("button");

btn.addEventListener("click",async ()=>{
    let country = document.querySelector("#country").value;
    let state = document.querySelector("#state").value.toLowerCase();
    let colArr = await getColleges(country);
    show(colArr,state);
});

function show(colArr,state){
    let list = document.querySelector("#list");
    list.innerText = "";
    for(col of colArr){
        if(state.toLowerCase()==null || state==""){
            let li = document.createElement("li");
            li.innerText = col.name;
            list.appendChild(li);
        }
        if(state){
            if(col["state-province"]==null){
                continue;
            }
            if(col["state-province"].toLowerCase()==state.toLowerCase()){
                let li = document.createElement("li");
                li.innerText = col.name;
                list.appendChild(li);
            }
        }
    }
}

async function getColleges(country){
    try{
        let res = await axios.get(url+country);
        return res.data;
    }catch(e){
        console.log("error  : ",e);
        return [];
    }
}
