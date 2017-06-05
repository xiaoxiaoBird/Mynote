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
        postCode: "请正确填写邮政编码",
        mobile: "请正确填写手机号码",
        telephone: "请正确填写座机号码",
        phone: "请正确填写手机号码或座机号码",
        fax: "请正确填写传真号码",
        idCard: "身份证号码填写不正确",
        ip: "ip地址填写不符合规范"
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

        //数值比较
        bijiao: function(input) {
            var value = input.val();
            if (input.attr("bijiao")) {
                var body = input.parent().parent().parent().parent().parent().parent();
                var bjname = input.attr("bijiao");
                var bjvalue = $("input[name='" + bjname + "']", body).val();
                var num1 = parseInt(value, 10);
                var num2 = parseInt(bjvalue, 10);
                if (num1 < num2) {
                    input.prev().removeClass("k-input").addClass("k-textbox k-invalid");
                    return false;
                } else {
                    input.prev().addClass("k-input").removeClass("k-textbox k-invalid");
                    return true;
                }
            } else {
                return true;
            }
        },

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

        //字符最小长度验证(一个中文字符长度为2)
        stringMinLength: function(input) {
            var value = input.val(), param = parseFloat(input.attr("stringMinLength")) || 0;
            var length = value.length;
            for ( var i = 0; i < value.length; i++) {
                if (value.charCodeAt(i) > 127) {
                    length++;
                }
            }
            return isBlank(value) || !((typeof input.attr("stringMinLength")!="undefined") && (length < param));
        },

        //字符最大长度验证(一个中文字符长度为2)
        stringMaxLength: function(input) {
            var value = input.val(), param = parseFloat(input.attr("stringMaxLength")) || 0;
            var length = value.length;
            for ( var i = 0; i < value.length; i++) {
                if (value.charCodeAt(i) > 127) {
                    length++;
                }
            }
            return isBlank(value) || !((typeof input.attr("stringMaxLength")!="undefined") && (length > param));
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
        },
        ip: function(input) {
            var value = input.val();
            var reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            return isBlank(value) || !((input.attr("ip") == "true") && !reg.test(value));
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

//--------------------------------------------------------使用示例--------------------------
//  对所有的type为password的input进行验证


var input1 = ' <input class="k-input k-textbox" id="oldPwd" name="oldPwd" type="password"required="true" data-required-msg="不能为空"/>';
var input2 = ' <input class="k-input k-textbox" id="newPwd" name="newPwd" type="password"required="true" data-required-msg="不能为空"/>';
var input3 = ' <input class="k-input k-textbox" id="surPwd" name="surPwd" type="password"required="true" data-required-msg="不能为空"/>';


var   obj={messages: {
    password:"两次密码不一致"  //对应rules中为password的消息提醒
},
 rules:{
    password: function (input) {
        if(input.is("[name=surPwd]")){  //对特定的input验证
            return $("#surPwd").val() == $("#newPwd").val();
        }
        return true;
    }
}};

//这步非常重要～,将自定义的信息和规则绑定到框架中
$.extend(hwui.ui.Validator.fn.options.messages, obj.messages);
$.extend(hwui.ui.Validator.fn.options.rules, obj.rules);
//验证密码是否符合规则
var validator = $("#resetPwdForm").hwuiValidator(obj).data("hwuiValidator");