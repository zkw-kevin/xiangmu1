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
               console.log(list);
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
            //给nav_box添加一个移入移除
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
      console.log(res);//讲数据拿出来
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
      $('.nav_left')
      .html(str)
       .on({
        mouseenter:()=>$('.nav_right').stop().show(),
        mouseleave:()=>$('.nav_right').stop().hide()
      })
      .children('li')
      .on('mouseover',function(){
                  const index = $(this).index()
                  //  console.log($(this).index());
        
                  // console.log(index);
        
                  // 找到要渲染的数组
                  const list = res[index].list
                //  console.log(list);
                // console.log(res[index]);
                  //  用我们找到的数组把 nav_box 位置渲染了就可以了
                  let str1 = ''
                  // 5-4. 进行组装
                  list.forEach(item2 => {
                    //  console.log(item2);
            console.log(item2.url);
          
                    str1+= `
                      <li>
                      
                          <img src="${item2.url}" alt="">
                       
                        <p class="title">${item2.name }</p >
                      </li>
                    `
                  })
              $('.nav_right>li').html(str1)
        // console.log($('.nav_right'));
        
        })
        .on({
          mouseenter: () => $('.nav_right').stop().css("display","block"),
          mouseleave: () => $('.nav_right').stop().css("display","none")
        })     
     
      $('.nav_right')
        .on({
          mouseover: function () { $(this).finish().show() 
},
          mouseout: function () { $(this).finish().css("display","none") }
        })
    }
  })
}

//分页
getList2()
function getList2() {
  $.ajax({
    url: '../lib/list.json',
    dataType: 'json',
    success: function (res) {
   // console.log(res);
    
      // 2. 渲染分页器
      $('.pagi').pagination({
        pageCount: Math.ceil(res.length / 4), // 总页数
        current: 1, // 当前页
        jump: true,
        coping: true,
        homePage: '首页', // 首页按钮的文本
        endPage: '末页', // 末页按钮的文本
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) { // 当你切换页面的时候会触发
          // api.getCurrent() 获取当前是第几页
          // console.log(api.getCurrent())
          let curr = api.getCurrent()

          // console.log(curr)
          // 根据是第几页, 从我的总数组里面筛选出一部分数据
          //   slice 方法包前不包后
          var list = res.slice((curr - 1) * 4, curr * 4)
          // console.log(list)
          // slice 不改变原始数组, 只是从数组里面拿到一些内容
          // splice 方法才是改变原始数组, 从原始数组里面删除

          // 3-2. 每次使用分页器切换的时候渲染一次
          bindHtml(list)
        }
      })

      // 3. 先把第一页的数据渲染一次
      bindHtml(res.slice(0, 4))

    }
  })
}

function bindHtml(list) {
  console.log(list)
  // 根据 list 数组渲染页面就可以了

  let str = ''

  list.forEach(item => {
    console.log(item);
    
    str += `
    <li>
    <p>${item.list_name}</p>
    <p>${item.list_desc}</p>
    <img src="${item.list_url}" alt="">
    <p>${item.list_price}</p>
    <button>"加入购物车"</button>
  </li>
    `
  })

  $('.box > ul').html(str)
}