chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'setCategories') {
    chrome.storage.local.set({ key: request.categories }, function() {
      sendResponse('ok');
    });
    return true;
  } else if (request.action === 'getCategories') {
    chrome.storage.local.get('key', res => {
      sendResponse(res.key);
    });
    return true;
  } else if (request.action === 'getVersion') {
    fetch('http://51.15.208.17/version/', {
      credentials: 'omit',
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-language':
          'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6,sv;q=0.5',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'upgrade-insecure-requests': '1'
      },
      referrerPolicy: 'no-referrer-when-downgrade',
      body: null,
      method: 'GET',
      mode: 'cors'
    })
      .then(res => {
        res
          .text()
          .then(text => {
            sendResponse(text);
          })
          .catch(() => {});
      })
      .catch(() => {});
    return true;
  }
});
