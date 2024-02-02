# **Overview**
In this assignment, the task was to implement shading, texturing, and transformations for triangle meshes. The goal was to create a JavaScript application where users can specify primitives, materials, lighting, and camera parameters through text input and visualize the rendered scene.

## **Getting Started**
To run and develop this assignment, a local HTTP server needs to be started in the directory containing a4.html. I used Python's built-in HTTP server by running `python3 -m http.server` in the terminal. Once the server is running, navigating the browser to `http://localhost:8000/a4.html` loads the application.

## **Implementation Journey**
### **Triangle Mesh Generation (3 pt)**
I started by implementing the creation logic for unit cubes and unit spheres in the `createCube` and `createSphere` functions, respectively. This involved populating the positions, normals, UV coordinates, and indices of the TriangleMesh object. For the cube, I used a "triangle soup" encoding, while for the sphere, I utilized the "stacks and sectors" approach. Calculating texture coordinates was essential for later shading and texturing.

### **Transformations (2 pt)**
Next, I implemented transformations to position the triangle meshes using the `computeTransformation` function. This function computes the overall 4x4 transformation matrix based on the sequence of transformations defined in the input text. Converting rotation angles from degrees to radians was necessary for accurate transformation calculations.

### **Shading (3 pt)**
Shading logic was then added to the vertex and fragment shaders (`VERTEX_SHADER` and `FRAGMENT_SHADER`). Following the Blinn-Phong reflection model, I implemented ambient, Lambertian, and specular components using the provided coefficients (ka, kd, ks, shininess). Direction vectors for surface normals, camera view, and light direction were defined and utilized in the shader calculations. Debugging shaders involved setting fragment colors based on specific values for verification.

### **Texturing (2 pt)**
Finally, texturing was implemented by incorporating interpolated texture coordinates and texture samplers in the fragment shader. If a material specified a texture, the shaded color was modulated by the texture color. I ensured correct mapping of texture coordinates to the vertices of the cube and sphere primitives to display the textures accurately.

## **Additional Notes**
- The input text box allows users to define primitives, materials, lighting, and camera parameters.
- Clicking the "Update" button refreshes the rendered scene.
- Simple test cases were used to verify each implemented functionality step by step.

## **File Structure**
- `a4.html`: HTML file containing the interface and canvas for visualization.
- `a4.js`: JavaScript file containing the implementation of shading, texturing, and transformations.
- `README.md`: Documentation file (this file) providing an overview of the assignment.
