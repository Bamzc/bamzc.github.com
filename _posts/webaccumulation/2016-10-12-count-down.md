---
layout: study
title: 倒计时
tags: ['js','date']
categories: ['网站','倒计时']
header: count_down
tagline: 倒计时实现
date: 2016-10-12 10:21:00
loadCss: ['study_relevant']
loadJs: ['study_relevant']
ascription: webacc
brief: 倒计时。
group: navigation
---
<div class="countdown">
    <span class="day">00</span>
    天
    <span class="hour">00</span>
    时
    <span class="min">00</span>
    分
    <span class="second">00</span>
    秒
</div>
<pre>
<textarea class="cm_textarea">
	<div class="countdown">
	    <span class="day">00</span>
	    天
	    <span class="hour">00</span>
	    时
	    <span class="min">00</span>
	    分
	    <span class="second">00</span>
	    秒
	</div>
	<script type="text/javascript" charset="utf-8">
	/*
	 * @param 倒计时参数——object对象
	 * {
	 *   id : "countdown",  //倒计时模块
	 *   startTime : "2015/8/17 20:00:00", //开始时间
	 *   endTime : "2015/8/18 19:59:59",   //结束时间
	 * }
	 * 
	 * return _Countdown(obj).init()
	 **/
	function _Countdown(obj){
		this.config = obj;
	}
	_Countdown.prototype = {
		init : function(){
			typeof this.config == "object" ? this.initEl() : false;
		},
		initEl : function(){
			if(this.config.id){
				this.pareDiv = document.querySelector("."+this.config.id);
				this.day = this.pareDiv.querySelector(".day");
				this.hour = this.pareDiv.querySelector(".hour");
				this.min = this.pareDiv.querySelector(".min");
				this.second = this.pareDiv.querySelector(".second");
				this.setTimer();
			}
		},
		setTimer : function(){
			var that = this;
			this.getDate(function(time){
				var n1 = new Date(that.config.startTime).getTime(),
					n2 = new Date(that.config.endTime).getTime();
		        var t = n2 - time;
		        if(t <= 0 || time - n1 < 0){
		        	clearTimeout();
		            return;
		        }
		        var d=Math.floor(t/1000/60/60/24);
		        var h=Math.floor(t/1000/60/60%24);
		        var m=Math.floor(t/1000/60%60);
		        var s=Math.floor(t/1000%60);
		        if(d<10){
		            d='0'+d;
		        }
		        if(h<10){
		            h='0'+h;
		        }
		        if(m<10){
		            m='0'+m;
		        }
		        if(s<10){
		            s='0'+s;
		        }
		        that.day.innerHTML = d;
		        that.hour.innerHTML = h;
		        that.min.innerHTML = m;
		        that.second.innerHTML = s;
		        setTimeout(function(){
		            that.setTimer();
		        },1000);
			});
		},
	    getDate : function(cb){
	    	var date = new Date();
	    	cb(date.getTime());
	    }
	};
	var obj = {
		id : "countdown",  //倒计时模块
	   	startTime : "2015/8/17 20:00:00", //开始时间
	   	endTime : "2019/9/19 19:59:59"  //结束时间
	};
	var __c = new _Countdown(obj);
	__c.init();
	</script>
</textarea>
</pre>
<script type="text/javascript" charset="utf-8">
	/*
	 * @param 倒计时参数——object对象
	 * {
	 *   id : "countdown",  //倒计时模块
	 *   startTime : "2015/8/17 20:00:00", //开始时间
	 *   endTime : "2015/8/18 19:59:59",   //结束时间
	 * }
	 * 
	 * return _Countdown(obj).init()
	 **/
	function _Countdown(obj){
		this.config = obj;
	}
	_Countdown.prototype = {
		init : function(){
			typeof this.config == "object" ? this.initEl() : false;
		},
		initEl : function(){
			if(this.config.id){
				this.pareDiv = document.querySelector("."+this.config.id);
				this.day = this.pareDiv.querySelector(".day");
				this.hour = this.pareDiv.querySelector(".hour");
				this.min = this.pareDiv.querySelector(".min");
				this.second = this.pareDiv.querySelector(".second");
				this.setTimer();
			}
		},
		setTimer : function(){
			var that = this;
			this.getDate(function(time){
				var n1 = new Date(that.config.startTime).getTime(),
					n2 = new Date(that.config.endTime).getTime();
		        var t = n2 - time;
		        if(t <= 0 || time - n1 < 0){
		        	clearTimeout();
		            return;
		        }
		        var d=Math.floor(t/1000/60/60/24);
		        var h=Math.floor(t/1000/60/60%24);
		        var m=Math.floor(t/1000/60%60);
		        var s=Math.floor(t/1000%60);
		        if(d<10){
		            d='0'+d;
		        }
		        if(h<10){
		            h='0'+h;
		        }
		        if(m<10){
		            m='0'+m;
		        }
		        if(s<10){
		            s='0'+s;
		        }
		        that.day.innerHTML = d;
		        that.hour.innerHTML = h;
		        that.min.innerHTML = m;
		        that.second.innerHTML = s;
		        setTimeout(function(){
		            that.setTimer();
		        },1000);
			});
		},
	    getDate : function(cb){
	    	var date = new Date();
	    	cb(date.getTime());
	    }
	};
	var obj = {
		id : "countdown",  //倒计时模块
	   	startTime : "2015/8/17 20:00:00", //开始时间
	   	endTime : "2019/9/19 19:59:59"  //结束时间
	};
	var __c = new _Countdown(obj);
	__c.init();
</script>