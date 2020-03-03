//利用钩子函数
//发送的时候显示
$('button').ajaxSend(function(){
    $('ul>img').show();
    $('.p1').show();
});

//完成的时候隐藏
$('button').ajaxComplete(function(){
    $('img').hide();
    $('.p1').hide();
});
//点击按钮会发送请求
$('button').click(function(){
    $.ajax({
        //发送至我的购物车
        
      })
})

//点击小米手机.bpx1显示
function getList(){
    $.ajax({
        url:"../lib/nav.json",
        dataType:'json',
        success:function(res){
            // console.log(res);
         let str=''  
         res.forEach(item => {
             str+=`<li>${item.name}</li>`
         });

            $('.nav_top>ul').html(str).on({
                mouseover:()=>$('.nav_box').stop().slideDown(),
                mouseleave:()=>$('.nav_box').stop().slideUp()
            }) 
            .children('li')
            .on('mouseover',function(){
                const index=$(this).index()
                const list=res[index].list
                let str='';
                list.forEach(item=>{
                    str+=`
                    <li>
                    <div>
                      <img src="${ item.list_url }" alt="">
                    </div>
                    <p class="title">${ item.list_name }</p>
                    <span class="price">${ item.list_price }</span>
                  </li>
                
                    `
                })
                $('.nav_box>ul').html(str)
            })
            $('.nav_box').on({
                mouseover:function(){$(this).finish().show()},
                mouseout:function(){$(this).finish().slideUp()}
            })
         }
   
        
    })
}
getList()

//左边导航栏渲染
function getList1(){
    $.ajax({
        url:'../lib/nav_left.json',
        dataType:'json',
        success:function(res){
            // console.log(res);
            let str1 = ''
            res.forEach(item => {
            str1 += `
              <li>
                <p>${ item.title }</p>
                <span>></span>
                </li>
                `
     
        //    item.list.forEach(item2 => {
        //         console.log(item2.list);
                
        //       str1 += `<li>${ item2.name }</li>`
        //     })
            
          })
   
          $('.box2>ul').html(str1)
        //   $('.box2>ol').html(str1)
     
        $('.box2>ul').on({
         mouseover: function(){$('.box2>ol').finish().show()},
          mouseleave: function(){$('.box2>ol').finish().hide()}
        })
    }
   
        
})
}
getList1();
// getList2()

// function getList2() {
//   $.ajax({
//     url: '../lib/nav_left.json',
//     dataType: 'json',
//     success: function (res) {
//       console.log(res)
//       // 4-1. 准备一个空字符串
//       let str = ''
//       // 4-2. 渲染一级的 li
//       res.forEach(item => {
//         str += `<li><a href="">${ item.title }</a><em class="glyphicon glyphicon-chevron-right"></em></li>`
//       })
//       // 4-3. 填充到 nav_top 里面的 ul 里面
//       $('.leftside > ul')
//         .html(str)
//         // .on({
//         //   mouseenter: () => $('.adv2').stop().slideDown(),
//         //   mouseleave: () => $('.adv2').stop().slideUp()
//         // })
//         .children('li') // 找到所有的一级菜单下的 li
//         .on('mouseover', function () {
//           // 5-1. 知道自己移入的时哪一个 li
//           const index = $(this).index()
//           // 5-2. 找到要渲染的数组
//           const list = res[index].list
//           // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
//           let str = ''
//           // 5-4. 进行组装
//           list.forEach(item => {
//             str += `
//               <li>
//                 <div>
//                   <img src="${ item.url }" alt="">
//                 </div>
//                 <p class="title">${ item.name }</p >
//               </li>
//             `
//           })
//           

//           // 5-5. 填充到页面里面
//           $('.adv2 > ul').html(str)
//         })
//         .on({
//           mouseenter: () => $('.adv2').stop().css("display","block"),
//           mouseleave: () => $('.adv2').stop().css("display","none")
//         })

//       // 4-4. 给 nav_box 添加一个移入移出事件
//       $('.adv2')
//         .on({
//           mouseover: function () { $(this).finish().show() },
//           mouseout: function () { $(this).finish().css("display","none") }
//         })
//     }
//   })
// }


//轮播图
var mySwiper = new Swiper ('.banner1', {
    direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay:{
        delay:1000
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })        

  //倒计时
  var nums =$('.num');
  //设定未来时间
  var future_time=new Date("2020-03-07 10:50:00");
  function print(){
  //设定现在时间
  var now_time=new Date();
  //设定剩余时间
  var surplus=Math.ceil((future_time-now_time)/1000);
  if(surplus>=0){
  var hour=Math.floor(surplus/3600);
  var min=Math.floor(surplus%3600/60);
  var sec=Math.floor(surplus%60);
//   var str=(two(hour)+two(min)+two(sec));
//   console.log(surplus);
  var str=""+two(hour)+two(min)+two(sec);//将str转化成字符串形式，方便使用字符串的方法
//    var str=''+hour+min+sec;
  // console.log(str);
 for(var i=0;i<str.length;i++){
    nums[i].innerText=str[i]
 }
  
  }
}
  
  var timer=setInterval(print,1000);
  function two(n){
      return n<10? "0"+n:n;
  }
  


  //tab选项卡
  var mySwiper = new Swiper ('.banner2', {
    direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay:{
      delay:2000

  },
  navigation: {
    nextEl: '.qian',
    prevEl: '.hou',
  },
  })        
