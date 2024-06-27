import { useLayoutEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MODEL_GLB from "../assets/model/building_test.glb";

function ModelComponent(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    `${MODEL_GLB}`
  );
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Cube"
          geometry={nodes.Cube.geometry}
          material={materials.Material}
          position={[-0.07, 0.16, -0.27]}
          scale={[1, 0.03, 1]}
        />
        <mesh
          name="Sphere"
          geometry={nodes.Sphere.geometry}
          material={materials["Material.002"]}
          position={[-0.62, 0.43, -0.79]}
          rotation={[-0.01, 0.11, -0.02]}
          scale={0.09}
        />
        <mesh
          name="Sphere001"
          geometry={nodes.Sphere001.geometry}
          material={materials["Material.001"]}
          position={[0.4, 0.55, 0.15]}
          scale={0.41}
        />
      </group>
    </group>
  );
}
useGLTF.preload("./blenderStuff/blenderFile.glb");

export default function ModelPage(){
    return (
        <div className="App">
          <Canvas camera={{ fov: 64, position: [-2, 2, 0] }}>
            <ambientLight intensity={5} />
            <OrbitControls enableZoom={true} />
            <ModelComponent />
          </Canvas>
        </div>
      );
}

