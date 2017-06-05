<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta charset="utf-8">
    <title>任务列表</title>
    <jsp:include page="/common/common.jsp" flush="true"/>

    <script type="text/javascript">
        /**
         * 获取transport
         * 这应该在common.jsp页面中
         * @param module {String} 模块名称
         */
        function getTransport(module) {
            var action = module.charAt(0).toUpperCase().concat(module.slice(1)),
                    elements = [rootPath + '/action/S', module, action, ''].join('_'),
                    getPath = function(method) {
                        return elements + method + '.action';
                    };

            return {
                read: getPath('list'),
                create: getPath('save'),
                update: getPath('save'),
                destroy: getPath('delete')
            };
        }
    </script>
    <script type="text/javascript" src="scripts/hwtask.js"></script>
</head>
<body>
<!-- 查询区域 -->
<div id="hwtaskSearchArea">
    <table width="100%">
        <tr>
            <td class="inputName">流程标题:</td>
            <td><input data-bind="value: processTitle" class="k-textbox"></td>
            <td class="inputName">执行人:</td>
            <td><input data-bind="value: taskUserName" class="k-textbox"></td>
            <td>
                <a class="k-button k-button-icontext k-button-search" href="#">
                    <span class="k-icon k-i-search"></span>查询
                </a>
                <a class="k-button k-button-icontext k-button-reset" href="#">
                    <span class="k-icon k-i-refresh"></span>重置
                </a>
            </td>
        </tr>
    </table>
</div>

<!-- 列表区域 -->
<div id="taskGrid"></div>
</body>
</html>
