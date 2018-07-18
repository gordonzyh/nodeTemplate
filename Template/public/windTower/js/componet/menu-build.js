const menuAnimationSpeed = 400;

$.fn["menuInit"] = function menuInit(data, options) {
     $(".sidebar-menu").remove();
    let showlist = $("<ul class='sidebar-menu'></ul>");
    showall(data, showlist, 0);
    $(this).append(showlist);

    $(this).eventAndOptionSet(options);
    $(this).resize(options["height"], options["width"]);
}

function showall(menu_list, parent, level, hasNex) {
    level++;
    let returnCount = 0;
    for (let i = 0; i < menu_list.length; i++) {
        if (menu_list[i].childs && menu_list[i].childs.length > 0) {
            let nextParent = $("<ul class='treeview-menu level" + level + "'></ul>");
            let count = showall(menu_list[i].childs, nextParent, level, (i !== (menu_list.length - 1)));
            let li = $("<li class='treeview level" + level + "'></li>");
            let a = $("<a href='#'>" +
                "<i class='fa fa-share fa-lg'></i> " +
                "<span>" + menu_list[i].name + "</span>" +
                "<i class='fa fa-plus pull-right'></i>" +
                "<li class='badge pull-right'>" + (count ? count : "") + "</li>" +
                "</a>"
            );
            if (level !== 1) {
                for (let j = 2; j <= level; j++) {
                    if (j === level) {
                        if (i !== menu_list.length - 1) {
                            $("<span class='pull-left point-level" + level + "'></span>").appendTo(li)
                        } else {
                            $("<span class='pull-left point-level" + level + " point-level-end'></span>").appendTo(li)
                        }
                    } else {
                        if (hasNex) {
                            $("<span class='pull-left line-level" + j + "'></span>").appendTo(li)
                        } else {
                            $("<span class='pull-left space-level" + j + "'></span>").appendTo(li)
                        }
                    }
                }

            }
            a.appendTo(li);
            returnCount += count;
            $(nextParent).appendTo(li);
            $(li).appendTo(parent);
        } else {
            let alertNumber = menu_list[i]["alertNumber"] ? menu_list[i]["alertNumber"] : 0;
            returnCount += alertNumber
            let li = $("<li class='level" + level + "'></li>");
            let a = $("<a class='menuNode' href='javasprict:void(0)'>" +
                "<i class='fa fa-circle-o'></i>" +
                "<i class='fa fa-circle-o pull-right' style='visibility: hidden'></i>" +
                "<li class='badge pull-right'>" + (alertNumber ? alertNumber : "") + "</li>" +
                menu_list[i].name +
                "</a>");
            $.data(a[0], "data", menu_list[i]);
            if (level !== 1) {
                for (let j = 2; j <= level; j++) {
                    if (j === level) {
                        if (i !== menu_list.length - 1) {
                            $("<span class='pull-left point-level" + level + "'></span>").appendTo(li)
                        } else {
                            $("<span class='pull-left point-level" + level + " point-level-end'></span>").appendTo(li)
                        }
                    } else {
                        if (hasNex) {
                            $("<span class='pull-left line-level" + j + "'></span>").appendTo(li)
                        } else {
                            $("<span class='pull-left space-level" + j + "'></span>").appendTo(li)
                        }
                    }
                }
            }
            a.appendTo(li);
            li.appendTo(parent);
        }
    }
    level--;
    return returnCount;
}

