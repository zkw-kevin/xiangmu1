//点击小米手机.bpx1显示
function getList() {
  $.ajax({
    url: "../lib/nav.json",
    dataType: 'json',
    success: function (res) {
      // console.log(res);
      let str = ''
      res.forEach(item => {
        str += `<li>${item.name}</li>`
      });

      $('.nav_top>ul').html(str).on({
        mouseenter: () => $('.nav_box').stop().slideDown(),
        mouseleave: () => $('.nav_box').stop().slideUp()
      })
        .children('li')//找到所有的一级菜单下的li
        .on('mouseover', function () {
          const index = $(this).index()//找到自己移入的是哪一个li
          // console.log(index);
          const list = res[index].list//找到要渲染的数组
          //  console.log(list);
          //  用我们找到的数组把nav_box位置渲染了就可以
          let str = '';
          //进行组装
          list.forEach(item => {
            str += `
                    <li>
                    <div>
                      <img src="${ item.list_url}" alt="">
                    </div>
                    <p class="title">${ item.list_name}</p>
                    <span class="price">${ item.list_price}</span>
                  </li>
                
                    `
          })
          // 填充到页面
          $('.nav_box>ul').html(str)
        })
      $('.nav_box').on({
        mouseover: function () { $(this).finish().show() },
        mouseout: function () { $(this).finish().slideUp() }
      })
    }


  })
}
getList()

//分类显示
getList1()
function getList1() {
  $.ajax({
    url: "../lib/nav_left.json",
    dataType: "json",
    success: function (res) {
      // console.log(res);//讲数据拿出来
      //创建一个字符串
      let str = ''
      //进行外层数组循环，渲染一级标题  根据一级菜单鼠标事件出现二级菜单
      res.forEach(item => {
        str += `
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
          mouseenter: () => $('.nav_right').stop().slideDown(),
          mouseleave: () => $('.nvw_right').stop().slideUp()
        })
        .children('li')//找到所有的一级菜单上的li
        .on('mouseenter', function () {
          const index = $(this).index()//知道自己移入的是哪一个li
          // console.log(index);  
          //找到要渲染的数组
          const list = res[index].list
          // console.log(list);
          //用找到的数组把nav_right渲染
          let str = ""
          //进行组装
          list.forEach(item => {
            // console.log(item); 
            str += `
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
              mouseenter: () => $('.nav_right').stop().css("display", "block"),
              mouseleave: () => $('.nav_right').stop().css("display", "none")
            })
        })
      //填充到全部商品
      $('.shop').on({
        mouseenter: () => $('.nav_left').stop().css("display", "block"),
        mouseleave: () => $('.nav_left').stop().css("display", "none")
      })
      //给nav_right添加一个移入移除事件
      $('.nav_right').on({
        mouseover: function () { $(this).finish().show() },
        mouseout: function () { $(this).finish().slideUp() }
      })

    }
  })
}

//获取localstorage里面的数据
const info = JSON.parse(localStorage.getItem('goods_info'))
// console.log(info);
//判断数据是否存在
if (!info) {
  alert('本地存储没有数据')
  //跳回列表页面
  window.location.href = '../pages/list.html'
}
//渲染页面
bindHtml()
function bindHtml() {
  $('.box img').attr('src', info.list_url)
  $(".box .title").text(info.list_name)
  $('.box .txt').text(info.list_desc)
  $('.box .price').text('￥：' + info.list_price + ' 元')
}

//点击添加购物车
$('.addcart').click(() => {
  // console.log('添加购物车');
  //判断是否登录

  //加入到购物车数组里面  拿到localStorage里面的数组信息 原先没有数据，用空数组代替
  const cartList = JSON.parse(localStorage.getItem('cartList')) || []
  // console.log(cartList);

  //向数组里面把本条数据添加进去
  //判断有没有数据 
  let exits=cartList.some(item=>{
    //数组里面每一个id===本页面的这条数据id
    return item.list_id===info.list_id
  })
  console.log(exits);
  if(exits){
    console.log('已经存在number++');
    let data=null
    for(let i=0;i<cartList.length;i++){
      if(cartList[i].list_id===info.list_id){
        data=cartList[i]
        break
      }
    }
    data.number++
    data.xiaoji=data.number*data.list_price
  }else{
    info.number=1

    //购物车小计
    info.xiaoji=info.list_price//默认第一个小计是单价
    info.isSelect=false//默认不选中
  cartList.push(info)
  }

  //再存储到localStorage里面
  localStorage.setItem('cartList',JSON.stringify(cartList))
  // console.log(cartList);

})



