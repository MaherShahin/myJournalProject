//get all delete btns and add event listener
function addDeleteBtnEventListener() {
  const deleteBtns = document.getElementsByClassName("deleteBtn");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Are you sure you want to delete this entry?")) {
        var id = e.target.parentElement.id;
        handleDelete(id);
        //delete the element from the DOM
        e.target.parentElement.parentElement.parentElement.remove();
      }
    });
  }
}

function addEditBtnEventListener() {
  const editBtns = document.getElementsByClassName("editBtn");
  for (let i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener("click", function (e) {
      e.preventDefault();
      var id = e.target.parentElement.id;
      console.log(id);
      handleEdit(id);
    });
  }
}

function handleEdit(id) {
  //Send the GET request
  $.ajax({
    url: "/editEntry/" + id,
    type: "GET",
    success: function (data) {
      console.log(data);
      window.location.href = "/editEntry/" + id;
    },
  });
}

function handleDelete(id) {
  //Get the id of the item to delete
  //Send the DELETE request
  $.ajax({
    url: "/deleteEntry/" + id,
    type: "DELETE",
    success: function (data) {
      // wait for the pag eload to finish
      window.location.href = "/journalEntries";
      console.log(data);
    },
  });
}

function handleLogout() {
  $.ajax({
    url: "/logout",
    type: "POST",
    success: function (data) {
      window.location.href = "/login";
    },
  });
}

//wait until the page is loaded
$(document).ready(function () {
  addDeleteBtnEventListener();
  addEditBtnEventListener();
});

//Scroll To Top Button
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    mybutton.style.visibility = "visible";
    mybutton.style.zIndex = "1";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Add Entry Button
//Get the button
let addEntryBtn = document.getElementById("btn-add-entry");
