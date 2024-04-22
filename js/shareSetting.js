// toastr基礎設定 https://github.com/CodeSeven/toastr
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    }

        // 將數據存儲到 sessionStorage 中
sessionStorage.setItem('username', 'John');

// 從 sessionStorage 中獲取數據
const username = sessionStorage.getItem('username');
console.log(username); // 輸出：John

// 刪除 sessionStorage 中的數據
sessionStorage.removeItem('username');

// 清空 sessionStorage 中的所有數據
sessionStorage.clear();