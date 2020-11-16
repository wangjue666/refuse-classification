const tf = require('@tensorflow/tfjs-node');
const getData = require("./data")
const TRAIN_DIR = '../垃圾分类/train'
const OUTPUT_DIR = '../output'
const MOBILENET_URL = 'http://ai-sample.oss-cn-hangzhou.aliyuncs.com/pipcook/models/mobilenet/web_model/model.json';
const main = async()=>{
    //加载数据
    const {xs, ys, classes} = await getData(TRAIN_DIR, OUTPUT_DIR)
    console.log(xs, ys,classes)

    //定义模型
    const mobilenet = await tf.loadLayersModel(MOBILENET_URL)
    mobilenet.summary()
    const model = tf.sequential()
    for(let i= 0;i<=86;i++){
        const layer = mobilenet.layers[i]
        layers.trainable = false
        model.add(layer)
    }
    model.add(tf.layers.flatten())
    model.add(tf.layers.dense({
        units: 10,
        activation: 'relu'
    }))
}

main()