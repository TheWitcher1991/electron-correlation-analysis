(()=>{var e={668:()=>{},971:e=>{e.exports=function(e){var n,t,o,a,c,r=function(e){return e.reduce((function(e,n){return e+n}),0)/e.length},s=function(e,n){var t=r(e),o=r(n);return e.reduce((function(e,a,c){return e+(a-t)*(n[c]-o)}),0)/e.length},l=function(e,n){for(var t=r(e),o=r(n),a=0,c=0,l=0;l<e.length;l++)a+=s(e,n),c+=Math.pow(e[l]-t,2);return{slope:a/c,intercept:o-a/c*t}},i=function(e){var n=r(e);return e.reduce((function(e,t){return e+(t-n)*(t-n)}),0)/e.length},d=function(e,n){var t,o,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2,c=0,s=0,l=0;return t=r(e),o=r(n),e.forEach((function(a,r){c+=(e[r]-t)*(n[r]-o),s+=Math.pow(e[r]-t,2),l+=Math.pow(n[r]-o,2)})),(c/Math.sqrt(s*l)).toFixed(a)},u=e.X.numbers,p=e.Y.numbers,v=d(u,p),f=(a=v,c=u.length,(a*Math.sqrt(c-2)/Math.sqrt(1-Math.pow(a,2))).toFixed(2)),h=l(u,p).slope.toFixed(2),m=l(u,p).intercept.toFixed(2),x=i(u),y=function(e){return Math.sqrt(e).toFixed(6)}(x),w=(t=u,((r(o=p)-r(t))/Math.sqrt(i(o)/o.length+i(t)/t.length)).toFixed(3)),g=(l(u,p).slope*u.length+l(u,p).intercept).toFixed(2),b=i(p),R=d(u,p,9),q=Math.pow(R,2).toFixed(9),S=function(e,n,t){return Math.sqrt(e*(1-n)/t).toFixed(9)}(b,Math.pow(q,2),u.length),_=function(e,n){return(1-(1-e)*(n-1)/(n-2)).toFixed(9)}(q,u.length),M=function(e,n){return e/(1-e)*(n-2)}(q,u.length).toFixed(9),k=' \n        <h3>Дисперсионный анализ</h3>\n        <div class="ctx">Коэф. Корреляции: <span>'.concat(v,'</span></div>\n        <div class="ctx">t-статистика Стьюдента: <span>').concat(f,'</span></div>\n        <div class="ctx">Коэф. уравнения A: <span>').concat(h,'</span></div>\n        <div class="ctx">Коэф. уравнения B: <span>').concat(m,'</span></div>\n        <div class="ctx">Уравнение регрессии: <span>y = ').concat(h,"x + ").concat(m,'</span></div>\n         <div class="ctx">Прогнозируемое значение (x = ').concat(u.length,"): <span>y = ").concat(g,'</span></div>\n        <div class="ctx">Доверительная вероятность: <span>').concat("0.5",'</span></div>\n        <div class="ctx">Число степеней свободы: <span>').concat(u.length,'</span></div>\n        <div class="ctx">Табл. значение t-статистики Стьюдента: <span>').concat(w,'</span></div>\n        <div class="ctx">Дисперсия: <span>').concat(x,'</span></div>\n        <div class="ctx">Среднее квадратичное отклонение: <span>').concat(y,"</span></div>\n        "),F='\n        <h3>Регрессионная статистика</h3>\n        <div class="ctx">Множественный R: <span>'.concat(R,'</span></div>\n        <div class="ctx">R-квадрат: <span>').concat(q,'</span></div>\n        <div class="ctx">Нормированный R-квадрат: <span>').concat(_,'</span></div>\n        <div class="ctx">F-критерий Фишера: <span>').concat(M,'</span></div>\n        <div class="ctx">Стандартная ошибка: <span>').concat(S,'</span></div>\n        <div class="ctx">Наблюдения: <span>').concat(u.length,"</span></div>\n        ");document.querySelector(".v1").innerHTML=k,document.querySelector(".v2").innerHTML=F,document.querySelector(".file__upload-container").style.display="none",new ApexCharts(document.querySelector("#chart"),{chart:{id:"chart",type:"line",height:350,foreColor:"#fff",dropShadow:{enabled:!0,color:"#000",top:18,left:7,blur:10,opacity:.2},zoom:{enabled:!1}},stroke:{width:[6],curve:"straight"},markers:{size:[5]},grid:{borderColor:"#e1e1e1",clipMarkers:!1,yaxis:{lines:{show:!0}}},title:{text:"Корреляционное поле y = ".concat(h,"x + ").concat(m),align:"left",style:{color:"#111"}},dataLabels:{enabled:!1},fill:{gradient:{enabled:!0,opacityFrom:.6,opacityTo:0}},series:[{name:e.Y.name,data:p}],xaxis:{categories:u,title:{text:e.Y.name,style:{color:"#111"}},axisBorder:{show:!1},axisTicks:{show:!1},labels:{style:{colors:"#989898"}}},legend:{show:!0},yaxis:{title:{text:e.X.name,style:{color:"#111"}},labels:{offsetX:-5,style:{colors:"#989898"}}},tooltip:{theme:"dark"}}).render(),null===(n=document.querySelector(".button__save"))||void 0===n||n.addEventListener("click",(function(n){n.preventDefault();var t=new ExcelJS.Workbook,o=t.addWorksheet("Корреляционный анализ");e.X.numbers.unshift(e.X.name),e.Y.numbers.unshift(e.Y.name),o.getColumn(1).values=e.X.numbers,o.getColumn(2).values=e.Y.numbers,o.getColumn(1).width=35,o.getColumn(2).width=35,o.getColumn(1).alignment={horizontal:"left"},o.getColumn(2).alignment={horizontal:"left"},o.getColumn(1).font={size:12},o.getColumn(2).font={size:12},o.getRow(1).font={bold:!0,size:14},o.getRow(1).alignment={vertical:"middle",horizontal:"center"},o.addRow(["","","","Дисперсионный анализ"]),o.addRow(["","","","Коэф. Корреляции:",v]),o.addRow(["","","","t-статистика Стьюдента:",f]),o.addRow(["","","","Коэф. уравнения A:",h]),o.addRow(["","","","Коэф. уравнения B:",m]),o.addRow(["","","","Уравнение регрессии:","y = ".concat(h,"x + ").concat(m)]),o.addRow(["","","","Прогнозируемое значение (x = ".concat(u.length-1,"):"),g]),o.addRow(["","","","Доверительная вероятность:","0.5"]),o.addRow(["","","","Число степеней свободы:",u.length-1]),o.addRow(["","","","Табл. значение t-статистики Стьюдента:",w]),o.addRow(["","","","Дисперсия:",x]),o.addRow(["","","","Среднее квадратичное отклонение:",y]),o.addRow([""]),o.addRow(["","","","Регрессионная статистика"]),o.addRow(["","","","Множественный R:",R]),o.addRow(["","","","R-квадрат:",q]),o.addRow(["","","","Нормированный R-квадрат:",_]),o.addRow(["","","","F-критерий Фишера:",M]),o.addRow(["","","","Стандартная ошибка:",S]),o.addRow(["","","","Наблюдения:",u.length-1]),t.xlsx.writeBuffer().then((function(e){saveAs(new Blob([e],{type:"application/octet-stream"}),"CA-Отчет.xlsx")}))}))}},783:(e,n,t)=>{"use strict";e.exports=function(){var e,n;console.time("Launch");var o=t(971),a={X:{name:"",numbers:[]},Y:{name:"",numbers:[]}};return document.querySelector("#file").addEventListener("change",(function(e){e.preventDefault();var n=e.target.files[0];if(n){var t=new FileReader;t.onload=function(e){var n=e.target.result,t=new ExcelJS.Workbook;t.xlsx.load(n).then((function(){t.worksheets[0].eachRow((function(e,n){if(n>0){if(1===e._number)return a.X.name=e.values[1],a.Y.name=e.values[2],!1;a.X.numbers.push(e.values[1]),a.Y.numbers.push(e.values[2])}})),o(a),document.querySelector(".section__button").style.display="block",document.querySelector("#file").value=""}))},t.readAsArrayBuffer(n)}})),null===(e=document.querySelector(".info-button"))||void 0===e||e.addEventListener("click",(function(){document.querySelector(".info__from-pop").style.display="flex",document.querySelector(".info__from-container").style.display="block"})),null===(n=document.querySelector(".close__info"))||void 0===n||n.addEventListener("click",(function(){document.querySelector(".info__from-pop").style.display="none",document.querySelector(".info__from-container").style.display="none"})),document.querySelector(".button__reset").addEventListener("click",(function(e){document.querySelector(".v1").innerHTML="",document.querySelector(".v2").innerHTML="",document.querySelector("#chart").innerHTML="",document.querySelector(".file__upload-container").style.display="flex",document.querySelector(".section__button").style.display="none",a.X.name="",a.Y.name="",a.X.numbers.length=0,a.Y.numbers.length=0})),console.timeEnd("Launch"),!1}()}},n={};function t(o){var a=n[o];if(void 0!==a)return a.exports;var c=n[o]={exports:{}};return e[o](c,c.exports,t),c.exports}t(783),t(668)})();
//# sourceMappingURL=script.bundle.js.map