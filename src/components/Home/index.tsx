import { Entity, Viewer } from "cesium";
import * as Cesium from 'cesium'


//控制鼠标点击的实体的显隐
let ifShowMouseMoveInfo = false;
let ifShowMouseClickInfo = false;
// 显示及更新经纬度(yq)
export const displayLatitudeAndLongitude = (viewer: Viewer) => {
    // 鼠标移动显示实体
    let mouseMoveInfoEntity = viewer.entities.add({
        id: "mouseMoveInfoEntity",
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        label: {
            //文字标签
            text: "",
            show: true,
            font: "12px monospace", //15pt monospace
            fillColor: Cesium.Color.WHITE, //文字颜色
            scale: 1,
            style: Cesium.LabelStyle.FILL,
            pixelOffset: new Cesium.Cartesian2(20, 30), //偏移量
            showBackground: true,
            backgroundColor: new Cesium.Color(0, 0, 0, 0.4),
            backgroundPadding: new Cesium.Cartesian2(5, 5),
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
    });
    // 鼠标右键点击显示实体
    let mouseClickInfoEntity: Entity | null = null;

    //鼠标中键控制是否实时显示鼠标所指的实体位置
    viewer.screenSpaceEventHandler.setInputAction(() => {
        ifShowMouseMoveInfo = !ifShowMouseMoveInfo
        // 鼠标移动显示实体的位置
        if (ifShowMouseMoveInfo) {//开启经纬度跟随显示
            viewer.screenSpaceEventHandler.setInputAction(function (movement: { endPosition: Cesium.Cartesian2; }) {
                //如果鼠标移动了，那么就显示之前因为鼠标点击而生成的实体
                if (viewer.entities.getById("mouseMoveInfoEntity") && !viewer.entities.getById("mouseMoveInfoEntity")?.show) {
                    viewer.entities.getById("mouseMoveInfoEntity")!.show = true
                }

                // const cartesian = viewer.camera.pickEllipsoid(
                //   movement.endPosition,
                //   viewer.scene.globe.ellipsoid
                // );

                //获取每次鼠标移动时对应的坐标点
                let cartesian = viewer.scene.pickPosition(movement.endPosition);

                if (cartesian) {
                    const cartographic = Cesium.Cartographic.fromCartesian(
                        cartesian
                    );
                    if (!cartographic) { return; }
                    const longitudeString = Cesium.Math.toDegrees(
                        cartographic.longitude
                    ).toFixed(2);
                    const latitudeString = Cesium.Math.toDegrees(
                        cartographic.latitude
                    ).toFixed(2);

                    // // //鼠标移动的话就清除之前的鼠标点击产生的实体
                    // if (mouseClickInfoEntity) {
                    //   viewer.entities.remove(mouseClickInfoEntity);
                    //   mouseClickInfoEntity = null;
                    // }

                    mouseMoveInfoEntity.position = new Cesium.ConstantPositionProperty(cartesian);
                    mouseMoveInfoEntity!.label!.show = new Cesium.ConstantProperty(true);
                    mouseMoveInfoEntity!.label!.text = new Cesium.ConstantProperty(`经度: ${`   ${longitudeString}`.slice(-7)}\u00B0` +
                        `\n纬度: ${`   ${latitudeString}`.slice(-7)}\u00B0`);
                } else {
                    mouseMoveInfoEntity!.label!.show = new Cesium.ConstantProperty(false);
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
        else {//关闭经纬度跟随显示
            viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
            if (viewer.entities.getById("mouseMoveInfoEntity") && viewer.entities.getById("mouseMoveInfoEntity")!.show) {
                viewer.entities.getById("mouseMoveInfoEntity")!.show = false
            }
        }

    }, Cesium.ScreenSpaceEventType.MIDDLE_CLICK)




    //鼠标右键点击显示实体的位置和高度
    viewer.screenSpaceEventHandler.setInputAction((movement: { position: Cesium.Cartesian2; }) => {
        ifShowMouseClickInfo = !ifShowMouseClickInfo
        let realHeight: string | number = '*'
        if (ifShowMouseClickInfo && !mouseClickInfoEntity) {
            let cartesian = viewer.scene.pickPosition(movement.position);
            if (!cartesian) { return; }
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            if (!cartographic) { return; }
            let lng = Cesium.Math.toDegrees(cartographic.longitude); // 经度值
            let lat = Cesium.Math.toDegrees(cartographic.latitude); // 纬度值
            let height = cartographic.height;
            
            // 更新鼠标点击的经纬度的函数
            const updateLatitudeAndLongitude = (
                entity: Entity,
                lng: number,
                lat: number,
                theRealHeight?: string | number
            ) => {
                entity.position = new Cesium.ConstantPositionProperty(
                    Cesium.Cartesian3.fromDegrees(lng, lat, height)
                );
                // entity.label.text = '经度: ' + lng.toFixed(5) + '\u00B0' + '\n纬度: ' + lat.toFixed(5) + '\u00B0' + '\n高度: ' + height.toFixed(2) + 'm'
                if (lng && lat && height) {

                    let textStr = "经度:     " +
                        lng.toFixed(5) +
                        "\u00B0" +
                        "\n纬度:     " +
                        lat.toFixed(5) +
                        "\u00B0"
                        if(theRealHeight  && typeof theRealHeight =='number' ){

                            textStr+=  "\n高度:     " +
                            theRealHeight.toFixed(5) +
                            "m"
                        }else{
                            textStr+=  "\n模糊高度: " +
                            height.toFixed(5) +
                            "m" 
                        }
                    entity.label!.text = new Cesium.ConstantProperty(textStr);
                }

            };


            //精确找到所在位置的高度
            Cesium.sampleTerrain(viewer.terrainProvider, 11, [cartographic])
                .then((updatedPositions) => {
                    if (updatedPositions[0].height) {
                        realHeight = updatedPositions[0].height
                    }

                }).catch((err) => {

                    console.log("出错了，这个坐标不在地球上", err);

                }).finally(() => {

                    mouseClickInfoEntity = viewer.entities.add({
                        id: "mouseClickInfoEntity",
                        position: Cesium.Cartesian3.fromDegrees(lng, lat, height),
                        label: {
                            //文字标签
                            text: "",
                            font: "12px monospace", //15pt monospace
                            fillColor: Cesium.Color.WHITE, //文字颜色
                            scale: 1,
                            style: Cesium.LabelStyle.FILL,
                            pixelOffset: new Cesium.Cartesian2(20, 30), //偏移量
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0, 0, 0, 0.4),
                            backgroundPadding: new Cesium.Cartesian2(5, 5),
                            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        },
                        point: {
                            color: Cesium.Color.RED,
                            pixelSize: 5,
                            outlineColor: Cesium.Color.ALICEBLUE,
                            outlineWidth: 1,
                            //   disableDepthTestDistance:Number.POSITIVE_INFINITY,
                        },
                    });
                    if (viewer.entities.getById("mouseMoveInfoEntity") && viewer.entities.getById("mouseMoveInfoEntity")!.show) {
                        viewer.entities.getById("mouseMoveInfoEntity")!.show = false
                    }
                    if (realHeight != '*') {
                        //更新经纬度
                        updateLatitudeAndLongitude(mouseClickInfoEntity!, lng, lat, realHeight)
                    }else{
                        updateLatitudeAndLongitude(mouseClickInfoEntity!, lng, lat)
                    }

                });

        } else {
            //隐藏之前因为鼠标点击而生成的实体
            if (mouseClickInfoEntity) {

                if (viewer.entities.getById("mouseClickInfoEntity")) {
                    viewer.entities.getById("mouseClickInfoEntity")!.show = false
                }
                viewer.entities.remove(mouseClickInfoEntity)
                mouseClickInfoEntity = null;
                realHeight="*"
            }
        }

    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

};

