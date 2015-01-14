/* global define, require */
/**
 * placeholder - HTML5 input placeholder polyfill
 * Copyright (c) 2012 DIY Co
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 * @author John Hunter
 * @author Aaron Latham-Ilari <az@dev-io.us>
 *
 * This fork https://github.com/azt3k/jquery-placeholder
 *
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {

    var NATIVE_SUPPORT = ('placeholder' in document.createElement('input')),
        CSS_PROPERTIES = [
            '-moz-box-sizing', '-webkit-box-sizing', 'box-sizing',
            'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
            'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
            'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
            'line-height', 'font-size', 'font-family', 'width', 'height', 'min-height',
            'top', 'left', 'right', 'bottom'
        ],
        defaults = {
            force: false,                    // force all browsers to use polyfill
            hideOnInput: true,               // hide placeholder on text input instead of focus (consistent with recent browsers)
            placeholderClass: 'placeholder'  // attribute name to use for placeholder
        },
        ignoreKeys = [
            27, // Escape
            33, // Page up
            34, // Page down
            35, // End
            36, // Home
            37, // Left
            38, // Up
            39, // Right
            40, // Down
            16  // Shift
        ],
        deleteKeys = [
            8,  // Backspace
            46  // Delete
        ],
        setupPlaceholder = function(input, options) {
            var i, evt, text, styles, zIndex, marginTop, dy, attrNode, $placeholder,
                $input = $(input);

            try {
                attrNode = $input[0].getAttributeNode('placeholder');
                if (!attrNode) { return; }
                text = $input[0].getAttribute('placeholder');
                if (!text || !text.length) { return; }
                $input[0].setAttribute('placeholder', '');
                $input.data('placeholder', text);
            } catch (e) {
                return;
            }

            // enumerate textbox styles for mimicking
            styles = {};
            for (i = 0; i < CSS_PROPERTIES.length; i++) {
                var propName = CSS_PROPERTIES[i],
                    propVal = $input.css(propName);
                if (propName === 'width') {
                    if (!propVal || propVal === '0px') {
                        propVal = 'inherit';
                    }
                }
                styles[CSS_PROPERTIES[i]] = propVal;
            }
            zIndex = parseInt($input.css('z-index'), 10);
            if (isNaN(zIndex) || !zIndex) { zIndex = 1; }

            // create the placeholder
            $placeholder = $('<span>').addClass(options.placeholderClass).html(text);
            $placeholder.css(styles);
            $placeholder.css({
                'cursor': $input.css('cursor') || 'text',
                'display': 'block',
                'position': 'absolute',
                'overflow': 'hidden',
                'z-index': zIndex + 1,
                'background': 'none',
                'border-top-style': 'solid',
                'border-right-style': 'solid',
                'border-bottom-style': 'solid',
                'border-left-style': 'solid',
                'border-top-color': 'transparent',
                'border-right-color': 'transparent',
                'border-bottom-color': 'transparent',
                'border-left-color': 'transparent'
            });
            $placeholder.insertBefore($input);

            // compensate for y difference caused by absolute / relative difference (line-height factor)
            dy = $input.offset().top - $placeholder.offset().top;
            marginTop = parseInt($placeholder.css('margin-top'), 10);
            if (isNaN(marginTop)) { marginTop = 0; }
            $placeholder.css('margin-top', marginTop + dy);

            // event handlers + add to document
            $placeholder.on('mousedown', function() {
                if (!$input.is(':enabled')) { return; }
                setTimeout(function(){
                    $input.trigger('focus');
                }, 0);
            });

            if (options.hideOnInput) {
                $input.on('keydown.placeholder', function(e) {
                    if (e.ctrlKey || e.altKey) { return; }
                    if ($.inArray(e.keyCode, ignoreKeys) !== -1) { return; }
                    if ($.inArray(e.keyCode, deleteKeys) !== -1) {
                        setTimeout(function(){
                            if (!$input.val()) {
                                $placeholder.show();
                            }
                        }, 0);
                        return;
                    }
                    $placeholder.hide();
                });
                $input.on('paste', function(e){
                    $placeholder.hide();
                });
            }
            else {
                $input.on('focus.placeholder', function() {
                    $placeholder.hide();
                });
            }

            $input.on('blur.placeholder', function() {
                $placeholder.toggle(!$.trim($input.val()).length);
            });

            if ($input.attr('autocomplete') != 'off') {
                $input[0].onpropertychange = function() {
                    if (event.propertyName === 'value') {
                        $input.trigger('focus.placeholder');
                    }
                };
            }

            $input.trigger('blur.placeholder');
        };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    $.fn.placeholder = function(options) {
        var $this = this;
        options = $.extend({}, defaults, options || {});

        if (NATIVE_SUPPORT && !options.force) {
            return this;
        }

        setTimeout(function() {
            $this.each(function() {
                var tagName = this.tagName.toLowerCase();
                if (tagName === 'input' || tagName === 'textarea') {
                    setupPlaceholder(this, options);
                }
            });
        }, 0);

        return this;
    };

}));
