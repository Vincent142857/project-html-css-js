var data = [
    {"id":"p01","name":"lotus pink", "pic":"lotus_pink.jpg","price":100,"description":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea at porro, minus, neque rerum incidunt cumque voluptate eum officiis nesciunt veritatis accusamus est temporibus aperiam deserunt nobis perferendis! Reiciendis, dolores?", "cat":"lotus"},

    {"id":"p02","name":"lotus white", "pic":"lotus_white.jpg","price":150, "description":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea at porro, minus, neque rerum incidunt cumque voluptate eum officiis nesciunt veritatis accusamus est temporibus aperiam deserunt nobis perferendis! Reiciendis, dolores?","cat":"lotus"},

    {"id":"p11","name":"orchid purple", "pic":"orchid_purple.jpg","price":123,"description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos doloribus facere aliquam amet obcaecati, eos quasi, unde quas odio ab cum fugit nesciunt harum earum quae, dolore excepturi provident? Ullam.Nihil magnam praesentium accusantium eligendi? Voluptatum impedit, quidem reprehenderit, itaque hic amet iure sapiente, velit dolor ratione quo eaque consequatur corporis cum iste voluptates nam dolore ipsam. Excepturi, obcaecati iusto!", "cat":"orchid"},

    {"id":"p12","name":"orchid red", "pic":"orchid_red.jpg","price":90,"description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat inventore laboriosam, voluptates eaque magni animi. Qui ratione repellat, assumenda doloribus ex officiis veritatis, id quis nesciunt sit facere, porro fugiat.", "cat":"orchid"},

    {"id":"p13","name":"orchid white", "pic":"orchid_white.jpg","price":115,"description":"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit mollitia eius commodi voluptates, harum quidem id? Ipsam asperiores natus ullam laudantium nobis obcaecati nihil, exercitationem, et impedit non officiis esse.", "cat":"orchid"},

    {"id":"p14","name":"orchid yellow", "pic":"orchid_yellow.jpg","price":13,"description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, veniam. Iure ullam beatae recusandae repellendus illo soluta, pariatur, eveniet repudiandae vero quo, accusantium mollitia consectetur ut possimus id quae animi?", "cat":"orchid"},

    {"id":"p21","name":"rose blue", "pic":"rose_blue.jpg","price":150,"description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid inventore, corporis hic aliquam sint sed nostrum dolor saepe temporibus nisi itaque dolores sit quidem alias quasi, voluptates tempore incidunt eum.", "cat":"rose"},

    {"id":"p22","name":"rose pink", "pic":"rose_pink.jpg","price":150,"description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quibusdam quas vitae, animi eveniet accusamus provident molestiae eum numquam reprehenderit dolore in ratione voluptas, asperiores impedit sapiente facere iure eius!", "cat":"rose"},

    {"id":"p23","name":"rose red", "pic":"rose_red.jpg","price":123,"description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quod dignissimos expedita at quas eum assumenda doloribus tenetur quis aperiam, quo praesentium officiis, culpa vero voluptas harum aut ducimus eveniet!", "cat":"rose"},

    {"id":"p24","name":"rose white", "pic":"rose_white.jpg","price":190,"description":"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia nihil asperiores illum corrupti libero suscipit, odit nostrum accusantium porro veniam, temporibus beatae? Blanditiis vel quisquam quidem, odio dignissimos assumenda cupiditate.", "cat":"rose"},

    {"id":"p25","name":"rose yellow", "pic":"rose_yellow.jpg","price":115,"description":"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, asperiores minima commodi accusamus voluptates repellendus veritatis pariatur doloremque tempore hic, eum ab optio quod architecto consequuntur corrupti itaque consequatur? Ullam!Dignissimos corrupti ullam laudantium aliquid repudiandae? Deleniti praesentium corrupti ut eum officiis aut eaque doloribus maxime doloremque reiciendis, tempora vitae recusandae magni enim non perspiciatis saepe, iusto laboriosam id soluta!", "cat":"rose"},

    {"id":"p31","name":"sun", "pic":"sun.jpg","price":130,"description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cumque, qui eum temporibus, dignissimos voluptatibus consectetur maiores corrupti corporis tempora officiis, voluptates ut sequi laudantium unde iusto incidunt facilis consequuntur.", "cat":"sun"}

];
// $.getJSON("js/data.json", function (items) {
//     data = items;
//     displayImages(data);
// });

displayImages(data);

//lap trinh su kien search
// @ts-ignore
$("#formSearch").submit(function (e) {
    e.preventDefault();

    // @ts-ignore
    let search = $("#search").val();
    let re = new RegExp(search, "ig");
    let subdata = data.filter(item => item.name.search(re) >= 0);

    displayImages(subdata);
});

//lap trinh su kien xem chi tiet san pham
// $(".detailImage").click(function(){
//     alert("detailImage");
//     let id = $(this).data('id');
//     alert("test + " + id);
//     location.href = "product_" + id+  ".html";
// });

function showProduct(pid){
    let products = data.filter(ele => ele.id == pid);
    let product = products[0];
    let x= `
            <div class="col-md-6">
                <div><img src="image/${product.pic}" alt="" class="flowerImage"></div>
            </div>
            <div class="col-md-6">
                <h3>${product.name.toUpperCase()}</h3>
                <h1>Price: ${product.price}</h1>
                <div>
                    <p>${product.description}</p>
                </div>
                <a href="#" data-name="${product.name}" data-price="${product.price}" class="add-to-cart btn btn-primary">Add to cart</a>
            </div>
        `;
    // @ts-ignore
    $("#productDetail").html(x);
}

//lap trinh su kien click chon loai san pham
// @ts-ignore
$("input[type=checkbox]").click(function () {

    // var cats =
    //     $('input:checkbox[name="cat"]:checked')
    //         .map(function () {
    //             return $(this).val();
    //         }).get();

    // cats = cats.toString().trim();
    //alert("checkbox");

    // @ts-ignore
    let cats = $(".chk-cake:checked").map(function () { return $(this).val() }).toArray().toString();

    let subdata = (cats.length==0)?data: data.filter(item => cats.search(item.cat) >= 0);

    displayImages(subdata);

});


function displayImages(items) {
    let s = ``;

	// @ts-ignore
	$.each(items, function (k, v) {

        s += `<div class="col-sm-6 col-md-4 divImage">
                <div class="detailImage" data-id="${v.id}">
                    <a href="product_${v.id}.html"><img src="image/${v.pic}" alt="" class="flowerImage"></a>
                    <h3>${v.name.toUpperCase()} </h3>
                    <h4>Price: ${v.price}</h4>
                </div>
                <a href="#" data-name="${v.name}" data-price="${v.price}" class="add-to-cart btn btn-primary">Add to cart</a>
            </div>`;

    });


    // @ts-ignore
    $("#products").html(s);
}