<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<link rel="stylesheet" href="${pageContext.request.contextPath}/common/styles/style.css" type="text/css">
<script type="text/javascript" src="${pageContext.request.contextPath}/hwui/source/hwui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/scripts/validator.js"></script>
<script type="text/javascript"  src="${pageContext.request.contextPath}/common/scripts/dict.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/scripts/attachment.js"></script>

<script type="text/javascript">
  var rootPath = '${pageContext.request.contextPath}';
  require(['jquery'], function($) {
    var textOriginal = $.fn.text;
    $.fn.text = function() {
      if (arguments.length === 0 && this.attr('type') === 'text/hwui-template') {
        return $.fn.html.call(this);
      } else {
        return textOriginal.apply(this, arguments);
      }
    };

    String.prototype.trim = function() {
      return $.trim(this);
    };
    String.prototype.toHtml = function(){
      var html = this.replace(/[\r\n]/g, "<br/>");
      html = html.replace(/\s/g,"&nbsp;");
      return html;

    }
    $("table:last").css("border-","0px");
  });
</script>