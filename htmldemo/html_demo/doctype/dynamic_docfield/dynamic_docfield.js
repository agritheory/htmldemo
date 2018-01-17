// Copyright (c) 2018, AgriTheory and contributors
// For license information, please see license.txt

frappe.ui.form.on('Dynamic Docfield', {
	onload_post_render: function(frm) {
		frappe.call({
			method: "get_uoms",
			doc: cur_frm.doc,
			callback: function (r) {
				//console.log(r.message[0]);
				make_fieldgroup(cur_frm.fields_dict['htmlpopulate'].wrapper, format_ddf_list(r));
			}
		})
	}
});

// Frappe Black Magic!
function make_fieldgroup(parent, ddf_list) {
 fg = new frappe.ui.FieldGroup({
  "fields": ddf_list,
  "parent": parent
 });
 fg.make();
}

// format list of docfields with descriptions and other parameters
function format_ddf_list(r){
	var divvy = Math.ceil($(r.message).length/3) // change 4 here for the number of columns rendered
	var ddf_proto = [];
	for (i in r.message) {
		if(i % divvy != 0 || i == 0){
			ddf_proto.push({fieldtype: "Check", label: r.message[i]["name"], fieldname: r.message[i]["name"]});
		} else {
			ddf_proto.push({fieldtype: "Column Break"});
			ddf_proto.push({fieldtype: "Check", label: r.message[i]["name"], fieldname: r.message[i]["name"]});
		}
	}
	return ddf_proto;
}

// Collect values from rendered docfields
frappe.ui.form.on('Dynamic Docfield', {
	validate: function (frm, cdt, cdn) {
			if(fg){
				ddf_list_values = fg.get_values();
				frappe.msgprint("Values Collected and Logged", "Check Your Console");
				console.log(ddf_list_values);
			}
	}
});
