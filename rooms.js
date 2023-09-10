
// save
save = () => { localStorage.castleescape = JSON.stringify(s) }

fadeout = () => { fo.style.opacity = 1; }
fadein = () => { fo.style.opacity = 0; }

// Inventory
using = -1; // using an inventory item
usingstr = ""; // using an inventory item (string)
add_inv = n => {
  if(!s.inv.includes(n) || n == "gear"){
    s.inv.push(n);
  }
  draw_inv();
  save();
}

rem_inv = n => {
  if(n == "gear"){
    s.inv.splice(using,1);
  }
  else {
    use(n);
    s.inv = s.inv.filter(i => i != n);
  }
  draw_inv();
  save();
}

draw_inv = () => {
  for(i = 0; i < 12; i++){
    self["i"+i].innerHTML = "";
    if(s.inv[i] == "hanger"){
      C.plane({g:"i"+i,x:10,y:20,html:svghanger,css:"hanger",on:"",sx:2,sy:2});
    }
    else if(s.inv[i] == "telescope"){
      C.plane({g:"i"+i,x:20,y:35,html:"🔭",css:"telescope",on:""});
    }
    else if(s.inv[i] == "torch"){
      C.plane({g:"i"+i,x:40,y:15,w:40,h:30,html:svgtorch,css:"torch",on:""});
    }
    else if(s.inv[i] == "lit torch"){
      C.plane({g:"i"+i,x:40,y:15,w:40,h:30,html:svgtorch,css:"lit torch",on:""});
      C.plane({g:"i"+i,x:50,y:25,z:2,w:30,h:30,html:"🔥",css:"fire",on:"",sx:.5,sy:.5});
    }
    else if(s.inv[i] == "hammer"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🔨",css:"hammer",on:""});
    }
    else if(s.inv[i] == "wood"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🪵",css:"wood",on:""});
    }
    else if(s.inv[i] == "boulder"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"⬤",css:"boulder",on:""});
    }
    else if(s.inv[i] == "mouse"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🐁",css:"mouse",on:""});
    }
    else if(s.inv[i] == "soup"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🍲",css:"soup",on:""});
    }
    else if(s.inv[i] == "hot soup"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🍲",css:"hot soup",on:""});
    }
    else if(s.inv[i] == "crown"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"👑",css:"crown",on:""});
    }
    else if(s.inv[i] == "gear"){
      C.plane({g:"i"+i,x:40,y:50,w:40,h:30,html:"⚙️",css:"gear",on:""});
    }
    else if(s.inv[i] == "cheese"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🧀",css:"cheese",on:""});
    }
    else if(s.inv[i] == "wand"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🪄",css:"wand",on:""});
    }
    else if(s.inv[i] == "sword"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🗡️",css:"sword",on:""});
    }
    else if(s.inv[i] == "key"){
      C.plane({g:"i"+i,x:40,y:45,w:40,h:30,html:"🔑",css:"key",on:""});
    }
  }
}

use = n => {
  
  //console.log(using,n);
  if(using == n && n > -1){
    if(self["i"+n])self["i"+n].style.background="";
    text.innerHTML = "";
    usingstr = "";
    using = -1;
  }
  else {
    usingstr = "";
    using = -1;
    for(i = 0; i < 12; i++){
      self["i"+i].style.background="";
    }
    if(s.inv[n]){
      self["i"+n].style.background="#fff";
      text.innerHTML = "use " + s.inv[n] + " with ";
      using = n;
      usingstr = "use " + s.inv[n] + " with ";
    }
    else {
      text.innerHTML = "";
    }
  }
  //console.log(using,n);
}

// Text
lasttxt="";
to=0;
txt = (s = [""]) => {
  if(s.length && s != "c"){
    if(using > -1 && !["up","right","down","left"].includes(s[0])) {text.innerHTML = usingstr + s;}
    else {text.innerHTML = s; }
    clearTimeout(to);
    to=setTimeout(`if(using == -1) text.innerHTML=""`, 2000);
  }
}

// Left window
windowleft = (bars,tower) => {
  C.plane({x:-280,y:-95+92,z:-50,w:100,h:100,html:(s.r40c > 60 && s.r40c < 300) ? svgwindownight : svgwindow,css:"window",ry:tower?10:0});
  if(bars) C.plane({x:-300-25,y:-95+42,z:-40,html:svgbars,css:"bars",on:""});
}

windowright = (bars,tower,cl='') => {
  C.plane({x:300-70,y:-95+92,z:-50,w:100,h:100,html:(s.r40c > 60 && s.r40c < 300) ? svgwindownight : svgwindow,css:"window",sx:-1,ry:tower?-10:0,cl});
  if(bars) C.plane({x:278,y:-55,z:-40,html:svgbars,css:"bars",on:"",sx:-1});
}

draw_sky = (leftwindow,rightwindow,hay) => {
  
  // r40d = sky angle
  // r40c = sky angle 0-360 (300 = sun left, 60 = sun right)
  C.group({n:"skygroup",x:0,y:200,rz:s.r40d});
  C.plane({g:"skygroup",x:0,y:-600,z:-100,w:400,h:400,b:"radial-gradient(#ffb 5%,#fff0 50%)",css:"sun"});
  C.plane({g:"skygroup",x:0,y:600,z:-100,w:100,h:100,html:"🌘",css:"moon",n:"moon"});
  update_sky();
  
  if(leftwindow && s.r40c == 300){
    
    C.plane({x:0,y:0,z:0,w:700,h:500,b:"#f000",css:"sunwrapper",html:"<canvas id=sun width=700 height=500>"});
    ctx=sun.getContext("2d");
    ctx.fillStyle = "#ffb3";
    ctx.beginPath();
    ctx.moveTo(65,285);
    ctx.lineTo(165,470);
    ctx.lineTo(285,470);
    ctx.lineTo(85,230);
    ctx.closePath();
    ctx.fill();
  }
  else if(hay && rightwindow && s.r40c == 60 && s.r21b && !s.r21g){
    
    C.plane({x:0,y:0,z:10,w:700,h:500,b:"#f000",css:"sunwrapper",html:"<canvas id=sun width=700 height=500>"});
    ctx=sun.getContext("2d");
    ctx.fillStyle = "#ffb3";
    ctx.beginPath();
    ctx.moveTo(675-65,285);
    ctx.lineTo(675-115,380);
    ctx.lineTo(675-185,240);
    ctx.lineTo(675-90,222);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fb99";
    ctx.beginPath();
    ctx.moveTo(675-270,385);
    ctx.lineTo(675-320,435);
    ctx.lineTo(675-340,385);
    ctx.lineTo(675-280,375);
    ctx.closePath();
    ctx.fill();
  }
  else if(rightwindow && s.r40c == 60){
    
    C.plane({x:0,y:0,z:0,w:700,h:500,b:"#f000",css:"sunwrapper",html:"<canvas id=sun width=700 height=500>"});
    ctx=sun.getContext("2d");
    ctx.fillStyle = "#ffb3";
    ctx.beginPath();
    ctx.moveTo(675-65,285);
    ctx.lineTo(675-175,470);
    ctx.lineTo(675-315,470);
    ctx.lineTo(675-90,222);
    ctx.closePath();
    ctx.fill();
  }
}

wallside = (left,offset,skytop,kitchen,i,j,dx) => {
  if(kitchen){
    C.group({n:"wall", x:left?-427:offset?370:320,y:-65+(skytop?110:0),z:left?-88:-40,ry:left ? 65 : 120,cl:"r33i",css:"wall"});
  }
  else {
    C.group({n:"wall", x:left?-427:offset?370:320,y:-65+(skytop?110:0),z:left?-88:-40,ry:left ? 65 : 120});
  }
  for(i = 0; i < 3; i++){
    for(j = 11; j--;){
      
        dx = (j%2) ? 6:0;
        C.plane({g:"wall",x:i*12+dx,y:j*50-200,z:50,w:102,h:52,b:`hsl(50 0% ${50-i*5}%)`,css:"brick"});
    }
  }
}

