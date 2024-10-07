//menunavbar 

const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
  menu.classList.remove("showMenu");
  closeIcon.style.display = "none";
  menuIcon.style.display = "block";
  } else {
  menu.classList.add("showMenu");
  closeIcon.style.display = "block";
  menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( function(menuItem) { 
menuItem.addEventListener("click", toggleMenu);
})

//dmlinks

function dm2104 () {

//html destiny after button click

window.location.href = "https://fccid.io/ANATEL/01049-09-01138/Manual_DmSwitch2104G-EDD-rev01.pdf/8862249B-9C3D-41DE-9646-5247A8D6AB2F/PDF"
}

function dm2106 () {
  
//html destiny after button click

window.location.href = "https://datacom.com.br/uploads/product/file/644f023cdd323f62d03f549b067a9ffe.pdf"
}

function dm2500 () {
  
//html destiny after button click

window.location.href = "https://datacom.com.br/uploads/product/file/3c7dab4c8c65f7d5bad2cffa32acee3a.pdf"
}

function dm4270 () {
  
//html destiny after button click

window.location.href = "https://www.datacom.com.br/uploads/product/file/9ec8d7825549bb27a9a4064eab8ea8da.pdf"
}

function dm4360 () {
  
//html destiny after button click

window.location.href = "https://datacom.com.br/uploads/product/file/e942eb221d99a4554fe773fa76bf0e55.pdf"
}

function dm4370 () {
  
//html destiny after button click

window.location.href = "https://datacom.com.br/uploads/product/file/5120b64d1a1fcdfbc39ee84528a9aa06.pdf"
}

function dm4615 () {
  
//html destiny after button click

window.location.href = "https://datacom.com.br/uploads/product/file/38cf06a93d69867c19dad671fbf03a1a.pdf"
}

function dm4618 () {
  
//html destiny after button click

window.location.href = "https://datacom.com.br/uploads/product/file/ce66c518601a83bcc4eefa6cf6ec9466.pdf"
}


function dm4370config() {
  
//html destiny after button click

window.location.href = "dm4370config.html";
}

function dm4360config() {

  //html destiny after button click

  window.location.href = "dm4360config.html";
}

function dm2104config() {

  //html destiny after button click

  window.location.href = "dm2104config.html";
}

function dm2500config() {

  //html destiny after button click

  window.location.href = "dm2500config.html";
}

function dm4615config() {

  //html destiny after button click

  window.location.href = "dm4615config.html";
}

function dm2106config() {

  //html destiny after button click

  window.location.href = "dm2106config.html"
}

function dm4270config() {

  //html destiny after button click

  window.location.href = "dm4270config.html"
}

function dm4618config() {

  //html destiny after button click

  window.location.href = "dm4618config.html";
}

function clickipnavbarlogo() {

  //html destiny after button click

   window.location.href = "sw.html";
}

document.getElementById('clickipnavbarlogo').addEventListener('click', clickipnavbarlogo);

function menusobre () {

// Create the textbox element

const textBox = document.createElement('input');
textBox.type = 'text';
textBox.value = 'This is a sample sentence.'; 

// Prepopulate with sample text

// Style the textbox (optional)

textBox.style.width = '300px';
textBox.style.padding = '5px';
textBox.style.border = '1px solid #ccc';

// Append the textbox to the document body

document.body.appendChild(textBox);
}

function CNL(url) {

   //html destiny after button click on another page

  window.open('CNLANATEL.pdf', '_blank');
}

