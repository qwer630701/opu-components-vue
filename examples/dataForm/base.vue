<template>
    <div>
        <DataForm 
          ref="dataForm" 
          layout="grid" 
          :colspan="3" 
          :titleWidth="100" 
          :readonly="readonly" 
          :items="items"
          :onOptionsAllLoad="onOptionsAllLoad"
          :onOptionsLoadBefore="onOptionsLoadBefore"
          :onButtonActionClick="onButtonClick"
          @submit="onSubmit" 
        >
            <template slot="itemSlot" slot-scope="text,updateValue">
                全插槽内容:{{text}}
                 <a @click="updateValue('77777')">改变值</a>
            </template>
            <template slot="inputSlot" slot-scope="text,updateValue">
                 {{text}}
                 <a @click="updateValue('77777')">改变值</a>
            </template>
        </DataForm>
        <button @click="getData">提交</button>
        <button @click="validateFields">校验并获取值</button>
        <button @click="setItems">动态增加表单项</button>
        <button @click="setReadonly">切换只读</button>
        <button @click="setImageUploadData">设置图片上传默认数据</button>
        <button @click="setSelectData">更新select可选值</button>
<button @click="setFieldsOptionsDefaultValues">设置表单下拉数据默认值</button>

    </div>
</template>

<script>
// import {DataForm} from '../../packages/index'
// console.log(DataForm);
import {utils} from '../../index'

// function getSelectData() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             const data = Array.from({ length: 10 }, (_, key) => ({ 
//                 id:key,
//                 name:`name${key}`
//                 }));
//                 data[3].isSelected = true
//             resolve(data);
//         }, 500);
//     });
// }
function getCheckboxData() {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = Array.from({ length: 5 }, (_, key) => ({ 
                id:key,
                name:`check${key}`
                }));
                data[3].isSelected = true
                data[2].isSelected = true
            resolve(data);
        }, 500);
    });
}


