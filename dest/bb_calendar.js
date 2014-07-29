/**
 * Created by zaur on 27.07.2014.
 */
window.bbCalendar = window.bbCalendar || (function(window){
    var calendarModule = {};

    function getObj(objID)
    {
        if (document.getElementById) {return document.getElementById(objID);}
        else if (document.all) {return document.all[objID];}
        else if (document.layers) {return document.layers[objID];}
    }

    function checkClick(e) {
        e?evt=e:evt=event;
        CSE=evt.target?evt.target:evt.srcElement;
        if (CSE.tagName!='SPAN')
            if (getObj('fc'))
                if (!isChild(CSE,getObj('fc')))
                    getObj('fc').style.display='none';
    }

    function isChild(s,d) {
        while(s) {
            if (s==d)
                return true;
            s=s.parentNode;
        }
        return false;
    }

    function Left(obj)
    {
        var curleft = 0;
        if (obj.offsetParent)
        {
            while (obj.offsetParent)
            {
                curleft += obj.offsetLeft
                obj = obj.offsetParent;
            }
        }
        else if (obj.x)
            curleft += obj.x;
        return curleft - 40;
    }

    function Top(obj)
    {
        var curtop = 0;
        if (obj.offsetParent)
        {
            while (obj.offsetParent)
            {
                curtop += obj.offsetTop
                obj = obj.offsetParent;
            }
        }
        else if (obj.y)
            curtop += obj.y;
        return curtop + 5;
    }

// Calendar script
    var now = new Date;
    var sccd=now.getDate();
    var sccm=now.getMonth();
    var sccy=now.getFullYear();
    var ccm=now.getMonth();
    var ccy=now.getFullYear();

// For current selected date
    var selectedd, selectedm, selectedy;

    document.write('<table  id="fc" style="position:absolute;border-collapse:collapse;background:#F6F6F6;border: 1px solid #8b8b8b;display:none;-moz-user-select:none;-khtml-user-select:none;user-select:none;" cellpadding="2">');
    document.write('<thead><tr class="thead" style="font:bold 13px Arial" onselectstart="return false"><td style="cursor:pointer;background: #E3004F;color:#fff;width:17px;height: 30px;border: 1px solid rgb(139, 139, 139);text-align: center;" onclick="bbCalendar.upmonth(-1)">&lt;</td><td colspan="7" id="mns" align="center"></td><td align="right" style="cursor:pointer;background: #E3004F;color:#fff;border: 1px solid rgb(139, 139, 139);width:17px;height: 30px;text-align: center;" onclick="bbCalendar.upmonth(1)">&gt;</td></tr></thead>');
    document.write('<tbody><tr class="week" style="background:#fff;font:12px Arial;color:#646464"><td></td><td align=center>Mon</td><td align=center>Toe</td><td align=center>Wed</td><td align=center>Thu</td><td align=center>Fri</td><td align=center>Sat</td><td align=center>Sun</td><td></td></tr>');
    for(var kk=1;kk<=6;kk++) {
        document.write('<tr class="bordered"><td class="no-bordered"></td>');
        for(var tt=1;tt<=7;tt++) {
            num=7 * (kk-1) - (-tt);
            document.write('<td id="cv' + num + '" style="width:30px;height:22px;box-sizing:border-box;">&nbsp;</td>');
        }

        document.write('<td class="no-bordered"></td></tr>');
    }
    document.write('<tr><td colspan="9">&nbsp;</td></tr>');
    document.write('</tbody></table>');

    document.all?document.attachEvent('onclick',checkClick):document.addEventListener('click',checkClick,false);

    var updobj;
    calendarModule.lcs = function(ielem) {
        updobj=ielem;
        getObj('fc').style.left=Left(ielem)+'px';
        getObj('fc').style.top=Top(ielem)+ielem.offsetHeight+'px';
        getObj('fc').style.display='';

        // First check date is valid
        curdt=ielem.value;
        curdtarr=curdt.split('-');
        isdt=true;
        for(var k=0;k<curdtarr.length;k++) {
            if (isNaN(curdtarr[k]))
                isdt=false;
        }
        if (isdt&(curdtarr.length==3)) {
            ccm=curdtarr[1]-1;
            ccy=curdtarr[2];

            selectedd=parseInt ( curdtarr[0], 10 );
            selectedm=parseInt ( curdtarr[1]-1, 10 );
            selectedy=parseInt ( curdtarr[2], 10 );

            prepcalendar(curdtarr[0],curdtarr[1]-1,curdtarr[2]);
        }

    }

    function evtTgt(e){
        var el;
        if(e.target)el=e.target;
        else if(e.srcElement)el=e.srcElement;
        if(el.nodeType==3)el=el.parentNode; // defeat Safari bug
        return el;
    }
    function EvtObj(e){if(!e)e=window.event;return e;}
    function cs_over(e) {
        evtTgt(EvtObj(e)).style.background='#e3004f';
    }
    function cs_out(e) {
        evtTgt(EvtObj(e)).style.background='#FFFFFF';
    }
    function cs_click(e) {
        updobj.value=calvalarr[evtTgt(EvtObj(e)).id.substring(2,evtTgt(EvtObj(e)).id.length)];
        getObj('fc').style.display='none';
    }

    var mn=new Array('January','February','March','April','May','June','July','August','September','October','November','December');
    var mnn=new Array('31','28','31','30','31','30','31','31','30','31','30','31');
    var mnl=new Array('31','29','31','30','31','30','31','31','30','31','30','31');
    var calvalarr=new Array(42);

    function f_cps(obj) {
        obj.style.background='#FFFFFF';
        obj.style.font='10px Arial';
        obj.style.textAlign='center';
        obj.style.textDecoration='none';
        obj.style.border='';//'1px solid #606060';
        obj.style.cursor='pointer';
    }

    function f_cpps(obj) {
        obj.style.background='#C4D3EA';
        obj.style.font='10px Arial';
        obj.style.textAlign='center';
        obj.style.textDecoration='line-through';
        obj.style.border='1px solid #6487AE';
        obj.style.cursor='default';
    }

    function f_hds(obj) {
        obj.style.background='#e3004f';
        obj.style.font='bold 10px Arial';
        obj.style.textAlign='center';
        obj.style.border='1px solid #6487AE';
        obj.style.cursor='pointer';
    }

// day selected
    function prepcalendar(hd,cm,cy) {
        now=new Date();
        sd=now.getDate();
        td=new Date();
        td.setDate(1);
        td.setFullYear(cy);
        td.setMonth(cm);
        cd=td.getDay();
        if (cd==0)cd=6; else cd--;
        getObj('mns').innerHTML=mn[cm]+'&nbsp;<span style="cursor:pointer" onclick="bbCalendar.upmonth(-12)">&nbsp;</span>'+cy+'<span style="cursor:pointer" onclick="bbCalendar.upmonth(12)">&nbsp;</span>';
        marr=((cy%4)==0)?mnl:mnn;
        for(var d=1;d<=42;d++) {
            cv=getObj('cv'+parseInt(d));
            f_cps(cv);
            if ((d >= (cd -(-1)))&&(d<=cd-(-marr[cm]))) {
                dip=((d-cd < sd)&&(cm==sccm)&&(cy==sccy));
                htd=((hd!='')&&(d-cd==hd));

                cv.onmouseover=cs_over;
                cv.onmouseout=cs_out;
                cv.onclick=cs_click;

                // if today
                /*
                if (sccm == cm && sccd == (d-cd) && sccy == cy)
                    cv.style.color='#fff';*/

                // if selected date
                if (cm == selectedm && cy == selectedy && selectedd == (d-cd) )
                {
                    cv.style.background='#e3004f';
                    //cv.style.color='#e0d0c0';
                    //cv.style.fontSize='1.1em';
                    //cv.style.fontStyle='italic';
                    //cv.style.fontWeight='bold';

                    // when use style.background
                    cv.onmouseout=null;
                }

                cv.innerHTML=d-cd;

                calvalarr[d]=addnull(d-cd,cm-(-1),cy);
            }
            else {
                cv.innerHTML='&nbsp;';
                cv.onmouseover=null;
                cv.onmouseout=null;
                cv.onclick=null;
                cv.style.cursor='default';
            }
        }
    }

    prepcalendar('',ccm,ccy);

    calendarModule.upmonth = function(s)
    {
        marr=((ccy%4)==0)?mnl:mnn;

        ccm+=s;
        if (ccm>=12)
        {
            ccm-=12;
            ccy++;
        }
        else if(ccm<0)
        {
            ccm+=12;
            ccy--;
        }
        prepcalendar('',ccm,ccy);
    };
	
    function today() {
        updobj.value=addnull(now.getDate(),now.getMonth()+1,now.getFullYear());
        getObj('fc').style.display='none';
        prepcalendar('',sccm,sccy);
    }

	function addnull(d,m,y)
    {
        var d0='',m0='';
        if (d<10)d0='0';
        if (m<10)m0='0';

        return ''+d0+d+'.'+m0+m+'.'+y;
    };

	calendarModule.addnull = addnull;
	
    return calendarModule;
})(window);
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
			"<div class='date-picker-head'>"+
			"<i class='icon i-logo'></i><p class='pink'>The biggest hostel</br>in Moscow</p></div>"+
			"<div class='box1'>"+
			"<p>Booking </br>here and now</p>"+
			"<div><form action='http://ext.privethostels.ru/widget/v0/book' method='get'><input value='1' type='hidden' name='start'\/><input value='"+id+"' type='hidden' name='af'\/>"+
						"<label>Check-in Date<\/label><div class='item'><input name='date1' id='bb-calendar-from' type='text' value='"+nowStr+"' placeholder=''\/>"+
							"<a href='#' id='bb-calendar-from-btn'><i class='icon i-btn-picker'><\/i><\/a><\/div>"+
						"<label>Check-out Date<\/label><div class='item'><input name='date2' id='bb-calendar-to' type='text' value='"+tomorrowStr+"' placeholder=''\/>"+
							"<a href='#' id='bb-calendar-to-btn'><i class='icon i-btn-picker'><\/i><\/a><\/div>"+
					  "<input class='btn default' type='submit' value='Search'></form></div></div></div>";
		
		
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
