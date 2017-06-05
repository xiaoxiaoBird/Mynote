<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2016/3/16
  Time: 14:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>

</body>
<script type="text/javascript">
  window.onload=function(){
    hwui().require('tab', 'effect', function($, hwui) {


      $("#tab").hwuiTab({
        dataContentField: 'content',
        dataSource: [
          {
            text: '区县采集设备统计',      //tab 1 的名称
            content: '<iframe id="qxcj" src="/tjsecurity/gov/cartogram/district_monitor_amount.jsp" style="height: 600px;width: 100%;border: 0px;"></iframe>'
          },
          {
            text: '企业采集设备统计',
            content: '<iframe id="qycj" src="/tjsecurity/gov/cartogram/enterprise_monitor_amount.jsp" style="height: 600px;width: 100%;border: 0px;"></iframe>'
          }
        ]
      }).data("hwuiTab").select(0);
    });
  }



</script>
</html>
