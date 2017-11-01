$(function(){
    $(".mapHide").click(function(){
        $("div.address").hide();
});
$(function() { 
/*=========================================购物车交互================================*/
var $button1=$("button.title-button");
var $button2=$("button.bottom-button");
var $radioCheck=$("img.radio-check");
var $radiosCheck=$("img.radios-check");
function formatMoney(num){                       //以千进制格式化金额
    num = num.toString().replace(/\$|\,/g,'');  
    if(isNaN(num))  
        num = "0";  
    sign = (num == (num = Math.abs(num)));  
    num = Math.floor(num*100+0.50000000001);  
    cents = num%100;  
    num = Math.floor(num/100).toString();  
    if(cents<10)  
    cents = "0" + cents;  
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
    num = num.substring(0,num.length-(4*i+3))+','+  
    num.substring(num.length-(4*i+3));  
    return (((sign)?'':'-') + num + '.' + cents);  
}
function isAny(){
    var isAny=false;
    $radioCheck.each(function(){
        if("isselected"==$(this).attr("isselected")){
            isAny=true;
        }
    })
    if(isAny){
        $button1.css("background-color","#ff9900");
        $button1.css("border-color","#ff9900");
        $button2.css("background-color","#ff9900");
        $button2.removeAttr("disabled");
    }
    else{
        $button1.css("border-color","#AAAAAA");
        $button1.css("background-color","#AAAAAA");
        $button2.css("background-color","#AAAAAA");
        $button2.css("disabled","disabled");
    }
}
function checkIsAll(){
    var isAll=true;
    $radioCheck.each(function(){
        if("false"==$(this).attr("isselected")){
            isAll=false;
        }
    });
    if(isAll){
        $radiosCheck.attr("isselect","isselect");
        $radiosCheck.attr("src","images/cartSelected.png");
    }
    else{
        $radiosCheck.attr("isselect","false");
        $radiosCheck.attr("src","images/cartNotSelected.png");
    }
}
$radioCheck.click(function(){
    var $that=$(this);
    var isselected=$that.attr("isselected");
    if(isselected=="isselected"){
        $that.attr("isselected","false");
        $that.attr("src","images/cartNotSelected.png");
        $that.parents("tr.cart-item").css("background-color","#fff");
    }
    else{
        $that.attr("isselected","isselected");
        $that.attr("src","images/cartSelected.png");
        $that.parents("tr.cart-item").css("background-color","#FFF8E1");
    }
    isAny();
    cal();
    checkIsAll();
})  
$radiosCheck.click(function(){
    var isselect=$(this).attr("isselect");
    if(isselect=="isselect"){
        $(this).attr("isselect","false");
        $(this).attr("src","images/cartNotSelected.png");
        $radioCheck.each(function(){
            $(this).attr("isselected","false");
            $(this).attr("src","images/cartNotSelected.png");
            $(this).parents("tr.cart-item").css("background-color","#fff");
        })
    }
    else{
        $(this).attr("isselect","isselect");
        $(this).attr("src","images/cartSelected.png");
        $radioCheck.each(function(){
            $(this).attr("isselected","isselected");
            $(this).attr("src","images/cartSelected.png");
            $(this).parents("tr.cart-item").css("background-color","#FFF8E1");
        })
    }
    isAny();
    cal();
    checkIsAll();
})
function cal(){
    var sumPrice=0;
    var totalNumber=0;
    $("img.radio-check[isselected='isselected']").each(function(){
        var oid=$(this).attr("oid");
        var price=$(".nowPrice[oid="+oid+"]").text();
        var num=$("input.text[oid="+oid+"]").val();
        price=price.replace(/￥/g,"");
        price=price*num;
        sumPrice+=new Number(price);
        totalNumber+=new Number(num);
    });
    $("span.bottom-price,span.title-price").html("￥"+sumPrice);
    $("span.total").html(totalNumber);
}
$("a.increase").click(function(){
    var pid=$(this).attr("pid");
    var oid=$(".text[oid="+pid+"]").attr("oid");
    var num=$(".text[oid="+oid+"]").val();
    num++;
    $(".text[oid="+oid+"]").val(num);
    isAny();
    cal();
    checkIsAll();
    var oid_=$("img.radio-check[oid="+oid+"]").attr("oid");
    var num_=$("input.text[oid="+oid_+"]").val();
    var price_=$(".nowPrice[oid="+oid_+"]").text();
    price_=price_.replace(/￥/g,"");
    price_=price_*num_;
    var smallPrice=new Number(price_);
    smallPrice=formatMoney(smallPrice);
    $("span.calPrice[oid="+oid+"]").html("￥"+smallPrice);
});
$("a.decrease").click(function(){
    var pid=$(this).attr("pid");
    var oid=$(".text[oid="+pid+"]").attr("oid");
    var num=$(".text[oid="+oid+"]").val();
    num--;
    $(".text[oid="+oid+"]").val(num);
    isAny();
    cal();
    checkIsAll();
    var oid_=$("img.radio-check[oid="+oid+"]").attr("oid");
    var num_=$("input.text[oid="+oid_+"]").val();
    var price_=$(".nowPrice[oid="+oid_+"]").text();
    price_=price_.replace(/￥/g,"");
    price_=price_*num_;
    var smallPrice=new Number(price_);
    smallPrice=formatMoney(smallPrice);
    $("span.calPrice[oid="+oid+"]").html("￥"+smallPrice);
});
/*==========================================显示和隐藏效果=========================*/
var $productDiv=$("div.product");
var $productItem=$("div.product-item");
function showProduct(cid){
    $("div.enum-content[cid="+cid+"]").css("background-color","white");
    $("div.enum-content a[cid="+cid+"]").css("color","lightskyblue");
    $("div.product[cid="+cid+"]").show();
}
function hideProduct(cid){
    $("div.enum-content[cid="+cid+"]").css("background-color","#e2e2e3");
    $("div.enum-content a[cid="+cid+"]").css("color","black");
    $("div.product[cid="+cid+"]").hide();
}
$("div.enum-content").mouseenter(function(){
    var cid=$(this).attr("cid");
    showProduct(cid);
})
$productDiv.mouseenter(function(){
    var cid=$(this).attr("cid");
    showProduct(cid);
})
$productDiv.mouseleave(function(){
    var cid=$(this).attr("cid");
    hideProduct(cid);
})
$("div.enum-content").mouseleave(function(){
    var cid=$(this).attr("cid");
    hideProduct(cid);
})
function addBorder(vid){
    $("div.product-item[vid="+vid+"]").addClass("borderRed");
}
function removeBorder(vid){
    $("div.product-item[vid="+vid+"]").removeClass("borderRed");
}
$productItem.mouseenter(function(){
   var vid=$(this).attr("vid");
   addBorder(vid);
})
$productItem.mouseleave(function(){
    var vid=$(this).attr("vid");
    removeBorder(vid);
})
/*===================================浮动导航栏=================================*/
    var $publish=$("button.publish");
    var $floatled= $("div.floatled");
    var $htmlBody=$("html,body");
    var $ID1=$("#1");
    var $ID2=$("#2");
    var $ID3=$("#3");
    var $ID4=$("#4");
    var $ID5=$("#5");
    $floatled.hide();
    $publish.hide();
    var isclick=false;
    $(window).scroll(function(){
        if(!isclick){
        var _top=$(window).scrollTop();
        if(_top>800&&_top<3700){
            $floatled.show();
            $publish.show();
            if(_top>800&&_top<1400){
                $ID1.addClass("active-red");
                $ID2.removeClass("active-blue");
                $ID3.removeClass("active-green");
                $ID4.css("background-color","#626262");
                $ID5.css("background-color","#626262");
            }
            if(_top>=1400&&_top<2100){
                $ID1.removeClass("active-red");
                $ID2.addClass("active-blue");
                $ID3.removeClass("active-green");
                $ID4.css("background-color","#626262");
                $ID5.css("background-color","#626262");
            }
            if(_top>=2100&&_top<2700){
                $ID2.removeClass("active-blue");
                $ID3.addClass("active-green");
                $ID4.css("background-color","#626262");
                $ID5.css("background-color","#626262");
            }
            if(_top>=2700&&_top<3400){
                $ID1.removeClass("active-red");
                $ID2.removeClass("active-blue");
                $ID3.removeClass("active-green");
                $ID4.css("background-color","#18C9A9");
                $ID5.css("background-color","#626262");
            }
            if(_top>=3400){
                $ID1.removeClass("active-red");
                $ID2.removeClass("active-blue");
                $ID3.removeClass("active-green");
                $ID4.css("background-color","#626262");
                $ID5.css("background-color","#EA5FBD");
            }
        }
        else{
            $floatled.hide();
        }
    }
    });
    $ID1.click(function(){
        $htmlBody.animate({scrollTop: "810px"}, 500);
    });
    $ID2.click(function(){
        $htmlBody.animate({scrollTop: "1410px"}, 500);
    });    
    $ID3.click(function(){
        $htmlBody.animate({scrollTop:"2110px"},500);
    });
    $ID4.click(function(){
        $htmlBody.animate({scrollTop:"2710px"},500);
    });
    $ID5.click(function(){
        $htmlBody.animate({scrollTop:"3410px"},500);
    });
    $("#6").click(function(){
        $htmlBody.animate({scrollTop:"0px"},500);
    });
/*====================================缩略图效果=====================================*/
var $imgSmall=$("img.small");
$imgSmall.mouseenter(function(){
    var bigUrl=$(this).attr("bigUrl");
    $("img.big").attr("src",bigUrl);
});
$("img.big").load(function(){
    $imgSmall.each(function(){
        var url=$(this).attr("bigUrl");
        img =new Image();
        img.src=url;
        img.onload=function(){
            $("div.img4load").append($(img));
        }
    })
});
/*=================================浏览器兼容============================*/
});
function adjustStyle(width) { 
    width = parseInt(width); 
    if ((width < 1700)&&(width>=1400)) { 
        $("#size-stylesheet").attr("href", "css/浏览器兼容/md.css"); 
    } else if ((width >= 1701) && (width < 2000)) { 
        $("#size-stylesheet").attr("href", "css/浏览器兼容/lg.css"); 
    } else if((width>=1000)&&(width<1400)){
        $("#size-stylesheet").attr("href", "css/浏览器兼容/sm.css"); 
    } 
    else { 
       $("#css").attr("href", "<?php bloginfo('stylesheet_url'); ?>"); 
    } 
} 
    adjustStyle($(this).width()); 
    $(window).resize(function() { 
        adjustStyle($(this).width()); 
    }); 
/*==================================产品界面放大镜效果=======================================*/
    $.fn.fangDa = function(){
        var that = $(this);
        $imgNormal=that.find(".normal"); //正常图片容器
        $Img=$imgNormal.find("img");
        $Drag=that.find(".huaKuai");             //滑块容器
        $show=that.find(".fangDa");              //放大图片容器
        $showImg=$show.find("img");
        num=$show.width()/$Drag.width();
        $imgNormal.mousemove(function(e){
            $Drag.css("display","block");  
            $show.css("display","block");
            var iX=e.pageX-$(this).offset().left-$Drag.width()/2;
            var iY=e.pageY-$(this).offset().top-$Drag.height()/2;
            var MaxX=$imgNormal.width()-$Drag.width();
            var MaxY=$imgNormal.height()-$Drag.height();
            iX = iX > 0 ? iX : 0;  
            iX = iX < MaxX ? iX : MaxX;  
            iY = iY > 0 ? iY : 0;  
            iY = iY < MaxY ? iY : MaxY;    
            $showImg.css("width",num*$imgNormal.width());
            $showImg.css("height",num*$imgNormal.height());
            $Drag.css({left:iX+"px",top:iY+"px"});            
            $showImg.css({marginLeft:-num*iX+'px',marginTop:-num*iY+'px'});  
        });
        $imgNormal.mouseout(function(){  
            $Drag.css("display","none");  
            $show.css("display","none");  
        });  
    };
    $("#fangdajing").fangDa();  
});

