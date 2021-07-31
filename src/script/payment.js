$(document).ready(function () {
  $("#btn-payment").on("click", function () {
    const ipFullName = $("#ipFullName").val();
    const txtPhone = $("#ipPhone").val();
    const txtNote = $("#ipNote").val();
    const txtAdd = $("#ipADD").val();
    const txtEmail = $("#ipEmail").val();

    // Hiding error messages
    $(".errorMsg").hide();

    if (checkRequired(ipFullName) == false) {
      $("#ipFullName").css("border", "1px solid red");
      $("#errosrequiredName").show();
      return false;
    } else if (checkName(ipFullName) == false) {
      $("#ipFullName").css("border", "1px solid red");
      $("#errosrusername").show();
      return false;
    } else if (checkRequired(txtPhone) == false) {
      $("#ipPhone").css("border", "1px solid red");
      $("#errosrequiredPhone").show();
      return false;
    } else if (checkMobileNumber(txtPhone) == false) {
      $("#ipPhone").css("border", "1px solid red");
      $("#errorPhone").show();
      return false;
    }
    // else if (checkRequired) {
    //   $("#ipEmail").css("border", "1px solid red");
    //   $("#errosrequiredEmail").show();
    // } else if (checkEmail(txtEmail) == false) {
    //   $("#ipEmail").css("border", "1px solid red");
    //   $("#erroremail").show();
    //   return false;
    // }
    else if (checkChoosen() == false) {
      $("#ddl1").css("border", "1px solid red");
      $("#errosrequiredDropdown").show();
      return false;
    } else if (checkRequired(txtAdd) == false) {
      $("#ipADD").css("border", "1px solid red");
      $("#errosrequiredADD").show();
      return false;
    } else {
      $("input#ipADD").css("border", "1px solid green");
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Xác nhận thanh toán?",
          //   text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Huỷ bỏ",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            addToServer();

            swalWithBootstrapButtons.fire(
              "Thực hiện thành công!"
              //   "Your file has been deleted.",
            );
            setTimeout(() => {
              shoppingCart.clearCart();
              location.reload();
            }, 3000);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your imaginary file is safe :)",
              "error"
            );
          }
        });
    }
  });
});

//function used to validate username
const checkName = (name) => {
  //regular expression for username
  const pattern = /^[a-zA-Z ]{2,}$/g;
  if (pattern.test(removeAscent(name))) {
    $("#ipFullName").css("border", "1px solid green");
    return true;
  } else {
    return false;
  }
};

//function used to check valid email
const checkEmail = (email) => {
  //regular expression for email
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  if (pattern.test(email)) {
    $("#ipEmail").css("border", "1px solid green");
    return true;
  } else {
    return false;
  }
};

//function used to validate mobile number
const checkMobileNumber = (mobile) => {
  //regular expression for mobile number
  const pattern = new RegExp("^([0-9]{10,12})$");
  if (pattern.test(mobile)) {
    $("#ipPhone").css("border", "1px solid green");
    return true;
  } else {
    return false;
  }
};

//function validate required field
const checkRequired = (text) => {
  if (text === "" || text === null) {
    return false;
  } else {
    return true;
  }
};

//function validate required field
const checkChoosen = () => {
  const selectedDDL = $("#ddl1").children("option:selected").val();
  if (selectedDDL.length <= 0 || selectedDDL === "") {
    return false;
  } else {
    $("#ddl1").css("border", "1px solid green");
    return true;
  }
};

const removeAscent = (str) => {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
};

function addToServer() {
  const data = new Object();
  const listCart = shoppingCart.listCart();
  let total = shoppingCart.totalCart().toLocaleString();
  $(".ipTotal").val(total);
  for (let i = 0; i < listCart.length; i++) {
    $(".ipProduct").val(i);
  }
  let arrChẹckBox = [];
  $.each($("input[name='cbConfirm']:checked"), function () {
    arrChẹckBox.push($(this).val());
    $(".valueCbOptions").val(arrChẹckBox.join(", "));
  });

  // let arrProduct = [];
  // $.each(shoppingCart.listCart(), function () {
  //   arrProduct.push($(this).val());
  //   $(".ipProduct").val(arrChẹckBox.join(", "));
  //   console.log(arrProduct);
  // });
  let currentdate = new Date();
  let datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes();
  let arrProductId = [];
  let arrProductName = [];
  let arrProductNumber = [];
  let arrProductPrice = [];
  let products = shoppingCart.listCart();
  products.forEach((element) => {
    arrProductId.push(element.id);
    arrProductName.push(element.name);
    arrProductNumber.push(element.count);
    arrProductPrice.push(element.price);
    $(".ipProductId").val(arrProductId.join(", "));
    $(".ipProductName").val(arrProductName.join(", "));
    $(".ipProductNumber").val(arrProductNumber.join(", "));
    $(".ipProductPrice").val(arrProductPrice.join(", "));
  });
  data.TimeOrder = datetime;
  data.ProductId = $(".ipProductId").val();
  data.ProductName = $(".ipProductName").val();
  data.ProductNumber = $(".ipProductNumber").val();
  data.ProductPrice = $(".ipProductPrice").val();
  data.Total = $(".ipTotal").val();
  data.FullName = $("#ipFullName").val();
  data.Phone = $("#ipPhone").val();
  data.Email = $("#ipEmail").val();
  data.PaymentChoosen = $("#ddl1").val();
  data.Address = $("#ipADD").val();
  data.Note = $("#ipNote").val();
  data.Options = $(".valueCbOptions").val();
  $.ajax({
    type: "POST",
    url: "http://localhost:5000/payment",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      console.log("added succesfully");
    },
    error: function (error) {
      console.log(error);
    },
  });
}
