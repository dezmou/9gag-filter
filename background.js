chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "setCategories") {
    console.log("new", request.categories)
    chrome.storage.local.set({ key: request.categories }, function () {
      sendResponse("ok");
      console.log("done")
    });
    return true
  } else if (request.action === "getCategories") {
    chrome.storage.local.get("key", (res) => {
      console.log(res.key)
      sendResponse(res.key);
    })
    return true
  }
})