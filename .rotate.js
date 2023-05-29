require('dotenv').config();

module.exports = {
    filter(data) { 
        if(process.env.LOG_OUTPUT && process.env.LOG_OUTPUT === 'file'){
            delete data.data;
            return data;
        }else{
            return false
        }
    },
    output: {
        path: "app.log", // name of file
        options: {
            path: "logs/", // path to write files to
            size: "5K", // max file size
            rotate: 5 // keep 5 rotated logs
        }
    }
}