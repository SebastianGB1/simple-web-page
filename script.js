function filterProducts() {
    const category = document.getElementById('category').value;
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        product.style.display = category === 'all' || category === productCategory ? 'block' : 'none';
    });
}