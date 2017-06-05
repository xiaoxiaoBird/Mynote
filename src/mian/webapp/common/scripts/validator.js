/*!
 * 功能描述：自定义表单校验扩展类
 * 开发者：tans
 * 创建时间：2015年2月10日
 * 
 * 框架自带的表单验证规则如下：
 * ------------------------------
 * 	required 	- 不能为空			
 * 	pattern		- 正则表达式			
 * 	min/max 	- 指定数字的范围		
 * 	step 		- 步进值				
 * 	url 		- 地址				
 * 	email 		- 邮箱				
 * 	date 		- 日期				
 * ------------------------------
 */
hwui().require("validator", function($, hwui) {
	
	/**
	 * 显示消息
	 */
	var _messages = {
			string: "不允许包含特殊符号和空格",
			stringEN: "只能输入字母",
			stringCH: "只能输入汉字",
			letterNumber: "只能输入字母,数字或-,_等字符",
			stringMinLength: "长度不能小于{1}, 一个汉字占2个字符",
			stringMaxLength: "长度不能大于{1}, 一个汉字占2个字符",
			email:"请输入正确的电子邮箱地址",
			url:"请输入正确的网址",
			postCode: "请正确填写邮政编码",
			mobile: "请正确填写手机号码",
			telephone: "请正确填写座机号码",
			phone: "请正确填写手机号码或座机号码",
			fax: "请正确填写传真号码",
			idCard: "身份证号码填写不正确",
            number:"只能输入数字"
    };
	
	/**
	 * 验证规则
	 * 扩展的表单验证规则如下：
	 * ------------------------------
	 * 	string 			- 不允许包含特殊符号和空格			
	 * 	stringEN		- 只能输入字母			
	 * 	stringCH 		- 只能输入汉字	
	 * 	letterNumber 	- 只能输入字母,数字或-,_等字符			
	 * 	stringMinLength - 长度不能小于{1}, 一个汉字占2个字符				
	 * 	stringMaxLength - 长度不能大于{1}, 一个汉字占2个字符				
	 * 	postCode 		- 请正确填写邮政编码
	 * 	mobile 			- 请正确填写手机号码
	 * 	telephone 		- 请正确填写座机号码
	 * 	phone 			- 请正确填写手机号码或座机号码
	 *  fax 			- 请正确填写传真号码
	 * 	idCard 			- 身份证号码填写不正确
	 * ------------------------------
	 */
	var _rules = {
			
			//字符验证
			string: function(input) {
				var value = input.val();
				var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
				var reg = /^[\u0391-\uFFE5\w]+$/;
				return isBlank(value) || !((input.attr("string") == "true") && !reg.test(value));
			},
			
			//只能输入字母
			stringEN: function(input) {
				var value = input.val();
				var reg = /^[A-Za-z]+$/g;
				return isBlank(value) || !((input.attr("stringEN") == "true") && !reg.test(value));
			},
			
			//只能输入中文
			stringCH: function(input) {
				var value = input.val();
				var reg = /[^u4E00-u9FA5]/g;
				return isBlank(value) || !((input.attr("stringCH") == "true") && !reg.test(value));
			},
			
			//只能输入英文字母或者数字
			letterNumber: function(input) {
				var value = input.val();
				var reg = /^([a-zA-Z0-9_-]+)$/;
				return isBlank(value) || !((input.attr("letterNumber") == "true") && !reg.test(value));
			},
            //只能输入数字
            number: function(input) {
                var value = input.val();
                var reg = /^([0-9_-]+)$/;
                return isBlank(value) || !((input.attr("letterNumber") == "true") && !reg.test(value));
            },
			
	        //字符最小长度验证(一个中文字符长度为2)
	        stringMinLength: function(input) {
	        	var value = input.val(), param = parseFloat(input.attr("stringMinLength")) || 0;
	        	if(value){
	        		var length = value.length;   
		    		for ( var i = 0; i < value.length; i++) {   
		    			if (value.charCodeAt(i) > 127) {   
		    				length++;   
		    			}
		    		}
	        	}
	    		return isBlank(value) || !((typeof input.attr("stringMinLength")!="undefined") && (length < param)); 
	        },
	        
	        //字符最大长度验证(一个中文字符长度为2)
	        stringMaxLength: function(input) {
	        	var value = input.val(), param = parseFloat(input.attr("stringMaxLength")) || 0;
	        	if (value){
	        		var length = value.length;   
		    		for ( var i = 0; i < value.length; i++) {   
		    			if (value.charCodeAt(i) > 127) {   
		    			length++;   
		    			}   
		    		}
	        	}
	    		return isBlank(value) || !((typeof input.attr("stringMaxLength")!="undefined") && (length > param));
	        },
	        //网址验证
	        url:function (input){
	        	var value=input.val();
	        	var reg=/[a-zA-z]+:[^\s]*/;
	        	return isBlank(value) || !((input.attr("url") == "true") && !reg.test(value));
	        },
	        //电子邮箱验证
	        email:function (input){
	        	var value=input.val();
	        	var reg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:info|biz|com|edu|gov|net|am|bz|cn|cx|hk|jp|tw|vc|vn)$/;
	        	return isBlank(value) || !((input.attr("email") == "true") && !reg.test(value));
	        },
	        //邮政编码验证
	        postCode: function(input) {
	        	var value = input.val();
	        	var reg = /^[0-9]{6}$/;    
	    		return isBlank(value) || !((input.attr("postCode") == "true") && !reg.test(value));
	        },
	        
	        //手机号码验证
	        mobile: function(input) {
	        	var value = input.val();
	        	var reg = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
	        	return isBlank(value) || !((input.attr("mobile") == "true") && !reg.test(value));
	        },
	        
	        //座机号码验证
	        telephone: function(input) {
	        	var value = input.val();
	        	//var reg = /^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^0\d2-?\d{8}$)|(^0\d3-?\d{7}$)$/;
	        	var reg = /^\d{7,8}|(\d{3}[-]?\d{8})|(\d{4}[-]?\d{7,8})$/;
	        	return isBlank(value) || !((input.attr("telephone") == "true") && !reg.test(value));
	        },
	        
	        //电话号码验证(包括手机与座机)
	        phone: function(input) {
	        	var value = input.val();
	        	var reg1 = /^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^0\d2-?\d{8}$)|(^0\d3-?\d{7}$)$/;
	        	var reg2 = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
	        	return isBlank(value) || !((input.attr("phone") == "true") && !(reg1.test(value) || reg2.test(value)));
	        },
	        
	        //传真号码验证
	        fax: function(input) {
	        	var value = input.val();
	        	var reg = /^(\d{3,4}-)?\d{7,8}$/;
	        	return isBlank(value) || !((input.attr("fax") == "true") && !reg.test(value));
	        },
	        
	        //身份证验证
	        idCard: function(input) {
	        	var value = input.val();
	        	var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	        	return isBlank(value) || !((input.attr("idCard") == "true") && !reg.test(value));
	        }
	};
	
	/**
	 * 判断字符串是否为空
	 */
	function isBlank(value) {
		var bl = false;
		if ((typeof value == 'string') && value == '') {
			bl = true;
		}
		return bl;
	}
        
	/**
	 * 将自定义验证规则添加进Validator的命名空间中
	 */
	$.extend(hwui.ui.Validator.fn.options.messages, _messages);
	$.extend(hwui.ui.Validator.fn.options.rules, _rules);
});