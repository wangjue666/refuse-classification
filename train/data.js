const fs =require("fs")
const tf = require('@tensorflow/tfjs-node');
const img2x = (buffer)=>{
    return tf.tidy(()=>{
        const imgTs = tf.node.decodeImage(new Uint8Array(buffer))
        const imgTsResized = tf.image.resizeBilinear(imgTs, [224,224])
        return imgTsResized.toFloat().sub(255/2).div(255/2).reshape([1,224,224,3])
    })
   
}

const getData = async(trainDir, outputDir)=>{
    const classes = fs.readdirSync(trainDir)
    fs.writeFileSync(`${outputDir}/classes.json`, JSON.stringify(classes))
    const inputs = []
    const labels = []

    classes.forEach((dir, dirIndex)=>{
        fs.readdirSync(`${trainDir}/${dir}`)
        .filter(n=>n.match(/jpg$/))
        .slice(0,100)
        .forEach(filename=>{
            const imgPath = `${trainDir}/${dir}/${filename}`
            const buffer = fs.readFileSync(imgPath)
            const x = img2x(buffer)
            inputs.push(x)
            labels.push(dirIndex)
        })
    })

    const xs = tf.concat(inputs)
    const ys = tf.tensor(labels)
    return {
        xs, ys, classes
    }

}


module.exports = getData