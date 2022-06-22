import Spinner from "../../images/spinner.svg";
import Forms from "./forms";

export default class Modal {
	constructor({ triggerBtns, modalParent }) {
		this.trigger = document.querySelectorAll(triggerBtns);
		this.parent = document.querySelector(modalParent);
	}

	init() {
		this.trigger.forEach(btn => {
			btn.addEventListener("click", evt => this.#showModal(evt));
		});
	}

	#createModal(currentClientWidth) {
		const modal = document.createElement("div");
		const cWidth = document.body.clientWidth;
		const modalBody = document.createElement("div");
		document.body.style.paddingRight = `${cWidth - currentClientWidth}px`;
		modal.classList.add("modal", "fade-in");
		modalBody.classList.add("modal__body", "modal-fade-in");
		modalBody.innerHTML = `
      <form id="form" class="modal-form" action="#" method="post">
        <div class="modal-form__username">
          <label class="visually-hidden" for="name">Ваше имя</label>
          <input class="modal-form__username-input" 
            id="name" name="name" type="text" placeholder="Имя" required
          >
        </div>
        <div class="modal-form__usersurname">
          <label class="visually-hidden" for="surname">Ваша фамилия</label>
          <input class="modal-form__usersurname-input" 
            id="surname" name="surname" type="text" placeholder="Фамилия" required
          >
        </div>
        <div class="modal-form__user-address">
          <label class="visually-hidden" for="address">Ваш адрес</label>
          <input class="modal-form__user-address-input"
            id="address" name="address" type="text" 
            placeholder="Фактический адрес проживания" required
          >
        </div>
        <div class="modal-form__user-phone">
          <label class="visually-hidden" for="phone">Ваш номер телефона</label>
          <input class="modal-form__user-phone-input"
            id="phone" name="phone" type="tel" placeholder="Номер телефона" required
          >
        </div>
        <div class="modal-form__user-email">
          <label class="visually-hidden" for="email">Ваш почтовый ящик</label>
          <input class="modal-form__user-email-input"
            id="email" name="email" type="email" placeholder="Электронная почта" required
          >
        </div>
        <div class="modal-btn-wrapper">
          <button class="modal-btn modal-btn_green" type="submit">Отправить</button>
        </div>
      </form> 
      <div class="modal-main-text">
        <p>С Вами свяжутся в течение 2 рабочих дней.</p>
      </div>
      <div>
        <button class="modal-btn modal-btn_red" type="button">Закрыть окно</button>
      </div>
      `;
		modal.append(modalBody);
		this.parent.append(modal);
		const form = new Forms({
			triggerForm: "#form",
			databaseName: "requests",
			spinnerSrc: Spinner
		});
		form.init();
	}

	#showModal() {
		const currentClientWidth = document.body.clientWidth;
		document.body.style.overflow = "hidden";
		this.#createModal(currentClientWidth);
		this.#removeModal();
	}

	#removeModal() {
		const modal = document.querySelector(".modal");
		const closeBtn = document.querySelector(".modal-btn_red");
		const modalBody = document.querySelector(".modal__body");
		modal.addEventListener("click", evt => {
			if (evt.target === modal || evt.target === closeBtn) {
				modalBody.classList.add("modal-fade-out");
				setTimeout(() => {
					modal.classList.add("fade-out");
					modal.classList.remove("fade-in");
					setTimeout(() => {
						modal.remove();
						document.body.style.overflow = null;
						document.body.style.position = null;
						document.body.style.paddingRight = 0;
					}, 200);
				}, 250);
			}
		});
	}
}
