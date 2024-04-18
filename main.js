const fs = require('fs').promises;
const path = require("path");

async function check(y){
    try {
        const stats = await fs.stat(y);
        if(stats.isFile()){
            return "Файл"
        }else {
            return "Папка"
        }
    } catch (err) {
        console.error(`Помилка: ${err}`);
    }
}
async function builder(){
    try{
        for (let i=0; i<5; i++) {
            const name = `folder${i+1}`;
            const dirFolder = path.join(__dirname, "baseFolder", name);
            await fs.mkdir(dirFolder, {recursive: true});
            console.log(`${await check(dirFolder)} ${name}: ${dirFolder}`)
            for (let x=0; x<5; x++){
                const nameFile = `File${x+1}.txt`
                const dirFile = path.join(__dirname, "baseFolder", name, nameFile);
                await fs.writeFile(dirFile,"");
                console.log(`${await check(dirFile)} ${nameFile}: ${dirFile}`)
            }
        }

    } catch (e){
        console.log(e)
    }
}

void builder();