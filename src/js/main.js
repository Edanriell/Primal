import "../sass/main.sass";
import AnimationOnScroll from "./modules/animationOnScroll";
import Modal from "./modules/modal";
import Scroll from "./modules/scroll";
import Gallery from "./modules/gallery";

window.addEventListener("load", () => {
	const animationOnScroll = new AnimationOnScroll({
		lineSelector: "#path",
		scrollTopStart: 700,
		scrollTopEnd: 2053,
		animationDirection: "forwards"
	});

	const animationOnScroll2 = new AnimationOnScroll({
		lineSelector: "#path-2",
		scrollTopStart: 4500,
		scrollTopEnd: 5400,
		animationDirection: "backwards"
	});

	const modal = new Modal({
		triggerBtns: ".button",
		modalParent: "body"
	});

	const scroll = new Scroll({
		scrollBtnParent: "main"
	});

	const gallery = new Gallery({
		trigger: ".gallery__image-list li img",
		container: "body",
		imageMaxHeight: 800,
		imageMaxWidth: 1920
	});

	animationOnScroll.init();
	animationOnScroll2.init();
	modal.init();
	scroll.init();
	gallery.init();
});
