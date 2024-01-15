let tBodyRow = document.querySelectorAll("#tableBody tr");
let exampleModel = document.getElementById("exampleModal");
let commentsLength = document.getElementById("commentsLength");
let searchinput = document.getElementById("newsQuery");
let searchBtn = document.getElementById("searchBtn");
let addRow = document.getElementById("tableBody");
let loadmore = document.getElementById("loadmore");
let dataperpage = 5;
let currentpage = 1;
let commentsData;
let postsData;

//Fetch Post API
const fetchData = async () => {
  try {
    postsData = await fetch("https://jsonplaceholder.typicode.com/posts");
    postsData = await postsData.json();
    console.log("postsData: ", postsData);
    displayData();
    console.log("postsData: 1 ");
  } catch (error) {
    console.log("ERROR", error);
  }
};

//Fetch Comment API
const fetchCommentApi = async () => {
  commentsData = await fetch("https://jsonplaceholder.typicode.com/comments");
  commentsData = await commentsData.json();
  console.log(commentsData);
};

//Display Data
let displayData = () => {

  // Pagination
  const indexOfLastPage = currentpage * dataperpage;
  const indexOfFirstPage = indexOfLastPage - dataperpage;
  const currentdata = postsData.slice(indexOfFirstPage, indexOfLastPage);
  currentdata.forEach((element) => {
    addRow.innerHTML += `<tr onclick="comparison(${element.id})">
        <th scope="row">${element.id}</th>
        <td>${element.title}</td>
        <td>${element.body}</td></tr>`;
  });

  tBodyRow.forEach(function (row) {
    row.addEventListener("click", function (e) {
      console.log("here", e);
    });
  });
};

//Comparison
function comparison(commentID) {
  exampleModel.style.display = "block";
  let bootstrapModal = new bootstrap.Modal(exampleModel);
  bootstrapModal.show();
  let commentsData2 = commentsData.filter((d) => d.postId == commentID);
  console.log("comparison", commentID, commentsData2.length, commentsData2);
  let addRow = "";
  commentsData2.forEach((element) => {
    addRow += `<tr>
      <th scope="row">${element.id}</th>
      <td>${element.name}</td>
      <td>${element.body}</td></tr>`;
    document.getElementById("commentsBody").innerHTML = addRow;
  });

  commentsLength.textContent = commentsData2.length.toString();
}


//Title Based Search

searchBtn.addEventListener("click", () => {
  let newSearch = searchinput.value.toLowerCase();
  console.log(newSearch)
  let word = postsData.filter((d) => d.title.includes(`${newSearch}`));
  addRow.innerHTML = "";
  word.forEach((element) => {
    addRow.innerHTML += `
<th scope="row">${element.id}</th>
<td>${element.title}</td>
<td>${element.body}</td></tr>`;
  });

  console.log("myresult ", word);
});
// Pagination Buttons
let preBtn = () => {
  addRow.innerHTML = "";
  if (currentpage > 1) {
    currentpage--;
    displayData();
  } else if ((currentpage = 1)) {
    currentpage;
    displayData();
  }
};

let nextBtn = () => {
  addRow.innerHTML = "";
  if (currentpage < Math.ceil(postsData.length / dataperpage)) {
    currentpage++;
    displayData();
  }
};
let page1 = () => {
  addRow.innerHTML = "";
  currentpage = 1;
  displayData();
};
let page2 = () => {
  addRow.innerHTML = "";
  currentpage = 2;
  displayData();
};
let page3 = () => {
  addRow.innerHTML = "";
  currentpage = 3;
  displayData();
};
let page4 = () => {
  addRow.innerHTML = "";
  currentpage = 4;
  displayData();
};
let page5 = () => {
  addRow.innerHTML = "";
  currentpage = 5;
  displayData();
};

fetchData();
fetchCommentApi();
