var COMMON = {};

//basic
COMMON.basic = {
    isMobile : function()
    {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);       
    },
    getVersionIE : function ()
    {
        var word;
        var agent = navigator.userAgent.toLowerCase(); 
   
        // IE old version ( IE 10 or Lower ) 
        if ( navigator.appName == "Microsoft Internet Explorer" ) word = "msie "; 
   
        // IE 11 
        else if ( agent.search( "trident" ) > -1 ) word = "trident/.*rv:"; 
   
        // Microsoft Edge  
        else if ( agent.search( "edge/" ) > -1 ) word = "edge/"; 
   
        // 그외, IE가 아니라면 ( If it's not IE or Edge )  
        else return -1; 
   
        var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 
   
        if (  reg.exec( agent ) != null  ) return parseFloat( RegExp.$1 + RegExp.$2 ); 
   
        return -1;
    },
    browserVersionChk : function ()
    {
        var verNumber = this.getVersionIE();
        return verNumber;
    },
    removeTag : function(txt) 
    {
         return txt.replace(/(<([^>]+)>)/gi, "");
    },
    /**
     * @brief random string function
     * @param {string} string 
     * @param {number} len 
     */
    randomString : function(string, len)
    {
        if(!string)
        {
            string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        }

        var string_length = len;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * string.length);
        randomstring += string.substring(rnum,rnum+1);
        }
        
        return randomstring;
    }
};

/**
 * @brief 현재 날짜 시간 구하는 함수
 * @retruns  {string}    date string
 */
COMMON.date = {
    todayYMD : function()
    {
        var date    = new Date();

        var year    = date.getFullYear();
        var month   = date.getMonth() + 1;
        var day     = date.getDate();
        var hours   = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },
    /**
     * @biref 년 주차 구하기
     */
    weekCount : function(today)
    {
        var year = dt.getFullYear();
        var countDay = new Date(year,1,1);
        var week = 1;

        while(today>countDay){
            countDay.setDate(countDay.getDate()+ 1);

            var countNum = countDay.getDay();
            if(countNum == 0)
            {
                week++;
            }//if
        }//while
        return week;        
    }
};

/**
 * @brief cookie object
 */
COMMON.cookie = {
    /**
     * @brief 쿠카값 가져오기
     * @param {string} cName 
     * @returns {string} unescape value
     */
    getCookie : function (cName)
    {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    },
    /**
     * @brief 쿠키 설정
     * @param {string} cName
     * @param {string} cValue
     * @param {number} cDay
     */
    setCookie : function (cName, cValue, cDay)
    {
        var expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    },
    /**
     * @brief cookie delete
     * @param {string} name 
     */
    delCookie : function (name)
    {
        var today = new Date();

        today.setTime(today.getTime() - 1);
        var value = get_cookie(name);
        if(value != "")
        {
            document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
        }
    }
};


/**
 * @brief   form data check & change
 */
