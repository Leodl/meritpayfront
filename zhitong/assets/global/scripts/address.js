function showLocation(flag, province , city , town) {
	
	var loc	= new Location();
	var title	= ['省份' , '地级市' , '市、县、区'];
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	})
	if (flag){
        $('#provinceSelect').append(title[0]);
        $('#citySelect').append(title[1]);
        $('#areaSelect').append(title[2]);
	}

	$("#provinceSelect,#citySelect,#areaSelect").select2();
	$('#provinceSelect').change(function() {
		$('#citySelect').empty();
        if (flag){
            $('#citySelect').append(title[1]);
        }
		loc.fillOption('citySelect' , '0,'+$('#provinceSelect').val());
		$('#citySelect').change();
	})
	
	$('#citySelect').change(function() {
		$('#areaSelect').empty();
        if (flag){
            $('#areaSelect').append(title[2]);
        }
		loc.fillOption('areaSelect' , '0,' + $('#provinceSelect').val() + ',' + $('#citySelect').val());
	})
	
	$('#areaSelect').change(function() {
		$('input[@name=location_id]').val($(this).val());
	})
	if (province) {
		loc.fillOption('provinceSelect' , '0' , province);
		
		if (city) {
			loc.fillOption('citySelect' , '0,'+province , city);
			
			if (town) {
				loc.fillOption('areaSelect' , '0,'+province+','+city , town);
			}
		}
		
	} else {
		loc.fillOption('provinceSelect' , '0');
        loc.fillOption('citySelect' , '0,'+$('#provinceSelect').val());
        loc.fillOption('areaSelect' , '0,' + $('#provinceSelect').val() + ',' + $('#citySelect').val());
	}
		
}