(function($){
	
	function EasyDropDown(){
		this.isField = true,
		this.down = false,
		this.inFocus = false,
		this.disabled = false,
		this.cutOff = false,
		this.hasLabel = false,
		this.keyboardMode = false,
		this.nativeTouch = true,
		this.wrapperClass = 'dropdown',
		this.onChange = null;
	};
	
	EasyDropDown.prototype = {
		constructor: EasyDropDown,
		instances: {},
		init: function(domNode, settings){
			var	self = this;
			
			$.extend(self, settings);
			self.$select = $(domNode);
			self.id = domNode.id;
			self.options = [];
			self.$options = self.$select.find('option');
			self.isTouch = 'ontouchend' in document;
			self.$select.removeClass(self.wrapperClass+' dropdown');
			if(self.$select.is(':disabled')){
				self.disabled = true;
			};
			if(self.$options.length){
				self.$options.each(function(i){
					var $option = $(this);
					if($option.is(':selected')){
						self.selected = {
							index: i,
							title: $option.text()
						}
						self.focusIndex = i;
					};
					if($option.hasClass('label') && i == 0){
						self.hasLabel = true;
						self.label = $option.text();
						$option.attr('value','');
					} else {
						self.options.push({
							domNode: $option[0],
							title: $option.text(),
							value: $option.val(),
							selected: $option.is(':selected')
						});
					};
				});
				if(!self.selected){
					self.selected = {
						index: 0,
						title: self.$options.eq(0).text()
					}
					self.focusIndex = 0;
				};
				self.render();
			};
		},
	
		render: function(){
			var	self = this,
				touchClass = self.isTouch && self.nativeTouch ? ' touch' : '',
				disabledClass = self.disabled ? ' disabled' : '';
			
			self.$container = self.$select.wrap('<div class="'+self.wrapperClass+touchClass+disabledClass+'"><span class="old"/></div>').parent().parent();
			self.$active = $('<span class="selected">'+self.selected.title+'</span>').appendTo(self.$container);
			self.$carat = $('<span class="carat"/>').appendTo(self.$container);
			self.$scrollWrapper = $('<div><ul/></div>').appendTo(self.$container);
			self.$dropDown = self.$scrollWrapper.find('ul');
			self.$form = self.$container.closest('form');
			$.each(self.options, function(){
				var	option = this,
					active = option.selected ? ' class="active"':'';
				self.$dropDown.append('<li'+active+'>'+option.title+'</li>');
			});
			self.$items = self.$dropDown.find('li');
			
			if(self.cutOff && self.$items.length > self.cutOff)self.$container.addClass('scrollable');
			
			self.getMaxHeight();
	
			if(self.isTouch && self.nativeTouch){
				self.bindTouchHandlers();
			} else {
				self.bindHandlers();
			};
		},
		
		getMaxHeight: function(){
			var self = this;
			
			self.maxHeight = 0;
			
			for(i = 0; i < self.$items.length; i++){
				var $item = self.$items.eq(i);
				self.maxHeight += $item.outerHeight();
				if(self.cutOff == i+1){
					break;
				};
			};
		},
		
		bindTouchHandlers: function(){
			var	self = this;
			self.$container.on('click.easyDropDown',function(){
				self.$select.focus();
			});
			self.$select.on({
				change: function(){
					var	$selected = $(this).find('option:selected'),
						title = $selected.text(),
						value = $selected.val();
						
					self.$active.text(title);
					if(typeof self.onChange === 'function'){
						self.onChange.call(self.$select[0],{
							title: title, 
							value: value
						});
					};
				},
				focus: function(){
					self.$container.addClass('focus');
				},
				blur: function(){
					self.$container.removeClass('focus');
				}
			});
		},
	
		bindHandlers: function(){
			var	self = this;
			self.query = '';
			self.$container.on({
				'click.easyDropDown': function(){
					if(!self.down && !self.disabled){
						self.open();
					} else {
						self.close();
					};
				},
				'mousemove.easyDropDown': function(){
					if(self.keyboardMode){
						self.keyboardMode = false;
					};
				}
			});
			
			$('body').on('click.easyDropDown.'+self.id,function(e){
				var $target = $(e.target),
					classNames = self.wrapperClass.split(' ').join('.');

				if(!$target.closest('.'+classNames).length && self.down){
					self.close();
				};
			});

			self.$items.on({
				'click.easyDropDown': function(){
					var index = $(this).index();
					self.select(index);
					self.$select.focus();
				},
				'mouseover.easyDropDown': function(){
					if(!self.keyboardMode){
						var $t = $(this);
						$t.addClass('focus').siblings().removeClass('focus');
						self.focusIndex = $t.index();
					};
				},
				'mouseout.easyDropDown': function(){
					if(!self.keyboardMode){
						$(this).removeClass('focus');
					};
				}
			});

			self.$select.on({
				'focus.easyDropDown': function(){
					self.$container.addClass('focus');
					self.inFocus = true;
				},
				'blur.easyDropDown': function(){
					self.$container.removeClass('focus');
					self.inFocus = false;
				},
				'keydown.easyDropDown': function(e){
					if(self.inFocus){
						self.keyboardMode = true;
						var key = e.keyCode;

						if(key == 38 || key == 40 || key == 32){
							e.preventDefault();
							if(key == 38){
								self.focusIndex--
								self.focusIndex = self.focusIndex < 0 ? self.$items.length - 1 : self.focusIndex;
							} else if(key == 40){
								self.focusIndex++
								self.focusIndex = self.focusIndex > self.$items.length - 1 ? 0 : self.focusIndex;
							};
							if(!self.down){
								self.open();
							};
							self.$items.removeClass('focus').eq(self.focusIndex).addClass('focus');
							if(self.cutOff){
								self.scrollToView();
							};
							self.query = '';
						};
						if(self.down){
							if(key == 9 || key == 27){
								self.close();
							} else if(key == 13){
								e.preventDefault();
								self.select(self.focusIndex);
								self.close();
								return false;
							} else if(key == 8){
								e.preventDefault();
								self.query = self.query.slice(0,-1);
								self.search();
								clearTimeout(self.resetQuery);
								return false;
							} else if(key != 38 && key != 40){
								var letter = String.fromCharCode(key);
								self.query += letter;
								self.search();
								clearTimeout(self.resetQuery);
							};
						};
					};
				},
				'keyup.easyDropDown': function(){
					self.resetQuery = setTimeout(function(){
						self.query = '';
					},1200);
				}
			});
			
			self.$dropDown.on('scroll.easyDropDown',function(e){
				if(self.$dropDown[0].scrollTop >= self.$dropDown[0].scrollHeight - self.maxHeight){
					self.$container.addClass('bottom');
				} else {
					self.$container.removeClass('bottom');
				};
			});
			
			if(self.$form.length){
				self.$form.on('reset.easyDropDown', function(){
					var active = self.hasLabel ? self.label : self.options[0].title;
					self.$active.text(active);
				});
			};
		},
		
		unbindHandlers: function(){
			var self = this;
			
			self.$container
				.add(self.$select)
				.add(self.$items)
				.add(self.$form)
				.add(self.$dropDown)
				.off('.easyDropDown');
			$('body').off('.'+self.id);
		},
		
		open: function(){
			var self = this,
				scrollTop = window.scrollY || document.documentElement.scrollTop,
				scrollLeft = window.scrollX || document.documentElement.scrollLeft,
				scrollOffset = self.notInViewport(scrollTop);

			self.closeAll();
			self.getMaxHeight();
			self.$select.focus();
			window.scrollTo(scrollLeft, scrollTop+scrollOffset);
			self.$container.addClass('open');
			self.$scrollWrapper.css('height',self.maxHeight+'px');
			self.down = true;
		},
		
		close: function(){
			var self = this;
			self.$container.removeClass('open');
			self.$scrollWrapper.css('height','0px');
			self.focusIndex = self.selected.index;
			self.query = '';
			self.down = false;
		},
		
		closeAll: function(){
			var self = this,
				instances = Object.getPrototypeOf(self).instances;
			for(var key in instances){
				var instance = instances[key];
				instance.close();
			};
		},
	
		select: function(index){
			var self = this;
			
			if(typeof index === 'string'){
				index = self.$select.find('option[value='+index+']').index() - 1;
			};
			
			var	option = self.options[index],
				selectIndex = self.hasLabel ? index + 1 : index;
			self.$items.removeClass('active').eq(index).addClass('active');
			self.$active.text(option.title);
			self.$select
				.find('option')
				.removeAttr('selected')
				.eq(selectIndex)
				.prop('selected',true)
				.parent()
				.trigger('change');
				
			self.selected = {
				index: index,
				title: option.title
			};
			self.focusIndex = i;
			if(typeof self.onChange === 'function'){
				self.onChange.call(self.$select[0],{
					title: option.title, 
					value: option.value
				});
			};
		},
		
		search: function(){
			var self = this,
				lock = function(i){
					self.focusIndex = i;
					self.$items.removeClass('focus').eq(self.focusIndex).addClass('focus');
					self.scrollToView();	
				},
				getTitle = function(i){
					return self.options[i].title.toUpperCase();
				};
				
			for(i = 0; i < self.options.length; i++){
				var title = getTitle(i);
				if(title.indexOf(self.query) == 0){
					lock(i);
					return;
				};
			};
			
			for(i = 0; i < self.options.length; i++){
				var title = getTitle(i);
				if(title.indexOf(self.query) > -1){
					lock(i);
					break;
				};
			};
		},
		
		scrollToView: function(){
			var self = this;
			if(self.focusIndex >= self.cutOff){
				var $focusItem = self.$items.eq(self.focusIndex),
					scroll = ($focusItem.outerHeight() * (self.focusIndex + 1)) - self.maxHeight;
			
				self.$dropDown.scrollTop(scroll);
			};
		},
		
		notInViewport: function(scrollTop){
			var self = this,
				range = {
					min: scrollTop,
					max: scrollTop + (window.innerHeight || document.documentElement.clientHeight)
				},
				menuBottom = self.$dropDown.offset().top + self.maxHeight;
				
			if(menuBottom >= range.min && menuBottom <= range.max){
				return 0;
			} else {
				return (menuBottom - range.max) + 5;
			};
		},
		
		destroy: function(){
			var self = this;
			self.unbindHandlers();
			self.$select.unwrap().siblings().remove();
			self.$select.unwrap();
			delete Object.getPrototypeOf(self).instances[self.$select[0].id];
		},
		
		disable: function(){
			var self = this;
			self.disabled = true;
			self.$container.addClass('disabled');
			self.$select.attr('disabled',true);
			if(!self.down)self.close();
		},
		
		enable: function(){
			var self = this;
			self.disabled = false;
			self.$container.removeClass('disabled');
			self.$select.attr('disabled',false);
		}
	};
	
	var instantiate = function(domNode, settings){
			domNode.id = !domNode.id ? 'EasyDropDown'+rand() : domNode.id;
			var instance = new EasyDropDown();
			if(!instance.instances[domNode.id]){
				instance.instances[domNode.id] = instance;
				instance.init(domNode, settings);
			};
		},
		rand = function(){
			return ('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6).toUpperCase();
		};
	
	$.fn.easyDropDown = function(){
		var args = arguments,
			dataReturn = [],
			eachReturn;
			
		eachReturn = this.each(function(){
			if(args && typeof args[0] === 'string'){
				var data = EasyDropDown.prototype.instances[this.id][args[0]](args[1], args[2]);
				if(data)dataReturn.push(data);
			} else {
				instantiate(this, args[0]);
			};
		});
		
		if(dataReturn.length){
			return dataReturn.length > 1 ? dataReturn : dataReturn[0];
		} else {
			return eachReturn;
		};
	};
	
	$(function(){
		if(typeof Object.getPrototypeOf !== 'function'){
			if(typeof 'test'.__proto__ === 'object'){
				Object.getPrototypeOf = function(object){
					return object.__proto__;
				};
			} else {
				Object.getPrototypeOf = function(object){
					return object.constructor.prototype;
				};
			};
		};
		
		$('select.dropdown').each(function(){
			var json = $(this).attr('data-settings');
				settings = json ? $.parseJSON(json) : {}; 
			instantiate(this, settings);
		});
	});
})(jQuery);

var self;var $$=function(id){return"string"==typeof id?document.getElementById(id):id};var Extend=function(target,source){for(var property in source){target[property]=source[property]};return target};imgSwitch=function(container,options){self=this;this._container=$$(container);this.setOptions(options);this.Auto=this.options.Auto;this.Pause=this.options.Pause;this.Type=this.options.Type;this.Navigate=this.options.Navigate;this.Width=this.options.Width;this.Height=this.options.Height;this.Speed=this.options.Speed=="fast"?10:this.options.Speed=="slow"?20:this.options.Speed.match(/\D/g)?15:this.options.Speed;this.PicturePosition=this.options.PicturePosition;this.NavigatePlace=this.options.NavigatePlace;this.arrImgs=this._container.getElementsByTagName("img");this.index=0;this.Case=[[32,1,1],[4,4,2],[16,1,1],[1,1,0],[1,1,1],[1,1,2],[1,1,3],[1,1,4],[1,1,5],[1,1,6],[1,8,2],[4,2,2],[4,2,0],[8,3,0],[4,2,5],[4,1,5],[4,1,3],[1,4,4]];this.pos=0;this.nums=[];this.len=this.arrImgs.length;this.timer=null;this.nexttimer=null;this.count=0;this.flag=false;this.createMask();this.createPagebar();this.start()};imgSwitch.prototype={setOptions:function(options){this.options={Auto:true,Pause:3000,Type:1,Navigate:"numberic",Width:874,Height:211,Speed:"normal",PicturePosition:"inner",NavigatePlace:"inner"};Extend(this.options,options||{})},createMask:function(){var imgMask=document.createElement("DIV");imgMask.id="imgMask";this._mask=imgMask;var ranges=[],masks=[],range;for(var i=0;i<32;i++){range=document.createElement("DIV");range.className="range";masks.push(range.appendChild(document.createElement("DIV")));ranges.push(this._mask.appendChild(range))};this.masks=masks;this.ranges=ranges;this._container.appendChild(this._mask)},setMask:function(bigImg,col,row){var a,b,w=Math.floor(this.Width/col),h=Math.floor(this.Height/row),l=this.ranges.length;this.maskWidth=w;this.maskHeight=h;this.actCount=Math.min(l,row*col);for(var i=0;i<l;i++){a=this.ranges[i].style;b=this.masks[i].style;a.width=b.width=this.maskWidth+"px";a.height=b.height=this.maskHeight+"px";b.background="url("+bigImg+")";b.backgroundPosition=(-i%col)*w+"px "+parseInt(-i/col)*h+"px";b.clip="rect(0 0 0 0)";if(i==col*row-1)break}},timeLine:function(play,end,len){var play=play||Date;var end=end||Date;var len=(len||480)/10;fx=function(x){return x};var s=0;t=0;c=function(f,t){return+f+(t-f)*(s>1?s-Math.floor(s)==0?1:s-Math.floor(s):s)};var exit;if(this.index<14){exit=1}else{exit=this.actCount};return th=setInterval(function(){if(this.index<14){play(c,s=t++/len)};if(s==exit){end(clearInterval(th))}else{play(c,s=t++/len)}},this.Speed)},fxs:[function(el,x){this.clipDiv(el,x(this.maskHeight,0),x(0,this.maskWidth),x(0,this.maskHeight),x(this.maskWidth,0))},function(el,x){this.clipDiv(el,-1,x(0,this.maskWidth),-1,x(this.maskHeight,0))},function(el,x){this.clipDiv(el,x(this.maskHeight,0),-1,x(0,this.maskHeight),-1)},function(el,x){this.clipDiv(el,-1,-1,x(0,this.maskHeight),-1)},function(el,x){this.clipDiv(el,-1,x(0,this.maskWidth),-1,-1)},function(el,x){this.clipDiv(el,-1,x(0,this.maskWidth),x(0,this.maskHeight),-1)},function(el,x){this.clipDiv(el,x(this.maskHeight,0),-1,-1,x(this.maskWidth,0))}],clipDiv:function(el,y,w,h,x){this.flag=false;var params=[y,w,h,x];for(var i=params.length;i--;){params[i]=params[i]<0?'auto':params[i]+'px'};el.style.clip="rect("+params.join(" ")+")";if(y==0||x==0||w==this.maskWidth||h==this.maskHeight)this.flag=true},start:function(){var timer,nextTimer,k=0;var cur=self.arrImgs[self.pos%self.len].src;self.index=self.Type;self.Type||(self.index=Math.round(Math.random()*(self.Case.length-1)));var opt=self.Case[self.index];self.setMask(cur,opt[0],opt[1]);self.timer=self.timeLine(function(x){if(self.index<14){for(var i=self.actCount;i--;){self.fxs[opt[2]].call(self,self.masks[i],x)}}else{if(k<self.actCount){self.fxs[opt[2]].call(self,self.masks[k],x)};if(self.flag)k++}},function(){self._container.style.background='url('+cur+')';if(self.Auto){self.pos++;self.nextTimer=setTimeout(self.start,self.Pause)}});self.prevNum&&(self.prevNum.className='');self.prevNum=self.nums[self.pos%self.len];self.prevNum&&(self.prevNum.className='current')},createPagebar:function(){var num,pageBar;if(self.Navigate!="no"){pageBar=document.createElement("div");self.Navigate=="picture"?pageBar.className="pictureBar":pageBar.className="pageBar";if((self.PicturePosition=="bottom"||self.PicturePosition=="right")&&self.Navigate=="picture"&&self.NavigatePlace=="outer"){self._container.parentNode.appendChild(pageBar)}else if(self.PicturePosition=="left"&&self.Navigate=="picture"&&self.NavigatePlace=="outer"){self._container.parentNode.insertBefore(pageBar,self._container)}else{self._container.appendChild(pageBar)}};if(self.Navigate=="numberic"){for(var i=0;i<self.arrImgs.length;i++){num=document.createElement("A");num.href="javascript:void(0)";num.innerHTML=i+1;self.nums.push(pageBar.appendChild(num));num.numIndex=i;num.onclick=function(){self.pos=this.numIndex;clearTimeout(self.timer);clearTimeout(self.nextTimer);self.start()}}};if(self.Navigate=="picture"){for(var i=0;i<self.len;i++){num=document.createElement("img");num.src=self.arrImgs[i%self.len].src;if(self.PicturePosition=="bottom"&&self.NavigatePlace=="outer"){num.width=(self.Width-4*self.len)/self.len;num.height=self.Height/self.len}else if(self.PicturePosition=="bottom"&&self.NavigatePlace=="inner"){num.width=(self.Width/1.6-5*self.len)/self.len;num.height=self.Height/(1.6*self.len);pageBar.style.cssText="position:absolute;right:10;bottom:10"}else if(self.PicturePosition=="right"&&self.NavigatePlace=="inner"){num.width=(self.Width)/(2*self.len);num.height=(self.Height-2*self.len)/self.len;pageBar.style.cssText="position:absolute;right:0;width:"+(num.width+5);self._container.style.cssText="position:relative;left:0;"}else if(self.PicturePosition=="left"&&self.NavigatePlace=="inner"){num.width=(self.Width)/(2*self.len);num.height=(self.Height-2*self.len)/self.len;pageBar.style.cssText="position:absolute;left:0;width:"+(num.width+5);self._container.style.cssText="position:relative;left:0;"}else{num.width=(self.Width)/(2*self.len);num.height=(self.Height-2*self.len)/self.len;pageBar.style.cssText="float:left;width:"+(num.width+5);self._container.style.cssText="float:left"};pageBar.appendChild(num);self.nums.push(pageBar.appendChild(num));num.numIndex=i;num.onclick=function(){self.pos=this.numIndex;clearTimeout(self.timer);clearTimeout(self.nextTimer);self.start()}}};try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}}}

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-shiv-cssclasses-testprop-testallprops-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(prefixes.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b){for(var d in a){var e=a[d];if(!A(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function C(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}function D(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return z(b,"string")||z(b,"undefined")?B(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),C(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.csstransitions=function(){return D("transition")};for(var E in p)w(p,E)&&(u=E.toLowerCase(),e[u]=p[E](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return B([a])},e.testAllProps=D,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+s.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};