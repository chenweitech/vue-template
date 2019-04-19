# vue-template

基于VUE和Webpack4的项目开发

## 目录结构
```
App/
|- __test__             存放测试用例
|- build/               Webpack4构建配置
|- src/                 
    |- assets/          静态资源
    |- components/      业务逻辑组件
    |- configs/         系统配置文件
    |- layouts/         布局组件
    |- mock/            Mock数据
    |- pages/           页面级组件
    |- utils/           
        |- helper/      自定义函数 
        |- plugins/     自定义插件仓库
        |- apis/        API文件
|- static/              静态资源文件
|— store/               数据仓库
```

## 自定义插件开发

在src/utils/plugins 文件夹下新建文件夹，命名为插件名称，文件夹包含一个index.js，和一个src文件夹

## UI组件库

本项目内置使用kit-ui做UI组件库，UI组件开发示例参见src/components/kit-ui组件库

## 启动项目

```
yarn install
```