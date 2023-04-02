function addProduct() {
  let div = document.createElement("div");
  let addDivToBod = document.body.appendChild(div);
  addDivToBod.setAttribute("class", "add-product");
  let add_product = `
      <form action="" method="post" enctype="multipart/form-data">
        <div class="post-infor">
          <input type="text" name="name" placeholder="Product Name" required />
          <input type="number" name="quantity" placeholder="Quantity" required />
          <select name="category" id="">
            <option value="TS">T-shirt</option>
            <option value="PS">Pants</option>
            <option value="SN">Sneakers</option>
            <option value="AC">Accessory</option>
          </select>
          <input type="number" name="price" placeholder="Price" required />
          <input type="text" name="description" placeholder="Description" required/>
        </div>
        <div class="post-image">
          <label for="mypicture" class="preview">
            <span>Upload to review image</span>
          </label>
          <input id="mypicture" type="file" name="image" hidden />
        </div>
        <div class="button-row">
          <button type="button" class="close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
          <button type="submit" class="accept-input" name="submit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></button>
        </div>
      </form>
      `;
  addDivToBod.innerHTML = add_product;

  var upload = document.querySelector("#mypicture");
  var preview = document.querySelector(".preview");

  upload.addEventListener("change", function (e) {
    let file = upload.files[0];
    if (!file) {
      return;
    }
    let img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });

  let dropBtn = document.querySelector(".close");

  dropBtn.addEventListener("click", closeProductForm);
  function closeProductForm() {
    let divToRemove = document.querySelector(".add-product");
    divToRemove.remove();
  }
}


function addPromote() {
  let div = document.createElement("div");
  let addDivToBody = document.body.appendChild(div);
  addDivToBody.setAttribute("class", "add-product");
  let add_promotion = `
  <form action="" method="post">
    <div class="post-infor">
      <input type="text" name="name" placeholder="Promote Name" />
      <input type="number" name="discount" placeholder="Discount" />
      <div class="status">
      <p> Status </p>
      <div class="choose-area"> 
      <label> <span>Valid</span>
      <input type="radio" name="status" placeholder="Discount" value="Valid"/>
      </label>
      <label> <span>Invalid</span>
      <input type="radio" name="status" placeholder="Discount" value="Invalid"/>
      </label>
      </div>
        
      </div>
    <div class="button-row">
      <button type="button" class="close">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
      </button>
      <button type="button" class="accept-input" class=>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></button>
    </div>
  </form>
  `;
  addDivToBody.innerHTML = add_promotion;

  let dropBtn = document.querySelector(".close");
  dropBtn.addEventListener("click", closeProductForm);
  function closeProductForm() {
    let divToRemove = document.querySelector(".add-product");
    divToRemove.remove();
  }
}