// Tower top/bottom
tower = (top,i,j,x,y,z,w,dx,ry) => {
  use(-1);
  scene.className = "";
  scene.innerHTML=text.innerHTM=note.innerHTML=book.innerHTML="";
  setTimeout('scene.className = "t"',200);
  for(i = 0; i < 8; i++){
    for(j = 15; j--;){
      if(((top && j > 1) || !top) && ((top && !(j==2 && i % 2)) || !top) && !(!(j % 2) && i == 7)){
        
        // Back
        dx = 0;
        w = 104;
        if(j % 2){
          dx = 55;
          if((i == 0)) { w = 50; dx = 30 }
          if((i == 7)) { w = 50; dx = 80 }
        }
        x = i*98 - 300 - dx + Math.random()+(i>4?2:0);
        ry = -(x+10)/22;
        z = -(Math.cos(x/320) * 90);
        C.plane({x,y:j*48-300 + Math.random(),w,h:50,b:`hsl(50 0% ${30-z/3}%)`,ry,z,css:"brick"});
      
        // front
        if(j>(top ? 3 : 2) && j < 11){
          
          // left
          if(i == 0){
            w = 35 + ((j%2) ? 10 : 0);
            x = i*98 - 300 - 36 + Math.random()*4+ ((j%2) ? 5 : 0);
            ry = (x+10)/22;
            z = (Math.cos(x/300) * 90)-50;
            C.plane({x,y:j*51-302 + Math.random()-8,w,h:52,b:`hsl(50 0% 70%)`,ry,z,css:"brick"});
          }
          
          // right
          if(i == (j%2 ? 7 : 6)){
            w = 35 + ((j%2) ? 10 : 0);
            x = i*98 - 300 - 65 + Math.random()*4 + ((j%2) ? -5 : 100);
            ry = (x+10)/22;
            z = (Math.cos(x/300) * 90)-50;
            C.plane({x,y:j*51-302 + Math.random()-8,w,h:52,b:`hsl(50 0% 70%)`,ry,z,css:"brick"});
          }
        }
        
        // top, bottom
        else {
          dx = 0;
          w = 102;
          if(j % 2){
            dx = 47;
            if(i == 0) { w = 50; dx = 22 }
            if((i == 7)) { w = 50; dx = 75 }
          }
          if(i > 3) { dx -=2 }
          x = i*98 - 300 - dx + Math.random();
          ry = (x+10)/22;
          z = (Math.cos(x/300) * 90)-45;
          C.plane({x,y:j*50-300 + Math.random()-5,w,h:52,b:`hsl(50 0% ${70+z/4}%)`,ry,z,css:"brick"});
        }
      }
    }
  }
}

// Room (sky on left / right / top, tower on top or not)
room = (skyleft, skyright, skytop, tower,half,i,j,x,y,z,w,dx,ry,no) => {
  use(-1);
  scene.className = "";
  scene.innerHTML=text.innerHTML=note.innerHTML=book.innerHTML="";
  setTimeout('scene.className = "t"',200);
  for(i = 0; i < 12; i++){
    for(j = 13; j--;){
      
      // tower
      if(skytop && tower && i < 8 && j < 4) {
        dx = 0;
        w = 102;
        no = 0; if(j % 2){
          dx = 47;
          if(i == 0) { w = 50; dx = 22 }
          if((i == 7)) { w = 50; dx = 75 }
        }
        else{
          if(i == 7) no = 1;
        }
        x = i*98 - 300 - dx + Math.random();
        ry = (x+10)/22;
        z = (Math.cos(x/300) * 90)-145;
        if(!no)C.plane({x,y:j*50-300 + Math.random()-5,w,h:52,b:`hsl(50 0% ${90+z/3}%)`,ry,z,css:"brick"});
      }
      
      // Back & front
      if((skytop && (j > 2 || (j == 2 && (i%2)))) || !skytop){
        dx = 0;
        w = 104;
        if((j % 2)){
          dx = 50;
        }
        x = i*98 - 500 + Math.random()*2;
        if(skyleft){
          if(i == 0) continue;
          if(i == 1 && (j%2)){
            w = 52;
            dx -= 25;
          }
        }
        
        if(skyright){
          if(i == 11 || (i == 10 && !(j%2))) continue;
          if(i == 10 && (j%2)){
            w = 52;
            dx += 25;
          }
        }
        z = -50;
        
        // Back
        if(j>(skytop ? 2 : 0)){
          C.plane({x:x-dx,y:j*48-300 + Math.random(),w,h:50,b:`hsl(50 0% ${43}%)`,z,css:"brick"});
        }
        
        // front
        if(((i < 2) || (i > (skyright ? 8 : 9)) || (j < (skytop ? 4 : 2)) || (j > 11))){
          if(j>(skytop ? 3 : 1) && j < 12 && !(j%2) && i == 1 && !skyleft) continue;
          if(j>(skytop ? 4 : 2) && j < 12 && (j%2) && i == 9) continue;
          if(s.r33h && half && j > 1 && j < 12 && i > 8) { continue; }
          if(!s.r33h && half && j > 1 && j < 12 && (j%2) && i ==10) C.plane({x:x-dx+25,y:j*48-300 + Math.random(),w:50,h:50,b:`hsl(50 0% ${63}%)`,z:-20,css:"brick"});
          else C.plane({x:x-dx,y:j*48-300 + Math.random(),w,h:50,b:`hsl(50 0% ${63}%)`,z:-20,css:"brick"});
        }
      }
      
      
    }
  }
}

// Mountains bg
mount = () => {
  C.plane({x:0,y:450,z:-600,w:3500,h:800,b:"radial-gradient(#582,#9c6)",css:"mount",on:""});
}

// ===========================================================================
// Room 0-0, start cell (ok)
room00 = () => {
  setTimeout('scene.className="t"',200);
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  
  C.plane({x:-95,y:135,z:-80,html:svgdoor,w:60,h:100,css:"door",sx:1.8,sy:1.8,ry:5});
  C.plane({x:-100,y:80,z:-40,html:"⬇️",css:"arrow",on:"down",cl:"room01",ry:5,sx:1.2,sy:1.2});
  
  if(!s.r00d)C.plane({x:145,y:-40,w:20,h:15,html:svghanger,css:"hanger",n:"r002",cl:"r00c"});
  
  if(!s.r00f){
    C.plane({x:-105,y:120,z:20,html:"🔒",css:"lock",rz:-2,cl:"r00e",n:"r003"});
    C.plane({x:-150,y:125,z:-35,html:"🚪",css:"door",ry:5,sx:1.1,sy:1.1,n:"r004",o:"100px 100px"});
  }
  else {
    C.plane({x:-105,y:120,z:20,html:"🔒",css:"lock",rz:-2,cl:"r00e",n:"r003",x:-120,y:200,rz:-80});
    C.plane({x:-120,y:140,html:"🚪",css:"door",ry:5,z:-45,n:"r004",o:"100px 100px",ry:120,sx:1.1,sy:1.1});
  }
  
  if(s.r00b>=1){C.group({x:120-15,y:-10,z:10,n:"frame",y:140,rx:-80});}
  else{C.group({x:120-15,y:-10,z:10,n:"frame"});}


  C.plane({x:0,y:-10-15,html:"🖼️",css:"frame",rz:2,cl:"r00a",n:"r001",g:"frame"});
  C.plane({x:40,y:32-47,html:"️🧔🏻‍♂️",css:"framehead nofont",on:"",rz:2,g:"frame"});
  C.plane({x:45,y:14-40,html:"👑️",css:"framecrown",on:"",rz:2,sy:.5,g:"frame"});
  C.plane({x:260-15,y:120,html:"🛏️",css:"bed",sx:-1});
  C.plane({x:-250-15,y:208-15,z:-50,html:"🕳️",css:"hole",rz:90,ry:10,sy:2,cl:"r00h"});
  if(s.r00k) { C.plane({x:-205,y:175,z:50,html:"🧀",css:"mouse",sx:-1,cl:"r00l",n:"r006"}); }
    
  if(s.r00m) { C.plane({x:-180,y:175,z:50,html:"🐁",css:"mouse",cl:"r00n",n:"r005"}); }
  
  if(!s.r00i) { C.plane({x:-340,y:210,z:-100,html:"⚙️",css:"gear",cl:"r00j",n:"r007"}); }
  else if(s.r00i == 1) { C.plane({x:-165,y:175,z:50,html:"⚙️",css:"gear",cl:"r00j",n:"r007"}); }
  windowleft(1,1);
  draw_sky(1,0);
}

// Tear frame
//s.r00b = 0;// frame tearing attempts
r00a = () => {
  frame.style.animation="wiggle .5s";
  setTimeout('frame.style.animation="";',600);
  if(!s.r00b) s.r00b = 0;
  s.r00b++;
  if(s.r00b>=2){
    r001.onclick="";
    C.move({n:"frame",y:140,rx:-80});
  }
  save();
}

// Take hanger
//s.r00d = 0; // hanger removed
r00c = () => {
  add_inv("hanger");
  r002.remove();
  s.r00d = 1;
  save();
}

// Use hanger on lock
//r00f = 0; // lock/door open
r00e = () => {
  if(usingstr == "use hanger with "){
    C.move({n:"r003",x:-120,y:200,rz:-80});
    C.move({n:"r004",x:-120,y:140,z:-45,ry:120}); // door
    rem_inv("hanger");
    s.r00f = 1;
    save();
  }
}

