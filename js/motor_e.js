var JsonObj;
var jsonNew = [];
var titles = [];
var  namefile;
var tamaño;
var producto_name = new Array(), cat = new Array(), tasa_pond = new Array(), id_prod = new Array(), id_page = new Array();
$( document ).ready(function() {
  json.Init()
});

var json = (function() {
return{
	Init:function(){
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			// console.log("compatible")
		} else {
			alert('Esta aplicación no es con tu browser, por favor ingresa desde otro navegador.');
			
		}
	},
	load:function(event){
		readfile(event)
	},
	leer:function(){
			 tamaño = JsonObj.length
			var html =""
			$("#first").html("")
			$("#bod").html("")
			for(i = 0;i < tamaño; i++){
				 html = html + "<tr>"
				 $.each(JsonObj[i], function (variableName, valor){
				 if(i == 0){$("#first").append("<td width='195px'>"+variableName+"</td>")}
				
					html =  html + "<td><input type='text' value='"+valor+"'/></td>"
				 });
					html = html + "<td align='center' width='195px'><a onclick='del("+i+")' class='delete' href='#'><img src='images/delete.png' width='20' height='20' border='0'></a></td>"
				html = html + "</tr>"
			}
			 $("#first").append(" <td width='45px'><a onclick='json.Agrega()' href='#'><img src='images/plus.png' width='20' height='20' border='0'></a></td>")
           
				
				$("#bod").append(html)
				
			
 	},
	genera:function(){
		JsonObj ="";
		jsonNew = [];
		titles = [];
		 tamañotit = $("#first td").length;
		for(i = 0;i < tamañotit; i++){
			var temp = $("#first td").eq(i).text()
			titles.push(temp)
		}
		$.each($("#bod tr"), function (i, valor){
			item = {}
			$.each($("#bod tr").eq(i).find("td"), function (j, valor){
				
				
					item [""+titles[j]+""] = $("#bod tr").eq(i).find("td").eq(j).find("input").val();
				
			});
			jsonNew.push(item);
		});
		 jsonString ="";
		 jsonString = JSON.stringify(jsonNew);
		 console.log(jsonString)
		 
		 
		 // action = "export";
		var blob = new Blob([jsonString], {type: "text/plain;charset=utf-8"});
		saveAs(blob, ""+namefile+"");
		 
		 
		 
		 // // var xmltext = "<sometag><someothertag></someothertag></sometag>";
		// var element = document.createElement('a');
		
		
		// var filename = ""+namefile+"";
		// var element = document.createElement('a');
		// var bb = new Blob([jsonString], {type: 'octet/stream'});

		// element.setAttribute('href', window.URL.createObjectURL(bb));
		// element.setAttribute('download', filename);

		// element.dataset.downloadurl = ['octet/stream', element.download, element.href].join(':');
		// element.draggable = true; 
		// element.classList.add('dragout');
		// element.click()	
	},
	Agrega:function(){
		var htmlnew="";
		 htmlnew = htmlnew + "<tr>"
		for(i =0;i < tamaño;i++){
			 htmlnew =  htmlnew + "<td><input type='text' value=''/></td>"
			
		}
		var elnew = $("#bod tr").length
		htmlnew = htmlnew + "<td align='center' width='20%'><a onclick='del("+elnew+")' class='delete' href='#'><img src='images/delete.png' width='20' height='20' border='0'></a></td>"
		 htmlnew = htmlnew + "</tr>"
		$("#bod").append(htmlnew)
		
	}
}	
})()
function del(pos){

confirmar=confirm("¿Deseas eliminar la fila?"); 
if (confirmar) {
$("#bod tr").eq(pos).remove()
$.each($(".delete"), function (i, valor){
	$(this).attr("onclick", "del("+i+")");
	
});
}else {}



}
function readfile(evt) {
    var files = evt.target.files; // FileList object
     f = files[0];
     namefile = f.name
	  var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
         JsonObj = JSON.parse(e.target.result);
         console.log(JsonObj);
		 json.leer();
        };
      })(f);
	  reader.readAsText(f);
	
}
//function save
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var t=e.document,n=function(){return e.URL||e.webkitURL||e},o=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in o,i=function(n){var o=t.createEvent("MouseEvents");o.initMouseEvent("click",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,null),n.dispatchEvent(o)},a=e.webkitRequestFileSystem,c=e.requestFileSystem||a||e.mozRequestFileSystem,u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},f="application/octet-stream",s=0,d=500,l=function(t){var o=function(){"string"==typeof t?n().revokeObjectURL(t):t.remove()};e.chrome?o():setTimeout(o,d)},v=function(e,t,n){t=[].concat(t);for(var o=t.length;o--;){var r=e["on"+t[o]];if("function"==typeof r)try{r.call(e,n||e)}catch(i){u(i)}}},p=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e},w=function(t,u){t=p(t);var d,w,y,m=this,S=t.type,h=!1,O=function(){v(m,"writestart progress write writeend".split(" "))},E=function(){if((h||!d)&&(d=n().createObjectURL(t)),w)w.location.href=d;else{var o=e.open(d,"_blank");void 0==o&&"undefined"!=typeof safari&&(e.location.href=d)}m.readyState=m.DONE,O(),l(d)},R=function(e){return function(){return m.readyState!==m.DONE?e.apply(this,arguments):void 0}},b={create:!0,exclusive:!1};return m.readyState=m.INIT,u||(u="download"),r?(d=n().createObjectURL(t),o.href=d,o.download=u,i(o),m.readyState=m.DONE,O(),void l(d)):(e.chrome&&S&&S!==f&&(y=t.slice||t.webkitSlice,t=y.call(t,0,t.size,f),h=!0),a&&"download"!==u&&(u+=".download"),(S===f||a)&&(w=e),c?(s+=t.size,void c(e.TEMPORARY,s,R(function(e){e.root.getDirectory("saved",b,R(function(e){var n=function(){e.getFile(u,b,R(function(e){e.createWriter(R(function(n){n.onwriteend=function(t){w.location.href=e.toURL(),m.readyState=m.DONE,v(m,"writeend",t),l(e)},n.onerror=function(){var e=n.error;e.code!==e.ABORT_ERR&&E()},"writestart progress write abort".split(" ").forEach(function(e){n["on"+e]=m["on"+e]}),n.write(t),m.abort=function(){n.abort(),m.readyState=m.DONE},m.readyState=m.WRITING}),E)}),E)};e.getFile(u,{create:!1},R(function(e){e.remove(),n()}),R(function(e){e.code===e.NOT_FOUND_ERR?n():E()}))}),E)}),E)):void E())},y=w.prototype,m=function(e,t){return new w(e,t)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t){return navigator.msSaveOrOpenBlob(p(e),t)}:(y.abort=function(){var e=this;e.readyState=e.DONE,v(e,"abort")},y.readyState=y.INIT=0,y.WRITING=1,y.DONE=2,y.error=y.onwritestart=y.onprogress=y.onwrite=y.onabort=y.onerror=y.onwriteend=null,m)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=saveAs:"undefined"!=typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs});

