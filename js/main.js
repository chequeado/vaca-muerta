var Chequeado;

;(function(global, document, $, L, cartodb){

    "use strict";

    //Fix strange bug using jquery2 and bootstra3
    HTMLDivElement.prototype.remove = function(){};

    Chequeado = global.Chequeado = global.Chequeado || {};

    Chequeado.map;

    Chequeado.mainLayer;

    Chequeado.init = function(cartoUrl, mainLayer){

        cartodb.createVis('chequeado-map', cartoUrl)
          .done(function(vis, layers) {
            
            Chequeado.mainLayer = layers[1];

            Chequeado.showLayer(mainLayer);

            $('.year-selector').on('click',function(){
                Chequeado.showLayer(this.id);
            });

        });

    };

    Chequeado.showLayer = function(layerToShow) {

        $('.year-selector').removeClass('active disabled');

        $('.year-selector#'+layerToShow).addClass('active disabled');

        //turn off all layers

        var selected;

        switch (layerToShow) {
            case "inversiones_parciales":
                selected = Chequeado.mainLayer.getSubLayer(0);
                break;
            case "inversiones_totales":
                selected = Chequeado.mainLayer.getSubLayer(1);
                break;
        }

        selected.show();

        Chequeado.mainLayer.getSubLayers().forEach(function(i) {
            if(i!=selected){
                i.hide()
            }
        });

        return true;
    };


})(window, document,jQuery, L, cartodb);
