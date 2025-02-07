document.addEventListener("DOMContentLoaded", function () {
    if (!checkAuth()) return; // Kiểm tra đăng nhập

    // Nếu không phải admin, dừng script ngay lập tức
    if (!checkAdminAccess()) return;

    document.getElementById("addProductForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const productData = {
            name: document.getElementById("productName").value,
            brand: document.getElementById("productBrand").value,
            category: document.getElementById("productCategory").value,
            price: parseFloat(document.getElementById("productPrice").value),
            discount: parseFloat(document.getElementById("productDiscount").value || 0),
            description: document.getElementById("productDescription").value,
            imageFileName: document.getElementById("productImageFileName").value,
            createAt: new Date().toISOString(),
        };

        try {
            await createProduct(productData);
            alert("Thêm sản phẩm thành công!");
            window.location.href = "dashboard.html";
        } catch (err) {
            alert("Lỗi khi thêm sản phẩm: " + err.message);
        }
    });
});