$.fn["eventAndOptionSet"] = function eventAndOptionSet(options) {
    let _this = this
    _this.find('li a').on('click', function (e) {
        let $this = $(this);
        var checkElement = $this.next();

        if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
            $(checkElement.parent().find('.fa-minus')[0]).removeClass('fa-minus').addClass('fa-plus');
            checkElement.slideUp(menuAnimationSpeed, function () {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
        } else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {//If the menu is not visible
            $(checkElement.parent().find('.fa-plus')[0]).removeClass('fa-plus').addClass('fa-minus');
            checkElement.slideDown(menuAnimationSpeed, function () {
                checkElement.addClass('menu-open');
            });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
        }
    });

    // 菜单末节点Click
    _this.find('.menuNode').on('click', function (e) {
        if (!$(this).parent().is('.active')) {
            $('.menuNode').parents().removeClass('active')
            $(this).parent().addClass('active')
            if (options && options["onNodeClick"]) {
                options["onNodeClick"]($.data(this, "data"));
            }
        }
        e.preventDefault();
    });
    //尺寸变化
    $(window).on('resize', function (options) {
        $(_this).resize(options["height"], options["width"]);
    })
}

$.fn["getSelectedData"] = function getSelectedData() {
    if ($(this).find('.active').length === 0) {
        return null;
    }
    return $.data($(this).find('.active').children('.menuNode')[0], "data");
};
$.fn["resize"] = function resize(height, width) {
    let menuDiv = $(this);
    if (height) {
        menuDiv.height(height);
    } else {
        let container = menuDiv.parent();
        let h = container.height();
        container.children().each(function () {
            if (!$(this).is(menuDiv)) {
                h -= $(this).innerHeight();
            }
        });
        menuDiv.height(h - 10);
        let sidebar_menu = menuDiv.find('.sidebar-menu');
        let divH = menuDiv.height();
        menuDiv.children().each(function () {
            if (!$(this).is(sidebar_menu)) {
                divH -= $(this).innerHeight();
            }
        });
        sidebar_menu.height(divH - 10);
    }
    if (width) {
        menuDiv.width(width);
    } else {
        menuDiv.width("100%");
    }
};

//如果是alertNumber条件，设定为true或者False，当alertNumber为True，条件为alertNumber不为空,false相反
function selectNodefun(_this, query, onlyActive, speed) {
    let childs = _this.find('.menuNode');
    let selectNode = childs[0];
    if (query) {
        for (let i = 0; i < childs.length; i++) {
            let isMatch = true;
            let nodeDate = $.data(childs[i], "data");
            for (let key in query) {
                if (key === 'alertNumber') {
                    if (query[key] && !nodeDate[key]) {
                        isMatch = false;
                        break;
                    } else if (!query[key] && nodeDate[key]) {
                        isMatch = false;
                        break;
                    }
                } else {
                    if (nodeDate[key] !== query[key]) {
                        isMatch = false;
                        break;
                    }
                }
            }
            if (isMatch) {
                selectNode = childs[i];
                break;
            }
        }
    }
    if (speed === null || speed === undefined) {
        speed = menuAnimationSpeed;
    }
    //展开
    $(selectNode).parents('.treeview-menu').slideDown(speed, function () {
        $(this).addClass('menu-open');
        // $($(this).find('.fa-plus')).removeClass('fa-plus').addClass('fa-minus');
        let treeviews = $(this).parent('.treeview');
        $($(this).parent('.treeview').find('.fa-plus')[0]).removeClass('fa-plus').addClass('fa-minus');

        //滚动
        let mainContainer = _this.children('.sidebar-menu');
        if (($(selectNode).offset().top < mainContainer.offset().top) ||
            ($(selectNode).offset().top + $(selectNode).height() > mainContainer.offset().top + mainContainer.height())) {
            //动画效果
            mainContainer.animate({
                scrollTop: $(selectNode).offset().top - mainContainer.offset().top + mainContainer.scrollTop()
            }, 200);//0.2秒滑动到指定位置
        }
    });
    if (selectNode) {
        if (onlyActive) {
            $('.menuNode').parents().removeClass('active');
            $(selectNode).parent().addClass('active');
        } else {
            selectNode.click();
        }
    }
}

$.fn["activeNode"] = function (query, speed) {
    selectNodefun(this, query, true, speed);
};
$.fn["selectNode"] = function (query, speed) {
    selectNodefun(this, query, false, speed);
};
$.fn["clearSelect"] = function (query, speed) {
    $(this).find('.active').removeClass('active')
};