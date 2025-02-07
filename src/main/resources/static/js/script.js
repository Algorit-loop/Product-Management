const apiBaseUrl = ''; // Backend URL (nếu chạy Spring Boot tại localhost:8080, để trống)

// Fetch danh sách sản phẩm
async function fetchProducts() {
    const response = await fetch(`${apiBaseUrl}/products`);
    const products = await response.json();

    const productTable = document.getElementById('product-table');
    productTable.innerHTML = ''; // Reset bảng

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${new Date(product.createAt).toLocaleDateString()}</td>
            <td><img src="images/${product.imageFileName}" alt="${product.name}"></td>
            <td>
                <button onclick="deleteProduct('${product.id}')">Delete</button>
                <button onclick="updateProduct('${product.id}')">Update</button>
            </td>
        `;
        productTable.appendChild(row);
    });
}

// Thêm sản phẩm
async function addProduct() {
    const name = document.getElementById('name').value;
    const brand = document.getElementById('brand').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const imageFileName = document.getElementById('imageFileName').value;

    const response = await fetch(`${apiBaseUrl}/crproduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, brand, category, price, description, imageFileName })
    });

    if (response.ok) {
        alert('Product added successfully!');
        fetchProducts();
    } else {
        alert('Failed to add product.');
    }
}

// Xóa sản phẩm
async function deleteProduct(productId) {
    const response = await fetch(`${apiBaseUrl}/product/${productId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Product deleted successfully!');
        fetchProducts();
    } else {
        alert('Failed to delete product.');
    }
}

// Cập nhật sản phẩm
/*
function updateProduct(productId) {
    const name = prompt('Enter new name:');
    const brand = prompt('Enter new brand:');
    const category = prompt('Enter new category:');
    const price = prompt('Enter new price:');
    const description = prompt('Enter new description:');
    const imageFileName = prompt('Enter new image file name:');

    fetch(`${apiBaseUrl}/product/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, brand, category, price, description, imageFileName })
    }).then(response => {
        if (response.ok) {
            alert('Product updated successfully!');
            fetchProducts();
        } else {
            alert('Failed to update product.');
        }
    });
}*/

// Load sản phẩm khi trang được mở
fetchProducts();
