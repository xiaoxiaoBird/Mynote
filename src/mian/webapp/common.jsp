<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2016/3/15
  Time: 14:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="/common/common.jsp" flush="true"/>
<html>
<head>
    <title></title>
</head>
<body>
<%--此div用来进行蓝色大标题--%>
<div class="k-window-titlebar k-header" style="margin-top: -29px;">&nbsp;<span class="k-window-title">属地统计</span>
  </div>

<%--数据的绑定:--%>
<td class="editor-label"><label for="comNumber">企业家数:<span
        class="k-required">*</span> </label></td>
<td class="editor-field"><select required="required"
        data-option-label="请选择..." data-role="dropdownlist"
        data-text-field="name" data-value-field="code"
        data-bind="source: comNumberSource,value: comNumber ,text:comNumber ,html:comNumber"
        style="width: 200px;"></select>
</td>
required="required"  要求验证
data-option-label:默认选择(当code为""的值)   data-role:值的表现形式
data-text-field:"name"(显示的值，对象kv中的value)  data-value-field:"code"(对象kv中的key)
data-bind="source: comNumberSource,value: comNumber"(source:字典 ，value为code的值)

<%--查询区域--%>
<div class="k-search searchArea" id="demoSearchArea">
  <table id="selectarea_float" style="float: left">
    <tr><td width="1.2%"></td>
      <td>上报日期： <input type="text" data-role="datepicker" id="startTime" name="startTime"
                       data-bind="value:startTime" style="width: 150px;" /></td>
      <td width="3%px"></td>
      <td class="inputName">危险品名称 <input data-bind="value: chemical_name" class="k-textbox">
        <button class='k-button' id="selectSearchType" >选择</button>
      </td><td width="3%"></td>
      <td width="5%"></td>
      <td><a data-bind="click: doQuery"class="k-button k-button-icontext k-button-search" href="#"><span class="k-icon k-i-search"></span>查询 </a>
        <a data-bind="click: doReset" class="k-button k-button-icontext k-button-reset" href="#"><span class="k-icon k-i-refresh"></span>重置 </a></td>
    </tr>
  </table>
</div>
<div id="selectTypeDialogDiv" style="display: none;z-index: 500;">
    <div class="k-edit-form-container" style="height: 480px; overflow: auto;">
        <div id="typeTree"> </div>
    </div>
</div>

<script type="text/javascript">
    //点击选择弹框详见tree.js
 var  viewModel = hwui.observable({
   startTime: "",                           //初始值
   doQuery: function(){                      //绑定查询
   var startTime = hwui.toString(this.get("startTime"), 'yyyy-MM-dd');  //查询值的输入
     $.ajax({
       type: "POST",
       url: rootPath + "........",
       cache: false,
       async: false,
       dataType: "json",
       data: { },
       success: function (results) {

       }
     })
   },
   doReset: function () {                   //绑定重置
   this.set("chemical_name", "");
   this.set("startTime", new Date());}
 });
  hwui.bind($("#demoSearchArea"), viewModel);
</script>


//自己的行块   ,$("#confirmPerson",$("#comfitform")).val() 取值
<div id="confirmDialog" style="display: none;">
    <div class="k-popup-edit-form k-window-content k-content"
         style="overflow: auto;">
        <div class="k-edit-form-container">
            <form id="comfitform">
                <table id="addtable">
                    <tr>
                        <td class="editor-label">
                            <label for="confirmPerson">
                                <span id="modelIndex">整改人：</span>
                            </label>
                        </td>
                        <td class="editor-field">
                            <div data-container-for="confirmPerson">
                                <input required="required" type="string"   class="k-input k-textbox " id="confirmPerson" name="confirmPerson" style="width: 60%;">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="editor-label">
                            <label for="confirmTime">
                                <span id="modelName">整改时间：</span>
                            </label>
                        </td>
                        <td class="editor-field">
                            <div data-container-for="confirmTime">
                                <input type="date" name="confirmTime" data-type="date" data-bind="value:confirmTime" id="confirmTime" data-role="datepicker"    style="width: 60%;">
                            </div>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</div>

</body>
</html>
