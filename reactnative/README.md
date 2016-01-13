## react-native目录主要文件介绍

这里保持和官方的reactnative代码完全一致
- css目录是存放通过根目录的react.css.build.js脚本同步编译过来的reactjs的css文件
- 保留了官方原有的index.ios.js做入口
- common目录是框架文件，以及UI组件的文件
- index.js是页面入口文件，业务逻辑
- common/LightningStorm.js是框架文件
- common/rn目录是reactnative的UI组件文件，适配与native组件
- 对应的在根目录web目录也有一个叫做common/html对应的是适配与H5的UI组件文件,和common/rn目录的API保持一致，但是不同实现