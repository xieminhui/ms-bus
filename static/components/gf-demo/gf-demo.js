define("components/gf-demo/gf-demo.ts",function(e,t){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,n=1,i=arguments.length;i>n;n++){t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},i=e("node_modules/avalon2/dist/avalon"),a=e("vendor/ane/index.ts"),s=e("services/storeService.ts");t.name="gf-demo",i.component(t.name,{template:'\n<div class="row">\n    <div class="col-xs-12 col-md-12">\n        <ms-dialog :widget="{$innerVm: \'demo_form\', show: @show, onOk: @handleOk, title: @isEdit ? \'修改\' : \'新增\', onCancel: function () { @show = false; }}">\n            <div slot="body" ms-skip>\n                <xmp is="ms-form" :widget="{$form: @$form}">\n                    <ms-form-item :widget="{label: \'ID\'}">\n                        <ms-input :widget="{value:@record.region_id,col: \'region_id\', $rules: { required: true, message: \'地区ID不能为空\' }}"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget="{label: \'名称\'}">\n                        <ms-input :widget="{value:@record.region_name,col: \'region_name\', $rules: { required: true, message: \'地区名称不能为空\' }}"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget="{label: \'PID\'}">\n                        <ms-input :widget="{value:@record.region_parent_id,col: \'region_parent_id\', $rules: { required: true, message: \'地区PID不能为空\' }}"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget="{label: \'套餐\'}" :for="($index, el) in @record.suites">\n                        <ms-input :widget="{value:el.name,col: \'suites[\' + $index + \'].name\'}"></ms-input>\n                    </ms-form-item>\n                </xmp>\n            </div>\n        </ms-dialog>\n        <div class="widget">\n            <div class="widget-header bg-red">\n                <span class="widget-caption">地区列表</span>\n            </div>\n            <div class="widget-body">\n                <ms-form :widget="{$form:@$searchForm,type:\'search\',inline:true}">\n                    <ms-form-item :widget="{label: \'ID\'}">\n                        <ms-input :widget="{col: \'region_id\'}"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget="{label: \'名称\'}">\n                        <ms-input :widget="{col: \'region_name.firstName\'}"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget="{label: \'开始日期\'}">\n                        <ms-input :widget="{col: \'startDate\', $rules: { pattern: @pattern, message: \'日期格式不正确\' }}"></ms-input>\n                    </ms-form-item>\n                    <ms-form-item :widget="{label: \'结束日期\'}">\n                        <ms-input :widget="{col: \'endDate\'}"></ms-input>\n                    </ms-form-item>\n                    <button type="button" class="btn btn-info" :click="@search">\n                        <span class="fa fa-search"></span>搜索\n                    </button>\n                </ms-form>\n                <div class="table-toolbar">\n                    <button class="btn btn-info" :click="actions(\'add\')">\n                        <span class="fa fa-plus">\n                        </span>新增地区\n                    </button>\n                </div>\n                <ms-table :widget="{data:@list,actions:@actions,pagination:@pagination,onChange:@handleTableChange}">\n                    <ms-table-header :widget="{dataIndex:\'region_id\',type:\'selection\'}"></ms-table-header>\n                    <ms-table-header :widget="{title:\'地区\',dataIndex:\'region_name\'}"></ms-table-header>\n                    <ms-table-header :widget="{title:\'PID\',dataIndex:\'region_parent_id\'}"></ms-table-header>\n                    <ms-table-header :widget="{title:\'操作\',dataIndex:\'region_id\'}">\n                        <button type="button" class="btn btn-primary btn-xs" :click="handle(\'edit\')"><i class="fa fa-edit"></i> 编辑</button>\n                        <button type="button" class="btn btn-danger btn-xs" :click="handle(\'delete\')"><i class="fa fa-trash-o"></i> 删除</button>\n                    </ms-table-header>\n                </ms-table>\n            </div>\n        </div>\n    </div>\n</div>\n',defaults:{show:!1,list:[],$searchForm:a.createForm({autoAsyncChange:!1}),pagination:{current:1,pageSize:6,total:0},pattern:/^\d+-\d+-\d+( \d+:\d+:\d+)?$/,search:function(){var e=this;this.$searchForm.validateFields().then(function(t){t&&e.fetch()})},fetch:function(){var e=this,t={start:this.pagination.pageSize*(this.pagination.current-1),limit:this.pagination.pageSize};s.demo.fetch(n({},this.$searchForm.record,t)).then(function(t){e.pagination.total=t.total,e.list=t.list})},actions:function(e,t,n){"add"===e?(o.isEdit=!1,o.title="新增",o.record=s.demo.initialData(),this.show=!0):"edit"===e?(o.isEdit=!0,o.title="修改",o.record=n,this.show=!0):"delete"===e&&s.demo.remove(n.region_id).then(function(e){"0"===e.code&&a.message.success({content:"删除成功"})})},handleOk:function(){var e=this;o.$form.validateFields().then(function(t){t&&(o.isEdit?s.demo.update(o.$form.record).then(function(){e.fetch()}):s.demo.create(o.$form.record).then(function(){e.fetch()}),e.show=!1)})},handleTableChange:function(e){this.pagination.current=e.current,this.fetch()},onInit:function(){this.fetch()}}});var o=i.define({$id:"demo_form",title:"",isEdit:!1,$form:a.createForm({record:s.demo.initialData(),onFieldsChange:function(){}}),record:s.demo.initialData()})});