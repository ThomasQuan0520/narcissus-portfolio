const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 核心修改：指定目标文件夹为当前目录下的 Tracker_Presets
const directoryPath = path.join(__dirname, 'Tracker_Presets');

// 检查文件夹是否存在，防止报错
if (!fs.existsSync(directoryPath)) {
    console.error(`❌ 找不到文件夹: ${directoryPath}`);
    console.error('请确保 Tracker_Presets 文件夹与此脚本 (compress_projects.js) 在同一目录下。');
    process.exit(1);
}

console.log(`📂 正在扫描文件夹: Tracker_Presets ...\n`);

// 读取目录下所有文件
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('无法扫描目录: ' + err);
    }

    // 筛选出所有的 .json 文件
    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

    if (jsonFiles.length === 0) {
        return console.log('⚠️ 在 Tracker_Presets 文件夹中没有找到任何 .json 文件。');
    }

    let processedCount = 0;
    let skippedCount = 0;

    jsonFiles.forEach(file => {
        const filePath = path.join(directoryPath, file);
        
        try {
            const rawData = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(rawData);

            // 如果文件已经包含 "_compressed": true，则跳过
            if (jsonData._compressed) {
                console.log(`⏭️  跳过已压缩文件: ${file}`);
                skippedCount++;
                return;
            }

            console.log(`⏳ 正在压缩: ${file} ...`);

            // 1. 将原本的 JSON 数据转换为字符串
            const stringifiedData = JSON.stringify(jsonData);

            // 2. 使用 gzip 算法进行压缩 (与前端的 pako.ungzip 对应)
            const compressedBuffer = zlib.gzipSync(Buffer.from(stringifiedData, 'utf8'));

            // 3. 转换为 Base64 字符串
            const base64Data = compressedBuffer.toString('base64');

            // 4. 构造新格式
            const finalOutput = {
                _compressed: true,
                data: base64Data
            };

            // 5. 覆写保存回原文件 (或者你可以改名另存)
            fs.writeFileSync(filePath, JSON.stringify(finalOutput));

            console.log(`✅ 成功压缩并覆盖: ${file}`);
            processedCount++;

        } catch (e) {
            console.error(`❌ 处理文件 ${file} 时出错:`, e.message);
        }
    });
    
    console.log(`\n🎉 执行完毕！成功压缩了 ${processedCount} 个文件，跳过了 ${skippedCount} 个已压缩文件。`);
});