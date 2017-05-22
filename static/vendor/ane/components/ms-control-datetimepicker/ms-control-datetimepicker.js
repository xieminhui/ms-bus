define("vendor/ane/components/ms-control-datetimepicker/ms-control-datetimepicker",function(e){"use strict";var t=e("avalon"),a=e("node_modules/moment/moment");e("node_modules/moment/locale/zh-cn"),a.locale("zh-cn"),e.loadCss({url:"/ms-bus/static/node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css"}),e("node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker");var n=e("/vendor/ane-component/ane-util");t.component("ms:controlDatepicker",{$template:'\n<div class="form-group">\n    <label class="control-label">{{label}}</label>\n    <div class="input-group">\n        <input class="form-control date-picker" type="text" ms-attr-name="col">\n        <span class="input-group-addon">\n            <i class="fa fa-calendar"></i>\n        </span>\n    </div>\n</div>\n',$replace:1,$dynamicProp:{duplex:{type:"String"}},$init:function(e,t){e.$parentVmId=n.pickToRefs(e,t),n.enableDynamicProp(e,t),e.$watch("duplex",function(t){$("#"+e.$datepickerId).data("DateTimePicker").date(a(t).format())})},$ready:function(e,t){var n,o="picker"+e.$id;e.$datepickerId=o,n=$(t).find("input.date-picker").attr("id",o).val(a(e.duplex).format()),n.datetimepicker({format:e.format,showClose:!1}),n.on("dp.change",function(t){e.$dynamicProp.duplex.setter(a(t.target.value).utc().format()),n.trigger("input")})},$dispose:function(e,t){n.removeFromRefs(e,t)},$parentVmId:"",label:"",col:"",duplex:"",format:"YYYY-MM-DD",$datepickerId:""}),t.component("ms:controlDatetimepicker",{$template:'\n<div class="form-group">\n    <label class="control-label">{{label}}</label>\n    <div class="input-group">\n        <input class="form-control date-picker" type="text" ms-attr-name="col">\n        <span class="input-group-addon">\n            <i class="fa fa-calendar"></i>\n        </span>\n    </div>\n</div>\n',$replace:1,$dynamicProp:{duplex:{type:"String"}},$init:function(e,t){e.$parentVmId=n.pickToRefs(e,t),n.enableDynamicProp(e,t),e.$watch("duplex",function(t){$("#"+e.$datepickerId).data("DateTimePicker").date(a(t).format())})},$ready:function(e,t){var n,o="picker"+e.$id;e.$datepickerId=o,n=$(t).find("input.date-picker").attr("id",o).val(a(e.duplex).format()),n.datetimepicker({format:e.format,showClose:!0}),n.on("dp.change",function(t){e.$dynamicProp.duplex.setter(a(t.target.value).utc().format()),n.trigger("input")})},$dispose:function(e,t){n.removeFromRefs(e,t)},$parentVmId:"",label:"",col:"",duplex:"",format:"YYYY-MM-DD HH:mm:ss",$datepickerId:""})});