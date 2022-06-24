var productApi = 'http://localhost:3000/products'

function start() {
    getProducts(renderProducts);
    handleCreateForm();
}

start();

function getProducts(callback) {
    fetch(productApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function createProduct(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(productApi, options)
        .then(function(response) {
            response.json();
        })
        .then(callback);
}

function handleDeleteProduct(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(productApi + '/' + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            var productItem = document.querySelector('.product-item-' + id);
            if (productItem) {
                productItem.remove();
            }
        });
}

function renderProducts(products) {
    
    var listProductsBlock = document.querySelector('#list-products');
    var htmls = products.map(function(product) {
        return `
            <div class="col-md-6 col-lg-4" class="product-item-${product.id}">
                <div class="box">
                    <div class="img-box">
                        ${product.fileUploader}
                    </div>
                    <div class="detail-box">
                        <h5>
                            ${product.name}
                        </h5>
                        <div class="price_box">
                            <h6 class="price_heading">
                                ${product.description} <span>₫</span>
                            </h6>
                        <a href="">
                            Mua
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
    });
    listProductsBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function () {

        var fileUploader = document.querySelector('input[name="file-uploader"]').files[0];
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            fileUploader: fileUploader,
            name: name,
            description: description
        };
        createProduct(formData, function() {
            getProducts(renderProducts);
        })
    }
}