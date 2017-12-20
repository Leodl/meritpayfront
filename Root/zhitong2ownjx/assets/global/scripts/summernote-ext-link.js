(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {

    // Extends plugins for adding hello.
    //  - plugin is external module for customizing.
    $.extend($.summernote.plugins, {
        /**
         * @param {Object} context - context object has status of editor.
         */
        'customLink': function (context) {
            var self = this;

            // ui has renders to build ui elements.
            //  - you can create a button with `ui.button`
            var ui = $.summernote.ui;

            // add hello button
            context.memo('button.customLink', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="note-icon-link"/> 定制链接',
                    tooltip: '定制链接',
                    click: function () {
                        self.$dialog.show();
                        $linkBtn = self.$dialog.find('.note-link-btn');
                        $linkBtn.one('click', function (event) {
                            event.preventDefault();
                            $linkUrl = self.$dialog.find('.note-link-url');
                            $linkText = self.$dialog.find('.note-link-text');
                            self.$dialog.hide();
                            context.invoke('editor.createLink', {"text":$linkText.val(),"url":$linkUrl.val()});
                        });
                    }
                });

                // create jQuery object from button instance.
                var $customLink = button.render();
                return $customLink;
            });

            // This events will be attached when editor is initialized.
            this.events = {
                // This will be called after modules are initialized.
                'summernote.init': function (we, e) {
                },
                // This will be called when user releases a key on editable.
                'summernote.keyup': function (we, e) {
                }
            };

            // This method will be called when editor is initialized by $('..').summernote();
            // You can create elements for plugin
            this.initialize = function () {
                var $container = $(document.body);

                var body = '<div class="form-group">' +
                    '<label>显示文本</label>' +
                    '<input class="note-link-text form-control" type="text" />' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label>链接地址</label>' +
                    '<input class="note-link-url form-control" type="text" value="http://" />' +
                    '</div>';
                var footer = '<button href="#" class="btn btn-primary note-link-btn" >插入链接</button>';

                this.$dialog = ui.dialog({
                    className: 'link-dialog',
                    title: '插入链接',
                    fade: false,
                    body: body,
                    footer: footer
                }).render().appendTo($container);
            };

            // This methods will be called when editor is destroyed by $('..').summernote('destroy');
            // You should remove elements on `initialize`.
            this.destroy = function () {
                this.$dialog.remove();
            };
        }
    });
}));