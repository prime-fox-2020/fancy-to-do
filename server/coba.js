let arr = []
let tanggal = new Date().toLocaleDateString().split('/').reverse().join('-')
 



let isTanggal = []
let str = ''

for(let i = tanggal.length -1; i >= 0; i--){
    str += tanggal[i]
    if(i == 5){
    isTanggal.push(str)
    }
}



let auAh = isTanggal.join()

isTahun = `${tanggal.substr(0, 4)}-${auAh}`
console.log(isTahun)