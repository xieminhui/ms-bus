define("components/common-sidebar/common-sidebar.ts",function(e,n){"use strict";var i=e("node_modules/avalon2/dist/avalon"),t=e("vendor/beyond/index"),a=e("services/menuService.ts");i.effect("collapse",{enter:function(e,n){$(e).slideDown(200,n)},leave:function(e,n){$(e).slideUp(200,n)}}),n.name="common-sidebar",i.component(n.name,{template:'\n<ul class="nav sidebar-menu">\n    <!--Dashboard-->\n    <li :visible="item.show" \n        :class="[((@actived===item.name || @isChildActived(item)) ? \'active\' : \'\'), ((@opened === item.name && !@compact) ? \'open\' : \'\')]" \n        :for="item in @menu">\n        <a :attr="{href: item.href, target: item.target}" \n            :class="[((item.children && item.children.length > 0) ? \'menu-dropdown\' : \'\')]"  \n            :click="@menuClick(item)">\n            <i :class="[\'menu-icon\', \'glyphicon\', item.icon]"></i>\n            <span class="menu-text"> {{ item.name }} </span>\n            <i class="menu-expand" :if="item.children && item.children.length > 0"></i>\n        </a>\n        <ul class="submenu" :effect="{is:\'collapse\',action:@opened == item.name?\'enter\':\'leave\'}">\n            <li :visible="sub.show" :class="[(actived===sub.name ? \'active\' : \'\')]" :for="sub in item.children || []">\n                <a :attr="{href: sub.href, target: sub.target}" :click="@menuClick(sub, item)">\n                    <span class="menu-text">{{ sub.title }}</span>\n                </a>\n            </li>\n        </ul>\n    </li>\n</ul>\n',defaults:{menu:[],actived:"dashboard",opened:"",compact:!1,menuClick:function(e,n){e.children&&0!==e.children.length?this.opened=this.opened==e.name?"":e.name:(this.actived=e.name,n&&(this.opened=n.name))},search:function(){this.$fire("all!title","Demo")},isChildActived:function(e){if(e.children&&0!==e.children.length){for(var n=0,i=void 0;i=e.children[n++];)if(i.name===this.actived)return!0;return!1}},onInit:function(){var e=this;a.menu.then(function(n){e.menu=n})},onReady:function(){t.initSidebar()}}})});