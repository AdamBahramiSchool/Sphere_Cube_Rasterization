import { Mat4 } from './math.js';
import { Parser } from './parser.js';
import { Scene } from './scene.js';
import { Renderer } from './renderer.js';
import { TriangleMesh } from './trianglemesh.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement createCube, createSphere, computeTransformation, and shaders
////////////////////////////////////////////////////////////////////////////////

// Example two triangle quad
const quad = {
  positions: [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1,  1, -1,-1,  1, -1],
  normals: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  uvCoords: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]
}

TriangleMesh.prototype.createCube = function() {
  let vertices=[]
  let uvCoords=[]
  let normals=[]
  vertices = [
    // Front
    1, -1, 1, -1, -1, 1, -1, 1, 1,
    1, -1, 1, -1, 1, 1, 1, 1, 1, 
     // Right 
    1, 1, 1, -1, 1, 1, -1, 1, -1,
    1, 1, 1, -1, 1, -1, 1, 1, -1,
    // Back 
    1, 1, -1, -1, 1, -1, -1, -1, -1,
    1, 1, -1, -1, -1, -1, 1, -1, -1, 
    // Left 
    1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, -1, -1, -1, -1, 1, 1, -1, 1, 
    // Bottom 
    -1, -1, -1, -1, -1, 1, -1, 1, 1,
    -1, -1, -1, -1, 1, 1, -1, 1, -1, 
    // Top 
    1, -1, -1, 1, -1, 1, 1, 1, 1,
    1, -1, -1, 1, 1, 1, 1, 1, -1, 
 
  ];

  uvCoords = [

    // Front 
    0, 1, 0, 2/3, 0.5, 2/3,
    0, 1, 0.5, 2/3, 0.5, 1,

    // Right 
    0, 1/3, 0, 0, 0.5, 0,
    0, 1/3, 0.5, 0, 0.5, 1/3,

    // Back 
    1, 0,
    0.5, 0,
    0.5, 1/3,
    1, 0,
    0.5, 1/3,
    1, 1/3,

    // Left 
    0.5, 1, 0.5, 2/3, 1, 2/3,
    0.5, 1, 1, 2/3, 1, 1,

    // Bottom 
    0.5, 2/3, 0.5, 1/3, 1, 1/3,
    0.5, 2/3, 1, 1/3, 1, 2/3,  

     // Top 
     0, 2/3, 0, 1/3, 0.5, 1/3,
     0, 2/3, 0.5, 1/3, 0.5, 2/3,

  ];

  normals = [
    // Front 
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1, 
  // Right 
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0, 
    // Back 
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1, 
    //left
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0, 
    //bottom
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0, 
    //top
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0, 
  ];
   
   
     this.positions = vertices;
     this.normals = normals;
     this.uvCoords = uvCoords;
}

//thought i needed to solve cross product between to edges of triangle to calculate normal for each face, but i didnt
function computeFaceNormal(v1, v2, v3) {
  const e1=[v2[0]-v2[1],v2[1]-v1[1],v2[2]-v1[2]];
  const e2=[v3[0]-v2[1],v3[1]-v2[1],v3[2]-v2[2]];
  var normal= 
  [e1[1]*e2[2]-e2[1]*e1[2],
   e1[0]*e2[2]-e2[0]*e1[2],
   e1[0]*e2[1]-e2[0]*e1[1]
  ];
  // Normalize the normal
  const length = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
  normal = [normal[0] / length, normal[1] / length, normal[2] / length];

  return normal;
}

