__d('native/index.js',function(global, require, module, exports) {  window.


IMG_CDN_PREFIX='http://10.32.184.134:5389/res/';


includeCSS("require('native/css/lightningStorm.js')");




var homepage=React.createClass({displayName:'homepage',
render:function(){
return (
React.createElement(Navigator,{
initialRoute:{page:require('native/vsIndex.js')},
renderScene:function(route,navigator){
window.pageRoute=navigator;
return React.createElement(route.page,babelHelpers.extends({navigator:navigator},route));}}));}});








if(isNative){
React.AppRegistry.registerComponent('native',function(){return homepage;});}else 
{
React.render(React.createElement(homepage,null),document.body);}
});
__d('native/css/lightningStorm.js',function(global, require, module, exports) {  var styles={
".native-header":{
"flexDirection":"row",
"alignItems":"center",
"justifyContent":"center",
"height":"40pt",
"color":"#ffffff",
"backgroundColor":"rgb(9,159,222)"},

".native-header-box":{
"flex":"1",
"alignItems":"center",
"justifyContent":"center"},

".native-header-title":{
"color":"#ffffff"},

".native-header-leftButton":{
"position":"absolute",
"top":"0",
"left":"10pt",
"color":"black"},

".native-header-rightButton":{
"position":"absolute",
"right":"10pt",
"top":"0",
"backgroundColor":"white"}};


module.exports=styles;
});
__d('native/vsIndex.js',function(global, require, module, exports) {  includeCSS("require('native/css/vsIndex.js')");var 

vsIndex=(function(_Element){babelHelpers.inherits(vsIndex,_Element);
function vsIndex(){babelHelpers.classCallCheck(this,vsIndex);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(vsIndex).call(this));

_this.state={
dataSource:SimpleListView.initDataSource()};return _this;}babelHelpers.createClass(vsIndex,[{key:"render",value:function render()










{
return (
React.createElement(Div,{style:{height:windowHeight}},
React.createElement(Header,{title:"维多利亚的秘密",leftButton:null}),
React.createElement(Div,{id:"J-block-test",className:"j-j_j i_i-i"},"测试水平居中垂直居中"),

React.createElement(SimpleListView,{className:"listPage-listView iiii",dataSource:this.state.dataSource,
renderRow:this._renderRow})));}},{key:"componentDidMount",value:function componentDidMount()




{
var self=this;
fetch('http://statics1.jiaru.club/react-native-example/list.js',
{method:'get',headers:{'Content-Type':'application/json;charset=utf-8'}}).


then(function(req){
req.json().then(function(res){
var o=self.state.dataSource.cloneWithRows(res.list);
self.setState({
dataSource:o});});});}},{key:"_renderRow",value:function _renderRow(




row,sid,rowid){
return React.createElement(Row,{data:arguments,jumpFn:this.jumpFn});}}]);return vsIndex;})(Element);var 


Row=(function(_Element2){babelHelpers.inherits(Row,_Element2);
function Row(){babelHelpers.classCallCheck(this,Row);var _this2=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Row).call(this));

_this2.state={
numberOfLines:3};return _this2;}babelHelpers.createClass(Row,[{key:"render",value:function render()


{
var row=this.props.data[0];
var rowid=this.props.data[2];
return (
React.createElement(Div,{className:"index-list-row"+(rowid%2==0?" index-list-complexRow":"")},
React.createElement(Div,{className:"index-list-leftImg",onClick:this.jumpImgList.bind(this)},
React.createElement(Img,{className:"index-list-leftImg-img",src:row.smallpic})),

React.createElement(Div,{className:"index-list-rightBox"},
React.createElement(Span,{className:"index-list-rightBox-row"},
React.createElement(Span,null,"姓名："),
React.createElement(Span,null,row.name)),

React.createElement(Div,{onClick:this.collapse.bind(this)},
React.createElement(Span,{ref:"J_r",numberOfLines:this.state.numberOfLines,className:"index-list-rightBox-row-desc"},
React.createElement(Span,null,"简介："),
React.createElement(Span,null,row.desc))))));}},{key:"collapse",value:function collapse()






{
if(this.state.numberOfLines==3){
this.setState({
numberOfLines:null});}else 

{
this.setState({
numberOfLines:3});}}},{key:"jumpImgList",value:function jumpImgList()



{
pageRoute.push({
page:require('native/vsImgList.js'),
a:1,
b:2,
c:3});}}]);return Row;})(Element);





