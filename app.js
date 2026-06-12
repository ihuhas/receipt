const canvas =
document.getElementById("receiptCanvas");

const ctx =
canvas.getContext("2d");

const generateBtn =
document.getElementById("generateBtn");

const saveBtn =
document.getElementById("saveBtn");

/* =====================================
   商品マスタ
===================================== */

const products = [

{jan:"4901000000001",name:"おにぎり鮭",price:138,tax:8},
{jan:"4901000000002",name:"おにぎり梅",price:128,tax:8},
{jan:"4901000000003",name:"ツナマヨおにぎり",price:145,tax:8},
{jan:"4901000000004",name:"昆布おにぎり",price:138,tax:8},
{jan:"4901000000005",name:"明太子おにぎり",price:158,tax:8},
{jan:"4901000000006",name:"高菜おにぎり",price:148,tax:8},
{jan:"4901000000007",name:"赤飯おにぎり",price:165,tax:8},
{jan:"4901000000008",name:"たまごサンド",price:278,tax:8},
{jan:"4901000000009",name:"ミックスサンド",price:328,tax:8},
{jan:"4901000000010",name:"ハムサンド",price:298,tax:8},
{jan:"4901000000011",name:"コーラ500ml",price:168,tax:8},
{jan:"4901000000012",name:"天然水550ml",price:108,tax:8},
{jan:"4901000000013",name:"麦茶600ml",price:118,tax:8},
{jan:"4901000000014",name:"緑茶600ml",price:128,tax:8},
{jan:"4901000000015",name:"オレンジジュース",price:178,tax:8},
{jan:"4901000000016",name:"リンゴジュース",price:178,tax:8},
{jan:"4901000000017",name:"野菜ジュース",price:198,tax:8},
{jan:"4901000000018",name:"ポテトチップス",price:168,tax:8},
{jan:"4901000000019",name:"じゃがりこ",price:178,tax:8},
{jan:"4901000000020",name:"チョコレート",price:148,tax:8},
{jan:"4901000000021",name:"ガム",price:108,tax:8},
{jan:"4901000000022",name:"キャンディ",price:128,tax:8},
{jan:"4901000000023",name:"クッキー",price:178,tax:8},
{jan:"4901000000024",name:"ビスケット",price:158,tax:8},
{jan:"4901000000025",name:"プリン",price:168,tax:8},
{jan:"4901000000026",name:"シュークリーム",price:178,tax:8},
{jan:"4901000000027",name:"エクレア",price:198,tax:8},
{jan:"4901000000028",name:"ショートケーキ",price:398,tax:8},
{jan:"4901000000029",name:"モンブラン",price:420,tax:8},
{jan:"4901000000030",name:"どら焼き",price:168,tax:8},

{jan:"4901000000031",name:"歯ブラシ",price:198,tax:10},
{jan:"4901000000032",name:"歯磨き粉",price:298,tax:10},
{jan:"4901000000033",name:"ティッシュ",price:218,tax:10},
{jan:"4901000000034",name:"トイレットペーパー",price:398,tax:10},
{jan:"4901000000035",name:"洗剤",price:498,tax:10},
{jan:"4901000000036",name:"シャンプー",price:598,tax:10},
{jan:"4901000000037",name:"ボディソープ",price:548,tax:10},
{jan:"4901000000038",name:"乾電池単3",price:298,tax:10},
{jan:"4901000000039",name:"ボールペン",price:118,tax:10},
{jan:"4901000000040",name:"ノート",price:128,tax:10}
];

/* =====================================
   共通
===================================== */

function rand(min,max){

return Math.floor(
Math.random()*(max-min+1)
)+min;

}

function centerText(text,y){

const w=
ctx.measureText(text).width;

ctx.fillText(
text,
(canvas.width-w)/2,
y
);

}

function rightText(text,y){

const w=
ctx.measureText(text).width;

ctx.fillText(
text,
canvas.width-w-8,
y
);

}

function line(y){

ctx.beginPath();
ctx.moveTo(5,y);
ctx.lineTo(canvas.width-5,y);
ctx.stroke();

}

function dateString(){

const d=new Date();

const pad=n=>
String(n).padStart(2,"0");

return (
d.getFullYear()+"/"+
pad(d.getMonth()+1)+"/"+
pad(d.getDate())+" "+
pad(d.getHours())+":"+
pad(d.getMinutes())+":"+
pad(d.getSeconds())
);

}

function barcode(){

let s="";

for(let i=0;i<13;i++){

s+=rand(0,9);

}

return s;

}

function drawBarcode(x,y,code){

let px=x;

for(const c of code){

const w=
1+(Number(c)%3);

ctx.fillRect(
px,
y,
w,
60
);

px+=w+2;

}

}

/* =====================================
   レシート生成
===================================== */

function generateReceipt(){

const selected=
[...products]
.sort(()=>Math.random()-0.5)
.slice(0,rand(1,10));

const height=
420+
(selected.length*40);

canvas.width=384;
canvas.height=height;

ctx.fillStyle="#fff";
ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

ctx.fillStyle="#000";

let y=35;

ctx.font=
"bold 24px monospace";

centerText(
"FannyMart",
y
);

y+=25;

ctx.font=
"14px monospace";

centerText(
dateString(),
y
);

y+=25;

line(y);

y+=25;

let subtotal=0;

selected.forEach(item=>{

const qty=
rand(1,3);

const total=
item.price*qty;

subtotal+=total;

ctx.fillText(
item.name,
8,
y
);

rightText(
"¥"+total,
y
);

y+=18;

ctx.font=
"12px monospace";

ctx.fillText(
item.jan,
8,
y
);

rightText(
qty+"点",
y
);

y+=22;

ctx.font=
"14px monospace";

});

line(y);

y+=25;

const tax=
Math.floor(
subtotal*0.1
);

const total=
subtotal+tax;

ctx.fillText(
"小計",
8,
y
);

rightText(
"¥"+subtotal,
y
);

y+=22;

ctx.fillText(
"消費税",
8,
y
);

rightText(
"¥"+tax,
y
);

y+=22;

ctx.font=
"bold 16px monospace";

ctx.fillText(
"合計",
8,
y
);

rightText(
"¥"+total,
y
);

y+=35;

line(y);

y+=25;

const code=
barcode();

drawBarcode(
50,
y,
code
);

y+=75;

ctx.font=
"12px monospace";

centerText(
code,
y
);

y+=25;

centerText(
"THANK YOU",
y
);

}

/* =====================================
   PNG保存
===================================== */

saveBtn.onclick=()=>{

const a=
document.createElement("a");

a.href=
canvas.toDataURL(
"image/png"
);

a.download=
"receipt.png";

a.click();

};

/* =====================================
   起動
===================================== */

generateBtn.onclick=
generateReceipt;

generateReceipt();
