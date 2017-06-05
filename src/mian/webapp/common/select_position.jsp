<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta charset="utf-8">
    <title>选择坐标</title>
    <jsp:include page="/common/common.jsp" flush="true"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/scripts/map/css/maptoolbar.css" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/common/scripts/map/init.js"></script>
    <script type="text/javascript">
        init(rootPath+"/common/scripts/map", "supermap");
    </script>
    <script type="text/javascript" src="scripts/select_position.js"></script>

</head>
<body>
    <div id="mapDiv"></div>
</body>
</html>