module.exports=vsIndex;
});
__d('native/css/vsIndex.js',function(global, require, module, exports) {  var styles={
"body":{
"margin":"0",
"padding":"0"},

"#J-block-test":{
"backgroundColor":"yellow",
"height":"2rem"},

".j-j_j":{
"color":"red",
"flexDirection":"row",
"justifyContent":"center",
"alignItems":"center"},

".i_i-i":{
"color":"black"},

".j-j_j.i_i-i":{
"color":"green"},

".index-contains":{
"flex":"1",
"alignItems":"center"},

".index-goDiv":{
"flexDirection":"row",
"alignItems":"center",
"padding":"10",
"justifyContent":"center"},

".index-btn":{
"flex":"1",
"alignItems":"center",
"justifyContent":"center",
"flexDirection":"row",
"padding":"10pt"},

".index-list-row .index-list-leftImg":{
"width":"3rem",
"paddingTop":".5rem",
"flexDirection":"row",
"justifyContent":"center"},

".index-list-leftImg-img":{
"width":"2rem",
"height":"2rem"},

".index-list-row":{
"flexDirection":"row",
"justifyContent":"flex-start"},

".index-list-row .index-list-rightBox":{
"flex":"1"},

".index-list-row .index-list-rightBox-row-desc":{
"backgroundColor":"red"},

".index-list-complexRow .index-list-rightBox .index-list-rightBox-row":{
"backgroundColor":"green",
"color":"red"},

"#jjj":{
"backgroundColor":"green"},

"SimpleListView":{
"backgroundColor":"yellow"}};


module.exports=styles;
});
__d('native/vsImgList.js',function(global, require, module, exports) {  includeCSS("require('native/css/vsImgList.js')");var 

vsImgList=(function(_Element){babelHelpers.inherits(vsImgList,_Element);
function vsImgList(passedArgs){babelHelpers.classCallCheck(this,vsImgList);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(vsImgList).call(this));

_this.state={
list:null,
pageHeight:windowHeight};

_this.passedArgs={
a:passedArgs.a,
b:passedArgs.b,
c:passedArgs.c};return _this;}babelHelpers.createClass(vsImgList,[{key:'componentWillMount',value:function componentWillMount()


{
var self=this;
fetch('http://statics1.jiaru.club/react-native-example/hesui.js',
{
method:'get',
headers:{'Content-Type':'application/json;charset=utf-8'}}).


then(function(req){
req.json().then(function(res){
self.setState({
list:res.images});});});}},{key:'render',value:function render()




{var _this2=this;
return (
React.createElement(Div,{className:'imgList'},
React.createElement(Header,{ref:'J_header',title:'照片秀',leftButton:{handler:this.backBtn}}),

(function(){
if(_this2.state.list){
return (
React.createElement(Carousel,{style:{height:windowHeight-40}},

_this2.state.list.map(function(o,idx){
return (
React.createElement(Div,{key:idx,style:{width:windowWidth,height:windowHeight-40,alignItems:'center',justifyContent:'center'}},
React.createElement(Img,{src:o.img,style:{width:o.width,height:o.height}})));})));}else 






{
return (
React.createElement(Div,{style:{backgroundColor:'#fffff',width:windowWidth,height:windowHeight-40,alignItems:'center',justifyContent:'center'}},
React.createElement(Span,null,'加载中...')));}}).



call(this),

React.createElement(Div,{className:'float-bg'},'这是一个透明浮层的测试,上一页面传递过来的参数为',JSON.stringify(this.passedArgs))));}},{key:'backBtn',value:function backBtn()



{
pageRoute.pop();}}]);return vsImgList;})(Element);



module.exports=vsImgList;
});
__d('native/css/vsImgList.js',function(global, require, module, exports) {  var styles={
".imgList":{
"position":"relative"},

".float-bg":{
"backgroundColor":"gray",
"color":"#000000",
"opacity":"0.2",
"height":"4rem",
"width":"100%",
"position":"absolute",
"bottom":"0",
"left":"0"}};


module.exports=styles;
});

;require("native/index.js");
