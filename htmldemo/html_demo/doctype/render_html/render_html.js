// Copyright (c) 2018, AgriTheory and contributors
// For license information, please see license.txt

frappe.ui.form.on('Render HTML', {
	onload: function(frm) {
		var wrapper = $(cur_frm.fields_dict['htmlpopulate'].wrapper);
		wrapper.html(frappe.render_template("my_template", {"button_descriptor": "Stupendous"}));
		document.getElementById("my_button").addEventListener("click", targetFunction, false);
	}
});

function targetFunction() {
	frappe.msgprint("And this button is most excellent", "No, You're Awesome")
}
