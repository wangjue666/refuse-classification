const tf = require('@tensorflow/tfjs-node');
const getData = require("./data")
const TRAIN_DIR = '../垃圾分类/train'
const OUTPUT_DIR = '../output'
const main = async()=>{
    const {xs, ys, classes} = await getData(TRAIN_DIR, OUTPUT_DIR)
    console.log(xs, ys,classes)
}

main()