document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("loginButton");

    loginButton.addEventListener("click", function() {
        const userName = document.getElementById("UserName").value;
        const password = document.getElementById("Password").value;

        if (userName === "" || password === "") {
            showNotification("Vui lòng điền đầy đủ thông tin tài khoản và mật khẩu.", "#f44336");
            return;
        }

        // Kiểm tra thông tin đăng nhập
        if (userName === "admin" && password === "123456") {
            // sessionStorage.setItem("loggedIn", "true");
            // sessionStorage.setItem("username", userName); 
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("username", userName);
            window.location.href = "../pages/ChiTietGiaoHang.html";
            showNotification("Đăng nhập thành công!", "#4caf50");
        } else {
            showNotification("Tên người dùng hoặc mật khẩu không đúng.", "#f44336");
        }
    });

    function showNotification(message, backgroundColor) {
        const notification = document.createElement("div");
        notification.innerText = message;
        notification.style.position = "fixed";
        notification.style.bottom = "20px";
        notification.style.right = "20px";
        notification.style.backgroundColor = backgroundColor;
        notification.style.color = "white";
        notification.style.padding = "10px";
        notification.style.borderRadius = "10px";
        notification.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
        document.body.appendChild(notification);

        setTimeout(function() {
            notification.remove();
        }, 5000);
    }
});
