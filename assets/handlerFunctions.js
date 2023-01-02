const path = require('path')
const fs = require('fs')

exports.handleRemoveFile = (file_path) => {
    return fs.access(path.join('..', file_path), fs.constants.F_OK, (err) => {
        //Dosya yoksa null değer dönüyor 
        if (!err) {
            //Eğer Dosya varsa 
            fs.unlink(path.join('..', file_path), (err) => {
                if (err) { console.log('Dosya silinemedi ') }
            })
        }
    });;
}