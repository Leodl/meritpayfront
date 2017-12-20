jQuery.fn.rowspan = function(colIdx) { //��װ��һ��JQueryС���
    return this.each(function(){
        var that;
        $('tr', this).each(function(row) {
            $('td:eq('+colIdx+')', this).filter(':visible').each(function(col) {
                if (that!=null && $(this).html() == $(that).html()) {
                    rowspan = $(that).attr("rowSpan");
                    if (rowspan == undefined) {
                        $(that).attr("rowSpan",1);
                        rowspan = $(that).attr("rowSpan"); }
                    rowspan = Number(rowspan)+1;
                    $(that).attr("rowSpan",rowspan);
                    $(this).hide();
                } else {
                    that = this;
                }
            });
        });
    });
}
$(function() {
    $("#table1").rowspan(0);//����Ĳ����Ƕ�Ӧ��������0��ʼ
    /*$("#table1").rowspan(1);
     $("#table1").rowspan(2);
     $("#table1").rowspan(3);*/

});

