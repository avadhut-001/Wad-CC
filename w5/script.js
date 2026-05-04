function filterbyproduct(category){
    let products = document.querySelectorAll('.product');
    products.forEach(product => {
        if(category==='all' || product.getAttribute('data-cateogry')===category){
            product.style.display = 'block';
        }
        else{
            product.style.display = 'none';
        }
    })
}