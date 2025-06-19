function bootstrap() {
  const IS_MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const TRIGGER_POINTS = {
    desktop: 1200,
    mobile: 1500,
  };

  // Only run on specific path
  if (
    window.location.pathname !==
    "/products/neuromd-back-pain-relief-device-50-off"
  ) {
    return;
  }

  const template = `
	<div class="sticky-cta-wrapper">
		<div class="sticky-cta">
			<div class="sticky-cta__content">
				<img class="sticky-cta__content__image" src="https://getneuromd.com/cdn/shop/files/NeuroMDCorrectiveTherapyDeviceMainCarouselImage2_3948eda7-e27d-444f-b084-f1f2e0004596.png?v=1720018320&width=300" />
				<div class="sticky-cta__content__text">
					<h3 class="sticky-cta__content__title">Therapy Device® for Back Pain</h3>
				</div>
			</div>

			<div class="sticky-cta__button-wrapper">
				<button class="sticky-cta__button" onclick="onStickyCTAButtonClick()">Add to Cart</button>
			</div>
		</div>
	</div>
`;

  const css = `
	.sticky-cta-wrapper {
		position: fixed;
		bottom: -100%;
		left: 0;
		width: 100%;
		transition: bottom 0.5s ease-in-out;
		padding-bottom: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

    @media (min-width: 768px) {
      .sticky-cta-wrapper {
        display: none;
      }
    }

	.sticky-cta {
		background: white;
		border-radius: 10px;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	}

	.sticky-cta__content {
		display: flex;
		flex-shrink: 1;
		min-width: 0;
	}

	.sticky-cta__content__image {
		width: 40px;
		height: 40px;
		border-radius: 4px;
		flex-shrink: 0;
	}

	.sticky-cta__button {
		background: #012f49;
		color: #fff;
		border: none;
		padding: 6px 8px;
		border-radius: 6px;
		font-weight: 600;
		font-size: 15px;
		width: 100%;
	}

	.sticky-cta__button-wrapper {
		flex-shrink: 0;
		width: 120px;
		margin-left: 12px;
	}

	.sticky-cta__content__text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 12px;
		flex-shrink: 1;
		min-width: 0;
	}

	.sticky-cta__content__title {
		font-size: 14px;
		font-weight: 600;
		margin: 0;
		white-space: normal;
		overflow: visible;
		line-height: 1.2;
	}

	.sticky-cta--visible {
		bottom: 0;
	}
`;

  window.addEventListener("scroll", () => {
    if (
      (IS_MOBILE && window.scrollY > TRIGGER_POINTS.mobile) ||
      (!IS_MOBILE && window.scrollY > TRIGGER_POINTS.desktop)
    ) {
      if (!document.querySelector(".sticky-cta-wrapper")) {
        document.body.insertAdjacentHTML("afterend", template);

        const styleElement = document.createElement("style");
        styleElement.id = "sticky-cta-css";
        styleElement.textContent = css;
        document.head.appendChild(styleElement);

        // Add visible class after a small delay to trigger animation
        setTimeout(() => {
          document
            .querySelector(".sticky-cta-wrapper")
            .classList.add("sticky-cta--visible");
        }, 50);
      }
    } else {
      const stickyElement = document.querySelector(".sticky-cta-wrapper");
      const styleElement = document.getElementById("sticky-cta-css");

      if (stickyElement) {
        stickyElement.classList.remove("sticky-cta--visible");
        // Remove element after animation completes
        stickyElement.addEventListener(
          "transitionend",
          () => {
            stickyElement.remove();
            if (styleElement) styleElement.remove();
          },
          { once: true }
        );
      }
    }
  });
}

function onStickyCTAButtonClick() {
  document.querySelector('button[name="add"]').click();
}

window.addEventListener("DOMContentLoaded", bootstrap);
