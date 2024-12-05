import { toast } from "react-toastify";

const showToast = () => {
    toast.success('Успешно выполнено!', {
      position: toast.POSITION.TOP_RIGHT, // Позиция уведомления
      autoClose: 5000, // Через сколько миллисекунд уведомление исчезнет (0 — не исчезает)
      hideProgressBar: false, // Показывать ли прогресс-бар
      closeOnClick: true, // Закрывать ли уведомление при клике
      pauseOnHover: true, // Остановить таймер при наведении
      draggable: true, // Возможность перетаскивания уведомления
      progress: undefined, // Прогресс-бар (опционально)
    });
  };

  export default showToast;