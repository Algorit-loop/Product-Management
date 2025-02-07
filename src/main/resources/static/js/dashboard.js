document.addEventListener("DOMContentLoaded", async function () {
   if (!checkAuth()) return; // Kiểm tra đăng nhập

    const currentUser = getCurrentUser();

    // Hiển thị thông tin user
        document.getElementById("userAccount").textContent = currentUser.account || "N/A";
        document.getElementById("userName").textContent = `${currentUser.firstName || ""} ${currentUser.lastName || ""}`;
        document.getElementById("userEmail").textContent = currentUser.email || "N/A";

    // Kiểm tra quyền admin
    if (currentUser.role !== 0) {
        document.getElementById("btnManageUsers").style.display = "none";
    }

    // Lấy danh sách sản phẩm và hiển thị
    try {
        const products = await fetchAllProducts();
        renderProductList(products);
    } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
        alert("Không thể tải danh sách sản phẩm.");
    }

    // Gán sự kiện cho các nút
    document.getElementById("btnAddProduct").addEventListener("click", function () {
        window.location.href = "addProduct.html";
    });

    document.getElementById("btnManageUsers").addEventListener("click", function () {
        window.location.href = "users.html";
    });

    document.getElementById("btnLogout").addEventListener("click", logout);
});

/**
 * Hiển thị danh sách sản phẩm
 * @param {Array} products - Danh sách sản phẩm
 */
function renderProductList(products) {
    const container = document.getElementById("productList");
    if (!container) return;

    if (!products || products.length === 0) {
        container.innerHTML = "<p>Không có sản phẩm nào.</p>";
        return;
    }

    let html = `
        <table border="1">
            <thead>
                <tr>
                    <th>Tên</th>
                    <th>Thương hiệu</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Giảm giá</th>
                    <th>Mô tả</th>
                    <th>Hình ảnh</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
    `;

    products.forEach(product => {
        const finalPrice = product.price - (product.price * product.discount) / 100;

        html += `
            <tr>
                <td>${product.name || "N/A"}</td>
                <td>${product.brand || "N/A"}</td>
                <td>${product.category || "N/A"}</td>
                <td>
                    ${product.discount > 0
                        ? `<span style="color: red;">${finalPrice.toLocaleString()} ₫</span>
                           <del style="color: gray;">${product.price.toLocaleString()} ₫</del>`
                        : `${product.price.toLocaleString()} ₫`}
                </td>
                <td>${product.discount > 0 ? product.discount + "%" : "Không giảm giá"}</td>
                <td>${product.description || "Không có mô tả"}</td>
                <td>
                    <img src="../images/${product.imageFileName}" alt="${product.name}" style="width: 50px; height: 50px;">
                </td>
                <td>
                    <button onclick="editProduct('${product.id}')">Sửa</button>
                    <button onclick="deleteProduct('${product.id}')">Xóa</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

/**
 * Chuyển đến trang chỉnh sửa sản phẩm
 * @param {string} productId
 */
function editProduct(productId) {
    window.location.href = `updateProduct.html?productId=${productId}`;
}
