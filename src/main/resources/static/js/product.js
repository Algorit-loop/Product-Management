/**
 * Gọi API lấy danh sách sản phẩm
 * @returns {Promise<Array>} Mảng các sản phẩm
 */
async function fetchAllProducts() {
    try {
        const response = await fetch("/products");
        if (!response.ok) throw new Error(`Không thể lấy danh sách sản phẩm, HTTP ${response.status}`);

        const data = await response.json();
        if (data.code !== 200) throw new Error(data.message || "Lỗi khi lấy danh sách sản phẩm");

        return data.result;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        alert("Không thể tải sản phẩm. Vui lòng thử lại!");
        return [];
    }
}

/**
 * Gọi API tạo sản phẩm mới
 * @param {object} productData { name, brand, category, price, discount, description, imageFileName }
 * @returns {Promise<object>} Sản phẩm đã tạo thành công
 */
async function createProduct(productData) {
    try {
        const response = await fetch("/crproduct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        if (!response.ok) throw new Error(`Không thể tạo sản phẩm, HTTP ${response.status}`);

        const data = await response.json();
        if (data.code !== 200) throw new Error(data.message || "Tạo sản phẩm thất bại");

        return data.result;
    } catch (error) {
        console.error("Lỗi khi tạo sản phẩm:", error);
        alert("Không thể tạo sản phẩm. Vui lòng kiểm tra thông tin nhập vào!");
    }
}

/**
 * Gọi API lấy sản phẩm theo ID
 * @param {string} productId
 * @returns {Promise<object>} Thông tin sản phẩm
 */
async function fetchProductById(productId) {
    try {
        const response = await fetch(`/product/${productId}`);
        if (!response.ok) throw new Error(`Không thể tải sản phẩm, HTTP ${response.status}`);

        const data = await response.json();
        if (data.code !== 200) throw new Error(data.message || "Lỗi khi tải sản phẩm");

        return data.result;
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        alert("Không thể tải sản phẩm.zzz Vui lòng thử lại!");
    }
}

/**
 * Gọi API cập nhật sản phẩm
 * @param {string} productId
 * @param {object} updateData { name, brand, category, price, discount, description, imageFileName }
 * @returns {Promise<object>} Sản phẩm sau khi update
 */
async function updateProduct(productId, updateData) {
    try {
        const response = await fetch(`/product/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) throw new Error(`Không thể cập nhật sản phẩm, HTTP ${response.status}`);

        const data = await response.json();
        if (data.code !== 200) throw new Error(data.message || "Cập nhật sản phẩm thất bại");

        return data.result;
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        alert("Không thể cập nhật sản phẩm. Vui lòng kiểm tra thông tin!");
    }
}

/**
 * Gọi API xoá sản phẩm
 * @param {string} productId
 * @returns {Promise<void>}
 */
async function deleteProduct(productId) {
    try {
        if (!checkAdminAccess()) return;
        if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

        const response = await fetch(`/product/${productId}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error(`Không thể xoá sản phẩm, HTTP ${response.status}`);

        const data = await response.json();
        if (data.code !== 200) throw new Error(data.message || "Xóa sản phẩm thất bại");

        alert("Xóa sản phẩm thành công!");
        location.reload();
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Không thể xóa sản phẩm. Vui lòng thử lại!");
    }
}