TriangleMesh.prototype.createSphere = function(numStacks, numSectors) {
  const positions = [];
  const normals = [];
  const uvCoords = [];
  const indices = [];
  const radius = 1.0;
  const sectorStep = 2 * Math.PI / numSectors;
  const stackStep = Math.PI / numStacks;
  for (let stack = 0; stack <= numStacks; ++stack) {
    for (let sector = 0; sector <= numSectors; ++sector) {
      let stackAngle = Math.PI / 2 - stack * stackStep;
      let xy = 1/radius * Math.cos(stackAngle);
      let z = 1/radius * Math.sin(stackAngle+Math.PI);
      const sectorAngle = sector * sectorStep;
      let x = xy * Math.cos(sectorAngle);
      let y = xy * Math.sin(sectorAngle);
      positions.push(x, y, z);
      normals.push(x, y, z);
      uvCoords.push(1-sector / numSectors, 1-stack / numStacks);
    }
  }
  for (let stack = 0; stack < numStacks; ++stack) {
      let first = stack * (numSectors + 1);
      let second = first + numSectors + 1;
    for (let sector = 0; sector < numSectors; ++sector) {
      first+=1;
      second+=1;
      if (stack !== 0) {
        indices.push(first, second, first + 1);
      }

      if (stack !== (numStacks - 1)) {
        indices.push(first + 1, second, second + 1);
      }
    }
  }

  this.positions = positions;
  this.normals = normals;
  this.uvCoords = uvCoords;
  this.indices = indices;
};

  
Scene.prototype.computeTransformation = function(transformSequence) {
  let overallTransform = Mat4.create();  // identity matrix
  console.log(`Here is my parameter array: ${transformSequence}`);
  console.log(`Here is my parameter array[0]: ${transformSequence[0]}`);
  for (let i = 0; i < transformSequence.length; i++) {
    let transformationArray = transformSequence[i];
    console.log(`Here is my parameter arrray[0] version 2: ${transformationArray}`);
    let operation = transformationArray[0];
    let value = parseFloat(transformationArray[3]); 

    if (operation === 'T') {
      let translateMatrix = Mat4.create();
      translateMatrix[12] = transformationArray[1]; 
      translateMatrix[13] = transformationArray[2]; 
      translateMatrix[14] = transformationArray[3];
      Mat4.multiply(overallTransform, translateMatrix, overallTransform);

    } else if (operation === 'Rx' || operation === 'Ry' || operation === 'Rz') {
      let radians = (Math.PI / 180) * transformationArray[1];  
      let rotateMatrix = Mat4.create();
      
      if (operation === 'Rx') {
        rotateMatrix[5] = Math.cos(radians);
        rotateMatrix[6] = Math.sin(radians);
        rotateMatrix[9] = -Math.sin(radians);
        rotateMatrix[10] = Math.cos(radians);
    } else if (operation === 'Ry') {
        rotateMatrix[0] = Math.cos(radians);
        rotateMatrix[2] = -Math.sin(radians);
        rotateMatrix[8] = Math.sin(radians);
        rotateMatrix[10] = Math.cos(radians);
    } else if (operation === 'Rz') {
        rotateMatrix[0] = Math.cos(radians);
        rotateMatrix[1] = Math.sin(radians);
        rotateMatrix[4] = -Math.sin(radians);
        rotateMatrix[5] = Math.cos(radians);
    }
      Mat4.multiply(overallTransform, rotateMatrix,overallTransform);
    } else if (operation === 'S') {
      let scaleMatrix = Mat4.create();
      scaleMatrix[0] = transformationArray[1]; 
      scaleMatrix[5] = transformationArray[2]; 
      scaleMatrix[10] = transformationArray[3]; 
      
  Mat4.multiply( overallTransform, scaleMatrix,overallTransform);
    }
  }

  return overallTransform;
};

