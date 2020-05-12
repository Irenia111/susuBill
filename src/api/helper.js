import axios from 'axios';

const Err_Ok = 0;

export function get(url) {
    return function () {
        return axios.get(url).then((res)=>{
            const {errno,data} = res.data;
            //console.log("hi");
            if(errno === Err_Ok){
                //console.log(data);
                return data;
            }
        }).catch(()=>{
            console.log("data fetch failed")
        })

    }
}
