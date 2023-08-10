import Swal from 'sweetalert2';//* 雖是全域，有些用到也需事先引入，如Scss分頁的變數

export default function toast (response = 'success', title = 'update') {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  if (response === 'success') {
    Toast.fire({
      icon: 'success',
      title: `Success! ${title}`
    });
  } else if (response === 'info') {
    Toast.fire({
      icon: 'info',
      title: `${title}`
    });
  } else {
    Toast.fire({
      icon: 'error',
      title: `${title}`
    });
  }
}
