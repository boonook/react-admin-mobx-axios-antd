/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';
import {Button,Progress} from 'antd';
import {uploadFenPian} from '../../../../api/onlineTest'

class UploadDaTiJi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files:[],
            percent:0,
            time:0,
            scale:0.8
        }
    }

    getFile=(e)=>{
        this.setState({
            files:e[0]
        })
    };

    onSubmit=()=>{
        let vm = this;
        let file = document.getElementById("file").files[0];
        vm.setState({
            time:new Date().getTime()
        },()=>{
            vm.filesUpload(file,1)
        })
    };

    filesUpload=(file,num)=>{
        const vm = this;
        let formData = new FormData();
        let blockSize = 1024 * 1024; // 每个文件切片大小定为1MB .
        //计算文件切片总数
        let blockNum = Math.ceil(file.size / blockSize);
        let nextSize = Math.min(num * blockSize, file.size);
        let fileData = file.slice((num - 1) * blockSize, nextSize);
        formData.append("file", fileData);
        formData.append("total", blockNum.toString());
        formData.append("nowNo", num);
        formData.append("fileName", file.name +"-"+ vm.state.time);
        if(blockNum>=num){///判断切片总数与是否大于等于上传总数，只有在这种情况下才会上传切片
            uploadFenPian(formData).then(res=>{
                if(file.size<=nextSize){
                    // alert('上传成功')
                }
                vm.filesUpload(file,++num)
            })
        }
        ////前端部分全部完成
    }

    vSetImg=(obg)=>{
        // $(obj).removeAttr("poster");
        // var vimg = $("<img/>")[0];
        // captureImage(obj, vimg);
        // console.log($(vimg).attr("src"));
        // $(obj).attr("poster", $(vimg).attr("src"));
        // //展示获取的第一帧图片
        // $(".img").attr("src", $(vimg).attr("src"));
    }

    captureImage=(video, output)=>{
        // try {
        //     let videocanvas = $("<canvas/>")[0];
        //     videocanvas.width = video.videoWidth * this.state.scale;
        //     videocanvas.height = video.videoHeight * this.state.scale;
        //     videocanvas.getContext('2d').drawImage(video, 0, 0, videocanvas.width, videocanvas.height);
        //     output.src = videocanvas.toDataURL("image/png");
        //     delete videocanvas;
        // } catch (e) {
        //     output.src = "加载动画.gif";
        // }
    };

    render() {
        return (
            <div>
                <input type="file" name="file" id="file"/>
                <Progress percent={this.state.percent} strokeWidth={14} status="active" />
                <Button onClick={this.onSubmit}>提交</Button>
                {/*<div>*/}
                {/*    <video preload={'metadata'} onLoadedData={this.vSetImg(this)} src="http://localhost:3003/public/video/jianjiemax.mp4" controls="controls">*/}
                {/*        您的浏览器不支持 video 标签。*/}
                {/*    </video>*/}
                {/*    <div>*/}
                {/*        <img className="img" src=""/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        )
    }
}
export default UploadDaTiJi;
