const newMessage = ` 
  <div class="row new-row">
    <img class="avatar" src="images/avatar-1.jpg" />
    <div class="text-container">
      <h6>John Doe</h6>
      <p>New message</p>
    </div>
    <span class="delete">✖</span>
  </div>
`;

function addNewMessage(message, container) {
  document.querySelector(container).innerHTML += `
  <div class="row new-row">
    <img class="avatar" src="images/avatar-1.jpg" />
    <div class="text-container">
      <h6>John Doe</h6>
      <p>${message}</p>
    </div>
    <span class="delete">✖</span>
  </div>`
}

// document.querySelector('#msg-container').innerHTML += newMessage;

function updateCount () {
  const messagesCount = document.querySelectorAll('p').length;
  document.querySelector('#count').textContent = messagesCount;
}


let year = new Date().getUTCFullYear();
let month;
let day;

if (new Date().getMonth() < 9) {
  month = "0" + (new Date().getMonth() + 1);
} else {
  month = new Date().getMonth() + 1;
}

if (new Date().getDate() < 9) {
  day = "0" + new Date().getDate();
} else {
  day = new Date().getDate();
}

const date = year + "-" + month + "-" + day;
document.querySelector('#footer').innerHTML += `<span id="date">${date}</span>`;

function deleteMessage() {
  for (let i = 0; i < document.querySelectorAll('.delete').length; i++) {
    document.querySelectorAll('.delete')[i].addEventListener('click', 
    function () {
        this.parentNode.remove();
        updateCount();
      }
  )};
}

deleteMessage();

function addMessage() {
  document.querySelector('#btn-add').addEventListener('click',
  function () {
    var message = document.querySelector('#add-message').value;
    addNewMessage(message, "#msg-container");
    document.querySelector('#add-message').value = "";
    updateCount();
    deleteMessage();
});
}

addMessage();

function searchMessage() {
  document.querySelector('#btn-search').addEventListener('click', () => {
    var textToCompare = document.querySelector('#search-message').value;

    if (compareNames(textToCompare)) {
      elementByContent(textToCompare);
      // document.querySelector('#msg-container').innerHTML = document.querySelectorAll('h6')[i].parentNode.parentNode.inner;
    }
    document.querySelector('#search-message').value = "";
})};

function elementByContent(content) {
  document.querySelectorAll('h6').forEach(msg => {
    if (msg.innerHTML.includes(content) === false) {
      msg.parentNode.parentNode.style.display = 'none';
    } else 
      msg.parentNode.parentNode.style.display = '';
  })
  return null;
}

function compareNames(str) {
  for (let i = 0; i < document.querySelectorAll("h6").length; i++) {
    if (document.querySelectorAll("h6")[i].textContent === str) {
      return true;
    }
  }
  return false;
}

searchMessage();