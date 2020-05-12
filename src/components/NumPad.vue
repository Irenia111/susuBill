<template>
    <div class="numberpad">
        <div class="record">

            <div class="number" :class="{'active':output != ''}">{{output?output:"0.00"}}</div>
            <div class="note">
                <div class="note-date">
                    <a-date-picker class="date-pick" placeholder="请选择"  :locale="locale" v-model="time" @change="onChange" @ok="onOk">
                        <span><a-icon type="clock-circle" /><span class="dateNote">{{date?date:"今天"}}</span></span>
                    </a-date-picker>
                </div>
                <div class="note-con">
                    <input type="text" v-model="noteContent" placeholder="备注(不超过八个汉字)"/>
                </div>

            </div>
        </div>
            <div class="numiput">
                <button @click="numCal">1</button>
                <button @click="numCal">2</button>
                <button @click="numCal">3</button>
                <button @click="cal">+</button>
                <button @click="numCal">4</button>
                <button @click="numCal">5</button>
                <button @click="numCal">6</button>
                <button @click="cal">-</button>
                <button @click="numCal">7</button>
                <button @click="numCal">8</button>
                <button @click="numCal">9</button>
                <button class="finish" @click="finish" :class="finishFlag === true&& 'selected'">{{finishFlag?"完成":"="}}
                </button>
                <button @click="numCal">.</button>
                <button @click="numCal">0</button>
                <button @click="removeCal"><MyIcon name="delete-back"></MyIcon></button>

            </div>
        </div>
</template>

