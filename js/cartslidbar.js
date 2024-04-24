
$(document).ready(function(){
// --------------------- 購物車ICON -------------------------

    $('.cartIcon').click(function(){
        if($('#cartslidbarBlock').css('right') === '-370px'){
            $('#cartslidbarBlock').animate({
                right: '0px',
            }, 500,'easeInQuad');
            $('.webOverlay').fadeIn();
        }else{
            $('#cartslidbarBlock').animate({
                right: '-370px',
            },500,'easeInQuad');
            $('.webOverlay').fadeOut();
            }
    })

    $('.webOverlay').click(function() {
        // 點擊遮罩層時隱藏 cartslidbarBlock 和 overlay
        $('#cartslidbarBlock').animate({
            right: '-370px',
            // 引導UI特效
        },500,'easeInQuad');
        $('.webOverlay').fadeOut();
    });

// --------------------- 點擊垃圾桶事件 -------------------------
    $(document).on('click', '.slidbarDel', function() {
        // .siblings() 選擇指定元素的所有同級元素
        let productName = $(this).siblings('.cartslidbarPrice').find('h3').text();
        let result = confirm("你确定要刪除" + productName + "嗎?");

        
        if (result == true) {
            // 取count的整數數字在減1
            let count = parseInt($('.valnum span').text()) - 1;
            $('.valnum span').text(count);
            if(count === 0){
                $('.valnum').hide();
            }

            let getStorage = localStorage.getItem('productCards'); // String
            let cartObj = JSON.parse(getStorage);
            let preRemoveId = $(this).closest('.cartslidbarItem').data('id');
            // console.log(preRemoveId);

            let removeObjItem = cartObj.findIndex(item => item.id === preRemoveId);
            if (removeObjItem !== -1) {
                cartObj.splice(removeObjItem, 1);
            }
            localStorage.setItem('productCards', JSON.stringify(cartObj));
            $(this).closest('.cartslidbarItem').remove();
            
        };
    });


// --------------------- 點擊加入購物車 -------------------------
    
    $('.cartButtonText, .cartbtnPhone').click(function(){
        let count = parseInt($('.valnum span').text())
        $('.valnum span').text(count + 1);
        toastr.success('已將商品加入購物車');
        $('.valnum').show();
    })

// --------------------- 放商品到購物清單 -------------------------

    $('.cartButtonText .putCart').click(function(){
        let productCard = {
            "id" : $(this).data('id'),
            "name": $(this).data('name'),
            "imgUrl" : $(this).data('imgsrc'),
            "price": $(this).data('money'),
            "count" : 1,
        }
       
        let existCart = localStorage.getItem('productCards');

        if(existCart){
            // 將購物車資料轉換為JavaScript物件陣列
            let storedCartItemsJson = JSON.parse(existCart);

            let existingProductIndex = storedCartItemsJson.findIndex(item => item.id === productCard.id);
            if(existingProductIndex !== -1){
                // 如果購物車中已有相同的商品，增加其数量
                storedCartItemsJson[existingProductIndex].count += 1;
                // storedCartItemsJson.push(productCard);
                localStorage.setItem('productCards', JSON.stringify(storedCartItemsJson));
                // 抓數量和價錢
                $('.cartslidbarList').find('.cartslidbarItem').each(function(){
                    let itemId = $(this).data('id');
                    if (itemId === storedCartItemsJson[existingProductIndex].id) {
                       let updateCount =  storedCartItemsJson[existingProductIndex].count;
                       let updatePrice =  storedCartItemsJson[existingProductIndex].price;
                       total = updateCount * updatePrice;
                       let formattedTotal = total.toLocaleString();
                        $(this).find('.cartslidbarPrice p').text('NT:' + formattedTotal);
                        $(this).find('.cartslidbarPrice h4').text('數量：' + updateCount)
                    }
                    // console.log(itemId);
                })

                // console.log(localStorage.getItem('productCards'));
                return;
            } else {
                // 如果購物車沒有東西就新增一個蓋過去
                storedCartItemsJson.push(productCard);
                localStorage.setItem('productCards', JSON.stringify(storedCartItemsJson));
            }

        }else{
            // 將購物車資料轉換為JSON格式的字串
            let cartItemsString = JSON.stringify([productCard]);
            // console.log('cartItemsJson:'+cartItemsJson);
            localStorage.setItem('productCards', cartItemsString);
            // => var productCards = cartItemsString;
        }
        let cartItem = `
            <li class="cartslidbarItem" data-id="${productCard.id}">
                <a href="#"><img src="${productCard.imgUrl}" alt="${productCard.name}">
                    <div class="cartslidbarPrice">
                        <h3>${productCard.name}</h3>
                        <h4>數量: ${productCard.count}</h4>
                        <p>NT:${productCard.price}</p>
                    </div>
                    <i class="fa-regular fa-trash-can slidbarDel"></i>
                </a>
            </li>
        `;

        $('.cartslidbarList').last().append(cartItem);
        
    })

})

// --------------------- 顯示購物車內容或沒有商品的訊息的函式 ---------------------
    
function displayCartItems() {

    // 找到ul的列表
    let cartList = document.querySelector('.cartslidbarList');

    let cartItems = JSON.parse(localStorage.getItem('productCards'));
    // console.log(cartItems);
    
    // 清單裡面有商品時
    if (cartItems && cartItems.length > 0) {
        let cartItem = '';

        cartItems.forEach(function(productCard) {
             cartItem += `
                <li class="cartslidbarItem" data-id="${productCard.id}">
                    <a href="#"><img src="${productCard.imgUrl}" alt="${productCard.name}">
                        <div class="cartslidbarPrice">
                            <h3>${productCard.name}</h3>
                            <h4>數量: ${productCard.count}</h4>
                            <p>NT: ${(productCard.price * productCard.count).toLocaleString()}</p>
                        </div>
                        <i class="fa-regular fa-trash-can slidbarDel"></i>
                    </a>
                </li>`;

                // console.log(cartItem);
        });
        cartList.innerHTML = cartItem;

        $('.valnum span').text(cartItems.length);
        $('.valnum').show();
    } else {
        $('.valnum').hide();
    }
}
