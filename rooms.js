// Left window
windowleft = (bars) => {
  C.plane({x:-300,y:-95,z:-40,w:30,h:30,html:svgwindow,css:"window"});
  if(bars) C.plane({x:-300,y:-95,z:-40,w:30,h:30,html:svgbars,css:"bars"});
}

windowright = (bars) => {
  C.plane({x:300,y:-95,z:-40,w:30,h:30,html:svgwindow,css:"window",sx:-1});
  if(bars) C.plane({x:300,y:-95,z:-40,w:30,h:30,html:svgbars,css:"bars",sx:-1});
}

addsun = (left,right) => {
  if(left){
    C.plane({x:-555,y:-222,z:-100,w:400,h:400,b:"radial-gradient(#ffb 5%,#fff0 50%)",css:"sun"});
    C.plane({x:0,y:0,z:0,w:700,h:500,b:"#f000",html:"<canvas id=sun width=700 height=500>"});
    ctx=sun.getContext("2d");
    ctx.fillStyle = "#ffb3";
    ctx.beginPath();
    ctx.moveTo(65,295);
    ctx.lineTo(165,470);
    ctx.lineTo(285,470);
    ctx.lineTo(85,220);
    ctx.closePath();
    ctx.fill();
  }
}

// Tower top/bottom
tower = (top,i,j,x,y,z,w,dx,ry) => {

  for(i = 0; i < 8; i++){
    for(j = 15; j--;){
      if(((top && j > 1) || !top) && ((top && !(j==2 && i % 2)) || !top) && !(!(j % 2) && i == 7)){
        
        // Back
        dx = 0;
        w = 104;
        if(j % 2){
          dx = 47;
          if((i == 0)) { w = 50; dx = 22 }
          if((i == 7)) { w = 50; dx = 75 }
        }
        x = i*98 - 300 - dx + Math.random();
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
room = (skyleft, skyright, skytop, tower,i,j,x,y,z,w,dx,ry,no) => {
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
          if(j>2 && j < 12 && !(j%2) && i == 1 && !skyleft) continue;
          if(j>(skytop ? 4 : 2) && j < 12 && (j%2) && i == 9) continue;
          C.plane({x:x-dx,y:j*48-300 + Math.random(),w,h:50,b:`hsl(50 0% ${63}%)`,z:-20,css:"brick"});
        }
      }
      
      
    }
  }
}

// Room 0-0
room00 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:-130,y:35,w:30,h:30,html:"🚪",css:"door",ry:5});
  C.plane({x:-100,y:100,w:30,h:30,html:"🔒",css:"lock",rz:-2});
  C.plane({x:120,y:-10,w:30,h:30,html:"🖼️",css:"frame",rz:2});
  C.plane({x:165,y:32,w:30,h:30,html:"️🧔🏻‍♂️",css:"head",rz:2});
  C.plane({x:165,y:14,w:30,h:30,html:"👑️",css:"crown",rz:2,sy:.5});
  C.plane({x:260,y:50,w:30,h:30,html:"🛏️",css:"bed", sx:-1});
  C.plane({x:-250,y:210,z:-40,w:30,h:30,html:"🕳️",css:"hole",rz:90,sy:2});
  windowleft(1);
  addsun(1,0);
}

// Room 0-1
room01 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:10,y:-80,w:30,h:30,html:"🛡️",css:"shield",rz:2});
  C.plane({x:-205,y:-25,w:30,h:30,html:svgdoorstair,ry:5,sx:1.6,sy:1.6});
  C.plane({x:-10,y:-125,z:0,w:30,h:30,html:svgcannon,css:"cannon",sx:2.7,sy:2.7});
  windowright(0);
  addsun(0,1);
}

// Room 2-0
room20 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:130,y:50,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:160,y:100,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:100,y:100,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:190,y:150,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:130,y:150,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:70,y:150,w:30,h:30,html:"⬤",css:"boulder", sx:-1});
  C.plane({x:-30,y:-80,w:30,h:30,html:"🛡️",css:"shield",rz:2});
  C.plane({x:-250,y:20,w:30,h:30,html:"🔒",css:"lock",rz:-2,z:10});
  C.plane({x:-260,y:0,w:30,h:30,html:"🔗",css:"chain",rz:40});
  C.plane({x:-155,y:-20,w:30,h:30,z:-20,html:svgdoor,ry:5,sx:1.6,sy:1.6});
  windowleft(1);
  windowright(0);
  addsun(1,0);
}

// Room 2-1
room21 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:-55,y:-130,w:30,h:30,z:-20,html:svghay,sx:2.8,sy:2.8});
  C.plane({x:-195,y:-20,w:30,h:30,z:-20,html:svgdoorstair,ry:5,sx:1.5,sy:1.6});
  windowright(0);
  addsun(0,0);
}

// Room 4-0
room40 = () => {
  tower(1)
  C.plane({x:-5,y:-130,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:80,y:-120,w:30,h:30,html:svgwitch,css:"witch",sx:2.5,sy:2.5});
  C.plane({x:-240,y:-180,w:30,h:30,html:svgtime,css:"time",sx:2,sy:2});
  C.plane({x:-170,y:-40,z:10,w:30,h:30,html:"▼",css:"triangle",sx:2,sy:2});
  C.plane({x:-30,y:-25,w:30,h:30,z:-20,html:svgdoor,ry:0,sx:1.6,sy:1.6});
}

// Room 4-1
room41 = () => {
  tower(0)
  C.plane({x:-5,y:-190,z:-20,w:690,h:70,b:"linear-gradient(#333,#555)",rx:105,css:"c"});
  C.plane({x:-5,y:225,z:-30,w:690,h:70,b:"linear-gradient(#333,#555)",rx:60,css:"c"});
  C.plane({x:80,y:60,w:30,h:30,html:"🧍‍♂️",css:"man"});
  C.plane({x:190,y:140,w:30,h:30,html:"🔗",css:"chain",rz:30});
  C.plane({x:210,y:120,w:30,h:30,html:"🔗",css:"chain",rz:10});
  C.plane({x:230,y:100,w:30,h:30,html:"🔗",css:"chain",rz:0});
  C.plane({x:-250,y:20,w:30,h:30,html:"🔒",css:"lock",rz:-2,z:10});
  C.plane({x:-260,y:0,w:30,h:30,html:"🔗",css:"chain",rz:40});
  windowleft(1);
  addsun(1,0);
  
}

// room 0-2
room02 = () => {
  room(1,0,1,1)
  C.plane({x:15,y:-120,z:-50,w:920,h:50,b:"linear-gradient(#333,#555)",rx:145,css:""});
  C.plane({x:15,y:235,z:-50,w:920,h:70,b:"linear-gradient(#333,#555)",rx:60,css:""});
  C.plane({x:190,y:75,w:30,h:30,html:"🔭",css:"telescope",rz:2,sx:-1});
  C.plane({x:-110,y:5,w:30,h:30,z:-20,html:svgdoorstair,sx:1.6,sy:1.6});
  windowleft(0);
  addsun(1,1);
}