<script>

    import moment from 'moment';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import 'moment/locale/zh-cn';

    export default {
        name: "NumPad",
        props:["recordItem"],
        mounted(){
            if(this.recordItem){
                this.date = this.recordItem.date;
                this.noteContent = this.recordItem.note;
                this.output = this.recordItem.number.toString();
                this.finishFlag = true;
            }
        },
        data(){
            return {
                locale,
                time: undefined,
                //因为time是object，不能改为string，所以拿date做显示
                date: undefined,
                //计算器的功能
                //是否完成数值输入
                finishFlag:false,
                //是否为初次输入
                outputFlag:false,
                //是否为初次输入'.'
                dotFlag:false,
                //是否为初次输入运算符
                calFlag:false,
                output:"",
                numArr:[],
                calCharm:"",
                //记账的数值
                value:0,
                //备注
                noteContent:'',

            };
        },

        watch:{

            output: function(){

                const calFlag = this.output[this.output.length-1];
                if( this.output===''){
                    this.finishFlag=false;
                }else{
                    if("+-".indexOf(calFlag) < 0){
                        this.finishFlag = this.output.indexOf('-') < 0 && this.output.indexOf('+') < 0;
                    }else{
                        this.finishFlag=false;
                    }
                }
            },
        },
        methods:{

            //以下是日期的函数
            onChange(value, dateString) {
                this.date = dateString;
            },
            //不知道这个onOk可以干啥
            onOk(value) {
                this.time = value;
            },

            //以下是计算器的函数
            numCal(event){

                const input = event.target.textContent;
                this.outputFlag =true;
                const calFlag = this.output[this.output.length-1];

                if(this.output.length === 16){
                    return
                }else{

                        if(this.output !== ""){

                            if(this.value && "+-".indexOf(calFlag) < 0){
                                return
                            }else{
                                if(this.output === '0' ){

                                    if("0123456789".indexOf(input) >= 0){
                                        //防止两次输入零
                                        this.output = input;
                                    }else{
                                        //0之后可以输入小数点
                                        this.output += input;
                                        this.dotFlag = true;
                                    }

                                }else if("0123456789".indexOf(input) >= 0){
                                    this.output += input;
                                }else{
                                    //防止重复输入小数点
                                    if(this.dotFlag === true) {
                                        return
                                    }else{
                                        this.output += input;
                                        this.dotFlag = true;
                                    }
                                }
                            }
                        }else{
                            //console.log(this.outputFlag);
                            this.output = input;
                            this.outputFlag = true;
                        }
                }



            },

            //计算
            eqval(){
                console.log("eval");
                //console.log(this.calCharm);
                //console.log(this.output);
                //第一个数是负数，则需要处理
                let num = 1;
                if(this.output[0]==='-'){
                    num = -1;
                    this.output= this.output.slice(1);
                }
                if(this.output === "" ){
                    return;
                }


                const numbers = this.output.split(this.calCharm);
                //console.log(numbers);
                if(numbers.length<=1 && num === -1){
                    this.$message.warning('金额不能为负');
                    this.init();
                }else{
                    if(this.calCharm === "+"){
                        this.value = parseFloat(numbers[0])*num + parseFloat(numbers[1]);
                    }else{
                        this.value = parseFloat(numbers[0])*num - parseFloat(numbers[1]);
                    }
                    this.numArr =[];
                    this.numArr.push(this.value);
                    this.output = this.value.toString();
                    this.calFlag = false;
                }


            },
            removeCal(){
                this.output=this.output.slice(0,-1);
            },

            cal(event){
                const input = event.target.textContent;
                const numFlag = this.output[this.output.length-1];

                //阻止未输入值时输入运算符
                if(this.outputFlag === false){
                    //console.log(input);
                   // console.log(this.outputFlag);
                    return
                }else{
                    //console.log(this.outputFlag);


                        if("0123456789".indexOf(numFlag) >= 0 ) {
                            if (this.output.indexOf('-') < 0 && this.output.indexOf('+') < 0)
                            {
                                const temp = parseFloat(this.output);
                                console.log("temp", temp);

                                this.numArr.push(temp);
                                console.log(this.numArr);
                                console.log("input", input);

                                this.calCharm = input;

                                this.output += input;

                                //将dotFlag置空，使其可以再次输入
                                this.dotFlag = false;


                            } else {
                                //当有两个数字时，再次按下计算符相当于等号
                                this.eqval();
                                this.output += input;
                                this.calCharm = input;
                                //将dotFlag置空，使其可以再次输入
                                this.dotFlag = false;

                            }
                        }else{
                            //当有一个数字时，按下计算符可更改计算符
                            return
                        }

                    }

            },
            finish(event){
                const input = event.target.textContent.toString();
                const calFlag=this.output[this.output.length-1];

                if(input.indexOf("=") !== 0){

                    if(this.output<0){
                        this.$message.warning('金额不能为负');
                    }else{
                        this.saveDate();
                        this.init();
                    }

                }else{
                    if("+-".indexOf(calFlag)>=0){
                        return
                    }else{
                        this.eqval();
                    }

                }

            },

            init(){

                this.time=undefined;
                this.date=undefined;
                this.finishFlag=false;
                this.outputFlag=false;
                this.dotFlag=false;
                this.calFlag=false;
                this.output="";
                this.numArr=[];
                this.value=0;
                this.noteContent='';
            },
            saveDate(){
                this.value=parseFloat(this.output);

                //console.log(typeof this.time);
                //console.log(this.time.format().toString().split("T")[0]);

                if(this.time===undefined){
                    this.time=new Date().toISOString();
                    this.time = this.time.split("T")[0];
                    //console.log(this.time.split("T")[0]);
                    //console.log(typeof this.time.split("T")[0])
                //this.time=JSON.stringify(this.time)
                }else{
                    this.time = this.time.format().toString().split("T")[0];
                }


                //console.log(typeof this.time)
                if(this.noteContent.length > 8){
                    this.$message.warning('备注超过八个汉字，请重新输入');
                }else{
                    this.$emit('update',{
                        note:this.noteContent,
                        date:this.date||this.time,
                        number:this.value
                    });
                    this.$emit('save',true);

                }
            }




        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/style';
    .numberpad{
        margin: 10px 0;
        >.record{
            margin: 10px 0;
            padding: 0 10px;
            display:flex;
            flex-direction: column;
            background: $background-color-1;
            border-radius: 5px;
            box-shadow: 0 0 8px rgba(0,0,0,0.1);
            > .number{
                position: relative;
                font-size: $fontsize-0;
                font-weight: bold;
                letter-spacing: -1px;
            }
            > .active{
                color:$theme-color;
            }

            > .number::after{
                content:'';
                position:absolute;
                left:0;
                bottom:0;
                width:100%;
                border-bottom: 1px solid black;
            }
            >.note{
                margin: 10px 0;
                display:flex;
                align-items: center;

                > .note-date{
                    display:flex;
                    align-items: center;
                    margin-right: 8px;

                    > .date-pick{
                        > span{
                            display: flex;
                            align-items: center;
                            > .anticon{
                                font-size: $fontsize-2-1;
                                margin-right: 4px;
                            }
                            > .dateNote{
                                font-size: $fontsize-2;
                                font-weight: bold;
                            }
                        }


                    }
                }


               > .note-con{
                   padding-left: 8px;
                   position: relative;
                   font-size:14px;
                   overflow: hidden;
               }
                >.note-con::before{
                    content: '';
                    position: absolute;
                    border-left:black 1px solid;
                    left:0;
                    bottom:0;
                    height:100%;
                }
            }
        }

        > .numiput{
            margin-right: -1.8vw;

            @extend %clearFix;
            > button{
                color:#282c34;
                outline: none;
                float:left;
                height:45px;
                width: 22.5vw;
                font-size: $fontsize-1;
                background: $background-color-1;
                margin: 3px 1.8vw 3px 0;
                border:none;
                border-radius: 2px;
                box-shadow: 0 0 8px rgba(0,0,0,0.02);


                &.finish{
                    float:right;
                    font-weight: normal;
                    height: 96px;
                }
                &.finish.selected{
                    background:$theme-color;
                    color:$background-color-1;
                }
            }
        }
    }


</style>
