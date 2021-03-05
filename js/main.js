$(document).ready( function(){
    /*.period_btn 버튼 click event*/
    $('.period_btn div').click( function(){
        $('.period_btn div').removeClass('active');
        if($(this).hasClass('active') == true){
            $(this).removeClass('active');
        }else if($(this).hasClass('active') == false){
            $(this).addClass('active');
        }
    });

    /**
    * @brief coupon_form(쿠폰구매-해피쿠폰) alert 
    */
    $(".coupon_form").submit(function(){
        
        var formObject = $(this).serializeObject();

        if(formObject['card_num'] == ""){
            alert("카드번호를 입력해주세요.");
            return false;
        }

        if(formObject['card_period1'] == ""){
            alert("유효기간을 입력해주세요.");
            return false;
        }

        if(formObject['card_period2'] == ""){
            alert("유효기간을 입력해주세요.");
            return false;
        }
    });

    /**
    * @brief reserve_form (캐시적립) alert 
    */
    $(".reserve_form").submit(function(){
            
        var formObject = $(this).serializeObject();

        if(formObject['coupon_num'] == ""){
            alert("쿠폰번호를 입력해주세요.");
            return false;
        }

        if(formObject['coupon_price'] == ""){
            alert("쿠폰금액을 입력해주세요.");
            return false;
        }
    });
    
    
});

/**
* @brief input only number function
*/
function onlyNumber(){
    if((event.keyCode<48)||(event.keyCode>57))
    event.returnValue=false;
}