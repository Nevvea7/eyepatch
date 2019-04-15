function save_options() {
  var hideLocked = document.getElementById('hide-locked').checked;
  var hideAcceptanceRate = document.getElementById('hide-acceptance').checked;
    var hideDifficulty = document.getElementById('hide-difficulty').checked;
  chrome.storage.sync.set({
    "hideLocked": hideLocked, "hideAccepted" : hideAcceptanceRate, "hideDifficulty":hideDifficulty
  }, function() {
    chrome.tabs.reload();
    window.close();
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options()
{
  chrome.storage.sync.get({
    hideLocked: false,
    hideAccepted: false,
    hideDifficulty: false
  }, function(items) {
    document.getElementById('hide-locked').checked = items.hideLocked;
      document.getElementById('hide-acceptance').checked = items.hideAccepted;
      document.getElementById('hide-difficulty').checked = items.hideDifficulty;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