export default {
    components:{
        // DataForm
    },
    data() {
        return {
            key:1,
            readonly:false,
            items:[
                {
                    field:"id",
                    type:"hidden"
                },
                { 
                    field: 'name', 
                    title: '名称', 
                    extra:"aaa",
                    itemRender: { 
                        name: 'input', 
                        props: { 
                            placeholder: '请输入名称',
                            // disabled:true 
                        },
                        on:{
                            // change:(val)=>{
                            //     const form=this.$refs.dataForm.getData();
                            //     console.log(val,form);
                            // }
                        }
                    } 
                },
                { 
                    field: 'name1', 
                    title: '名称2', 
                    extra:"aaa",
                    itemRender: { 
                        name: 'input', 
                        props: { 
                            placeholder: '请输入名称',
                            disabled:true 
                        },
                        on:{
                            // change:(val)=>{
                            //     const form=this.$refs.dataForm.getData();
                            //     console.log(val,form);
                            // }
                        }
                    } 
                },
                { 
                    field: 'mytitle', 
                    title: ()=>{
                        return '自定义标题6'
                    }, 
                    titleWidth:"150px",
                    itemRender: { 
                        name: 'input', 
                        
                    } 
                },
                { 
                    field: 'sex', 
                    title: '性别',
                    option: {
                        rules: [
                            { required: true, message: "请输入名称!" },
                        ]
                    }, 
                    
                    itemRender: { 
                        name: 'select', 
                        props: { 
                            placeholder: '请选择性别',
                            showSearch:true,
                            defaultField:"isSelected",
                            valueField:"id",
                            labelField:"name",
                            // api:getSelectData,
                            param:{
                                code:"aa"
                            }
                            // options:[
                            //     {
                            //         id:1,
                            //         name:"男"
                            //     },
                            //     {
                            //         id:2,
                            //         name:"女",
                            //         isSelected:true
                            //     }
                            // ]
                        } ,
                        
                    } 
                },
                { 
                    field: 'selected', 
                    title: '下拉框',
                    itemRender: { 
                        name: 'select', 
                        props: { 
                            valueField:"id",
                            labelField:"name",
                            // api:getSelectData,
                            param:{
                                code:"bb"
                            }
                        } ,
                    } 
                },
                { 
                    field: 'password', 
                    title: '密码框', 
                    help:"请输入登录密码",
                    itemRender: { 
                        name: 'password'
                    } 
                },
                { 
                    field: 'textarea', 
                    title: '文本域', 
                    // colspan:2,
                    itemRender: { 
                        name: 'textarea'
                    } 
                },
                { 
                    field: 'number', 
                    title: '数字', 
                    width:"200px",
                    itemRender: { 
                        name: 'number'
                    } 
                },
                { 
                    field: 'checkbox', 
                    title: '复选框', 
                    width:"200px",
                    option:{ valuePropName: 'checked' },
                    itemRender: { 
                        name: 'checkbox'
                    } 
                },
                { 
                    field: 'checkboxGroup', 
                    title: '复选框组', 
                    itemRender: { 
                        name: 'checkboxGroup',
                        props:{
                            api:getCheckboxData,
                            valueField:"id",
                            labelField:"name",
                            defaultField:"isSelected",
                            // options: [
                            //     { label: 'Apple', value: 'Apple' },
                            //     { label: 'Pear', value: 'Pear' },
                            //     { label: 'Orange', value: 'Orange' },
                            // ]
                        }
                    } 
                },
                { 
                    field: 'radioGroup', 
                    title: '单选框组', 
                    itemRender: { 
                        name: 'radioGroup',
                        props:{
                            options: [
                                { label: 'Apple', value: 'Apple' },
                                { label: 'Pear', value: 'Pear' },
                                { label: 'Orange', value: 'Orange' },
                            ]
                        }
                    } 
                },
                { 
                    field: 'date', 
                    title: '日期选择', 
                    itemRender: { 
                        name: 'datePicker',
                        props:{
                            showTime:true
                        }
                    } 
                },
                { 
                    field: 'month', 
                    title: '月份选择', 
                    itemRender: { 
                        name: 'monthPicker',
                    } 
                },
                { 
                    field: 'weekPicker', 
                    title: '星期选择', 
                    itemRender: { 
                        name: 'weekPicker',
                    } 
                },
                { 
                    field: 'rangePicker', 
                    title: '日期范围选择', 
                    itemRender: { 
                        name: 'rangePicker',
                        props:{
                            showTime:{ format: 'HH:mm' }
                        }
                    } 
                },
                { 
                    field: 'switch', 
                    title: '开关', 
                    option:{ valuePropName: 'checked' },
                    itemRender: { 
                        name: 'switch',
                    } 
                },
                { 
                    field: 'rate', 
                    title: '评分', 
                    itemRender: { 
                        name: 'rate',
                    } 
                },
                { 
                    field: 'slider', 
                    title: '滑动输入',
                    option:{initialValue:[20,50]}, 
                    itemRender: { 
                        name: 'slider',
                        props:{
                            range:true,
                        }
                    } 
                },
                { 
                    field: 'cascader', 
                    title: '级联选择',
                    itemRender: { 
                        name: 'cascader',
                        props:{
                            options: [
                                {
                                value: 'zhejiang',
                                label: 'Zhejiang',
                                children: [
                                    {
                                    value: 'hangzhou',
                                    label: 'Hangzhou',
                                    children: [
                                        {
                                        value: 'xihu',
                                        label: 'West Lake',
                                        },
                                    ],
                                    },
                                ],
                                },
                                {
                                value: 'jiangsu',
                                label: 'Jiangsu',
                                children: [
                                    {
                                    value: 'nanjing',
                                    label: 'Nanjing',
                                    children: [
                                        {
                                        value: 'zhonghuamen',
                                        label: 'Zhong Hua Men',
                                        },
                                    ],
                                    },
                                ],
                                },
                            ]
                        }
                    } 
                },
                { 
                    field: 'treeSelect', 
                    title: '树形选择器',
                    itemRender: { 
                        name: 'treeSelect',
                        props:{
                            treeData:[
                                {
                                    title: 'Node1',
                                    value: '0-0',
                                    key: '0-0',
                                    children: [
                                    {
                                        value: '0-0-1',
                                        key: '0-0-1',
                                        scopedSlots: {
                                        // custom title
                                        title: 'title',
                                        },
                                    },
                                    {
                                        title: 'Child Node2',
                                        value: '0-0-2',
                                        key: '0-0-2',
                                    },
                                    ],
                                },
                                {
                                    title: 'Node2',
                                    value: '0-1',
                                    key: '0-1',
                                },
                            ]
                        }
                    } 
                },
                { 
                    field: 'upload', 
                    title: '单选上传',
                    itemRender: { 
                        name: 'upload',
                        props:{
                            name:"file",
                            action:"http://www.vote.com/api/upload/image",
                            multiple:true,
                            listType:"text",
                            accept:".doc",
                            
                        },
                        on:{
                            change:(e)=>{
                                console.log(e);
                            }
                        }
                    } 
                },
                { 
                    field: 'imageUpload', 
                    title: '图片上传',
                    itemRender: { 
                        name: 'upload',
                        
                        props:{
                            name:"file",
                            action:"http://www.vote.com/api/upload/image",
                            listType:"picture-card",
                            multiple:true,
                            buttonText:"+选择图片",
                            responseUrlField:"data.url",
                            maxSize:30000
                        },
                        on:{
                            change:(e)=>{
                                console.log(e);
                            }
                        }
                    } 
                },
                
                { 
                    field: 'slot', 
                    title: 'item插槽', 
                    option:{
                        initialValue:555
                    },
                    slot:"itemSlot"
                },
                { 
                    field: 'inputslot', 
                    title: 'input插槽', 
                    option:{
                        // initialValue:666666,
                        // rules: [
                        //     { required: true, message: "请输入名称!" },
                        // ]
                    },
                    itemRender: { 
                       slot:"inputSlot"
                    }
                },
                { 
                    field: 'renderContent', 
                    title: '自定义内容', 
                    itemRender: { 
                        customRender:(value)=>{
                            // setTimeout(() => {
                            //     updateValue(9999)
                            // }, 5000);
                            return "6666-"+value
                        }
                    }
                },
                { 
                    align: 'left', 
                    colspan:3,
                    colon:false,
                    // titleWidth:0,
                    itemRender: { 
                        name: 'buttons', 
                        props:{
                            children: [
                                { 
                                    props: { 
                                        // 'html-type': 'submit',
                                        action:"submit", 
                                        content: '提交', 
                                        type: 'primary' 
                                    }
                                }, {
                                    props: { 
                                        // 'html-type': 'reset', 
                                        action:"reset", 
                                        content: '重置' 
                                    },
                                    on:{
                                        click:()=>{
                                            console.log('click');
                                            return false
                                        }
                                    }
                                },
                                {
                                    props: { 
                                        action:"gaoji", 
                                        content: '自定义action' 
                                    },
                                   
                                },
                                {
                                    props: { 
                                        content: '设置表单值' 
                                    },
                                    on:{
                                        click:this.setFormData
                                    }
                                }
                            ] 
                        }
                    } 
                }
            ]
        }
    },
    methods:{
        getData(){
            const values = this.$refs.dataForm.getData();
            console.log(values);
            console.log(utils.isObject(values));
        },
        async validateFields(){
            try {
                const values = await this.$refs.dataForm.validateFields();
                console.log(values);
            } catch (error) {
                console.log(error);
            }
        },
        onSubmit(values){
            console.log(values);
        },
        setFormData(){
            this.$refs.dataForm.setData({
                name:"aaaa",
                renderContent:"888",
                inputslot:"669888",
                id:66
            });
        },
        setItems(){
            const items=this.items.push({
                title:"动态项"+this.key,
                field:"key"+this.key,
                itemRender: { 
                    name: 'input', 
                    props: { 
                        placeholder: '请输入名称' 
                    } 
                } 
            })
            console.log(items);
            this.key=this.key+1;
        },
        setReadonly(){
            this.readonly=!this.readonly;
        },
        setImageUploadData(){
            this.$refs.dataForm.setData({
                // imageUpload:"http://www.vote.com/storage/images/20200806/cb27652f13eeff8ecd3e4793e0d5a4f5.jpg"
                imageUpload:["http://www.vote.com/storage/images/20200806/cb27652f13eeff8ecd3e4793e0d5a4f5.jpg","http://www.vote.com/storage/images/20200806/cb27652f13eeff8ecd3e4793e0d5a4f5.jpg"]
            });
        },
        setSelectData(){
            this.$refs.dataForm.setFieldsOptions(
                {
                    sex:[
                        {
                            value:5,
                            label:"boy"
                        },
                        {
                            value:6,
                            label:"girl"
                        }
                    ]
                }
            )
        },
        setFieldsOptionsDefaultValues(){
            this.$refs.dataForm.setFieldsOptionsDefaultValues()
        },
        getSelectData() {
            return new Promise(resolve => {
                setTimeout(() => {
                    const data = Array.from({ length: 10 }, (_, key) => ({ 
                        id:key,
                        name:`name${key}`
                     }));
                    resolve(data);
                }, 500);
            });
        },
        onOptionsAllLoad(json){
            console.log('所有api请求完成',json);
        },
        onOptionsLoadBefore(list){
            console.log('请求前回调',list);
        },
        onButtonClick(action){
            console.log(666,action);
        }
    }
}
</script>