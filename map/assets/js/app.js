;
(function ($) {
    var tree = [{
        text: "ძირითადი ფენები",
        checkable: false,
        selectable: false,
        nodes: [{
            text: "Google Map",
            selectable: false,
            state: {checked: true}
        }, {
            text: "Google Satellite",
            selectable: false
        }, {
            text: "OpenStreeMap",
            selectable: false
        }]
    }, {
        text: "დამფარავი ფენები",
        checkable: false,
        selectable: false,
        nodes: [{
            text: "ქუჩები",
            selectable: false,
            state: {checked: true}
        }, {
            text: "ავტობუსები",
            selectable: false
        }, {
            text: "TMAP_BUILDINGS",
            selectable: false
        }, {
            text: "TMAP_LR_RAIONI",
            selectable: false
        }, {
            text: "TMAP_LR_UBNEBI",
            selectable: false
        }, {
            text: "TMAP_LR_ROADS",
            selectable: false
        }, {
            text: "TMAP_LR_ROADS_10_25",
            selectable: false
        }, {
            text: "TMAP_LR_ROADS_MAIN",
            selectable: false
        }, {
            text: "TMAP_LR_TBILISI_POLY",
            selectable: false
        }, {
            text: "მომხმარებლის ფენა",
            selectable: false
        }]
    }];

    $(document).ready(function () {
        var $sidebar = $('#sidebar'),
            $tree = $('#tree'),
            $tabServices = $("#tab-services");

        $sidebar.find('.sidebar-toggle').on('click', function () {
            if ($sidebar.hasClass('closed')) {
                $sidebar.removeClass('closed');
                setTimeout(function () {
                    $sidebar.find('.profile a').show();
                }, 200);
                setTimeout(function () {
                    $sidebar.find('.tabs').show();
                }, 300);
            } else {
                $sidebar.addClass('closed')
                    .find('.tabs').hide();
                setTimeout(function () {
                    $sidebar.find('.profile a').hide();
                }, 200);
            }
        });

        var hidePopupsAndForms = function () {
            $tabServices.find('li.hasPopup, li.hasSearchForm').removeClass('open');
        };

        $tabServices.find('.nav-stacked > li > a').on('click', function () {
            hidePopupsAndForms();
            $(this).parent().toggleClass('open')
                .siblings().removeClass('open');
        });

        $tabServices.find('.nav-pills > li[class^="has"] > a').on('click', function () {
            $(this).parent().toggleClass('open')
                .siblings().removeClass('open');
        });

        // TODO: should removed (test only)
        $tabServices.find('.nav-pills > li.hasPopup > ul > li:first-child > a').on('click', function () {
            $('.service-form').toggleClass('open');
        });

        $tree.treeview({
            data: tree,

            // Icons
            expandIcon: 'fa fa-plus',
            collapseIcon: 'fa fa-minus',
            emptyIcon: 'fa',
            checkedIcon: 'fa fa-check-square-o',
            uncheckedIcon: 'fa fa-square-o',

             color: '#fff',
             backColor: 'transparent',
             borderColor: 'transparent',
             onhoverColor: 'transparent',
             selectedBackColor: 'transparent',

            showBorder: false,
            showCheckbox: true,

            onNodeChecked: function (e, node) {
                if (node.parentId == 0) {
                    var checkedNodes = $tree.treeview('getChecked');
                    var tmp = $.grep(checkedNodes, function (value) {
                        return (value.parentId === 0 && value.nodeId !== node.nodeId);
                    });
                    if (tmp.length > 0) {
                        $tree.treeview('uncheckNode', tmp);
                    }
                }
            }
        });
    });
})
(jQuery);