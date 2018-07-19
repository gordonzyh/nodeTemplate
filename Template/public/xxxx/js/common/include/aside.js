$(function () {
    //拓展侧边栏
    var asideTimer = null;
    $("#aside").mouseenter(function(e){
        asideTimer = setTimeout(function() {
            $(".aside-mask").show();
            $("#aside").switchClass( "aside-min", "aside-max", 200 );
        },300);
    }).mouseleave(function(){
        clearTimeout(asideTimer);
    });

    $(".aside-mask").on("click",function(e){
        clearTimeout(asideTimer);
        $(".aside-mask").hide();
        $("#aside").switchClass( "aside-max", "aside-min", 200);
    });

    //菜单初始化
    $('#menuDiv').menuInit(menuData.leftMenu, {
        onNodeClick: function (data) {
            window.location.href = data.url;
        }
    });
});



