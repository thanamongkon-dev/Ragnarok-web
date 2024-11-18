import Swal from 'sweetalert2';

export const showSuccessAlert = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    showConfirmButton: true,
  });
};

export const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    showConfirmButton: true,
  });
};
