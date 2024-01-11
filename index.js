const tableBody = document.getElementById("table-body");
let userData ;

// fetch data

    const fetchData = async ()=>{
  try {   
       let url = "https://jsonplaceholder.typicode.com/posts";
        let response = await fetch(url);
        let data = await response.json();
        userData = data;
        console.log(data);
        displayData();
    }  catch (error) {
    console.log("ERROR");
}
} 


// display data 

 let displayData = ()=>{
    userData.forEach(element => {
        let addRow = document.createElement("tr");
        addRow.innerHTML =  `
        <th scope="row">${element.id}</th>
        <td>${element.title}</td>
        <td>${element.body}</td>`;
        tableBody.appendChild(addRow);
    });
 }
fetchData();
