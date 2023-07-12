let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEL = document.getElementById("ul-el");

//converting into array before getting
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
// console.log(leadsFromLocalStorage)

//if exp is truthy
if (leadsFromLocalStorage) {
  //set myleads to the value
  myLeads = leadsFromLocalStorage;
  renderToMainScreen(myLeads);
}
function renderToMainScreen(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
   <a target='_blank' href='${leads[i]}'>
   ${leads[i]}
   </a>
   </li>`;
  }
  ulEL.innerHTML = listItems;
  //can write inputEl.value='' here also
}
//ANOTHER METHOD
// ulEL.innerHTML +='<li>'+myLeads[i]+"</li>"

//ANOTHER METHOD

// for(let i=0;i<myLeads.length;i++)
// {
//    const li= document.createElement('li')
//     li.textContent=myLeads[i]
//     ulEL.append(li)
// }

inputBtn.addEventListener("click", saveInp);
function saveInp() {
  let inputvalue = inputEl.value;
  myLeads.push(inputvalue);
  inputEl.value = "";
  //stringify bcoz localstorage store everything as string
  //storing in localstorage
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderToMainScreen(myLeads);
}
deleteBtn.addEventListener("click", clearLs);
function clearLs() {
  console.log("clicked");
  localStorage.clear();
  myLeads = [];
  renderToMainScreen(myLeads);
}

// const tabs = [{ url: "www.google.com" }];
tabBtn.addEventListener("click", tabclick);

function tabclick() {

  chrome.tabs.query({active:true,currentWindow:true},function(tabs)
  {
    console.log(tabs)
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderToMainScreen(myLeads)
  })


}
//once i ran set item the value will be stored in local storag
//and if i comment down the line then also it will be stored and we
//can retrive it by getitem