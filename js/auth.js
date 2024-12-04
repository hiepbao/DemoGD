document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "../pages/Login.html"; // Đổi thành đường dẫn của trang đăng nhập
    }
});
