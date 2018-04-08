
browser.webNavigation.onCompleted.addListener((details) => {
    console.log("onCompleted " + details.tabId);

    browser.tabs.sendMessage(details.tabId, {
        command: "reset",
      });
});

browser.webNavigation.onDOMContentLoaded.addListener((details) => {
    console.log("onDOMContentLoaded " + details.tabId);

    browser.tabs.sendMessage(details.tabId, {
        command: "reset",
      });
});

browser.webNavigation.onBeforeNavigate.addListener((details) => {
    console.log("onBeforeNavigate " + details.tabId);

    browser.tabs.sendMessage(details.tabId, {
        command: "begin",
      });
});
