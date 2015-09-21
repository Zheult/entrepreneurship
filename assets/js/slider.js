/**
 * @author Zheult <zheult@gmail.com>
 * @homepage https://github.com/Zheult
 */
;
(function ($, window) {
    var $window = $(window);
    var pluginName = 'Slider';

    function Slider(el, options) {
        var self = this;

        self.$el = $(el)
            .addClass('slider');

        self.options = options;

        self.$slides = self.$el.find('.slide-item')
            .wrapAll('<div class="slides-wrapper"/>');

        self.$navigation = $('<ul class="navigation"/>')
            .appendTo(self.$el);

        if (options.right) self.$navigation.addClass('navigation-right');

        for (var i = 0, len = self.$slides.length; i < len; i++) {
            self.$navigation.append('<li><a href="javascript:void(0);"></a></li>');
        }

        self.$navigation.find('a').on('click', function () {
            var $parent = $(this).parent();
            $parent.addClass('active')
                .siblings().removeClass('active');
            self.setCurrent($parent.index());
        });

        self.$navigation.find('li:first-child a').trigger('click');

        $window.on('resize', function () {
            self.$slides.imgLiquid();
        }).resize();

        if (options.scrollwheel) {
            $window.bind('DOMMouseScroll', function (e) {
                e.preventDefault();
                e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? self.setPrev() : self.setNext();
            });
        }

        if (options.arrows) {
            $window.on('keyup', function (e) {
                switch (e.keyCode) {
                    // Arrow Left
                    case 37:
                    // Arrow Up
                    case 38:
                        self.setPrev();
                        break;
                    // Arrow Right
                    case 39:
                    // Arrow Down
                    case 40:
                        self.setNext();
                        break;
                }
            });
        }
    }

    Slider.prototype.getSlide = function (index) {
        return index >= 0 && index < this.$slides.length ? this.$slides.eq(index) : this.$slides.eq(0);
    };

    Slider.prototype.setCurrent = function (index) {
        this.$slides.removeClass('visible');
        this.getSlide(index).addClass('visible');
    };

    Slider.prototype.setPrev = function () {
        var $prev = this.getCurrent().prev('.slide-item');
        if ($prev.length) this.$navigation.find('li').eq($prev.index()).find('a').trigger('click');
    };

    Slider.prototype.setNext = function () {
        var $next = this.getCurrent().next('.slide-item');
        if ($next.length) this.$navigation.find('li').eq($next.index()).find('a').trigger('click');
    };

    Slider.prototype.getCurrent = function () {
        return this.$slides.filter('.visible');
    };

    $.fn.Slider = function (options) {
        var defaults = {
            right: true,
            scrollwheel: false,
            arrows: false
        };

        var opts = $.extend({}, defaults, options);

        return this.each(function () {
            var $self = $(this);
            if (!$self.data('plugin_' + pluginName)) {
                $self.data('plugin_' + pluginName, new Slider(this, opts));
            }
        });
    };
})(jQuery, window);
