/**
 * Created by zaur on 27.07.2014.
 */
(function(){
   var selector = "bb-calendar";
   var now = new Date();
   var tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
   
   var nowStr = bbCalendar.addnull(now.getDate(),now.getMonth()+1,now.getFullYear());
   var tomorrowStr = bbCalendar.addnull(tomorrow.getDate(),tomorrow.getMonth()+1,tomorrow.getFullYear());
   
    window.onload = function(){
        var item = document.getElementById(selector);
		var id = item.getAttribute("data-id");
		var htmlStr = "<div class='date-picker-box'>"+
			"<p class='pink top'>The biggest hostel</br>in Moscow</p>"+
			"<p>Booking </br>here and now</p>"+
			"<div><form action='http://ext.privethostels.ru/widget/v0/book' method='get'><input value='1' type='hidden' name='start'\/><input value='"+id+"' type='hidden' name='af'\/>"+
						"<label>Check-in Date<\/label><div class='item'><input name='date1' id='bb-calendar-from' type='text' value='"+nowStr+"' placeholder=''\/>"+
							"<a href='#' id='bb-calendar-from-btn'><i class='icon i-btn-picker'><\/i><\/a><\/div>"+
						"<label>Check-out Date<\/label><div class='item'><input name='date2' id='bb-calendar-to' type='text' value='"+tomorrowStr+"' placeholder=''\/>"+
							"<a href='#' id='bb-calendar-to-btn'><i class='icon i-btn-picker'><\/i><\/a><\/div>"+
					  "<input class='btn default' type='submit' value='Search'></form></div></div>";
		
		
        item.innerHTML = htmlStr;
		
        var from = document.getElementById("bb-calendar-from"),
            to = document.getElementById("bb-calendar-to"),
            fromBtn = document.getElementById("bb-calendar-from-btn"),
            toBtn = document.getElementById("bb-calendar-to-btn");

        from.onfocus = function(){
            this.select();
            bbCalendar.lcs(this);
        };
        from.onclick = function(){
            event.cancelBubble=true;
            this.select();
            bbCalendar.lcs(this)
        };
        fromBtn.onclick = function(){
            event.cancelBubble=true;
            from.select();
            bbCalendar.lcs(from);
            return false;
        };

        to.onfocus = function(){
            this.select();
            bbCalendar.lcs(this);
        };
        to.onclick = function(){
            event.cancelBubble=true;
            this.select();
            bbCalendar.lcs(this)
        };
        toBtn.onclick = function(){
            event.cancelBubble=true;
            to.select();
            bbCalendar.lcs(to);
            return false;
        };
    };
})();
