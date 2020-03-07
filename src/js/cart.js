//1.获取数组
const cartList = JSON.parse(localStorage.getItem('cartList'))
// console.log(cartList);
//2.判断有没有数据
if (!cartList) {
    alert('您的购物车为空')
} else {
    //3.渲染页面
    bindHtml()

    //4.添加各种事件
    bindEvent()
}

//整体渲染页面
function bindHtml() {
    //全选按钮渲染，如果每一个数中的isSelect都为true，就渲染为true
    let selectAll = cartList.every(item => {
        return item.isSelect === true
    })

    let str = `
    <div class="top">
    <div class="all">
        <input class="selectAll" type="checkbox" ${selectAll ? 'checked' : ''}>全选
    </div>
    <div class="pic">&nbsp;</div>
    <p>商品名称</p>
    <p>单价</p>
    <p>数量</p>
    <p>小计</p>
    <p>操作</p>
</div>
<div class="center">
    <ul class="shop">
     `
    cartList.forEach(item => {
        //每一天数据的渲染
        str += `
        <li>
        <div class="select">
            <input data-id=${item.list_id} class="smallSelect" type="checkbox" ${item.isSelect ? 'checked' : ''}>
        </div>  
        <div class="info">
            <img src="${item.list_url}" alt="">
        </div>
        <div class="name">${item.list_name}</div> 
        <div class="price">${item.list_price}</div>
        <div class="num">
            <button data-id="${item.list_id}" class="sub">-</button>
            <input type="text" value="${item.number}">
            <button data-id="${item.list_id}" class="add">+</button>
        </div>
        <div class="tit">￥：${item.xiaoji.toFixed(2)}</div>
        <div class="del_1" data-id="${item.list_id}" >删除</div>
       </li>               
        `
    });
    
    //选中商品数量需要渲染
    // 把数组中isSelect为true的数据的number加一起
    let selectArr=cartList.filter(item=>{
        return item.isSelect === true
    })
    // console.log(selectArr);
    //选中商品的数量
    let selectNumber=0
        // 选中商品总价
    let selectPrice=0
    selectArr.forEach(item => {
            selectNumber +=item.number
            selectPrice +=item.xiaoji
        })


    //去支付  选中不禁用，不选中则禁用

    str += `
    </ul>
</div>
<div class="bottom">
    <p><a class="tz" >继续选购</a> <em>|</em> 选择 <span> ${selectNumber}</span>件商品 </p>
    <span>合计：${selectPrice} 元</span>
    <button class="pay" ${selectArr.length ? '':'disabled'}>去结算</button>
    <button class="del" >清空购物车</button>
</div>    
    `
    // 整体添加到页面盒子里
    $('.cart').html(str)
}
// 添加各种事件
function bindEvent(){
    //4.1全选按钮
    //重新渲染页面，页面上的uansu发生变化，会变成一套新的元素，没有事件，因为页面改变元素
    $('.cart').on('change','.selectAll',function(){
        // console.log(this.checked);
        //让数组里面的每一个s数据isSelect都变成true
        cartList.forEach(item => {
            item.isSelect=this.checked
        });
        // 重新渲染这个页面
        bindHtml()
        // 重新刷新页面数据消失  重新存储一遍localStrorage
        localStorage.setItem('cartList',JSON.stringify(cartList)
        )
    })
    
    //4.2单选按钮
    $('.cart').on("change",'.smallSelect',function(){
        // console.log(this);
        // console.log(this.checked);
        // 需知道点击的是哪一个单选按钮
        // data('id')是data-id=${item.list_id}
        // console.log($(this).data('id'));
        const id=$(this).data('id')
        // //找到数组中id一样的那一条数据改变isSelect属性
        cartList.forEach(item=>{
            // console.log(item.list_id);
            if(item.list_id===id){
                item.isSelect=!item.isSelect
            }
        })
        // //重新渲染页面
        bindHtml()
        // 重新刷新页面数据消失  重新存储一遍localStrorage
        localStorage.setItem('cartList',JSON.stringify(cartList)
        )
    })

    //4.3 加减按钮
    //减按钮
    $('.cart').on('click','.sub',function(){
        // console.log(this);
        // console.log($(this).data('id'));       
        const id=$(this).data('id')
        cartList.forEach(item=>{
            if(item.list_id===id){
                //当item。number===1时，不需要减
                item.number >1?item.number--:''
                item.xiaoji=item.list_price*item.number
            }
        })
        //重新渲染页面
        bindHtml()
        // 重新刷新页面数据消失  重新存储一遍localStrorage
        localStorage.setItem('cartList',JSON.stringify(cartList)
        )
    })
    //加按钮
    $('.cart').on('click','.add',function(){
        // console.log(this);
        // console.log($(this).data('id'));       
        const id=$(this).data('id')
        cartList.forEach(item=>{
            if(item.list_id===id){
                item.number++
                item.xiaoji=item.list_price*item.number
            }
        })
        //重新渲染页面
        bindHtml()
        // 重新刷新页面数据消失  重新存储一遍localStrorage
        localStorage.setItem('cartList',JSON.stringify(cartList)
        )
    })

    //4.4点击删除事件
    $('.cart').on('click','.del_1',function(){
        //拿到自己身上的id
        const id=$(this).data('id')
        // console.log('把数组中id为：'+id+'数据清除')
       //获取数据
       let arr=JSON.parse(localStorage.getItem('cartList'))
        //   console.log(arr)
       //筛选数据
        arr=arr.filter(function(item){
            return item.list_id !==id
        })
        
        //将筛选出来的数据放回本地存储
        localStorage.setItem('cartList',JSON.stringify(arr)) 
        //重新渲染页面
        bindHtml()
        // 重新刷新页面数据消失  重新存储一遍localStrorage
        // localStorage.setItem('cartList',JSON.stringify(cartList)
        // )  
        window.location.reload()      
    })

    //点击清空购物车事件
    $('.cart').on('click','.del',function(){
        // console.log('所有数组清空');
        localStorage.removeItem('cartList')

        //重新渲染页面
        bindHtml()

        window.location.reload()      
    
    }) 
}

// 点击继续选购跳转至列表页  
$('.cart').on('click','.tz',function(){
    // console.log(this);
    
    window.location.href='../pages/list.html'
})
