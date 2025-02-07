/**
 * Gọi API lấy danh sách người dùng
 * @returns {Promise<Array>} Mảng danh sách người dùng
 */
async function fetchUsers() {
    try {
        const response = await fetch("/users");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (!data.result || !Array.isArray(data.result)) throw new Error("Dữ liệu trả về không hợp lệ");

        return data.result;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        alert("Không thể tải danh sách người dùng. Vui lòng thử lại!");
        return [];
    }
}

/**
 * Hiển thị danh sách người dùng lên giao diện
 * @param {Array} users - Mảng danh sách người dùng
 */
function renderUserList(users) {
    const tableBody = document.getElementById("user-table-body");
    if (!tableBody) return;

    if (!users.length) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Không có người dùng nào.</td></tr>`;
        return;
    }

    tableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.account}</td>
            <td>${user.email}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.dob}</td>
            <td>${user.role === 0 ? "Admin" : "Người dùng"}</td>
        </tr>
    `).join("");
}

/**
 * Xử lý khi trang tải xong
 */
document.addEventListener("DOMContentLoaded", async function () {
    if (!checkAuth()) return; // Kiểm tra đăng nhập
    // Nếu không phải admin, dừng script ngay lập tức
    if (!checkAdminAccess()) return;
    try {
        const users = await fetchUsers();
        renderUserList(users);
    } catch (error) {
        // console.error("Lỗi khi hiển thị danh sách người dùng:", error);
        alert("Không thể tải danh sách người dùng.");
    }
});
