// Kích hoạt ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Gọi các hiệu ứng có sẵn
document.addEventListener("DOMContentLoaded", () => {
  gsapFlipIn(".animate-flip");
  gsapFadeIn(".animate-fade");
  gsapFadeRight(".fade-right");
  gsapFadeLeft(".fade-left");
  gsapFadeUp(".fade-up");
  gsapFadeDown(".fade-down");
  gsapRotateBottomLeft(".rotate-bl");
  gsapRotateBottomRight(".rotate-br");
  gsapFlipVerticalLeft(".flip-vertical-left");
  gsapRollInLeft(".roll-in-left");
  gsap_rotate_bl__float(".rotate-bl--float");

  // Tạo timeline
  // const tl = gsap.timeline({
  //   repeatDelay: 0,  // delay giữa các lần lặp
  //   defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
  //   scrollTrigger: {
  //     trigger: ".box",
  //     start: "top 90%", // khi phần tử xuất hiện 80% trong viewport
  //   }
  // });

  // // Thêm các animation theo thứ tự
  // tl.from(".red", { x: -100, opacity: 0 })        // box đỏ bay xuống
  //   .from(".blue", { x: -100, opacity: 0 }, "-=0.3")       // box xanh bay từ trái
  //   .from(".green", { x: -100, opacity: 0 }, "-=0.3");    // box xanh lá phóng to dần

  const form = document.forms["rsvp-form"];
  if (form) {
    form.addEventListener("submit", (e) => handleFormSubmit(e));
  }
});

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("🚀 ~ handleFormSubmit ~ data:", data);

  const {
    name: name,
    confirm: confirm,
    guest_number: guest_number,
    child_number: child_number,
    dietary: dietary,
    wish: wish,
  } = data;
  console.log("🚀 ~ handleFormSubmit 2~ data:", data);

  // Thông báo khi bắt đầu gửi
  Swal.fire({
    title: 'Đang gửi ...',
    text: "Vui lòng chờ trong giây lát",
    icon: "info",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const url = "https://script.google.com/macros/s/AKfycbyuUOw_U3pIT1zaCiHeqMmErU8ETuy0A5iZF-Mu8PDIqJL892uI8SF2_4y-OALSnhO7/exec?sheet=sheet-1";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name,
        confirm,
        guest_number,
        child_number,
        dietary,
        wish
      }),
    });

    const result = await res.json().catch(() => ({}));
    console.log("Server response:", result);

    form.reset();

    // Thông báo thành công
    Swal.fire({
      title: "Thành công!",
      text: "Cảm ơn bạn đã gửi phản hồi, thông tin đã được gửi đến Hiếu và Ngân rồi nha",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#000",
    });
  } catch (error) {
    console.error("Error:", error);

    // Thông báo lỗi
    Swal.fire({
      title: "Lỗi!",
      text: "OPPS! Đã xảy ra lỗi: " + error.message,
      icon: "error",
      confirmButtonText: "Thử lại",
      confirmButtonColor: "#000",
    });
  }
}
