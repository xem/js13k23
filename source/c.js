/*C = {
p: 0,
o: {},
$: t => self[t],

// iialize an object's properties
i: t => {
  //if(t.cl)console.log("a", using, t.cl);
  t.css||(t.css=""),
  t.on=`txt\`${t.on!=null?t.on:t.css}\``;
  if(t.cl && t.cl.startsWith("room")){
    t.cl=t.cl?`onclick=if(!animation){fadeout(),setTimeout(()=&gt;{${t.cl}();fadein()},500);sound(step);setTimeout("sound(step)",300);setTimeout("sound(step)",600)}`:"";
  }
  else {
    t.cl=t.cl?`onclick=if(!animation)${t.cl}()`:"";
  }
  t.html||(t.html=""),
  t.g||(t.g="scene"),
  t.o||(t.o="center center"),
  t.w||(t.w=0),
  t.h||(t.h=0),
  t.x||(t.x=0),
  t.y||(t.y=0),
  t.z||(t.z=0),
  t.rx||(t.rx=0),
  t.ry||(t.ry=0),
  t.rz||(t.rz=0),
  t.sx||(t.sx=1),
  t.sy||(t.sy=1),
  t.sz||(t.sz=1),
  C.o[t.n]=t
},

// g of objects
g: t => { 
  t.d||t.d===0||(t.d=t.h),
  C.i(t),
  C.$(t.g).innerHTML+=`<div id="${t.n}"class="g ${t.css}"style="position:absolute;width:${t.w}px;height:${t.d}px;transform:${C.tr(t)}">`
},

// p
p: t => {
  t.n||(t.n=`p${C.p++}`),
  C.i(t),
  C.$(t.g).insertAdjacentHTML("beforeEnd",`<div id="${t.n}"class="p ${t.css}"style="position:absolute;width:${t.w}px;height:${t.h}px;background:${t.b};transform-origin:${t.o};transform:${C.tr(t)}"onmouseover="${t.on||''}"${t.cl}>${t.html}`)
  //C.camera()
},

// m an object
m: t => {
  if(t.n){
   var r=C.$(t.n),
   n=C.o[t.n];
   (t.x||0===t.x)&&(n.x=t.x),
   (t.y||0===t.y)&&(n.y=t.y),
   (t.z||0===t.z)&&(n.z=t.z),
   (t.rx||0===t.rx)&&(n.rx=t.rx),
   (t.ry||0===t.ry)&&(n.ry=t.ry),
   (t.rz||0===t.rz)&&(n.rz=t.rz),
   (t.sx||0===t.sx)&&(n.sx=t.sx),
   (t.sy||0===t.sy)&&(n.sx=t.sy),
   C.o[t.n]=n,
   r.style.transform=C.tr(n)
 }
},

// CSS3D transform string
tr: t => `translateX(-50%)translateY(-50%)translateX(${t.x}px)translateY(${t.y}px)translateZ(${t.z}px)rotateX(${t.rx}deg)rotateY(${t.ry}deg)rotateZ(${t.rz}deg)scaleX(${t.sx})scaleY(${t.sy})scaleZ(${t.sz})`

}

*/