COMMON.form = {
    /**
     * @brief 콤마찍기
     * @param {string} str 
     */
    comma : function(str)
    {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },
    /**
     * @brief   콤마 풀기
     * @param {string} str 
     */
    uncomma : function(str) 
    {
        str = String(str);
        return str.replace(/[^\d]+/g, '');        
    },
    inputNumComma : function(obj) //input num comma
    {
        obj.value = this.comma(this.uncomma(obj.value));
    },
    /**
     * @brief   숫자만 추출
     * @param {string} str 
     */
    str_num : function(str)
    {
        var res = str.replace(/[^0-9]/g,"");    
        return res;
    },
    /**
     * @biref 자리수 채우기
     * @param {string} n 
     * @param {number} width
     * @returns {string} 
     */
    left_pad : function(n, width)
    {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;        
    },
    /**
     * @brief   공백제거
     * @param {string} stringToTrim 
     * @returns {string} trim string
     */
    trim : function(stringToTrim)
    {
        var str = stringToTrim.replace(/^\s+|\s+$/g,"");
	
        if(str == "" || str == "undefined")
        {
            str = null;
        }
        
        return str;
    },
    /**
     * 
     * @param {string} str 
     * @param {number} limit 
     */
    limitText : function(str, limit)
    {        
        if(str.length > limit)
        {
            alert("글자수가 " + limit + " 자로 제한되어 있습니다.");
        }
    },
    /**
     * @brief input:text -> number check
     * @param {string} event 
     */
    onlyNumber : function(event)
    {
        event = event || window.event;
        var keyID = (event.which) ? event.which : event.keyCode;
        if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
            return;
        else
            return false;
    },
    /**
     * @brief 숫자만 입력받게 함.
     * @param {string} e 
     */
    checkNum : function(e) {
        var keyVal = event.keyCode;
 
        if(((keyVal >= 48) && (keyVal <= 57))){
            return true;
        }
        else{
            var id = e.attributes[2].nodeValue;
            document.getElementById(id).value = "";
            alert("숫자만 입력가능합니다");
            return false;
        }
    },
    /**
     * @brief input:text -> string remove
     * @param {string} event 
     */
    removeString : function(event)
    {
        event = event || window.event;
        var keyID = (event.which) ? event.which : event.keyCode;
        if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
            return;
        else
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
};


/**
 * @brief member register & modify validation
 */
COMMON.mbChk = {
    minLength : 8,  //password minlength
    maxLength : 15, //password maxlength

    /**
     * @brief 특수문자 체크
     * @param {string} str 
     */
    chkSpecial : function(str)
    {
        var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi; 
        
        if(special_pattern.test(str) == true) 
        { 
            return true; 
        } 
        else 
        { 
            return false; 
        }
    },
    /**
     * @brief email check
     * @param {string} email 
     */
    emailChk : function(email){
        var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;	

        if(exptext.test(email) == false)
        {
            return false;
        }        
    },
    /**
     * @brief member regist -> password chk
     * @param {boolean} password 
     */
    passwdChk : function(password)
    {
        var pw = password;
        var num = pw.search(/[0-9]/g);
        var eng = pw.search(/[a-z]/ig);
        var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
        var _bool = true;
    
        if(pw.length < this.minLength || pw.length > this.maxLength)
        {
            alert("8자리 ~ 15자리 이내로 입력해주세요.");
            _bool = false;
        }
    
        if(pw.search(/₩s/) != -1)
        {
            alert("비밀번호는 공백업이 입력해주세요.");
            _bool = false;
        } 
        
        if(num < 0 || eng < 0 || spe < 0 )
        {
            alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
            _bool = false;
        }	
        
        return _bool;
    }
};

/**
 * @brief   operation
 */
COMMON.arrOperator = {
    /**
     * @brief args plus
     * @param {numer} val
     * @returns {Array<number>}  args sum
     */
    arrPlus : function (val)
    {
        var sum = null;
        for(var i = 0; i < val.length; i++)
        {
            if(val[i] == null || isNaN(val[i]) == true)
            {
                val[i] = 0;
            }
            sum += val[i];
        }
        
        return sum;
    },
    /**
     * @brief args minus
     * @param {number} val 
     * @returns {Array<number>}  args sum
     */
    arrMinus : function (val)
    {
        var sum = null;
        for(var i = 0; i < val.length; i++)
        {
            if(val[i] == null || isNaN(val[i]) == true)
            {
                val[i] = 0;
            }
            sum -= val[i];
        }
        
        return sum;        
    },
    /**
     * @brief   args multiplication
     * @param {number} val 
     * @param {number} amount 
     * @returns {Array<number>}  args sum
     */
    arrMuliplication : function(val, amount)
    {
        var sum = null;
        for(var i = 0; i < val.length; i++)
        {
            if(val[i] == null)
            {
                val[i] = null;										
            }
            sum += val[i] * amount;            
        }
        
        return sum;
    },
    /**
     * @brief   배열 빈값 제거
     * @param {array} actual 
     * @returns {Array<*>}  args sum
     */
    cleanArray : function (actual)
    {
        var newArray = new Array();
        for (var i = 0; i < actual.length; i++) 
        {
            if(actual[i])
            {
                newArray.push(actual[i]);
            }
        }
        return newArray;        
    }
};

/**
 * @brief   url Object
 */
COMMON.url = {
    /**
     * @brief   url parameter 가져오기
     * @param {string} parameter 
     */
    urlParameter : function (parameter)
    {
        var results = new RegExp('[\?&]' + parameter + '=([^&#]*)').exec(window.location.href);
        if(results==null)
        {
           return null;
        }
        else
        {
           return results[1] || 0;
        }
    },
    urlFileName : function ()
    {
        var filename = document.location.href.split("/").slice(-1).pop();
        var newName = filename.split("?");
        
        return newName[0];
    }
};

COMMON.popup = {
    /**
     * @brief   popup open
     * @param {string} url 
     * @param {number} _top 
     * @param {number} _left 
     * @param {number} width 
     * @param {number} height 
     */
    windowOpen : function (url, _top, _left, width, height) 
    {
        window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=" + _top +",left=" + _left +",width=" + width + ",height=" + height);
    }    
};

/**
 * @brief restapi ajax call
 */
COMMON.ajax = {
    /**
     * @brief   ajax call
     * @param {string} _method 
     * @param {string} dir 
     * @param {object} dataObject 
     */
    restfulAjax : function(_method, dir, dataObject){
        $.ajax({
            type: _method,
            cache : false,
            dataType: "json",
            url: URL + "/REST/"+ dir +"/index.php",
            data: JSON.stringify(dataObject),
            success: function(data)
            {
                alert(data['return_msg']);
    
                if(_method != "DELETE")
                {
                    location.reload();
                }
            },
            error: function(r) {
                alert("통신실패...");
            }
        });
    }
};


/**
 * @brief   kakao api
 */
COMMON.kakao = {
    /**
     * @param {string} devide   구분값으로 사용
     */
    DaumPostcode : function (devide){
        daum.postcode.load(function () {
            new daum.Postcode({
                oncomplete: function (data) {
                    
                    var fullAddr = ''; 
                    var extraAddr = '';    
                    
                    if (data.userSelectedType === 'R') 
                    { 
                        fullAddr = data.roadAddress;    
                    } else 
                    { 
                        fullAddr = data.jibunAddress;
                    }    
                    
                    if (data.userSelectedType === 'R') 
                    {                        
                        if (data.bname !== '') 
                        {
                            extraAddr += data.bname;
                        }
                        
                        if (data.buildingName !== '') 
                        {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        
                        fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                    }				
                    
                    if(devide == "mb_zip_btn")
                    {
                        document.getElementById('mb_zip').value = data.zonecode;
                        document.getElementById('mb_addr_1').value = fullAddr;
                        document.getElementById('mb_addr_2').focus();
                    }
                    else if(devide == "o_zip_btn")
                    {
                        document.getElementById('mb_zip').value = data.zonecode;
                        document.getElementById('mb_addr_1').value = fullAddr;
                        document.getElementById('mb_addr_2').focus();
                    }
                }
            }).open();
        });
    },
    /**
     * @brief 주소로 좌표구하기
     * @todo kakao api key change
     */
    addrSearch : function (){
        $.ajax({
            url : "https://dapi.kakao.com/v2/local/search/address.json",
            type : "GET",
            headers : {"Authorization":"KakaoAK e0df51e5220bc10bd8d606c35bd2c9eb"},
            data : {query : decodeURI(addr)},
            cache : false,	
            success : function(data){
                //console.log(data['documents'][0]['x']);
                $("#mb_coodr_x").val(data['documents'][0]['x']);
                $("#mb_coodr_y").val(data['documents'][0]['y']);
                //console.log(data['documents'][0]['x']);
            },
            error: function(error) {
                //console.log(error);
            }
        });	        
    }

};

/**
 * @biref formdata serializeObject change
 */
$.fn.serializeObject = function() {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") 
        {
            var arr = this.serializeArray();
            if (arr) 
            {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }
        }
    } 
    catch (e) 
    {
        alert(e.message);
    } 
    finally { }
 
    return obj;
};

/**
 * @brief formdata file object change
 */
$.fn.serializeFiles = function() {
    var form = $(this),
        formData = new FormData()
        formParams = form.serializeArray();

    $.each(form.find('input[type="file"]'), function(i, tag) {
        $.each($(tag)[0].files, function(i, file) {
            formData.append(tag.name, file);
        });
    });

    $.each(formParams, function(i, val) {
        formData.append(val.name, val.value);
    });

    return formData;
};




