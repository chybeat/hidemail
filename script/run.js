document.addEventListener('DOMContentLoaded', function () {
	const mail = new hideMail()
	// const info = {
	// 	user: "clear",
	// 	domain: "email.com",
	// 	anchor: document.querySelector("#textChanger"),
	// }
	// mail.add(info)
	//console.log(mail.enc("nospam@midomain.com")) /* */
	//const mail = new hideMail()

}, false);

document.addEventListener('DOMContentLoaded', function () {
	const anchor = document.getElementById('textChanger');
	const spantext = document.querySelector('#currentHref span');
	anchor.addEventListener('mouseover', function () {
		spantext.textContent = anchor.href
	})
	anchor.addEventListener('mouseout', function () {
		spantext.textContent = anchor.href
	})

}, false);

//Other HTML Examples:
// <a href="https://email.com" data-function="hideMail" data-hidemail-user="other" data-hidemail-domain="email.com">https://email.com</a>
// <a href="https://email.com" data-function="hideMail" data-hidemail-user="third" data-hidemail-domain="email.com">https://email.com</a>
