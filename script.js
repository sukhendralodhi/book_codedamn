
/****************************************************************
 Select the element from dom and create some element and attribute
 *****************************************************************/

const currentList = [];
const output = document.querySelector('.output');
const myInput = createEle(output, 'input', 'inputArea');
myInput.setAttribute('type', 'text');
myInput.setAttribute('placeholder', 'Input text....');
const myBtn = createEle(output, 'button', 'btn');
myBtn.textContent = 'Add New User';
const myList = createEle(output, 'ul', 'mylist');

let getData = localStorage.getItem('currentList');

/*****************************
 create local storage
 *************************** */

 window.addEventListener('DOMContentLoaded', (e) => {
   if(getData) {
     const temArr = JSON.parse(getData);
     temArr.forEach(user => {
       addNewUser(user);
     });
   }
 })


/*--------------
add event handlers for btn buttons
---------------*/

myBtn.addEventListener('click',(e) => {
  let userName = myInput.value;
  // console.log(userName);
  if(userName.length >= 3) {
    const li = addNewUser(userName);
    myInput.value = '';
  } else {
    alert('Please enter correct user name');
  }
})


/*****************************
 updater function
 *************************** */

 function updater() {
   const myListItem = document.querySelectorAll('.info');
   currentList.length = 0;

   myListItem.forEach((el) => {
     currentList.push(el.textContent);
   })
   localStorage.setItem('info', JSON.stringify(currentList));
 }


/*---------------------------------------------------------------------------
create element using function and add new user and create edit delete button
----------------------------------------------------------------------------*/

function addNewUser(userName) {
  const li = createEle(myList, 'li','mylist');
  const div = createEle(li, 'div', 'container');
  const span1 = createEle(div, 'span', 'info');
  span1.textContent = userName;
  const span2 = createEle(div, 'span', 'edit');
  span2.textContent = 'Edit';
  const span3 = createEle(div, 'span', 'delete');
  span3.textContent = 'Delete';

/*****************************
 Edit Button
 *************************** */

  span2.addEventListener('click',(e) => {
    if(span2.textContent === 'Edit') {
      span1.style.backgroundColor = 'yellow';
      span1.setAttribute('contenteditable', true);
      span2.textContent = 'Save';
    } else {
      span1.style.backgroundColor = 'white';
      span1.setAttribute('contenteditable',false);
      span2.textContent = 'Edit'
      updater();
    }
  });

  /*****************************
 Delete Button
 *************************** */

  span3.addEventListener('click', (e) => {
    li.remove();
    updater();
  });
  updater();
  return li;
}

/*****************************
 function for create element
 *************************** */


function createEle(parent, eleType, addClass) {
  const ele = document.createElement(eleType);
  parent.appendChild(ele);
  ele.classList.add(addClass);
  return ele;
}