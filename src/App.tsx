// App.js
import { useEffect } from 'react';
import routes from '@/router'
import { useRoutes, useNavigate, Outlet } from 'react-router-dom'
import * as Cesium from 'cesium'
const App: React.FC = ()=>{
  const outlet = useRoutes(routes)

  // useEffect(() => {
  //   let viewer = new Cesium.Viewer("cesiumContainer", {
  //     shadows: true,
  //     sceneModePicker: false,
  //     terrain: Cesium.Terrain.fromWorldTerrain(),
  //     infoBox: false,
  //   });
  // }, [])

  return (
    <div style={{width:"100vw",height:"100vh"}}>
      {outlet}
    </div>
  );
}

export default App;
