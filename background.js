chrome.runtime.onInstalled.addListener(()=>{
  chrome.storage.sync.set({blockedDomains: []}, ()=>{
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, ()=>{
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            //pageUrl: {hostEquals: 'www.ammaratef45.com'}
          })
        ],
        actions: [
          new chrome.declarativeContent.ShowPageAction()
        ]
      }
    ]);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
  if(changeInfo.url) {
    got_new_url(changeInfo.url, tabId);
  }
});

function got_new_url(url, tabId) {
  chrome.storage.sync.get((res)=>{
    for(let regx in res.blockedDomains) {
      console.log(regx);
      if(url.match(res.blockedDomains[regx])) {
        start_timer();
      } else {
        stop_timer();
      }
    }
  });
}

function start_timer() {
  // TODO start the timer and redirect if timer ends
  // TODO update available time based on Duloingo score
  chrome.tabs.update(tabId,
    {
      url: chrome.extension.getURL("potions.html")
    }
  );
}

function stop_timer() {
  // TODO stop the timer
}

chrome.tabs.onRemoved.addListener(function(tabid, removed) {
  chrome.tabs.query({
    "active": true,
    "currentWindow": true,
    "status": "complete",
    "windowType": "normal"
}, tabs=> {
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
 
 chrome.windows.onRemoved.addListener(function(windowid) {
  stop_timer()
 });