// First, implement the ambient and Lambertian components of the Blinn-Phong reflection model (using the `ka` and `kd` coefficients).
// Then, implement and add the specular component (using the `ks` and `shininess` coefficients).
// You will likely want to define and use direction vectors corresponding to the surface normal, the camera view direction, and the light direction.
// A useful debugging strategy when working with shaders is to set the fragment color according to some value that you want to check (e.g., mapping a dimension of the normal vector to a color channel, or a dot product to another color channel).
Renderer.prototype.VERTEX_SHADER = `
precision mediump float;
attribute vec3 position, normal;
attribute vec2 uvCoord;
uniform vec3 lightPosition;
uniform mat4 projectionMatrix, viewMatrix, modelMatrix;
uniform mat3 normalMatrix;
varying vec2 vTexCoord;
varying vec3 lightDir;
varying vec3 viewDir;
varying vec3 normalView;
varying float lightDistance;
void main() {
  normalView = normalize(normalMatrix * normal);
  vec3 vertexPosition = (viewMatrix * modelMatrix * vec4(position, 1.0)).xyz;
  lightDir = normalize(lightPosition - vertexPosition);
  lightDistance = length(lightPosition - vertexPosition);
  vec3 viewPosition = (viewMatrix * modelMatrix * vec4(position, 1.0)).xyz;
  viewDir = normalize(-viewPosition);
  // Pass texture coordinates to fragment shader
  vTexCoord = uvCoord;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

Renderer.prototype.FRAGMENT_SHADER = `
precision mediump float;
uniform vec3 ka, kd, ks, lightIntensity;
uniform float shininess;
uniform sampler2D uTexture;
uniform bool hasTexture;
varying vec2 vTexCoord;
varying vec3 lightDir;
varying vec3 viewDir;
varying vec3 normalView;
varying float lightDistance;  
void main() {
  vec3 textureMap;
  if (hasTexture) {
    textureMap = texture2D(uTexture, vTexCoord).rgb;
  }
  vec3 ambient = ka*lightIntensity * textureMap;
  float lambertian = max(dot(normalView, lightDir), 0.0);
  vec3 diffuse = (kd / (lightDistance * lightDistance)) * lambertian * lightIntensity * textureMap;
  vec3 halfwayDir = normalize(lightDir + viewDir);
  float specAngle = max(dot(normalView, halfwayDir), 0.0);
  //multiplied by another shininess to try to get globe white texture brighter
  vec3 specularCol = (ks/ (lightDistance * lightDistance)) * pow(specAngle, shininess) *shininess*lightIntensity*textureMap;
  vec3 finalColor = ambient + diffuse + specularCol;
  gl_FragColor = vec4(finalColor, 1.0);
}
`;


////////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT: change DEF_INPUT to create something interesting!
////////////////////////////////////////////////////////////////////////////////
const DEF_INPUT = [
  "c,myCamera,perspective,5,5,5,0,0,0,0,1,0;",
  "l,myLight,point,0,5,0,2,2,2;",
  "p,unitCube,cube;",
  "p,unitSphere,sphere,20,20;",
  "m,redDiceMat,0.3,0,0,0.7,0,0,1,1,1,15,dice.jpg;",
  "m,grnDiceMat,0,0.3,0,0,0.7,0,1,1,1,15,dice.jpg;",
  "m,bluDiceMat,0,0,0.3,0,0,0.7,1,1,1,15,dice.jpg;",
  "m,globeMat,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,globe.jpg;",
  "o,rd,unitCube,redDiceMat;",
  "o,gd,unitCube,grnDiceMat;",
  "o,bd,unitCube,bluDiceMat;",
  "o,gl,unitSphere,globeMat;",
  "X,rd,Rz,75;X,rd,Rx,90;X,rd,S,0.5,0.5,0.5;X,rd,T,-1,0,2;",
  "X,gd,Ry,45;X,gd,S,0.5,0.5,0.5;X,gd,T,2,0,2;",
  "X,bd,S,0.5,0.5,0.5;X,bd,Rx,90;X,bd,T,2,0,-1;",
  "X,gl,S,1.5,1.5,1.5;X,gl,Rx,90;X,gl,Ry,-150;X,gl,T,0,1.5,0;",
].join("\n");

// DO NOT CHANGE ANYTHING BELOW HERE
export { Parser, Scene, Renderer, DEF_INPUT };
