import{B as v,u as e,p as g,H as b}from"./pure-min-040b0144.js";function N({term:i,setTerm:l}){const a=r=>o=>{i.price[r]=o.currentTarget.value,l(i)},u=r=>o=>{i.quantity[r]=o.currentTarget.value,l(i)},c=r=>{i.wages=r.currentTarget.value,l(i)},s=r=>{i.qualityBonus=r.currentTarget.value,l(i)};return e("div",{children:[e(b,{currentPage:"/"}),e("div",{className:"pure-form term-container",children:[e("div",{className:"product-term",children:[e("input",{value:i.wages,onInput:c,placeholder:"Wages",type:"number",style:{height:"34px"},className:"margin6"}),e("input",{value:i.qualityBonus,onInput:s,placeholder:"Quality Bonus %",type:"number",style:{height:"34px"},className:"margin6"})]}),e("div",{className:"product-term",children:[e("img",{src:"/public/SOR.png",height:"40",width:"40",alt:"Sub-orbital rocket",className:"margin6"}),e("input",{value:i.price.sor,onInput:a("sor"),placeholder:"$",type:"number",className:"margin6"}),e("input",{value:i.quantity.sor,onInput:u("sor"),placeholder:"# Quantity",type:"number",className:"margin6"})]}),e("div",{className:"product-term",children:[e("img",{src:"/public/BFR.png",height:"40",width:"40",alt:"BFR",className:"margin6"}),e("input",{value:i.price.bfr,onInput:a("bfr"),placeholder:"$",type:"number",className:"margin6"}),e("input",{value:i.quantity.bfr,onInput:u("bfr"),placeholder:"# Quantity",type:"number",className:"margin6"})]}),e("div",{className:"product-term",children:[e("img",{src:"/public/jumbo.png",height:"40",width:"40",alt:"Jumbo jet",className:"margin6"}),e("input",{value:i.price.jumbo,onInput:a("jumbo"),placeholder:"$",type:"number",className:"margin6"}),e("input",{value:i.quantity.jumbo,onInput:u("jumbo"),placeholder:"# Quantity",type:"number",className:"margin6"})]}),e("div",{className:"product-term",children:[e("img",{src:"/public/luxury.png",height:"40",width:"40",alt:"Luxury jet",className:"margin6"}),e("input",{value:i.price.lux,onInput:a("lux"),placeholder:"$",type:"number",className:"margin6"}),e("input",{value:i.quantity.lux,onInput:u("lux"),placeholder:"# Quantity",type:"number",className:"margin6"})]}),e("div",{className:"product-term",children:[e("img",{src:"/public/sep.png",height:"40",width:"40",alt:"Single Engine Plane",className:"margin6"}),e("input",{value:i.price.sep,onInput:a("sep"),placeholder:"$",type:"number",className:"margin6"}),e("input",{value:i.quantity.sep,onInput:u("sep"),placeholder:"# Quantity",style:{height:"34px"},type:"number",className:"margin6"})]}),e("div",{className:"product-term",children:[e("img",{src:"/public/satellite.png",height:"40",width:"40",alt:"Satellite",className:"margin6"}),e("input",{value:i.price.sat,onInput:a("sat"),placeholder:"$",type:"number",className:"margin6"}),e("input",{value:i.quantity.sat,onInput:u("sat"),placeholder:"# Quantity",type:"number",className:"margin6"})]})]})]})}function f({contract:i,setContract:l}){const a=s=>{i.product=s.currentTarget.value,l(i)},u=s=>{i.price=s.currentTarget.value,l(i)},c=s=>{i.quality=s.currentTarget.value,l(i)};return e("div",{children:e("div",{className:"flex margin6-0",style:{height:"40px"},children:[i.product=="sep"?e("img",{src:"/public/sep.png",height:"40",width:"40",alt:"Single Engine Plane"}):void 0,i.product==""?e("div",{style:{width:"40px"}}):void 0,e("select",{name:"product",value:i.product,onChange:a,placeholder:"Product",children:e("option",{value:"sep",children:"Single Engine Plane"})}),e("div",{className:"margin0-6",children:e("input",{value:i.price,onInput:u,placeholder:"Price ($)",style:{height:"34px"},type:"number"})}),e("div",{className:"margin0-6",children:e("input",{value:i.quality,onInput:c,placeholder:"Quality",style:{height:"34px"},type:"number"})}),e("div",{children:[e("div",{children:i.highestProfit}),e("div",{})]})]})})}function q(){const[i,l]=g([]),[a,u]=g([]),c=n=>t=>{const p=[...i];p[n]=t,l(p)},s=n=>{n.highestProfit=void 0,n.product&&n.quality&&n.price&&i.forEach(t=>{if(t.quantity[n.product]&&t.price[n.product]&&t.qualityBonus){const p=Number(t.price[n.product]),h=t.qualityBonus/100*p*n.quality,m=n.price,d=p+h-m;console.log(typeof p),console.log(typeof h),console.log(typeof m),console.log(typeof d),(n.highestProfit===void 0||d>n.highestProfit)&&(n.highestProfit=d)}})},r=n=>t=>{s(t);const p=[...a];p[n]=t,u(p)},o=()=>{const n=[...i];n.push({qualityBonus:void 0,wages:void 0,quantity:{sep:"",sat:"",lux:"",jumbo:"",bfr:"",sor:""},price:{sep:"",sat:"",lux:"",jumbo:"",bfr:"",sor:""}}),l(n)},y=()=>{const n=[...a];n.push({product:"",quality:void 0,price:void 0,highestProfit:void 0}),u(n)};return e("main",{className:"margin6",children:[e("h1",{children:"Sim Companies Sales Office calculator"}),e("section",{children:[i.map((n,t)=>e(N,{term:n,setTerm:c(t)},t)),e("button",{onClick:o,children:"Add Term"})]}),e("section",{children:[a.map((n,t)=>e(f,{contract:n,setContract:r(t)},t)),e("button",{onClick:y,children:"Add Contract"})]})]})}v(e(q,{}),document.getElementById("app"));
