export default class Gallery {
	constructor({ trigger, container, imageMaxWidth, imageMaxHeight }) {
		this.images = document.querySelectorAll(trigger); // image list later
		this.container = document.querySelector(container);
		this.totalImages = this.images.length;
		this.maxWidth = imageMaxWidth;
		this.maxHeight = imageMaxHeight;
		this.imageIndex = null;
	}

	init() {
		this.images.forEach(image => {
			image.addEventListener("click", evt => this.#createGallery(evt));
		});
	}

	setImageDimensions() {
		const image = document.querySelector(".gallery-window__image");
		image.style.cssText = `
    max-width: ${this.maxWidth}px;
    max-height: ${this.maxHeight}px;
    `;
	}

	#createGallery(evt) {
		const currentClientWidth = document.body.clientWidth;
		const gallery = document.createElement("div");
		const galleryBody = document.createElement("div");
		const galleryImage = document.createElement("img");
		const galleryImageWrapper = document.createElement("div");
		const galleryImageCounter = document.createElement("div");
		const totalImages = document.createElement("p");
		const currentImage = document.createElement("p");
		const nextBtn = document.createElement("button");
		const prevBtn = document.createElement("button");
		const closeBtn = document.createElement("button");
		const allImages = [...this.images];

		this.imageIndex = allImages.indexOf(evt.target);
		galleryImage.setAttribute("src", this.images[this.imageIndex].src);
		gallery.classList.add("gallery-window", "fade-in");
		galleryBody.classList.add("gallery-window__body", "fade-in");
		galleryImage.classList.add("gallery-window__image");
		galleryImageWrapper.classList.add(".gallery-window__image-wrapper", "fade-in-fwd-element");
		galleryImageCounter.classList.add("gallery-window__counter");
		prevBtn.classList.add("gallery-window__btnPrev");
		nextBtn.classList.add("gallery-window__btnNext");
		closeBtn.classList.add("gallery-window__btnClose");
		totalImages.classList.add("gallery-window__totalImages");
		currentImage.classList.add("gallery-window__currentImage");

		galleryImageWrapper.append(galleryImage, prevBtn, nextBtn);
		galleryBody.append(galleryImageWrapper);
		galleryImageCounter.append(currentImage, totalImages);
		gallery.append(galleryBody, closeBtn, galleryImageCounter);

		this.container.append(gallery);
		this.#scrollBarFix(currentClientWidth);
		this.#switchImage();
		this.#removeGallery(gallery, galleryBody);
		this.setImageDimensions();
		this.#imageCounter();
	}

	#switchImage() {
		const btnNext = document.querySelector(".gallery-window__btnNext");
		const btnPrev = document.querySelector(".gallery-window__btnPrev");
		const image = document.querySelector(".gallery-window__image");
		btnNext.addEventListener("click", () => {
			image.removeAttribute("src");
			if (this.imageIndex === 0) {
				this.imageIndex = this.totalImages;
			}
			this.imageIndex -= 1; // --
			image.setAttribute("src", this.images[this.imageIndex].src);
			this.#imageCounter();
		});
		btnPrev.addEventListener("click", () => {
			image.removeAttribute("src");
			this.imageIndex += 1; // ++
			if (this.imageIndex === this.totalImages) {
				this.imageIndex = 0;
			}
			image.setAttribute("src", this.images[this.imageIndex].src);
			this.#imageCounter();
		});
	}

	#removeGallery(gallery) {
		const btnClose = document.querySelector(".gallery-window__btnClose");
		btnClose.addEventListener("click", () => {
			setTimeout(() => {
				gallery.classList.remove("fade-in");
				gallery.classList.add("fade-out");
				setTimeout(() => {
					gallery.remove();
					document.body.style.overflow = null;
					document.body.style.paddingRight = 0;
				}, 350);
			}, 300);
		});
	}

	#imageCounter() {
		const totalImages = document.querySelector(".gallery-window__totalImages");
		const currentImage = document.querySelector(".gallery-window__currentImage");
		totalImages.innerText = this.totalImages;
		currentImage.innerText = this.imageIndex + 1;
	}

	#scrollBarFix(currentClientWidth) {
		document.body.style.overflow = "hidden";
		const cWidth = document.body.clientWidth;
		document.body.style.paddingRight = `${cWidth - currentClientWidth}px`;
	}
}
