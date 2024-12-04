// Nạp Header
function loadHeader() {
    fetch("../components/header.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
      });
  }
  // Nạp Footer
  function loadFooter() {
    fetch("../components/footer.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
      });
  }