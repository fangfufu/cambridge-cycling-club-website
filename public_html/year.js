var d = new Date();
if (document.currentScript) {
  var span = document.createElement('span');
  span.textContent = d.getFullYear();
  document.currentScript.parentNode.insertBefore(span, document.currentScript);
} else {
  try {
    document.write(d.getFullYear());
  } catch(e) {}
}
