// Set the options that I want
toastr.options = {
  closeButton: true,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

// $(document).ready(function onDocumentReady() {
//   setTimeout(function doThisEveryTwoSeconds() {
//     toastr.success("Add cart success !");
//   }, 1000); // 2000 is 2 seconds
// });

const toastSuccess = (message) => {
  toastr.success(message);
};

const toastError = (message) => {
  toastr.error(message);
};
