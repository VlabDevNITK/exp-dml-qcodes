"use strict";
const domain = "..";
const lab = "Disaster Management Lab";
const exp = "Exploring morse code : Q Codes";
const domainName = document.querySelector(".domainName");
const labName = document.querySelector(".labName");
const expName = document.querySelector(".expName");

const displayTitle = function () {
  domainName.innerHTML = domain;
  labName.innerHTML = lab;
  expName.innerHTML = exp;
};
