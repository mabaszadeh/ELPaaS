$(document).ready(function() {
	//assumes pretsa is initial algorithm
	$('#div_id_epsilon').css("display", "none");
	$('#div_id_k').css("display", "block");
	$('#div_id_t').css("display", "block");
	$('#div_id_n').css("display", "none");
	$('#div_id_p').css("display", "none");
	//$('[data-toggle="popover"]').popover();
	

})


$('#id_algorithm').change(function(){
	var valueSelected = this.value;
	
	
		if (valueSelected == 1){
			//$(this).attr("data-content","Assumes a .csv File as Input. Returns a .csv File. The File needs to contain the columns 'Case ID', 'Activity' and 'Duration'").data("bs.popover");
			//$(this).popover("show")
			$('#div_id_epsilon').css("display", "none");
			$('#div_id_k').css("display", "block");
			$('#div_id_t').css("display", "block");
			$('#div_id_n').css("display", "none");
			$('#div_id_p').css("display", "none");

		}
		else if (valueSelected ==2){
			//$(this).attr("data-content","Assumes a .xes File as Input. Returns a .dfg File.").data("bs.popover");
			//$().popover("show")
			$('#div_id_epsilon').css("display", "block");
			$('#div_id_k').css("display", "none");
			$('#div_id_t').css("display", "none");
			$('#div_id_n').css("display", "none");
			$('#div_id_p').css("display", "none");
		}
		else if (valueSelected ==3){
			//$(this).attr("data-content","Assumes a .xes File as Input. Returns a .xes File.").data("bs.popover");
			//$('[data-toggle="popover"]').popover("show")
			$('#div_id_epsilon').css("display", "block");
			$('#div_id_k').css("display", "none");
			$('#div_id_t').css("display", "none");
			$('#div_id_n').css("display", "block");
			$('#div_id_p').css("display", "block");
	}
})



$('#view_file_form').on('submit', function(event){
	event.preventDefault();
	formData = $('#view_file_form');
	
	$.ajax({
			url: "view/",
			type: "POST",
			data: formData.serialize(),
			
			success: function(json){
				//toggle off the modal and show the files
				$('#view_file').modal('hide');

				if(json.length==0){
					$("#information_area").html("Sorry! We could not find a document for this token.");
				}
				else{
					var token = json[0].token;
					$("#information_area").html("Token: "+token);
					var doc_table = $("#file_table_body");
					for(var i=0; i<json.length;i++){
						var document=json[i].docfile;
						var status=json[i].status;
						var algorithm=json[i].algorithm;
						var uploaded_on=json[i].uploaded_on;
						var expires_on=json[i].expires_on;
						file_data="	<tr> \
										<th>Document\
										<td><a href="+media_adress+"/"+document+">"+document+"</a></td>\
									<\tr>\
									<tr> \
										<th>Status\
										<td>"+status+"</td>\
									<\tr> \
									<tr> \
										<th>Algorithm\
										<td>"+algorithm+"</td>\
									<\tr> \
									<tr> \
										<th>Uploaded on\
										<td>"+uploaded_on+"</td>\
									<\tr> \
																	<tr> \
										<th>Expires on\
										<td>"+expires_on+"</td>\
									<\tr> "
			
									//			<thead>
								//<tr>
									//<th scope="col">Document</th>
									//<th scope="col">Status</th>
									//<th scope="col">Uploaded on</th>
								//</tr>
							//</thead>
						
						
						//<a href="{% static 'document.docfile.name' %}">{{ document.docfile.name }}</a>
						//new_row='<tr><td><a href="'+media_adress+"/"+document+'">'+document+'</a></td><td>'+status+'</td><td>DATETIME</td></tr>'
						doc_table.html(file_data)
					}
				}
			}
	})
})
