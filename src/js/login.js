 //获取元素
 var user = document.querySelector('.username')
 var pwd = document.querySelector('.password')
 var err = document.querySelector('span')

 //绑定一个事件用来获取用户输入的内容
 //1.1绑定登录事件
 var btn_1 = document.querySelector('.btn_1')
 btn_1.onclick = function (e) {
     //事件对象兼容
     e = e || window.event
     //阻止浏览器默认行为（当点击button按钮时，表单自动提交，这是浏览器默认行为，需要阻止）
     e.preventDefault()
     // console.log('按钮');

     // 获取用户输入的内容
     var uname = user.value
     var upass = pwd.value
     // console.log(uname,upass);

     //表单验证
     if (!uname || !upass) {
         alert('填写错误')
         return
     }

     //发送post请求
     // 创建ajax对象
     var xhr = new XMLHttpRequest()
     //配置本次请求信息
     xhr.open('post', 'http://127.0.0.1/login.php')
     //接受响应
     xhr.onload = function () {
         var res=JSON.parse(xhr.responseText)
         if(res.code===0){
             err.style.display='block';
         }else{
             window.location.href='../pages/index.html'

         }
     }
     //设置请求头
     xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

     //发送请求
     xhr.send(`username=${uname}&pwd=${upass}`)

 }