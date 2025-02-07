document.addEventListener("DOMContentLoaded", async function () {
    if (!checkAuth()) return; // Kiểm tra đăng nhập

    // Nếu không phải admin, dừng script ngay lập tức
    if (!checkAdminAccess()) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("productId");

    // Kiểm tra nếu productId không tồn tại
    if (!productId) {
        alert("Lỗi: Không tìm thấy productId.");
        window.location.href = "dashboard.html";
        return;
    }

    try {
        console.log("Fetching product:", productId);
        const product = await fetchProductById(productId);

        // Nếu không lấy được sản phẩm, dừng ngay lập tức
        if (!product) {
            alert("Lỗi: Không tìm thấy sản phẩm.");
            window.location.href = "dashboard.html";
            return;
        }

        document.getElementById("productName").value = product.name;
        document.getElementById("productBrand").value = product.brand;
        document.getElementById("productCategory").value = product.category;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productDiscount").value = product.discount || 0;
        document.getElementById("productDescription").value = product.description || "";
        document.getElementById("productImageFileName").value = product.imageFileName || "";
    } catch (err) {
        console.error("Lỗi khi tải thông tin sản phẩm:", err);
        alert("Không thể tải sản phẩm. Vui lòng thử lại.");
        window.location.href = "dashboard.html";
        return;
    }

    document.getElementById("updateProductForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const updateData = {
            name: document.getElementById("productName").value,
            brand: document.getElementById("productBrand").value,
            category: document.getElementById("productCategory").value,
            price: parseFloat(document.getElementById("productPrice").value),
            discount: parseFloat(document.getElementById("productDiscount").value || 0),
            description: document.getElementById("productDescription").value,
            imageFileName: document.getElementById("productImageFileName").value,
        };

        try {
            console.log("Updating product:", updateData);
            await updateProduct(productId, updateData);
            alert("Cập nhật sản phẩm thành công!");
            window.location.href = "dashboard.html";
        } catch (err) {
            alert("Lỗi khi cập nhật sản phẩm: " + err.message);
            console.error(err);
        }
    });
});
