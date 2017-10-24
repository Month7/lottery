/*=================================浏览器兼容============================*/
function adjustStyle(width) { 
    width = parseInt(width); 
    if ((width < 1700)&&(width>=1400)) { 
        $("#size-stylesheet").attr("href", "css/浏览器兼容/秒杀/md.css"); 
    } else if ((width >= 1701) && (width < 2000)) { 
        $("#size-stylesheet").attr("href", "css/浏览器兼容/秒杀/lg.css"); 
    } else if((width>=1000)&&(width<1400)){
        $("#size-stylesheet").attr("href", "css/浏览器兼容/秒杀/sm.css"); 
    } 
    else { 
       $("#css").attr("href", "<?php bloginfo('stylesheet_url'); ?>"); 
    } 
} 
$(function() { 
    adjustStyle($(this).width()); 
    $(window).resize(function() { 
        adjustStyle($(this).width()); 
    }); 
    $(".mapHide").click(function(){
        $("div.address").hide();
    })
});