// put mouse / cheese
r00h = () => {
  if(usingstr == "use mouse with " && s.r00i < 2){
    s.r00m = 1;
    C.plane({x:-180,y:175,z:50,html:"🐁",css:"mouse",cl:"r00n",n:"r005",rx:.4,ry:.4});
    use(-1);
    rem_inv("mouse");
    setTimeout(()=> {
      C.move({n:"r005",z:-100,x:-340,y:210});
    },1000);
    setTimeout(()=> {
      C.move({n:"r005",z:50,x:-160,y:175,sx:-.4});
      C.move({n:"r007",z:50,x:-175,y:175});
      s.r00i = 1;
    },3000);
  }
  else if(usingstr == "use cheese with ") {
    s.r00k = 1;
    C.plane({x:-205,y:175,z:50,html:"🧀",css:"cheese",sx:-1,cl:"r00l",n:"r006"});
    use(-1);
    rem_inv("cheese");
    setTimeout(()=>{
      if(!s.inv.includes("mouse")){
        note.innerHTML = "Mmm... no mouse here. I should try it on another hole";
      }
    },1000);
  }
  save();
}

// Take gear
//r00i = 0; // 0 = not here, 1: here, 2: taken
r00j = () => {
  r007.remove();
  add_inv("gear");
  s.r00i = 2;
  save();
}

// Take cheese
//r00k = 0;  // 0 = not here
r00l = () => {
  r006.remove();
  add_inv("cheese");
  s.r00k = 0;
  save();
}

// Take mouse
//r00m = 0;  // 0 = not here
r00n = () => {
  r005.remove();
  add_inv("mouse");
  s.r00m = 0;
  save();
}











