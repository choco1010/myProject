
$(document).ready(function(){
// --------------------- 購物車ICON -------------------------

    $('.cartIcon').click(function(){
        if($('#cartslidbarBlock').css('right') === '-360px'){
            $('#cartslidbarBlock').animate({
                right: '0px',
            }, 500,'easeInQuad');
            $('.overlay').fadeIn();
        }else{
            $('#cartslidbarBlock').animate({
                right: '-360px',
            },500,'easeInQuad');
            $('.overlay').fadeOut();
            }
    })

    $('.overlay').click(function() {
        // 點擊遮罩層時隱藏 cartslidbarBlock 和 overlay
        $('#cartslidbarBlock').animate({
            right: '-360px',
            // 引導UI特效
        },500,'easeInQuad');
        $('.overlay').fadeOut();
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
            $(this).closest('.cartslidbarItem').remove();
        };
    });

// --------------------- 點擊加入購物車 -------------------------
    
    $('.valnum').hide();
    $('.cartButtonText').click(function(){
        let count = parseInt($('.valnum span').text())
        $('.valnum span').text(count + 1);
        toastr.success('已將商品加入購物車');
        $('.valnum').show();            
    })

// --------------------- 放商品到購物清單 -------------------------

    $('.cartButtonText .putCart').click(function(){
        let id = $(this).data('id');
        let name = $(this).data('name');
        let money = $(this).data('money');
        let imgUrl = $(this).data('img-src');
        let cartItem = `
        <li class="cartslidbarItem" data-id = ${id}>
            <a href="#"><img src="${imgUrl}" alt="${name}">
                <div class="cartslidbarPrice">
                    <h3>${name}</h3>
                    <h4>數量: 1</h4>
                    <p>${money}</p>
                </div>
                <i class="fa-regular fa-trash-can slidbarDel"></i>
            </a>
        </li>
        `;

        $('.cartslidbarList').last().append(cartItem);
    })

})


    

