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
                mouseenter:()=>$('.nav_box').stop().slideDown(),
                mouseleave:()=>$('.nav_box').stop().slideUp()
            }) 
            .children('li')//找到所有的一级菜单下的li
            .on('mouseover',function(){
                const index=$(this).index()//找到自己移入的是哪一个li
                // console.log(index);
                const list=res[index].list//找到要渲染的数组
              //  console.log(list);
              //  用我们找到的数组把nav_box位置渲染了就可以
                let str='';
              //进行组装
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
                // 填充到页面
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

//分类显示
getList1()
function getList1(){
  $.ajax({
    url:"../lib/nav_left.json",
    dataType:"json",
    success:function(res){
      // console.log(res);//讲数据拿出来
      //创建一个字符串
      let str=''
      //进行外层数组循环，渲染一级标题  根据一级菜单鼠标事件出现二级菜单
      res.forEach(item=>{
        str +=`
        <li>
          <p>${item.title}</p>
          <span>></span>  
        </li>
        `
      })
      //填充到nav_leftl里面的ul
      $('.nav_left>ul')
      .html(str)
      .on({
        mouseenter:()=>$('.nav_right').stop().slideDown(),
        mouseleave:()=>$('.nvw_right').stop().slideUp()
      })
      .children('li')//找到所有的一级菜单上的li
      .on('mouseenter',function(){
        const index=$(this).index()//知道自己移入的是哪一个li
        // console.log(index);  
        //找到要渲染的数组
        const list=res[index].list
        // console.log(list);
        //用找到的数组把nav_right渲染
        let str =""
        //进行组装
        list.forEach(item=>{
          // console.log(item); 
          str +=`
             <li>
                <div>
                  <img src="${item.url}" alt="">
                </div>
                <p class="title">${item.name}</p >
             </li>
          `
        })
        // console.log(str);
        
        //填充到nav_right里面
        $('.nav_right>ul').html(str)
          .on({
              mouseenter: () => $('.nav_right').stop().css("display","block"),
              mouseleave: () => $('.nav_right').stop().css("display","none")
            })  
       })
          // 填充到全部商品上
        $('.nav_top>span')            
          .on({
            mouseenter:()=>$('.nav_box2').stop().slideDown(),
            mouseleave:()=>$('.nav_box2').stop().slideUp()      
          })

      
      //给nav_right添加一个移入移除事件
      $('.nav_right').on({
        mouseover:function(){$(this).finish().show()},
        mouseout:function(){$(this).finish().slideUp()}
      })
      
    }
  })
}

//排序
//准备一个变量
var flag=true //默认是升序
//在准备一个变量接受数组
var list1=''


//分页
let currPage='' //记录切换器到多少页
getList2()
function getList2(){
  //发送请求
  $.ajax({
    url:"../lib/list.json",
    dataType:"json",
    success:function(res){
      // console.log(res);//将数据拿出来，打印到控制台
      // console.log(res.length);//功多少条数据 40
      //一页显示多少条(假设一页15条)，一共3页

      //2.直接进行分页器的渲染  因为就请求了一次数据，每次使用分页器切换的时候是从数组里面拿到不同的数组


      //渲染分页器
      $('.pagi').pagination({
        // mode:"fixed",//fixed固定分页器数量
        pageCount: Math.ceil(res.length/15),//总页数
        current:1,//当前页
        jump: true,//是否开启跳转指定页
        coping: true,
        homePage: '首页',//首页文本
        endPage: '末页',//末页文本
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) {//切换页面的时候会触发
          //api.getCurrent()获取当前是第几页
            // console.log(api.getCurrent())
            //给全局准备的变量赋值  切换一次，全局变量就改变一次
            currPage=api.getCurrent()
            // console.log(currPage);

            //根据第几页从总数组里面筛选出一部分数据
            let list=res.slice((currPage-1)*15,currPage*15)//slice包前不包后currPage*15-1+1
            // console.log(list);   
            
            //3.2每次分页器切换的时候渲染一次数据
            bindHtml(list)
        }
      }) 
      //3.1先把第一页的数据渲染一次    
      bindHtml(res.slice(0,16)) 

      //给全局变量list1赋值
      list1=res
    }
  })
  
}
//请求回来的数组（渲染页面）
function bindHtml(list){
  // console.log(list);
  // 数据list数组渲染页面

  //创建一个字符串
  let str=""
  list.forEach(item=>{
    // console.log(item);  
    str +=`
    <li>
      <img src="${item.list_url}" alt="">
      <p>
        <a href="">
          ${item.list_name}
        </a>
        </p>
      <p>${item.list_price}元</p>
      <a href="">${item.list_gwc}</a>
    </li>
    `
    // console.log(item.list_desc);   
  })
  $('.box>ul').html(str)
}

//排序
//准备一个变量
var flag=true //默认是升序
//获取元素
let btn=document.querySelector('.sort')
btn.onclick=function(){
  var em=document.getElementsByTagName('em')[0]
  //让准备好的变量改变
  flag=!flag
  // console.log(flag);
  // console.log(list1);//拿到数组
  list1.sort(function(a,b){
    if(flag===true){
      em.className="glyphicon glyphicon-arrow-up"
      return a.list_price-b.list_price
    }else{
      em.className="glyphicon glyphicon-arrow-down"
      return b.list_price-a.list_price
    }
  })
  // console.log(list1);
  //再次重新渲染页面
      //渲染分页器
      $('.pagi').pagination({
        // mode:"fixed",//fixed固定分页器数量
        pageCount: Math.ceil(list1.length/15),//总页数
        current:1,//当前页
        jump: true,//是否开启跳转指定页
        coping: true,
        homePage: '首页',//首页文本
        endPage: '末页',//末页文本
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) {//切换页面的时候会触发
          //api.getCurrent()获取当前是第几页
            // console.log(api.getCurrent())
            //给全局准备的变量赋值  切换一次，全局变量就改变一次
            currPage=api.getCurrent()
            // console.log(currPage);

            //根据第几页从总数组里面筛选出一部分数据
            let list=list1.slice((currPage-1)*15,currPage*15)//slice包前不包后currPage*15-1+1
            // console.log(list);   
            
            //3.2每次分页器切换的时候渲染一次数据
            bindHtml(list)
        }
      }) 
      //3.1先把第一页的数据渲染一次    
      bindHtml(list1.slice(0,16)) 
  
}












