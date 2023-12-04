import * as Cesium from "cesium";
import styles from './index.module.scss'
import { useEffect, useState } from "react";
import {displayLatitudeAndLongitude} from '@/components/Home'

let cesiumOption = {
    animation: false,//是否创建动画小器件，左下角仪表    
    baseLayerPicker: false,//是否显示图层选择器    
    fullscreenButton: false,//是否显示全屏按钮    
    geocoder: false,//是否显示geocoder小器件，右上角查询按钮    
    homeButton: false,//是否显示Home按钮    
    infoBox: false,//是否显示信息框    
    sceneModePicker: false,//是否显示3D/2D选择器    
    selectionIndicator: false,//是否显示选取指示器组件    
    timeline: false,//是否显示时间轴    
    navigationHelpButton: false,//是否显示右上角的帮助按钮    
    scene3DOnly: true,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源    
    // clock : new Cesium.Clock(),//用于控制当前时间的时钟对象    
    selectedImageryProviderViewModel: undefined,//当前图像图层的显示模型，仅baseLayerPicker设为true有意义    
    //imageryProviderViewModels : Cesium.createDefaultImageryProviderViewModels(),//可供BaseLayerPicker选择的图像图层ProviderViewModel数组    
    //selectedTerrainProviderViewModel : undefined,//当前地形图层的显示模型，仅baseLayerPicker设为true有意义    
    //terrainProviderViewModels : Cesium.createDefaultTerrainProviderViewModels(),//可供BaseLayerPicker选择的地形图层ProviderViewModel数组    
    // imageryProvider : new Cesium.OpenStreetMapImageryProvider( {    
    //     credit :'',    
    //     url : '//192.168.0.89:5539/planet-satellite/'    
    // } ),//图像图层提供者，仅baseLayerPicker设为false有意义    
    terrainProvider: new Cesium.EllipsoidTerrainProvider(),//地形图层提供者，仅baseLayerPicker设为false有意义    
    skyBox: new Cesium.SkyBox({
        sources: {
            positiveX: 'Cesium-1.7.1/Skybox/px.jpg',
            negativeX: 'Cesium-1.7.1/Skybox/mx.jpg',
            positiveY: 'Cesium-1.7.1/Skybox/py.jpg',
            negativeY: 'Cesium-1.7.1/Skybox/my.jpg',
            positiveZ: 'Cesium-1.7.1/Skybox/pz.jpg',
            negativeZ: 'Cesium-1.7.1/Skybox/mz.jpg'
        }
    }),//用于渲染星空的SkyBox对象    
    fullscreenElement: document.body,//全屏时渲染的HTML元素,    
    useDefaultRenderLoop: true,//如果需要控制渲染循环，则设为true    
    targetFrameRate: undefined,//使用默认render loop时的帧率    
    showRenderLoopErrors: false,//如果设为true，将在一个HTML面板中显示错误信息    
    automaticallyTrackDataSourceClocks: true,//自动追踪最近添加的数据源的时钟设置    
    contextOptions: undefined,//传递给Scene对象的上下文参数（scene.options）    
    sceneMode: Cesium.SceneMode.SCENE3D,//初始场景模式    
    mapProjection: new Cesium.WebMercatorProjection(),//地图投影体系    
    dataSources: new Cesium.DataSourceCollection()
    //需要进行可视化的数据源的集合    
}
const Home: React.FC = () => {

    let viewer: Cesium.Viewer | null = null

    useEffect(() => {
        if (!viewer) {
            viewer = new Cesium.Viewer("cesiumContainer", {
                shadows: true, 
                terrain: Cesium.Terrain.fromWorldTerrain(), //设置地形数据。
                infoBox: false,  //可以解决控制台的  'allow-scripts' permission is not set.  这个错误
            });
         //   viewer.scene.globe.enableLighting = true;  //启用全局光照，可以作为晨昏线的效果
    
            (viewer as any)._cesiumWidget._creditContainer.style.display = "none"; //去除版权信息

            //鼠标控制经纬度显示
            displayLatitudeAndLongitude(viewer)  
        }
 

        //   return () => {  //在development模式并且严格模式下这个useEffect会执行两次，所以我们也可以用这种方式来防止重复渲染地球
        //     viewer.destroy();
        //   };
    }, [])
    return (
        <>
            <div>
                主页

                <div className={styles.cesiumContainer} id="cesiumContainer">

                </div>
            </div>
        </>
    )
}

export default Home