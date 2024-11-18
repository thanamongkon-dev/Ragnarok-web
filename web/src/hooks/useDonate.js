import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useDonate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
        navigate('/home'); // Redirect to login page if no user data
    }
  }, []);

  const autoCheckPay = (ref,amount,account_id) => {
    console.log(user.userid)
    const n = `tRef=${ref}&tAmout=${amount}&tAccountId=${account_id}&tUserId=${user.userid}`;
    setTimeout(() => {
      axios.post('https://console-log.online/api/packageCheck.php', n)
        .then(response => {
          const e = response.data;
          if (e !== "ok" && e !== "true") {
            setTimeout(() => {
              autoCheckPay(ref,amount,account_id);
            }, 3000);
          } else {
            Swal.fire({
              icon: "success",
              title: "สำเร็จ",
              text: "คุณทำการโอนเงินสำเร็จ!"
            }).then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "เกิดข้อผิดพลาดในการตรวจสอบการชำระเงิน"
          });
        });
    }, 0);
  };

  const autoPackageCheck = (ref,amount,account_id) => {
    console.log(user.userid)
    const n = `tRef=${ref}&tAmout=${amount}&tAccountId=${account_id}&tUserId=${user.userid}`;
    setTimeout(() => {
      axios.post('https://console-log.online/api/check_scb.php', n)
        .then(response => {
          const e = response.data;
          if (e !== "ok" && e !== "true") {
            setTimeout(() => {
              autoCheckPay(ref,amount,account_id);
            }, 3000);
          } else {
            Swal.fire({
              icon: "success",
              title: "สำเร็จ",
              text: "คุณทำการโอนเงินสำเร็จ!"
            }).then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "เกิดข้อผิดพลาดในการตรวจสอบการชำระเงิน"
          });
        });
    }, 0);
  };
  
  const donate = async (userId,amount,account_id) => {
    setLoading(true);
    setError('');
    const t = `tRef=${userId}&tAmout=${amount}&tAccountId=${account_id}`;

    console.log(t)

    Swal.fire({
      title: 'โปรดรอสักครู่...',
      showCancelButton: false,
      showLoaderOnConfirm: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    Swal.showLoading();

    try {
      const response = await axios.post('https://console-log.online/api/scb_form.php', t);
      const newRef = response.data;
      // console.log(newRef)
      if (newRef !== "error") {
        const imageUrl = `https://ro.debug-pay.com/api/payment/ab7cbe9cac278193fdeb66f0046a00ea/${newRef}/${amount}`;
        const a = new Image(300, 300);
        a.onload = () => {
          Swal.hideLoading();
          Swal.fire({
            title: `ราคา ${amount}`,
            text: "หลังจากยืนยันการโอนเงินแล้วกรุณารอสักครู่หน้านี้จะปิดลงเอง **1 QR Code ใช้ได้แค่ 1 ครั้งห้ามใช้ซ้ำ **",
            imageUrl: imageUrl,
            cancelButtonColor: '#d33',
            cancelButtonText: 'ยกเลิก',
            showCancelButton: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            willOpen: () => autoPackageCheck(newRef,amount,account_id),
            willClose: () => window.location.reload()
          })
        };

        a.src = imageUrl;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'คุณทำรายการเกินจำนวนที่กำหนด โปรดรอประมาณ 10 นาที'
        })
      }
    } catch (error) {
      setError("An error occurred while processing the payment.");
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "มีข้อผิดพลาดเกิดขึ้นระหว่างการชำระเงิน",
      });
    } finally {
      setLoading(false);
    }
  }

  const Package = async ( totalPrice, price, quantity, itemId ) => {
    setLoading(true);
    setError('');

    Swal.fire({
      title: 'โปรดรอสักครู่...',
      showCancelButton: false,
      showLoaderOnConfirm: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    Swal.showLoading();

    try {
      if(!user) {
        Swal.fire({
          icon: 'error',
          title: 'ข้อผิดพลาด',
          text: 'กรุณาเข้าสู่ระบบก่อน',
        }).then(() => {
          navigate('/donate');
        })
      } else {
        const PaymentData = {
          tRef: user.userid,
          tAmount: totalPrice,
          tAccountId: user.account_id,
          pro: price,
          quantity: quantity,
          user_id: user.userid,
          itemId: itemId
        }

        // console.log("PaymentData", PaymentData)

        const response = await axios.post('https://console-log.online/api/getRefPromotion.php', PaymentData);
        const data = response.data
        const newRef = data.ref

        if( newRef !== "error") {
          const imageUrl = `https://ro.debug-pay.com/api/payment/ab7cbe9cac278193fdeb66f0046a00ea/${newRef}/${totalPrice}`;
          const a = new Image(300, 300);
          a.onload = () => {
            Swal.hideLoading();
            Swal.fire({
              title: `ราคา ${totalPrice}`,
              text: "หลังจากยืนยันการโอนเงินแล้วกรุณารอสักครู่หน้านี้จะปิดลงเอง **1 QR Code ใช้ได้แค่ 1 ครั้งห้ามใช้ซ้ำ **",
              imageUrl: imageUrl,
              cancelButtonColor: '#d33',
              cancelButtonText: 'ยกเลิก',
              showCancelButton: true,
              showConfirmButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
              willOpen: () => autoCheckPay(newRef,PaymentData.tAmout,PaymentData.tAccountId),
              willClose: () => window.location.reload()
            })
          };

          a.src = imageUrl;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'คุณทำรายการเกินจำนวนที่กำหนด โปรดรอประมาณ 10 นาที'
          })
        }
      }
    } catch (error) {
      setError("An error occurred while processing the payment.");
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "มีข้อผิดพลาดเกิดขึ้นระหว่างการชำระเงิน",
      });
    } finally {
      setLoading(false);
    }
  }
  return { donate, Package, loading, error };
}

export default useDonate