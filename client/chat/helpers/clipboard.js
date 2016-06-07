export function onImagePaste(callback) {
  document.onpaste = event => {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;

    for (var index in items) {
      var item = items[index];

      if (item.kind === 'file') {
        var blob = item.getAsFile();
        var reader = new FileReader();

        reader.onload = e => {
          callback(e.target.result)
        }

        reader.readAsDataURL(blob);
      }
    }
  }
}
