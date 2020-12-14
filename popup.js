/*jslint browser */
/*global chrome */
/*jslint white:true */
/*jslint es6: true */

var checkboxDOM;
var domainDOM;
var domain;
var domains;
var domainRegx;

function blockDomain(changeAction) {
  'use strict';
  if(changeAction) {
    domains.push(domainRegx);
    chrome.storage.sync.set({blockedDomains: domains});
  }
  checkboxDOM.checked = true;
  domainDOM.style.color = '#FF2222';
}

function unblockDomain(changeAction) {
  'use strict';
  if(changeAction) {
    domains.splice(domains.indexOf(domainRegx), 1);
    chrome.storage.sync.set({blockedDomains: domains});
  }
  checkboxDOM.checked = false;
  domainDOM.style.color = '#22FF22';
}

document.addEventListener("DOMContentLoaded", function(){
  'use strict';
  checkboxDOM = document.getElementById("blocked");
  domainDOM = document.getElementById("domain");
  checkboxDOM.addEventListener('change', function(ev) {
    if(ev.target.checked) {
      blockDomain(true);
    } else {
      unblockDomain(true);
    }
    console.log(e.target.checked);
  });
  chrome.tabs.query({
      "active": true,
      "currentWindow": true,
      "status": "complete",
      "windowType": "normal"
  }, (tabs)=> {
    domain = getHostName(tabs[0].url);
    domainRegx = regex(domain);
    domainDOM.innerHTML = domain;
    chrome.storage.sync.get((res)=>{
      domains = res.blockedDomains;
      if(domains.includes(domainRegx)) {
        blockDomain(false);
      } else {
        unblockDomain(false);
      }
    });
  });
});



function regex(hostname) {
  'use strict';
  return 'https?://([a-z0-9]+[.])?'+hostname+'[a-z0-9/]+';
}
