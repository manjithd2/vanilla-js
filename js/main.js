/* Javascript */

// const apidata;
var apidata;
var listItem = 10;

var numberOfItems;
var currentPage = 1;
var numberOfPages;

const getData = (callback) => {
  fetch("js/data.json")
    .then((data) => data.json())
    .then((data) => callback(data));
};

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

// document.getElementsByClassName("btn-pno").onclick = function() {
//   console.log("this.innerHTML")
// }

const renderTable = (data) => {
  let table = document.querySelector("table");
  let columns = Object.keys(data[0]);
  generateTableHead(table, columns);
  generateTable(table, data);
};

/**
 * Code for the pagination goes over here
 * you can call the function getData to get the Data
 * use setData to set the data in table
 */

const pagination = (data) => {
    
}

function pageUpdate (e) {
  console.log(this.value)
  currPage = this.value
  buildPage(currPage)
  pageNos(parseInt(currPage))

}

const buildPage = (currPage) => {
  console.log(document.querySelector("table"))
  document.querySelector("table").remove()
  document.querySelector("#render-table").appendChild(document.createElement("table"))
  
  const Trimstart = (currPage - 1)* listItem
  const TrimEnd = Trimstart + listItem
  
  const d2s = apidata.slice(Trimstart,TrimEnd)
  console.log("buildPage",d2s,Trimstart,TrimEnd,numberOfPages,currPage)
  pageNos(currPage,listItem)
  renderTable(d2s)
}

const createButton = (i,dots) => {
  var b = document.createElement('button')
  if (dots){
    b.textContent = `.`
    b.value = `${i}`
    b.className='btn-pno'
    b.onclick = pageUpdate
  }
  else {
    
    b.textContent = `${i}`
    b.value = `${i}`
    b.className='btn-pno'
    b.onclick = pageUpdate
  }
  return (b)
}

const pageNos = (currPage) => {
    var ele = document.querySelector("#pagenos")
    var renderStart,renderEnd;
    var blockStart = 1,blockEnd = numberOfPages;
    if ( currPage < 3){
      renderStart = 1;
      renderEnd = 5;
    }

    else if ( currPage > numberOfPages - 2){
      renderStart = currPage - 2;
      renderEnd = numberOfPages
    }

    else {
      renderStart = currPage - 2;
      renderEnd = currPage + 2;
    }

    //reset the ele 
    document.querySelectorAll(".btn-pno").forEach(e=>e.remove())

    //start block
  
    ele.appendChild(createButton(blockStart,false))
    if (renderStart == 1){
      renderStart = 2
    }
    if (renderEnd == blockEnd){
      renderStart = blockEnd - 1
    }

    if( renderStart >= 3){
      for(var i=renderStart-2; i < renderStart; i++){
        ele.appendChild(createButton(i,true))
      } 
    }

    for(var i=renderStart; i <= renderEnd; i++){
      ele.appendChild(createButton(i,false))
    } 

    if( renderEnd <= numberOfPages - 3){

      for(var i=renderEnd+2; i < renderEnd+4; i++){
        ele.appendChild(createButton(i,true))
      } 
    }

    ele.appendChild(createButton(blockEnd,false))
    // // end block

}

const updateItems = (items) => {
  listItem = items
  numberOfPages = Math.ceil(numberOfItems/listItem)


  buildPage(currentPage)
  

}

const callback = (data) => {
  apidata = data
  numberOfItems = apidata.length
  numberOfPages = Math.ceil(numberOfItems/listItem)
  buildPage(currentPage)

  // renderTable(data);
};

getData(callback);
