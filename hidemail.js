class hideMail {
	character_set = ['&#64', '%40', '@'];
	anchor = '';
	user = "https://github.com/chybeat/hidemail";
	domain = "creative commons license CC BY-ND";
	originalHref = "";
	address = "https://creativecommons.org/licenses/by-nd/4.0/";

	constructor(element) {
		this.changeHref = this.setHref.bind(this);
		this.setDefaultHref = this.setDefaultHref.bind(this);
		if (typeof element == 'object' && element.tagName == "A" && !element.dataset.hasOwnProperty('hidemailLoaded')) {
			//Verify the parameter element is node (<a>)
			element.dataset.hidemailLoaded = true
			this.anchor = element
			this.setData()
		} else if (typeof element == 'object' && element.hasOwnProperty('anchor')) {
			//Verify the parameter element is the requiered object to start
			if (element.anchor != null
				&& element.hasOwnProperty('user') && element.user != null
				&& element.hasOwnProperty('domain') && element.domain != null
			) {
				this.add(element)
			} else {
				//console.log(element.anchor.toString())
				element.anchor = (element.anchor.outerHTML.toString())
				let text = "HideEmail configuration object error: ";
				text += JSON.stringify(element).replace(/\\/g, '')
				let errorMsg = [];
				if (!element.hasOwnProperty('user') || element.user == '') {
					errorMsg.push("Property 'user' was not defined properly");
				}
				if (!element.hasOwnProperty('domain') || element.domain == '') {
					errorMsg.push("Property 'domain' was not defined properly");
				}
				this.die(text, errorMsg);
			}
		} else {
			// try to search for anchors with data-function="hideMail" elements
			for (let anchor of document.querySelectorAll('a[data-function="hideMail"]')) {
				if (anchor.dataset.hidemailLoaded != 'true') {
					new hideMail(anchor);
				}
			}
			return
		}
	}

	add(element) {
		element.anchor.dataset.function = 'hideMail'
		element.anchor.dataset.hidemailUser = element.user
		element.anchor.dataset.hidemailDomain = element.domain
		element.anchor.dataset.hidemailLoaded = true
		this.anchor = element.anchor
		this.setData()
	}

	die(text, msgArray) {
		//Function to show an error in console and end execution of JS script
		let errorCounter = 0;
		text = "\n" + text + "\n";
		msgArray.forEach((msg) => {
			errorCounter++;
			text += errorCounter + ". " + msg + "\n";
		});
		throw new Error(text);
	}

	enc(string) {
		if (typeof string == 'undefined' || string.length < 1) {
		} else if (string.length == 1) {
			return '%' + string.charCodeAt(0).toString(16)
		} else {
			let output = ''
			for (let i = 0; i < string.length; i++) {
				const char = string[i];
				output += '%' + char.charCodeAt(0).toString(16)
			}
			return output
		}
	}
	license() {
		const cclicense = "CC BY-NC-ND"
		const ccaddress = 'https://creativecommons.org/licenses/by-nd/4.0/'
		const creator = "https://github.com/chybeat/hidemail"
		window.location = ccaddress
	}

	setData() {
		this.searchError(this.anchor)
		this.user = this.anchor.dataset.hidemailUser
		this.domain = this.anchor.dataset.hidemailDomain
		this.originalHref = this.anchor.href
		this.address = 'mailto:' + this.enc(this.user + this.character_set[2] + this.domain)
		this.anchor.innerHTML = this.user + "<span class=\"message-dummy\">" + this.character_set[0] + "</span>" + this.domain;
		this.anchor.addEventListener("mouseover", this.changeHref, false);
		this.anchor.addEventListener("mouseout", this.setDefaultHref, false);
	}

	setHref() {
		this.anchor.href = this.address
	}

	setDefaultHref() {
		this.anchor.href = this.originalHref
	}

	searchError(el) {
		//addSidebar({sidebar}) Object Error
		const errorText = "Configuration error when hidding email: " + el.outerHTML + "";
		let errorMsg = [];

		/*
		verifying errors
		*/

		if (!el.dataset.hasOwnProperty('hidemailUser') || el.dataset.hidemailUser == '') {
			errorMsg.push("Anchor data-hidemail-user attribute is not defined");
		}
		if (!el.dataset.hasOwnProperty('hidemailDomain') || el.dataset.hidemailDomain == '') {
			errorMsg.push("Anchor data-hidemail-domain attribute is not defined");
		}

		if (errorMsg.length > 0) {
			el.textContent = "<hideMail error. Watch more in console>" + el.textContent
			el.scrollIntoView({ behavior: 'smooth' })
			var t = setInterval(function () {
				el.style.visibility = (el.style.visibility == 'hidden' ? '' : 'hidden');
			}, 500);
			//throw error (finalize executuion) if any error was found
			this.die(errorText, errorMsg);
		} else {
			/*
			Fixing possible errors
			*/
			if (el.textContent == "") {
				el.textContent = window.location.origin
			}
			if (el.hasOwnProperty('href') || el.href == "") {
				el.href = window.location.origin
			}
		}
	}
}