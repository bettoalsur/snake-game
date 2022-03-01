let resx = window.innerWidth;
let resy = window.innerHeight;
let w = 20;
let n = Math.trunc(resx/w);
let m = Math.trunc(resy/w);

while (resx%w != 0) {
  resx--;
}

while (resy%w != 0) {
  resy--;
}

// snake's body and direction

let x = [];
let y = [];
let dir = [1,0];

// food

let food_index = [];
let cx;
let cy;

// collision mode

let collisionMode = 0;


function novaComida(){
  
  let aux = []; arrayCopy( food_index , aux );
  let ids = [];
  
  for (let k = 0 ; k < x.length ; k++) { 
    ids.push( x[k] + y[k]*n ); 
  }
  
  ids = ids.sort();
  
  for (let k = ids.length-1 ; k >= 0 ; k--) {
    aux.splice(ids[k],1);
  }
  
  let id = floor(random(aux.length));
  
  cx = id%n;
  cy = floor(id/n);
  
}


function setup() {
  createCanvas(resx,resy);
  
  x.push(3); x.push(2); x.push(1); 
  y.push(1); y.push(1); y.push(1);
  
  for (let k = 0 ; k < n*m ; k++) { 
    food_index.push(k); 
  }
  
  novaComida();

}



function keyPressed() {
  if (keyCode === LEFT_ARROW && dir[0]==0 ) {
    dir[0] = -1;
    dir[1] =  0;
  } else if (keyCode === RIGHT_ARROW && dir[0]==0) {
    dir[0] = 1;
    dir[1] = 0;
  } else if (keyCode === UP_ARROW && dir[1]==0) {
    dir[0] =  0 ;
    dir[1] = -1;
  } else if (keyCode === DOWN_ARROW && dir[1]==0) {
    dir[0] = 0;
    dir[1] = 1;
  }
}



function draw() {
  background(200);
  
  if (frameCount % 5 == 0) { 
      
    // update position
    let prev_x = []; arrayCopy(x, prev_x);
    let prev_y = []; arrayCopy(y, prev_y);

    for (let k = x.length-1 ; k >= 1 ; k --) {
      x[k] = x[k-1];
      y[k] = y[k-1];
    }
    
    x[0] += dir[0];
    y[0] += dir[1];

    // body collision  
    for (let k = 1 ; k < x.length ; k++) {
      if (x[0] == x[k] && y[0] == y[k]) {
        x = prev_x;
        y = prev_y;
        noLoop();
      }
    }

    // walls collision mode 0
    if (collisionMode == 0) {
      if ( x[0]<0 ) x[0] = n-1;
      else if ( x[0]>=n ) x[0] = 0;
      else if ( y[0]<0 ) y[0] = m-1;
      else if ( y[0]>=m ) y[0] = 0;
    }

    // walls collision mode 1
    if (collisionMode == 1) {
      if ( x[0]<0 || x[0]>=n || y[0]<0 || y[0]>=m) {
        x = prev_x;
        y = prev_y;
        noLoop();
      }
    }

    // handle food
    if (x[0] == cx && y[0] == cy) {
      novaComida();
      x.unshift(x[0]+dir[0]);
      y.unshift(y[0]+dir[1]);
    }

  } // end of actions based on frame rate
  
  
  // render snake
  fill(25);
  stroke(200);
  strokeWeight(1);
  
  for (let k = 0 ; k < x.length; k++) {
    if (k == 0 ) fill(150);
    else fill(25);
    rect( x[k]*w , y[k]*w , w , w );
  }
  
  // render food
  fill(255,0,0,200);
  noStroke();
  rect( cx*w , cy*w, w , w );
  
}
       
       
       
       
       