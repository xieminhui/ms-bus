import * as avalon from 'avalon2';
import * as bootbox from 'bootbox';
import { parseSlotToVModel } from '../../vendor/avx-component/avx-util';

avalon.component('ms-dialog', {
    template: '<div><div style="display: none"><slot name="header" /><slot name="body"/></div></div>',
    defaults: {
        header: '',
        body: 'blank',
        $parentVmId: '',
        $content: '',
        $dialog: null,
        show: false,
        size: '',
        title: '',
        // TODO: 需要移动到state里面
        isEdit: false,
        uploading: false,
        record: {},
        state: {},
        $cache: {},
        containerVmId: '',
        $post: avalon.noop,
        $beforePost: avalon.noop,
        onCancel() {},
        onInit(event) {
            var vm = event.vmodel;
            vm.$watch('show', function (newV) {
                if (newV) {
                    vm.$dialog = bootbox.dialog({
                        message: vm.body,
                        title: vm.title ? vm.title : vm.header ? vm.header : vm.isEdit ? '修改' : '新增',
                        className: vm.isEdit ? 'modal-primary' : 'modal-success',
                        size: vm.size,
                        buttons: {
                            save: {
                                label: '保存',
                                className: "btn-primary",
                                callback: function () {
                                    return vm.$post({
                                        isEdit: vm.isEdit,
                                        record: vm.record.$model
                                    });
                                }
                            },
                            cancel: {
                                label: '取消',
                                className: "btn-default",
                                callback: function () {
                                }
                            }
                        }
                    }).on('hidden.bs.modal', function (e) { 
                        vm.show = false;
                        vm.onCancel(e);
                        setTimeout(function () {
                            if ($('.modal.in').length) {
                                $('body').addClass('modal-open');
                            } else {
                                $('body').removeClass('modal-open');
                            }
                        }, 100);
                    })
                    .on('shown.bs.modal', function () {
                        
                    });
                    avalon.scan(vm.$dialog.get(0));
                } else {
                    if (vm.$dialog) {
                        vm.$dialog.find('.bootbox-close-button').trigger('click');
                        vm.$cache = {};
                    }
                }
            });
            // TODO: valid通过组件事件来解耦
            vm.$watch('valid', function (newV) {
                if (!this.$dialog) return ;
                var $confirmBtn = this.$dialog.find('.modal-footer > button[data-bb-handler=save]');
                if (newV) {
                    // 去掉确定按钮的disabled属性
                    $confirmBtn.removeAttr('disabled');
                } else {
                    // 给确定按钮加上disabled属性
                    $confirmBtn.attr('disabled', 'disabled');
                }
            });
            vm.$watch('uploading', function (newV) {
                if (!this.$dialog) return ;
                var $confirmBtn = this.$dialog.find('.modal-footer > button[data-bb-handler=save]');
                if (!newV) {
                    // 去掉确定按钮的disabled属性
                    $confirmBtn.removeAttr('disabled');
                } else {
                    // 给确定按钮加上disabled属性
                    $confirmBtn.attr('disabled', 'disabled');
                }
            });
        },
        onReady(event) {
            if (!event) return;
            parseSlotToVModel(this, this.$render.root.children);
        },
        onDispose(event) {
        }
    }
});