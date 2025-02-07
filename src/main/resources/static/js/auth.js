/**
 * Gọi API đăng nhập
 * @param {string} account - Tên đăng nhập
 * @param {string} password - Mật khẩu
 * @returns {Promise<void>}
 */
async function login(account, password) {
    try {
        if (!account || !password) {
            alert("Vui lòng nhập tài khoản và mật khẩu.");
            return;
        }

        const response = await fetch("/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account, password }),
        });

        if (!response.ok) throw new Error(`HTTP status ${response.status}`);

        const data = await response.json();
        if (data.code !== 200) throw new Error(data.message || "Đăng nhập thất bại");

        localStorage.setItem("currentUser", JSON.stringify(data.result));
        alert("Đăng nhập thành công!");
        window.location.href = "../view/dashboard.html";
    } catch (err) {
        alert("Đăng nhập thất bại: " + err.message);
        console.error(err);
    }
}

/**
 * Gọi API đăng ký
 * @param {object} userData - { account, password, email, firstName, lastName, dob }
 * @returns {Promise<void>}
 */
async function signup(userData) {
    try {
        const response = await fetch("/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error(`HTTP status ${response.status}`);

        const data = await response.json();
        if (data.code !== 200) throw new Error(data.message || "Đăng ký thất bại");

        alert("Đăng ký thành công! Mời bạn đăng nhập.");
        window.location.href = "login.html";
    } catch (err) {
        alert("Đăng ký thất bại: " + err.message);
        console.error(err);
    }
}

/**
 * Lấy thông tin user hiện tại từ localStorage
 * @returns {object|null} user hoặc null nếu chưa đăng nhập
 */
function getCurrentUser() {
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * Kiểm tra xem user có đăng nhập không, nếu không sẽ chuyển hướng đến trang login
 */
function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        alert("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
        window.location.href = "login.html";
        return false;
    }
    return true;
}

/**
 * Đăng xuất user
 */
function logout() {
    localStorage.removeItem("currentUser");
    alert("Bạn đã đăng xuất.");
    window.location.href = "login.html";
    return;
}

/**
 * Kiểm tra quyền truy cập vào trang quản lý người dùng
 */
function checkAdminAccess() {
    const user = getCurrentUser();
    if (!user || user.role !== 0) {
        alert("Bạn không có quyền truy cập vào trang này!");
        window.location.href = "dashboard.html";
        return false;
    }
    return true;
}

/**
 * Gán sự kiện cho các nút quản lý tài khoản khi DOM đã sẵn sàng
 */
//document.addEventListener("DOMContentLoaded", function () {
//    const btnManageUsers = document.getElementById("btnManageUsers");
//    const btnLogout = document.getElementById("btnLogout");
//
//    // Kiểm tra quyền admin khi vào trang users.html
//    if (window.location.pathname.includes("users.html")) {
//        checkAdminAccess();
//    }
//
//    // Gán sự kiện cho nút quản lý người dùng
//    if (btnManageUsers) {
//        btnManageUsers.addEventListener("click", function () {
//            const user = getCurrentUser();
//            if (!user) {
//                alert("Vui lòng đăng nhập lại.");
//                window.location.href = "login.html";
//            } else if (user.role === 0) {
//                window.location.href = "users.html";
//            } else {
//                alert("Bạn không có quyền truy cập vào trang này!");
//            }
//        });
//    }
//
//    // Gán sự kiện cho nút đăng xuất
//    if (btnLogout) {
//        btnLogout.addEventListener("click", logout);
//    }
//});