// ===========================================================================
// Room 0-1: cannon (ok)
room01 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:10,y:-50,html:"🛡️",css:"shield",rz:2});
  C.plane({x:35,y:-85,html:svgtri,css:"shape",on:"shield",rz:2,sx:.5,sy:.5});
  C.plane({x:-160,y:198,w:1000,h:2000,html:svgdoorstair,ry:9,sx:.16,sy:.16});
  if(s.r01a){
    C.plane({x:0,y:170,html:"🪵",css:"wood",z:-5});
      C.plane({x:355,y:-7,z:0,w:900,h:500,html:svgcannon,css:s.r01b ? "loaded cannon" : "cannon",sx:.27,sy:.27,o:"bottom left",cl:"r01d",n:"r011",rz:-25});
  }
  else {
    C.plane({x:348,y:-10,z:0,w:900,h:500,html:svgcannon,css:s.r01b ? "loaded cannon" : "cannon",sx:.27,sy:.27,o:"bottom left",cl:"r01d",n:"r011"});
  }
  C.plane({x:-165,y:65,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room02"});
  C.plane({x:-207,y:65,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room00"});
  if(s.r01c){
    C.plane({x:215,y:175,z:-5,html:"⬤",css:"boulder",n:"r012",cl:"r01e"});
  }
  else {
    C.plane({x:-50,y:s.r01a?125:175,z:-5,html:"⬤",css:"boulder",n:"r012",cl:"r01e"});
  }
  windowright(0,1);
  draw_sky(0,1);
  
}

// Use wood with cannon
//r01a = 0;

// Use boulder with cannon
//r01b = 0;

// Shot on wall
//r01c = 0;

// Cannon
r01d = () => {
  if(usingstr == "use wood with "){
    s.r01a = 1;
    C.plane({x:0,y:170,html:"🪵",css:"wood",z:-5});
    C.move({n:"r011",rz:-25,y:-7,x:355});
    rem_inv("wood");
    if(!s.r01c)C.move({n:"r012",y:125});
    use(-1);
  }
  else if(usingstr == "use boulder with "){
    s.r01b = 1;
    rem_inv("boulder");
    r011.className = "loaded cannon";
    r011.setAttribute("onmouseover","txt`loaded cannon`");
    use(-1);
  }
  if(usingstr == "use lit torch with " && s.r01a && s.r01b){ // in window
    s.r01b = 0;
    r011.className = "cannon";
    r011.setAttribute("onmouseover","txt`cannon`");
    C.move({n:"r012",x:600,y:-130,z:-135});
    use(-1);
    animation = 1;
    setTimeout(anim1,500);
  }
  if(usingstr == "use lit torch with " && !s.r01a && s.r01b){ // in wall
    s.r01b = 0;
    s.r01c = 1;
    r011.className = "cannon";
    r011.setAttribute("onmouseover","txt`cannon`");
    C.move({n:"r012",x:235});
    setTimeout('C.move({n:"r012",x:215})',510);
    use(-1);
  }
  save();
}

// Pick up boulder shot on wall
r01e = () => {
  add_inv("boulder");
  r012.remove();
  C.plane({x:-50,y:s.r01a?125:175,z:-5,html:"⬤",css:"boulder",n:"r012",cl:"r01e"});
  s.r01c = 0;
  save();
}

// ===========================================================================
// room 0-2: telescope (ok)
room02 = () => {
  room(1,0,1,1)
  C.plane({x:25,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  wallside(1,0,1);
  if(!s.r02a) C.plane({x:190,y:170,w:30,h:30,html:"🔭",css:"telescope",rz:2,sx:-1,n:"r021",cl:"r02b"});
  C.plane({x:-50,y:150,w:500,h:1000,z:-20,html:svgdoorstair,sx:.16,sy:.16});
  C.plane({x:-45,y:95,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room01"});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room12"});
  windowleft(0);
  draw_sky(1,1);
}

// Take telescope
//r02a = 0; // taken
r02b = () => {
  add_inv("telescope");
  r021.remove();
  s.r02a = 1;
  save();
}

// ===========================================================================
// room 0-3: throne room (ok)
room03 = () => {
  note.className = "h";
  room(1,0,0,0);
  mount();
  C.plane({x:25,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-90,y:125,w:30,h:30,html:"💺",css:"throne",sx:-1});
  C.plane({x:250,y:185,w:30,h:30,html:"🪨",css:"rock",sx:-1});
  if(!s.r03pt)C.plane({x:210,y:135,z:-5,w:30,h:30,html:"🗡️",css:"sword",sx:-1,rz:40,rx:-30,cl:"room03p"});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room13"});
  wallside(1,0);
}

// Sword puzzle
room03p = () => {
  use(-1);
  r03pm = "";
  room(1,0,0,0);
  C.plane({x:25,y:0,z:50,w:950,h:650,b:"linear-gradient(#333,#555)"});
  C.plane({x:-170,y:30,z:70,html:"🪨",css:"rock",sx:-1,sx:2,sy:2});
  C.plane({x:50,y:55,z:50,w:30,h:30,html:"🗡️",css:"sword2",on:"pull sword",sx:-1,rz:54,rx:-50,n:"r03p1",cl:"r03pp"});
  C.plane({x:-360,y:-180,z:80,html:"❌",css:"cross",on:"exit",cl:"room03"});
  C.plane({x:-30,y:-180,z:80,html:"⬆️",css:"arrow",on:"up",cl:"r03pu"});
  C.plane({x:180,y:0,z:80,html:"➡️",css:"arrow",on:"right",cl:"r03pr"});
  C.plane({x:-230,y:0,z:80,html:"⬅️",css:"arrow",on:"left",cl:"r03pl"});
  C.plane({x:-30,y:140,z:80,html:"⬇️",css:"arrow",on:"down",cl:"r03pd"});
}

// moves
r03pm = "";

//r03pt = 0; // taken

// pull
r03pp = () => {
  if(r03pm.endsWith('uuddlrlr')) {
    C.move({n:"r03p1",x:80,y:-50,z:200});
    setTimeout(room03,510);
    add_inv("sword");
    s.r03pt = 1;
  }
  
  else {
    r03p1.style.animation="wiggle .2s 2";
    setTimeout('r03p1.style.animation=""',510);
  }
  save();
}

// move
r03pu = () => {
  C.move({n:"r03p1",rx:-30})
  setTimeout('C.move({n:"r03p1",rx:-50})',510);
  r03pm+="u";
}

r03pl = () => {
  C.move({n:"r03p1",rz:30})
  setTimeout('C.move({n:"r03p1",rz:55})',510);
  r03pm+="l";
}

r03pr = () => {
  C.move({n:"r03p1",rz:70})
  setTimeout('C.move({n:"r03p1",rz:55})',510);
  r03pm+="r";
}

r03pd = () => {
  C.move({n:"r03p1",rx:-70})
  setTimeout('C.move({n:"r03p1",rx:-50})',510);
  r03pm+="d";
}



// ===========================================================================
// room 1-2: library (ok)
room12 = (i,j) => {
  room(0,0,1,0)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-150,y:95,html:"🪜",css:"shelf"});
  draw_sky(0,0);
  
  for(i=0;i<3;i++){
    for(j=0;j<4;j++){
      if(!(j>0&&!((i+j-3)%3))&&!(i==1&&j==0))C.plane({x:i*32-35 + Math.random()*10,y:j*65-30,w:20+Math.random()*2,h:45,b:`hsl(${(i*5+j*15)*20} 50% ${63}%)`,z:20,css:"book",cl:"book"+i+j});
    }
  }
  C.plane({x:235,y:145,w:50,h:100,html:svgdoor,sx:-1.6,sy:1.6});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room22"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room02"});
  C.plane({x:195,y:165,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room13"});
}
  



// ===========================================================================
// room 1-3: knight (ok)
room13 = () => {
  r13b = 0;
  room(0,0,0,0)
  C.plane({x:-25,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-25,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-220,y:105,w:500,h:1000,html:svgknight,css:"knight",sx:.28,sy:.28,cl:"r13a"});
  C.plane({x:215,y:140,w:500,h:1000,html:svgdoorstair,sx:-.16,sy:.16});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room23"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"r13a"});
  C.plane({x:175,y:85,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room12"});
}

//r13b = 0; // dialog count
//r13c = 0; // passage open

// Talk to knight
r13a = () => {
  if(s.r13c){
    room03();
    use(-1);
  }
  else if(usingstr == "use crown with " && !s.r13c){
    note.innerHTML = "Welcome, sir !";
    note.className = "";
    setTimeout(room03,2000);
    s.r13c = 1;
    use(-1);
  }
  else {
    note.innerHTML = r13b == 1 ? "(I'm new here,<br>I haven't seen him in person yet)":"Only the king can enter the throne room!";
    note.className = "";
    r13b++;
  }
  save();
}




// ===========================================================================
// Room 2-0: boulders (ok)
room20 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  if(!s.r20g) C.plane({x:130-40,y:50+30,z:5,html:"⬤",css:"boulder",n:"r201",cl:"r20a"});
  C.plane({x:160-40,y:100+30,html:"⬤",css:"boulder"});
  C.plane({x:100-40,y:100+30,html:"⬤",css:"boulder"});
  C.plane({x:190-40,y:150+30,html:"⬤",css:"boulder"});
  C.plane({x:130-40,y:150+30,html:"⬤",css:"boulder"});
  C.plane({x:70-40,y:150+30,html:"⬤",css:"boulder"});
  if(animation) C.plane({x:-300,y:20,html:"⬤",css:"boulder",n:"r2099",cl:"r20z"});
  C.plane({x:-50,y:-20,html:"🛡️",css:"shield",rz:2});
  C.plane({x:-20,y:-25,html:"🔴",css:"shape",on:"shield",rz:1});
  if(!s.r20pf) {
    C.plane({x:210,y:20,html:"🔒",css:"lock",rz:-2,z:10,cl:"room20p"});
    C.plane({x:210,y:-15,html:"🔗",css:"chain",rz:40});
  }
  C.plane({x:-85,y:120,w:50,h:100,z:-20,html:svgdoor,ry:5,sx:-1.6,sy:1.6});
  if(!animation) C.plane({x:-95,y:65,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room21"})
  windowleft(0,1);
  windowright(s.r20pf ? 0 : 1,1);
  draw_sky(1,0);
}

// Take boulder
//r20g = 0; // removed

r20a = () => {
  add_inv("boulder");
  r201.remove();
  s.r20g = 1;
  save();
}

// Puzzle

r20pm = [0,0,0,0];
//r20pf = 0; // open

room20p = () => {
  use(-1);
  room(1,0,0,0);
  C.plane({x:25,y:0,z:50,w:950,h:650,b:((s.r40c >= 300 || s.r40c < 120) ? "#def":"#002")});
  C.plane({x:-360,y:-180,z:80,html:"❌",css:"cross",on:"exit",cl:"room20"});
  C.plane({x:-420,y:-220,z:55,html:"🔗",css:"big chain",on:"",sx:1.8,sy:1.8,rz:40});
  C.plane({x:-180,y:-240,z:55,html:"🔗",css:"big chain",on:"",sx:1.8,sy:1.8,rz:40});
  C.plane({x:20,y:-260,z:51,html:"🔗",css:"big chain",on:"",sx:1.8,sy:1.8,rz:40});
  C.plane({x:250,y:-280,z:51,html:"🔗",css:"big chain",on:"",sx:1.8,sy:1.8,rz:40});
  C.plane({x:-220,y:-20,z:52,html:"🔒",css:"big lock",on:"",sx:1.8,sy:1.8});
  C.plane({x:0,y:-10,z:55,w:50,h:50,b:"#fff",css:"shape shape2",html:[svgsquare,svgstar,svgtri,svgcircle][r20pm[0]],on:"",cl:"r20pa",n:"r20p1"});
  C.plane({x:0,y:50,z:55,w:50,h:50,b:"#fff",css:"shape shape2",html:[svgsquare,svgstar,svgtri,svgcircle][r20pm[1]],on:"",cl:"r20pb",n:"r20p2"});
  C.plane({x:0,y:110,z:55,w:50,h:50,b:"#fff",css:"shape shape2",html:[svgsquare,svgstar,svgtri,svgcircle][r20pm[2]],on:"",cl:"r20pc",n:"r20p3"});
  C.plane({x:0,y:170,z:55,w:50,h:50,b:"#fff",css:"shape shape2",html:[svgsquare,svgstar,svgtri,svgcircle][r20pm[3]],on:"",cl:"r20pd",n:"r20p4"});
}


r20pa = () => {
  r20pm[0] = (r20pm[0]+1) % 4;
  r20pe();
}

r20pb = () => {
  r20pm[1] = (r20pm[1]+1) % 4;
  r20pe();
}

r20pc = () => {
  r20pm[2] = (r20pm[2]+1) % 4;
  r20pe();
}

r20pd = () => {
  r20pm[3] = (r20pm[3]+1) % 4;
  r20pe();
}

r20pe = () => { // draw
  r20p1.innerHTML = [svgsquare,svgstar,svgtri,svgcircle][r20pm[0]];
  r20p2.innerHTML = [svgsquare,svgstar,svgtri,svgcircle][r20pm[1]];
  r20p3.innerHTML = [svgsquare,svgstar,svgtri,svgcircle][r20pm[2]];
  r20p4.innerHTML = [svgsquare,svgstar,svgtri,svgcircle][r20pm[3]];
  if(r20pm.join("") == "3201"){
    s.r20pf = 1;
    setTimeout(fadeout, 600);
    setTimeout(room20, 1100);
    setTimeout(fadein, 1200);
  }
  save();
}

// ===========================================================================
// Room 2-1: hay (ok)
room21 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  if(!s.r21g) C.plane({x:-10,y:130,z:-20,w:1000,h:1000,html:svghay,on:"hay",sx:.28,sy:.28,cl:"r21a"});
  else if(!s.r21i) {
    // burnt - see gear
    C.plane({x:-40,y:210,z:-10,html:"⚙️",css:"gear",cl:"r21h",n:"r007",rx:130});
  }
  C.plane({x:-235,y:130,w:500,h:1000,z:-20,html:svgdoorstair,ry:5,sx:.15,sy:.16});
  C.plane({x:-185-35,y:70,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room20"});
  C.plane({x:-145-37,y:70,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room22"});
  windowright(0,1,"r21a");
  if(s.r21b) { C.plane({x:180,y:140,w:30,h:30,html:"🔭",css:"telescope",rz:2,sx:-1,sy:1.1}); }
  C.plane({x:120,y:-100,z:40,rx:-35,ry:30,html:"🕸️",css:"web"});
  draw_sky(0,1,1);
  if(!s.r21g && s.r21b && s.r40c == 60){
    r21f();
  }
  
}

// Put telescope on window/hay
//r21b = 0;
r21a = () => {
  if(usingstr == "use telescope with "){
    C.plane({x:180,y:140,w:30,h:30,html:"🔭",css:"telescope",rz:2,sx:-1,sy:1.1});
    s.r21b = 1;
    use(-1);
  }
  if(s.r21b && s.r40c == 60 && !s.r21g){
    r21f();
  }
  save();
}

//r21g = 0; // burnt
r21f = () => { // fire
  animation = 1;
  setTimeout(() => {
    C.plane({x:0,y:185,z:20,w:30,h:30,html:"🔥",css:"fire"});
    C.plane({x:-50,y:175,z:20,w:30,h:30,html:"🔥",css:"fire"});
    C.plane({x:-90,y:185,z:20,w:30,h:30,html:"🔥",css:"fire"});
    C.plane({x:-30,y:145,z:20,w:30,h:30,html:"🔥",css:"fire"});
    C.plane({x:-70,y:125,z:20,w:30,h:30,html:"🔥",css:"fire"});
    C.plane({x:-10,y:105,z:20,w:30,h:30,html:"🔥",css:"fire"});
    s.r21g = 1;
  },2000);
  setTimeout(fadeout, 5000);
  setTimeout(room21, 6500);
  setTimeout("animation=0;fadein()", 6600);
  save();
}

// Take gear
//r21i = 0; // taken
r21h = () => {
  r007.remove();
  s.r21i = 1;
  add_inv("gear");
  save();
}

// ===========================================================================
// room 2-2: torch (ok)
room22 = (i,j) => {
  room(0,0,1,1)
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:85,y:75,html:"📜",css:"note",sx:1.6,sy:1.6,cl:"r22a"});
  C.plane({x:-25,y:85,w:50,h:10,z:10,html:svgtorchsupport,css:"torch holder",sx:1.6,sy:1.6,cl:"r22f"});
  if(!s.r22b) C.plane({x:-40,y:45,w:50,h:50,html:svgtorch,on:"torch",sx:1.6,sy:1.6,cl:"r22c",n:"r221"});
  if(!s.r22b && s.r22e){
    C.plane({x:-35,y:50,z:20,w:30,h:30,html:"🔥",css:"fire",on:"torch",n:"r222",cl:"r22c"});
  }
  C.plane({x:-205,y:140,w:500,h:1000,html:svgdoorstair,sx:.16,sy:.16});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room32"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room12"});
  C.plane({x:-190,y:85,z:40,html:"⬆️",css:"arrow",on:"up",cl:"r22d"});//"room21"});
}

// Note
r22a = () => {
  note.className="";
  note.innerHTML = "This tower contains flammable material, please leave torch here before going up";
}

// Take/leave torch
//r22b = 0; // torch removed
//r22e = 0; // torch lit

// Put down torch
r22f = () => {
  if(s.inv.includes("lit torch")){
    rem_inv("lit torch");
    s.r22b = 0;
    s.r22e = 1;
    C.plane({x:-40,y:45,w:50,h:50,html:svgtorch,on:"torch",sx:1.6,sy:1.6,cl:"r22c",n:"r221"});
    C.plane({x:-35,y:50,z:20,w:30,h:30,html:"🔥",css:"fire",on:"torch",n:"r222",cl:"r22c"});
  }
  else if(s.inv.includes("torch")){
    rem_inv("torch");
    s.r22b = 0;
    s.r22e = 0;
    C.plane({x:-40,y:45,w:50,h:50,html:svgtorch,on:"torch",sx:1.6,sy:1.6,cl:"r22c",n:"r221"});
  }
  else {
    r22c();
  }
  use(-1);
  save();
}

// Take torch
r22c = () => {
  if(s.r22e) {
    add_inv("lit torch");
    r222.remove();
  } else {
    add_inv("torch");
  }
  r221.remove();
  s.r22b = 1;
  save();
}

// Go up
r22d = () => {
  if(s.r22b){
    r22a();
  }
  else {
    room21();
  }
  save();
}


// ===========================================================================
// room 2-3: exit (ok)
room23 = () => {
  room(0,0,0,0)
  mount();
  C.plane({x:-45,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  C.plane({x:-75,y:25,z:-10,w:1000,h:1000,html:svgoutside,css:"drawbridge",sx:.4,sy:.43});
  if(s.r23k){
    C.plane({x:-200,y:45,z:90,ry:-62,w:600,h:1000,html:svgexit,css:"doors",sx:.4,sy:.4,n:"r231"});
    C.plane({x:115,y:45,z:90,ry:95,w:600,h:1000,html:svgexit,css:"doors",sx:-.4,sy:.4,n:"r232"});
  }
  else{
    C.plane({x:-150,y:35,w:600,h:1000,html:svgexit,css:"doors",sx:.4,sy:.4,n:"r231"});
    C.plane({x:10,y:35,w:600,h:1000,html:svgexit,css:"doors",sx:-.4,sy:.4,n:"r232"});
    C.plane({x:-30,y:110,w:60,h:100,html:svgkeyhole,css:"keyhole",sx:.5,sy:.5,cl:"r23l",n:"r233"});
  }
  C.plane({x:150+15,y:80+50,z:-40,w:60,h:100,html:svglever,on:"broken lever",css:"lever",cl:"r23h"});
  C.plane({x:155+15,y:-10+30,w:60,h:100,html:svgaxis,on:"gear axis",css:"axis",cl:"r23b"});
  C.plane({x:120+15,y:-40+30,z:10,w:60,h:100,html:svgaxis,on:"gear axis",css:"axis",cl:"r23d"});
  C.plane({x:155+15,y:-70+30,w:60,h:100,html:svgaxis,on:"gear axis",css:"axis",cl:"r23f"});
  C.plane({x:275,y:95,z:30,html:"➡️",css:"arrow",on:"right",cl:"room33"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room13"});
  if(s.r23a) C.plane({x:155-5+15,y:-10+30,html:"⚙️",css:"gear",n:"g1"});
  if(s.r23c) C.plane({x:120-4+15,y:-40+30,html:"⚙️",css:"gear",n:"g2"});
  if(s.r23e) C.plane({x:155-5+15,y:-70+30,html:"⚙️",css:"gear",n:"g3"});
  if(s.r23g) C.plane({x:157+15,y:75,z:-63,html:"🗡️",css:"sword",ry:295,cl:"r23j",n:"r239"});
}

// Put gear 1
//r23a = 0;
r23b = () => {
  if(usingstr == "use gear with " && !s.r23a){
    rem_inv("gear");
    use(-1);
    C.plane({x:155-5+15,y:-10+30,html:"⚙️",css:"gear",n:"g1",o:"25px -1px"});
    s.r23a = 1;
  }
  save();
}

// Put gear 2
//r23c = 0;
r23d = () => {
  if(usingstr == "use gear with " && !s.r23c){
    rem_inv("gear");
    use(-1);
    C.plane({x:120-4+15,y:-40+30,html:"⚙️",css:"gear",n:"g2",o:"25px -1px"});
    s.r23c = 1;
  }
  save();
}

// Put gear 3
//r23e = 0;
r23f = () => {
  if(usingstr == "use gear with " && !s.r23e){
    rem_inv("gear");
    use(-1);
    C.plane({x:155-5+15,y:-70+30,html:"⚙️",css:"gear",n:"g3",o:"25px -1px"});
    s.r23e = 1;
  }
  save();
}

// Put sword
//r23g = 0;
r23h = () => {
  if(usingstr == "use sword with " && !s.r23g){
    rem_inv("sword");
    use(-1);
    C.plane({x:157+15,y:75,z:-63,html:"🗡️",css:"sword",ry:295,cl:"r23j",n:"r239"});
    s.r23g = 1;
  }
  save();
}

// Use sword
//r23i = 0;
r23j = () => {
  if(!s.r23k){
    note.innerHTML = "You shall open the doors first";
    note.className = "";
  }
  else {
      C.move({n:"r239",x:182,y:64,rx:-82,ry:270,rz:-25});
      C.move({n:"g1",rz:-45});
      C.move({n:"g2",rz:45});
      C.move({n:"g3",rz:-45});
      s.r23i = 1;
      setTimeout(fadeout, 800);
      setTimeout(room23c, 1300);
      setTimeout(fadein, 1400);
  }
  save();
}


// Use key
//r23k = 0;
r23l = () => {
  if(usingstr == "use key with "){
    rem_inv("key");
    use(-1);
    r233.remove();
    C.move({n:"r231",x:-200,y:45,z:90,ry:-62});
    C.move({n:"r232",x:115,y:45,z:90,ry:95});
    s.r23k = 1;
  }
  save();
}

room23c = () => {
  animation = 1;
  scene.className = "";
  scene.innerHTML=text.innerHTML="";
  draw_sky()
  mount();
  C.plane({x:0,y:550,z:-500,w:3500,h:400,b:"#7cd",rx:0});
  C.plane({x:80,y:260,z:0,w:500,h:100,b:"linear-gradient(#333,#555)",rx:88});
  C.plane({x:80,y:-50,z:-30,w:480,h:600,b:"linear-gradient(#a73,#741)",rx:0,o:"bottom center",n:"db"});
  C.plane({g:"db",x:14,y:-465,z:0,w:20,h:1000,b:"#222",rx:250,o:"bottom center"});
  C.plane({g:"db",x:470,y:-465,z:0,w:20,h:1000,b:"#222",rx:250,o:"bottom center"});
  
  setTimeout("inventory.style.opacity=0;C.move({n:'db',rx:90});scene.style.transition='10s all'",1500);
  setTimeout("scene.style.transform='translateZ(1200px)rotateX(15deg)'",5500);
  setTimeout(()=>{
    note.style.left = "175px"
    note.innerHTML = "Congratulations!<br>You're free!";
    note.className = "";
    s.end = 1;
  },10500);
  save();
}




// ===========================================================================
// room 3-2: anvil fire (ok)
room32 = () => {
  room(0,0,1,0);
  C.plane({x:-15,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-15,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  if(!s.s.r32a)C.plane({x:-120,y:230,w:30,h:30,html:"🔨",css:"hammer",on:"",rz:-45,n:"r323"});
  if(!r32a) C.plane({x:-120,y:180,z:40,w:20,h:20,on:"???",n:"r321",cl:"r32b"});
  C.plane({x:-330+20,y:230,html:"🪵",css:"wood",rz:-90});
  C.plane({x:-290+20,y:230,z:10,html:"🪵",css:"wood",rz:-90});
  if(!s.r32c) C.plane({x:-310+20,y:200,html:"🪵",css:"wood",rz:-90,n:"r322",cl:"r32d"});
  C.plane({x:110-40,y:125,html:"🏦",css:"fireplace",cl:"r32e"});
  C.plane({x:160-40+3,y:185,z:20,w:30,h:30,html:"🔥",css:"fire",cl:"r32e"});
  C.plane({x:215-40+3,y:185,z:20,w:30,h:30,html:"🔥",css:"fire",cl:"r32e",sx:-1});
  C.plane({x:230-40+3,y:185,z:20,w:30,h:30,html:"🔥",css:"fire",cl:"r32e"});
  C.plane({x:208-40,y:163,z:10,w:115,h:70,b:"#444",on:"fireplace",cl:"r32e"});
  C.plane({x:220-40,y:25,z:-40,w:80,h:300,b:"#555",on:"fireplace",cl:"r32e"});
  C.plane({x:-100,y:185,w:100,h:50,html:svganvil,css:"anvil",sx:2,sy:2});
  C.plane({x:275,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room42"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room22"});
  draw_sky(0,0);
}

// Take hammer
//r32a = 0; // hammer removed
r32b = () => {
  add_inv("hammer");
  r321.remove();
  r323.remove();
  s.r32a = 1;
  save();
}

// Take wood
//r32c = 0; // wood removed
r32d = () => {
  add_inv("wood");
  r322.remove();
  s.r32c = 1;
  save();
}

// Lit torch / heat soup
r32e = () => {
  if(usingstr == "use torch with "){
    s.inv[using] = "lit torch";
    use(-1);
    draw_inv();
  }
  else if(usingstr == "use soup with "){
    animation = 1;
    rem_inv("soup");
    use(-1);
    C.plane({x:130,y:150,z:30,html:"🍲",css:"soup",n:"r323",cl:"r32g"});
    C.plane({x:130,y:150,z:31,html:"🍲",css:"hot soup o0",on:"hot soup",n:"r324",cl:"r32g"});
    setTimeout('r324.className="plane hot soup";r324.setAttribute("onmouseover","txt`hot soup`");animation=0;s.r33b=1;save()',2000);
  }
  save();
}

// Take hot soup
//r32f = 0; // removed
r32g = () => {
  add_inv("hot soup");
  r323.remove();
  r324.remove();
  s.r32f = 1;
  save();
}


// ===========================================================================
// room 3-3: kitchen (ok)
room33 = () => {
  room(0,0,0,0,1)
  C.plane({x:25,y:-220,z:-50,w:1050,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:25,y:235,z:-50,w:1050,h:70,b:"linear-gradient(#333,#555)",rx:60});
  if(!s.r33h) C.plane({x:400,y:0,z:40,w:120,h:400,on:"wall",cl:"r33i",n:"r334"}); // wall
  C.plane({x:-60,y:-40,w:100,h:100,html:svgtable,css:"",sx:.3,sy:.3});
  C.plane({x:10,y:45,html:"🧑🏻‍🍳",css:"cook",cl:"r33g"});
  if(!s.r33e) C.plane({x:-40,y:75,html:"🧀",css:"cheese",cl:"r33f",n:"r332"});
  if(!s.r33c){
    if(s.r33b) C.plane({x:130,y:60,html:"🍲",css:"hot soup",n:"r331"});
    else C.plane({x:130,y:60,html:"🍲",css:"soup",cl:"r33d",n:"r331"});
  }
  C.plane({x:-250,y:-60,html:"🛡️",css:"shield",rz:2});
  C.plane({x:-220,y:-65,html:"⭐️",css:"shape",on:"shield",rz:1});
  if(s.r33h) C.plane({x:325,y:95,z:40,html:"➡️",css:"arrow",on:"right",cl:"room43"});
  if(s.r33h){
    C.plane({x:495,y:15,z:40,html:svgrock,css:"",sx:-2,sy:2});
    C.plane({x:295,y:15,z:40,html:svgrock,css:"",sx:2,sy:2});
    C.plane({x:435,y:25,z:40,html:svgrock,css:"",sx:-2,sy:2});
  }
  else { wallside(0,1,0,1); }
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room23"});
}

// soup is hot
//r33b = 0;

// Talk to cook
r33a = () => {
  note.innerHTML = (usingstr == "use ht soup with " || (s.r33b && !s.r33c)) ? "Thanks! You can take the cheese!" : "Please help me heating up the soup!"
  note.className = "";
  save();
}

// Take soup
//r33c = 0; // taken
r33d = () => {
  if(!s.r33b){
    r33a();
    add_inv("soup");
    r331.remove();
    s.r33c = 1;
    save();
  }
}

// Take cheese
//r33e = 0; // taken
r33f = () => {
  if(s.r33b && !s.r33c){
    add_inv("cheese");
    r332.remove();
    s.r33e = 1;
  }
  else {
    note.innerHTML = "Please help me heating up the soup first!"
    note.className = "";
  }
  save();
}

// Put hot soup
r33g = () => {
  if(usingstr == "use hot soup with "){
    C.plane({x:130,y:60,html:"🍲",css:"hot soup",cl:"r33c",n:"r331"});
    rem_inv("hot soup");
    s.r33c = 0;
    r33a();
    use(-1);
    draw_inv();
  }
  else r33a();
  save();
}

// Break wall
//r33h = 0; // broken
r33i = () => {
  if(usingstr == "use hammer with "){
    s.r33h = 1;
    use(-1);
    rem_inv("hammer");
    draw_inv();
    fadeout();
    setTimeout(room33,500);
    setTimeout(fadein,800);
    save();
  }
}



// ===========================================================================
// Room 4-0: witch (ok)
room40 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:80,y:100,w:600,h:1000,html:svgwitch,css:"witch",sx:.25,sy:.25,cl:"r40a"});
  if(s.r40b) C.plane({x:190,y:160,w:60,h:100,html:"🪄",css:"wand"});
  C.plane({x:80,y:-100,html:"🦇",css:"bat",sy:-1});
  C.plane({x:150,y:-95,html:"🦇",css:"bat",sy:-1});
  C.plane({x:-30,y:120,w:50,h:100,z:-20,html:svgdoor,ry:0,sx:1.6,sy:1.6});
  C.plane({x:-15,y:70,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room41"});
  if(s.r40b) {
    C.plane({x:-110,y:50,z:80,html:"↩️",css:"arrow",on:"future",cl:"r40r"});
    C.plane({x:-180,y:50,z:80,html:"↪️",css:"arrow",on:"past",cl:"r40l"});
  }
  C.group({n:"wheel",x:-175,y:15,w:150,h:150,on:"time wheel",css:"timewheel",o:"center center",rz:s.r40d});
  C.plane({g:"wheel",x:75,y:75,w:150,h:150,b:"#def",css:"c wheel",on:"time wheel"});
  C.plane({g:"wheel",html:"🌞",on:"",x:75-15,y:75-65});
  C.plane({g:"wheel",html:"🌘",on:"",x:75-15,y:75+30,n:"wheelmoon"});
  C.plane({w:158,h:200,x:-175,y:110,b:"linear-gradient(#854,#631)",css:"base",on:"time wheel"});
  
  draw_sky(0,0);
}

// given wand
//r40b = 0;

// Talk to witch / give wand
r40a = () => {
  phase = s.day%8;
  moonstr = "🌓";
  if(usingstr == "use wand with " || s.r40b){
    s.r40b = 1;
    rem_inv("wand");
    note.innerHTML = "You can now turn the wheel of time! You can choose the sun and moon's position in the sky..."
    note.className = "";
    if(usingstr == "use wand with "){ 
      C.plane({x:190,y:160,w:60,h:100,html:"🪄",css:"wand"});
      C.plane({x:-110,y:50,z:80,html:"↩️",css:"arrow",on:"future",cl:"r40r"});
      C.plane({x:-180,y:50,z:80,html:"↪️",css:"arrow",on:"past",cl:"r40l"});
    }
    use(-1);
    save();
  }
  
  else if(!s.r40b){
    note.innerHTML = "I am the time witch... I need my wand to power my time machine.<br>I heard they put it in a secret room hidden behind a fragile wall..."
    note.className = "";
  }
}

// angle wheel 
//r40c = 300; // adjusted 0-360
//r40d = 300; // real

// current day
//day = 801;

// Prisoners arrived on day 790
// prisoner 2 died on day 796

// Phase of the moon // 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘



update_sky = () => {
  //console.log(r40c);
  if(s.r40c == -60) { s.r40c = 360-60; s.day--; phase --;}
  if(s.r40c >= 360) { s.r40c -= 360; s.day++; phase++; }
  phase = s.day % 8;
  moonstr=[..."🌑🌒🌓🌔🌕🌖🌗🌘"][phase];
  if(s.r40c == 240 || s.r40c == 120){ C.move({n:"moon",y:650}) }
  else { C.move({n:"moon",y:600}) }
  
  
  if(s.r40c <= 60 || s.r40c > 240) viewport.style.background = "#cde";
  else viewport.style.background = "#002";
  C.move({n:"skygroup",rz:s.r40d});
  try { moon.innerHTML = moonstr; wheelmoon.innerHTML = moonstr; }
  catch(e) {}
  save();
}

r40r = () => { s.r40c += 60; s.r40d += 60; C.move({n:"wheel",rz:s.r40d}); update_sky(); save(); }
r40l = () => { s.r40c -= 60; s.r40d -= 60; C.move({n:"wheel",rz:s.r40d}); update_sky(); save(); }


// ===========================================================================
// Room 4-1: wolf (ok)

// Prisoners arrived on day 790
// prisoner 2 died / wolf appeared on day 796's night


room41 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  
  // past before prisoners
  if(s.day <= 790){
    C.plane({x:50,y:160,html:"🔗",css:"chain",rz:-45});
    C.plane({x:50,y:130,html:"🔗",css:"chain",rz:-45});
    C.plane({x:50,y:100,html:"🔗",css:"chain",rz:-45});
    
    C.plane({x:50+150,y:160,html:"🔗",css:"chain",rz:-45});
    C.plane({x:50+150,y:130,html:"🔗",css:"chain",rz:-45});
    C.plane({x:50+150,y:100,html:"🔗",css:"chain",rz:-45});
  }
  
  // past before prisoner 2 dies
  else if(s.day < 796 || (s.day == 796 && s.r40c < 120)){
    C.plane({x:80-150,y:130,html:"🧍‍♂️",css:"prisoner",cl:"r41a"});
    C.plane({x:190-150,y:120,html:"🔗",css:"chain",rz:20});
    C.plane({x:220-150,y:100,html:"🔗",css:"chain",rz:5});
    C.plane({x:240-150,y:80,html:"🔗",css:"chain",rz:-35});
    
    C.plane({x:80,y:130,html:"🧍‍♂️",css:"prisoner2",on:"prisoner",cl:"r41b"});
    C.plane({x:190,y:120,html:"🔗",css:"chain",rz:20});
    C.plane({x:220,y:100,html:"🔗",css:"chain",rz:5});
    C.plane({x:240,y:80,html:"🔗",css:"chain",rz:-35});
  }
  
  // beast
  else if ((s.day % 8) == 4 && s.r40c < 300 && s.r40c > 60) {
    if(!s.r41v){ C.plane({x:-60,y:50,w:1000,h:1000,html:svgwolf,css:"werewolf",sx:.37,sy:.37,cl:"r41c",n:"ww"});
    C.plane({x:190-150,y:110,html:"🔗",css:"chain",rz:20});
    C.plane({x:220-150,y:100,html:"🔗",css:"chain",rz:5});
    C.plane({x:240-150,y:80,html:"🔗",css:"chain",rz:-35});
    }
    else {
      C.plane({x:240-150,y:80,html:"🔗",css:"chain",rz:-35});
      C.plane({x:240-150,y:100,html:"🔗",css:"chain",rz:-35});
      C.plane({x:240-150,y:120,html:"🔗",css:"chain",rz:-35});
    }
    C.plane({x:50+150,y:140,html:"🔗",css:"chain"});
    C.plane({x:70+150,y:120,html:"🔗",css:"chain"});
    C.plane({x:90+150,y:100,html:"🔗",css:"chain"});
    C.plane({x:30+150,y:160+20,z:10,html:"💀",css:"skeleton",rz:-30});
    C.plane({x:50+150,y:180+20,html:"🦴",css:"skeleton",rz:-30});
    C.plane({x:40+150,y:200+20,html:"🦴",css:"skeleton",rz:-60});
    C.plane({x:30+150,y:190+20,html:"🦴",css:"skeleton",rz:-90});
  }
  
  // future
  else { //if(s.day > 780) {
    C.plane({x:80-150,y:130,html:"🧍‍♂️",css:"prisoner",cl:"r41a"});
    C.plane({x:190-150,y:120,html:"🔗",css:"chain",rz:20});
    C.plane({x:220-150,y:100,html:"🔗",css:"chain",rz:5});
    C.plane({x:240-150,y:80,html:"🔗",css:"chain",rz:-35});
    C.plane({x:50+150,y:140,html:"🔗",css:"chain"});
    C.plane({x:70+150,y:120,html:"🔗",css:"chain"});
    C.plane({x:90+150,y:100,html:"🔗",css:"chain"});
    C.plane({x:30+150,y:160+20,z:10,html:"💀",css:"skeleton",rz:-30});
    C.plane({x:50+150,y:180+20,html:"🦴",css:"skeleton",rz:-30});
    C.plane({x:40+150,y:200+20,html:"🦴",css:"skeleton",rz:-60});
    C.plane({x:30+150,y:190+20,html:"🦴",css:"skeleton",rz:-90});
  }

  C.plane({x:-110,y:125,w:500,h:1000,z:-20,html:svgdoorstair,ry:5,sx:.16,sy:.16});
  if(animation) { 
    C.plane({x:-300,y:20,html:"⬤",css:"boulder",n:"r2099",cl:"r41z"});
  }
  else {
    if ((s.day % 8) == 4 && s.r40c < 300 && s.r40c > 60 && !s.r41v){
      C.plane({x:-110,y:-140,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room40"});
      C.plane({x:-70,y:-140,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room42"});
    }
    else{
      C.plane({x:-110,y:70,z:40,html:"⬆️",css:"arrow",on:"up",cl:"room40"});
      C.plane({x:-70,y:70,z:40,html:"⬇️",css:"arrow",on:"down",cl:"room42"});
    }
  }
  if(s.r41y){
    C.plane({x:r41v ? -280:55,y:185,html:"⬤",css:"boulder",n:"r2099",cl:"r41z"});
  }
  C.plane({x:-40,y:r41v ? 0 : 400,html:"🔑",css:"key",n:"key",cl:"r41x"});
  windowleft(0,1);
  draw_sky(1,0);
  save();
}

// Talk to prisoner 2
r41a = () => {
  
  // future
  if(s.day > 796 || (s.day == 796 && s.r40c >= 300)) {
    note.innerHTML = "I don't know what happened to my cellmate! We arrived here together a few days ago, and one morning I found him like that!<br>By chance I'm not injured...";
    note.className = "";
  }
  
  // past
  else {
    note.innerHTML = "Why am I here?! My stomach hurts! Let me out!";
    note.className = "";
  }
}

r41b = () => {
  note.innerHTML = "I'm here because I broke the drawbridge's lever...<br>I'm sure it can be replaced by another long object...";
  note.className = "";
}

r41c = () => {
  if(usingstr == "use sword with " || usingstr == "use hammer with "){
    note.innerHTML = "I can't attack it from here, it's too big ! it would kill me first...";
    note.className = "";
    use(-1);
  }
  else {
    note.innerHTML = "AWOOOOOO!";
    note.className = "";
  }
}


//r41v = 0; // wolf dead

// key
//r41w = 0; // 1 = on the floor
r41x = () => { // take it
  key.remove();
  s.r41w = 0;
  add_inv("key");
  draw_inv();
  save();
}

// boulder
//r41y = 0; // 1 = on the floor
r41z = () => { // take it
  r2099.remove();
  s.r41y = 0;
  add_inv("boulder");
  draw_inv();
  save();
}


// ===========================================================================
// room 4-2: stairs hole (ok)
room42 = () => {
  room(0,1,1,1)
  C.plane({x:-45,y:-120,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  wallside(0,0,1);
  C.plane({x:-205,y:145,w:500,h:1000,html:svgdoorstair,sx:.16,sy:.16});
  if(!s.r42pf) { C.plane({x:-262,y:145,z:10,html:"🚪",css:"door"}); }
  else { C.plane({x:-175,y:150,z:-40,html:"🚪",css:"door",ry:310});}
  if(!s.r42pf) { C.plane({x:-230,y:140,z:15,html:"🔒",css:"lock",rz:-2,cl:"room42p"}); }
  C.plane({x:-75,y:65,html:"📜",css:"note",sx:1.6,sy:1.6,cl:"r42a"});
  C.plane({x:250,y:255,z:-50,html:"🕳️",css:"hole",rz:90,sx:-1,sy:2,cl:"r42d"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room32"});
  C.plane({x:-205,y:95,z:5,html:"⬆️",css:"arrow",on:"up",cl:"room41"});
  C.plane({x:50,y:60,html:"🛡️",css:"shield",rz:2});
  C.plane({x:80,y:55,html:"🟩️",css:"shape",on:"shield",rz:1});
  if(s.r42b){ C.plane({x:180,y:185,z:50,html:"🧀",css:"cheese",sx:-1,cl:"r42e",n:"r421"}); }
  if(s.r42b && !s.r42c) { C.plane({x:170,y:185,z:50,html:"🐁",css:"mouse",sx:.4,sy:.4,cl:"r42f",n:"r422"}); }
  else { C.plane({x:270,y:185,z:-100,html:"🐁",css:"mouse",sx:.4,sy:.4,cl:"r42f",n:"r422"}); }
  windowright(0);
  draw_sky(0,0);
}

r42a = () => {
  note.className="";
  note.innerHTML = "This tower contains dangerous prisoners";
}

//r42b = 0; // put cheese
//r42c = 0; // take mouse
r42d = () => {
  if(usingstr == "use cheese with ") {
    s.r42b = 1;
    C.plane({x:180,y:185,z:50,html:"🧀",css:"cheese",sx:-1,cl:"r42e",n:"r421"});
    rem_inv("cheese");
    use(-1);
    setTimeout(()=> {
      C.move({n:"r422",x:170,z:50});
    },2000);
    save();
  }
}

r42e = () => {
  r421.remove();
  add_inv("cheese");
  if(self.r422) C.move({n:"r422",x:270,y:200,z:-100});
  s.r42b = 0;
  save();
}

r42f = () => {
  r422.remove();
  add_inv("mouse");
  note.className="";
  note.innerHTML = "I think I saw another mouse hole earlier...";
  s.r42c = 1;
  save();
  
}


// Puzzle

r42pm = [0,0,0,0];
//r42pf = 0; // open

room42p = () => {
  use(-1);
  room(1,0,0,0);
  C.plane({x:25,y:0,z:50,w:950,h:650,b:"linear-gradient(#853,#431)"});
  C.plane({x:-360,y:-180,z:80,html:"❌",css:"cross",on:"exit",cl:"room42"});
  C.plane({x:-220,y:-20,z:50,html:"🔒",css:"big lock",on:"",sx:1.8,sy:1.8});
  C.plane({x:-100,y:50,z:55,w:60,h:60,b:["#000","#0F0","#F00","#00F","#FE2"][r42pm[0]],css:"color",on:"",cl:"r42pa",n:"r42p1"});
  C.plane({x:-30,y:50,z:55,w:60,h:60,b:["#000","#0F0","#F00","#00F","#FE2"][r42pm[1]],css:"color",on:"",cl:"r42pb",n:"r42p2"});
  C.plane({x:40,y:50,z:55,w:60,h:60,b:["#000","#0F0","#F00","#00F","#FE2"][r42pm[2]],css:"color",on:"",cl:"r42pc",n:"r42p3"});
  C.plane({x:110,y:50,z:55,w:60,h:60,b:["#000","#0F0","#F00","#00F","#FE2"][r42pm[3]],css:"color",on:"",cl:"r42pd",n:"r42p4"});
}


r42pa = () => {
  r42pm[0] = (r42pm[0]+1) % 5;
  r42pe();
}

r42pb = () => {
  r42pm[1] = (r42pm[1]+1) % 5;
  r42pe();
}

r42pc = () => {
  r42pm[2] = (r42pm[2]+1) % 5;
  r42pe();
}

r42pd = () => {
  r42pm[3] = (r42pm[3]+1) % 5;
  r42pe();
}

r42pe = () => { // draw
  r42p1.style.background = ["#000","#0F0","#F00","#00F","#FE2"][r42pm[0]];
  r42p2.style.background = ["#000","#0F0","#F00","#00F","#FE2"][r42pm[1]];
  r42p3.style.background = ["#000","#0F0","#F00","#00F","#FE2"][r42pm[2]];
  r42p4.style.background = ["#000","#0F0","#F00","#00F","#FE2"][r42pm[3]];
  if(r42pm.join("") == "0241"){
    s.r42pf = 1;
    animation = 1;
    setTimeout(fadeout, 600);
    setTimeout(room42, 1100);
    setTimeout(fadein, 1200);
    setTimeout("animation=0", 1200);
  }
  save();
}

// ===========================================================================
// room 4-3: treasure (ok)
room43 = () => {
  room(0,1,0,0)
  mount();
  C.plane({x:-45,y:-220,z:-50,w:950,h:50,b:"linear-gradient(#333,#555)",rx:145});
  C.plane({x:-45,y:235,z:-50,w:950,h:70,b:"linear-gradient(#333,#555)",rx:60});
  if(s.r43c) C.plane({x:70,y:145,w:100,h:100,html:svgchestopen,css:"chest",sx:2,sy:2,cl:"room43p"});
  else C.plane({x:70,y:145,w:100,h:100,html:svgchest,css:"chest",sx:2,sy:2,cl:"room43p"});
  if(!s.r43c)C.plane({x:50,y:140,html:"🔒",css:"lock",rz:-2,cl:"room43p"});
  if(s.r43c && !s.r43d) C.plane({x:50,y:110,html:"🪄",css:"wand",rz:30,cl:"r43e",n:"r432"});
  if(!s.r43a) C.plane({x:-250,y:185,html:"👑",css:"crown",cl:"r43b",n:"r431"});
  C.plane({x:-325,y:95,z:40,html:"⬅️",css:"arrow",on:"left",cl:"room33"});
  wallside(0);
  windowright(1);
  draw_sky(0,0);
}

// Take crown
//r43a = 0; // taken
r43b = () => {
  add_inv("crown");
  r431.remove();
  s.r43a = 1;
}

// Take wand
//r43d = 0; // taken
r43e = () => {
  add_inv("wand");
  r432.remove();
  s.r43d  = 1;
}

//r43c = 0; // chest open

// Puzzle
room43p = () => {
  use(-1);
  r43pm = "";
  r43pa = 0; // angle
  room(1,0,0,0);
  C.plane({x:25,y:0,z:50,w:950,h:650,b:"linear-gradient(#853,#642 50%,#000 50%,#000 50.5%,#642 50.5%,#431)"});
  C.plane({x:-360,y:-180,z:80,html:"❌",css:"cross",on:"exit",cl:"room43"});
  C.plane({x:150,y:50,z:80,html:"↩️",css:"arrow",on:"right",cl:"r43pr"});
  C.plane({x:-200,y:50,z:80,html:"↪️",css:"arrow",on:"left",cl:"r43pl"});
  C.plane({x:-130,y:20,z:50,html:"🔒",css:"big lock",on:"lock",rz:-2});
  C.plane({x:-10,y:100,z:50,w:50,h:50,o:"30px 0px",html:"🐉",css:"dragon",on:"",n:"r43p1",sx:2,sy:2,rz:-2});
}


r43pm = "";
r43pa = 0;

r43pl = () => {
  r43pa -=90;
  r43pm += "l";
  C.move({n:"r43p1",rz:r43pa});
  if(r43pm.endsWith("lrrrrlr")){
    fadeout();
    s.r43c = 1;
    setTimeout("room43();fadein()",500);
  }
  save();
}

r43pr = () => {
  r43pa +=90;
  r43pm += "r";
  C.move({n:"r43p1",rz:r43pa});
  if(r43pm.endsWith("lrrrrlr")){
    fadeout();
    s.r43c = 1;
    setTimeout("room43();fadein()",500);
  }
}






