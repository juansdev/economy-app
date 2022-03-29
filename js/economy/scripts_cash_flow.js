$(function(){
    //Seleccionamos todos los botones que generan un flujo de efectivo.
    $(".generate-cash-flow-form").click(function(){
        //form: Consta de los inputs junto a sus botones de añadir input: Nombre del mes, Ingresos, Detalle de egresos, Gastos administrativos, Costos de produccion

        const cash_flow_form = "<div class=\"container col-md-6 my-5\"><div class=\"mb-3\"> <div id=\"inputNameOfTheMonth\"><label class=\"form-label\">Nombre/Numero del periodo de tiempo (Opcional)</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /> </div> <div class=\"mb-3\"> <div id=\"inputIncome\"><label class=\"form-label\">(+) Ingresos</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /> </div> <div class=\"mb-3\"><label class=\"form-label\">Total ingresos</label><input type=\"number\" readonly class=\"form-control\" id=\"inputTotalIncome\"></div> <hr> <div class=\"mb-3\"> <div id=\"inputDetailOfExpenses\"><label class=\"form-label\">(-) Detalle de egresos</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /> </div> <div class=\"mb-3\"> <div id=\"inputAdministrativeExpenses\"><label class=\"form-label\">(+) Gastos administrativos</label></div> <input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /> </div> <div class=\"mb-3\"> <div id=\"inputProductionCosts\"><label class=\"form-label\">(+) Costos de produccion</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /> </div> <div class=\"mb-3\"><label class=\"form-label\">Total egresos</label><input type=\"number\" readonly class=\"form-control\" id=\"inputTotalExpenses\"></div> <hr> <div class=\"mb-3\"><label class=\"form-label\">Saldo neto</label><input type=\"number\" readonly class=\"form-control\" id=\"inputNetBalance\"></div> <hr> <div class=\"mb-3\"><label class=\"form-label\">Saldo acumulado</label><input type=\"number\" readonly class=\"form-control\" id=\"inputTotalBalance\"></div> <hr> </div>";

        //Variable para almacenar la cantidad de meses a efectuar en el flujo de efectivo.
        let numberOfMonths;
        //Variable necesaria para el nombramiento de los navs.
        let nameOfTheMonth;
        //Variable cuyo valor sera dinamico al nav del mes/año/trimestre escogido. (Empieza desde el 0 ya que sera utilizado para agregar valor a los arrays utilizandolo como indice).
        let selectMonth;//El nombre de la variable es subjetivo.
        //Periodo de tiempo escogido.
        let selectTimePeriod = "Mes";
        //Periodo de tiempo anterior
        let beforeTimePeriod;

        //Variables necesarias para realizar operaciones
        let income,detailOfExpenses,administrativeExpenses,productionCosts;
        let arrIncomes, arrDetailOfExpenses, arrAdministrativeExpenses, arrProductionCosts;

        //Array con objetos de evento de escucha a cambios de valores
        let inputTotalIncome,inputTotalExpenses,inputNetBalance,inputTotalBalance;

        //REINICIAR VALORES DE VARIABLES A ORIGINALES
        function ResetVariables(){

            //NO se reinicia la variable "numberOfMonths" debido a que esta se cambia al dar clic al boton de generar formulario, y por logistica es mejor no reiniciarlo.
            //NO se reinicia la variable "selectTimePeriods" debido a que esta se cambia al dar enter en el input en cuestion del formulario, y por logistica es mejor no reiniciarlo.
            //NO se reinicia la variable "selectMonth" debido a que esta se cambia al dar clic a los botones del nav de meses y por logistica es mejor no reiniciarlo.
            nameOfTheMonth=[];
            income=[];
            detailOfExpenses=[];
            administrativeExpenses=[];
            productionCosts=[];

            arrIncomes = [];
            arrDetailOfExpenses = [];
            arrAdministrativeExpenses = [];
            arrProductionCosts = [];
            
            inputTotalIncome=[];
            inputTotalExpenses=[];
            inputNetBalance=[];
            inputTotalBalance=[];

            //Todos los arrays tendran la longitud correspondiente al "numberOfMonths" con un valor diferente a undefined.
            for (let index = 0; index < numberOfMonths; index++) {
                nameOfTheMonth.push("");
                income.push(0);    
                detailOfExpenses.push(0);    
                administrativeExpenses.push(0);    
                productionCosts.push(0);

                arrIncomes.push([]);    
                arrDetailOfExpenses.push([]);    
                arrAdministrativeExpenses.push([]);    
                arrProductionCosts.push([]);

                //Objetos con evento de escucha a cambios de valores, para los array "Total"
                let objectInputTotalIncome = {
                    totalIncomeInternal: 0,
                    totalIncomeListener: function(val) {},
                    set totalIncome(val) {
                    this.totalIncomeInternal = val;
                    this.totalIncomeListener(val);
                    },
                    get totalIncome() {
                    return this.totalIncomeInternal;
                    },
                    registerListener: function(listener) {
                    this.totalIncomeListener = listener;
                    }
                }

                let objectInputTotalExpenses  = {
                    totalExpensesInternal: 0,
                    totalExpensesListener: function(val) {},
                    set totalExpenses(val) {
                    this.totalExpensesInternal = val;
                    this.totalExpensesListener(val);
                    },
                    get totalExpenses() {
                    return this.totalExpensesInternal;
                    },
                    registerListener: function(listener) {
                    this.totalExpensesListener = listener;
                    }
                }

                let objectInputNetBalance  = {
                    netBalanceInternal: 0,
                    netBalanceListener: function(val) {},
                    set netBalance(val) {
                    this.netBalanceInternal = val;
                    this.netBalanceListener(val);
                    },
                    get netBalance() {
                    return this.netBalanceInternal;
                    },
                    registerListener: function(listener) {
                    this.netBalanceListener = listener;
                    }
                }

                let objectInputTotalBalance  = {
                    totalBalanceInternal: 0,
                    totalBalanceListener: function(val) {},
                    set totalBalance(val) {
                    this.totalBalanceInternal = val;
                    this.totalBalanceListener(val);
                    },
                    get totalBalance() {
                    return this.totalBalanceInternal;
                    },
                    registerListener: function(listener) {
                    this.totalBalanceListener = listener;
                    }
                }

                inputTotalIncome.push(objectInputTotalIncome);
                inputTotalExpenses.push(objectInputTotalExpenses);
                inputNetBalance.push(objectInputNetBalance);
                inputTotalBalance.push(objectInputTotalBalance);
            }

        }

        //AÑADIR ENTRADAS DE TEXTO.
        function AddInput(){
            //Cambiar id por el agrupamiento de Inputs correspondiente al boton de agregar inputs.
            const idParent = $(this).parent().children().first().attr("id");

            let fieldWrapper = $("<div class=\"input-group mb-3\" />");
            
            //Cambiar el nombre de la clase por el conjunto de inputs correspondiente...
            if(idParent==="inputNameOfTheMonth"+selectMonth){
                var fName = $("<input type=\"text\" class=\"form-control "+idParent+"\" />");
                //Al agregar un solo input dentro de este DIV con dicha ID...
                //Eliminar el boton para que no añada mas inputs en ese DIV.
                $("#inputNameOfTheMonth"+selectMonth).parent().children().last().remove();
            } else if(idParent.indexOf("Date") !== -1){
                var fName = $("<input type=\"date\" class=\"form-control "+idParent+"\" />");    
            } else {
                var fName = $("<input type=\"number\" class=\"form-control "+idParent+"\" />");
            }
            const removeButton = $("<button class=\"input-group-text bg-danger\"><i class=\"bi bi-trash\"></i></button>");
            removeButton.click(function() {
                $(this).parent().remove();
                UpdateValuesAfterOfDeleted();
            });
            fieldWrapper.append(fName);
            fieldWrapper.append(removeButton);
            $("#"+idParent).append(fieldWrapper);

            AddValues();
        }

        //AGREGAR VALORES A VARIABLES Y REALIZAR OPERACIONES EN LAS ENTRADAS DE TEXTO.
        function AddValues(){
            //Nombre de las clases de los inputs - EDITABLES.
            //inputNameOfTheMonth, inputIncome,inputDetailOfExpenses,inputAdministrativeExpenses,inputProductionCosts
            //Nombre de las ID de los inputs - READONLY.
            //inputTotalIncome,inputTotalExpenses,inputNetBalance,inputTotalBalance

            //REESCRIBIR VALOR - NOMBRE DEL MES
            $(".inputNameOfTheMonth"+selectMonth).on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    nameOfTheMonth[selectMonth] = $(this).val();
                    //Deshabilitar input
                    $(this).prop("readonly",true);
                }
            });

            //ACTUALIZA RESULTADOS - OPERACIONES
            //Mas: Detalle de ingreso - INPUT EDITABLE
            $(".inputIncome"+selectMonth).on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    //Valor de venta
                    income[selectMonth] = $(this).val()!==""?parseInt($(this).val()):0;
                    //Juntar todas las ventas en un array
                    arrIncomes[selectMonth].push(income[selectMonth]);
                    //Sumar la totalidad de todas las ventas
                    income[selectMonth] = 0;
                    for (let index = 0; index < arrIncomes[selectMonth].length; index++) {
                        income[selectMonth]+=arrIncomes[selectMonth][index];
                    }
                    //Calcular el total de los ingresos
                    inputTotalIncome[selectMonth].totalIncome=income[selectMonth];
                    
                    //Calcular la totalidad de saldo neto
                    inputNetBalance[selectMonth].netBalance = inputTotalIncome[selectMonth].totalIncome-inputTotalExpenses[selectMonth].totalExpenses;
                    //Calcular la totalidad de saldo acumulado
                    if(selectMonth == 0){
                        inputTotalBalance[selectMonth].totalBalance = inputNetBalance[selectMonth].netBalance;
                    } else{
                        inputTotalBalance[selectMonth].totalBalance = inputTotalBalance[selectMonth-1].totalBalance+inputNetBalance[selectMonth].netBalance;
                    }
                    
                    //Deshabilitar input
                    $(this).prop("readonly",true);
                }
            });

            //Total ingresos - INPUT READONLY
            inputTotalIncome[selectMonth].registerListener(
                function(val){
                    $("#inputTotalIncome"+selectMonth).val(inputTotalIncome[selectMonth].totalIncome);
                }
            );

            //Menos: Detalle de egresos - INPUT EDITABLE
            $(".inputDetailOfExpenses"+selectMonth).on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    //Valor de detalle de egresos
                    detailOfExpenses[selectMonth] = $(this).val()!==""?parseInt($(this).val()):0;
                    //Juntar todos los detalle de egresos en un array
                    arrDetailOfExpenses[selectMonth].push(detailOfExpenses[selectMonth])
                    //Sumar la totalidad de detalle de egresos
                    detailOfExpenses[selectMonth] = 0;
                    for (let index = 0; index < arrDetailOfExpenses[selectMonth].length; index++) {
                        detailOfExpenses[selectMonth]+=arrDetailOfExpenses[selectMonth][index]
                    }
                    //Calcular la totalidad de total egresos
                    inputTotalExpenses[selectMonth].totalExpenses-=detailOfExpenses[selectMonth];

                    //Calcular la totalidad de saldo neto
                    inputNetBalance[selectMonth].netBalance = inputTotalIncome[selectMonth].totalIncome-inputTotalExpenses[selectMonth].totalExpenses;
                    //Calcular la totalidad de saldo acumulado
                    if(selectMonth == 0){
                        inputTotalBalance[selectMonth].totalBalance = inputNetBalance[selectMonth].netBalance;
                    } else{
                        inputTotalBalance[selectMonth].totalBalance = inputTotalBalance[selectMonth-1].totalBalance+inputNetBalance[selectMonth].netBalance;
                    }
                    
                    //Deshabilitar input tras agregado
                    $(this).prop("readonly",true);
                }
            });

            //Mas: Gastos administrativos - INPUT EDITABLE
            $(".inputAdministrativeExpenses"+selectMonth).on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    //Valor de gastos administrativos
                    administrativeExpenses[selectMonth] = $(this).val()!==""?parseInt($(this).val()):0;
                    //Juntar todos los gastos administrativos en un array
                    arrAdministrativeExpenses[selectMonth].push(administrativeExpenses[selectMonth])
                    //Sumar la totalidad de gastos administrativos
                    administrativeExpenses[selectMonth] = 0
                    for (let index = 0; index < arrAdministrativeExpenses[selectMonth].length; index++) {
                        administrativeExpenses[selectMonth]+=arrAdministrativeExpenses[selectMonth][index]
                    }
                    //Calcular la totalidad de total egresos
                    inputTotalExpenses[selectMonth].totalExpenses+=administrativeExpenses[selectMonth];

                    //Calcular la totalidad de saldo neto
                    inputNetBalance[selectMonth].netBalance = inputTotalIncome[selectMonth].totalIncome-inputTotalExpenses[selectMonth].totalExpenses;
                    //Calcular la totalidad de saldo acumulado
                    if(selectMonth == 0){
                        inputTotalBalance[selectMonth].totalBalance = inputNetBalance[selectMonth].netBalance;
                    } else{
                        inputTotalBalance[selectMonth].totalBalance = inputTotalBalance[selectMonth-1].totalBalance+inputNetBalance[selectMonth].netBalance;
                    }
                    
                    //Deshabilitar input tras agregado
                    $(this).prop("readonly",true);
                }
            });

            //Mas: Costos de produccion - INPUT EDITABLE
            $(".inputProductionCosts"+selectMonth).on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    //Valor de costos de produccion
                    productionCosts[selectMonth] = $(this).val()!==""?parseInt($(this).val()):0;
                    //Juntar todos los costos de produccion en un array
                    arrProductionCosts[selectMonth].push(productionCosts[selectMonth])
                    //Sumar la totalidad de costos de produccion
                    productionCosts[selectMonth] = 0
                    for (let index = 0; index < arrProductionCosts[selectMonth].length; index++) {
                        productionCosts[selectMonth]+=arrProductionCosts[selectMonth][index]
                    }
                    //Calcular la totalidad de total egresos
                    inputTotalExpenses[selectMonth].totalExpenses+=productionCosts[selectMonth];

                    //Calcular la totalidad de saldo neto
                    inputNetBalance[selectMonth].netBalance = inputTotalIncome[selectMonth].totalIncome-inputTotalExpenses[selectMonth].totalExpenses;
                    //Calcular la totalidad de saldo acumulado
                    if(selectMonth == 0){
                        inputTotalBalance[selectMonth].totalBalance = inputNetBalance[selectMonth].netBalance;
                    } else{
                        inputTotalBalance[selectMonth].totalBalance = inputTotalBalance[selectMonth-1].totalBalance+inputNetBalance[selectMonth].netBalance;
                    }
                    
                    //Deshabilitar input tras agregado
                    $(this).prop("readonly",true);
                }
            });

            //Total egresos - INPUT READONLY
            inputTotalExpenses[selectMonth].registerListener(
                function(val){
                    $("#inputTotalExpenses"+selectMonth).val(inputTotalExpenses[selectMonth].totalExpenses);
                }
            );

            //Total saldo neto - INPUT READONLY
            inputNetBalance[selectMonth].registerListener(
                function(val){
                    $("#inputNetBalance"+selectMonth).val(inputNetBalance[selectMonth].netBalance);
                }
            );

            //Total saldo acumulado - INPUT READONLY
            inputTotalBalance[selectMonth].registerListener(
                function(val){
                    $("#inputTotalBalance"+selectMonth).val(inputTotalBalance[selectMonth].totalBalance);
                }
            );
        }

        function UpdateValues(){
            //Nombre de las clases de los inputs - EDITABLES.
            //inputNameOfTheMonth, inputIncome,inputDetailOfExpenses,inputAdministrativeExpenses,inputProductionCosts
            //Nombre de las ID de los inputs - READONLY.
            //inputTotalIncome,inputTotalExpenses,inputNetBalance,inputTotalBalance

            if($(".inputNameOfTheMonth"+selectMonth).length){
                $(".inputNameOfTheMonth"+selectMonth).val(nameOfTheMonth[selectMonth]);
            }
            if($(".inputIncome"+selectMonth).length){
                for (let index = 0; index < arrIncomes[selectMonth].length; index++) {
                    const value = arrIncomes[selectMonth][index];
                    $(".inputIncome"+selectMonth).val(value);
                }
            }

            $("#inputTotalIncome"+selectMonth).val(inputTotalIncome[selectMonth].totalIncome);

            if($(".inputDetailOfExpenses"+selectMonth).length){
                for (let index = 0; index < arrDetailOfExpenses[selectMonth].length; index++) {
                    const value = arrDetailOfExpenses[selectMonth][index];
                    $(".inputDetailOfExpenses"+selectMonth).val(value);
                }
            }
            if($(".inputAdministrativeExpenses"+selectMonth).length){
                for (let index = 0; index < arrAdministrativeExpenses[selectMonth].length; index++) {
                    const value = arrAdministrativeExpenses[selectMonth][index];
                    $(".inputAdministrativeExpenses"+selectMonth).val(value);
                }
            }
            if($(".inputProductionCosts"+selectMonth).length){
                for (let index = 0; index < arrProductionCosts[selectMonth].length; index++) {
                    const value = arrProductionCosts[selectMonth][index];
                    $(".inputProductionCosts"+selectMonth).val(value);
                }
            }
            
            //Total egresos - INPUT READONLY
            $("#inputTotalExpenses"+selectMonth).val(inputTotalExpenses[selectMonth].totalExpenses);

            //Total saldo neto - INPUT READONLY
            $("#inputNetBalance"+selectMonth).val(inputNetBalance[selectMonth].netBalance);

            //Total saldo acumulado - INPUT READONLY
            $("#inputTotalBalance"+selectMonth).val(inputTotalBalance[selectMonth].totalBalance);
        }

        //AL ELIMINAR UNA ENTRADA DE TEXTO, ACTUALIZAR RESULTADOS.
        function UpdateValuesAfterOfDeleted(){
            //Nombre de las clases de los inputs - EDITABLES.
            //inputNameOfTheMonth, inputIncome,inputDetailOfExpenses,inputAdministrativeExpenses,inputProductionCosts
            //Nombre de las ID de los inputs - READONLY.
            //inputTotalIncome,inputTotalExpenses,inputNetBalance,inputTotalBalance
            
            //NOMBRE DEL MES
            if($("#inputNameOfTheMonth"+selectMonth).parent().children().length === 1){
                nameOfTheMonth[selectMonth] = "";
                //Agregar boton de agregar inputs.
                const agregarBoton = $("<input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" />");
                $("#inputNameOfTheMonth"+selectMonth).parent().append(agregarBoton);
                //Agregar comportamiento al boton de agregar inputs.
                $("#inputNameOfTheMonth"+selectMonth).parent().on("click",".addInput",AddInput);
            }

            //ACTUALIZA RESULTADOS - OPERACIONES
            //Mas: Detalle de ingreso - INPUT EDITABLE
            if($(".inputIncome"+selectMonth).length){
                arrIncomes[selectMonth]=[];
                $(".inputIncome"+selectMonth).each(function(){
                    arrIncomes[selectMonth].push(parseInt($(this).val()));
                });
                //Sumar la totalidad de los detalles de ingreso
                income[selectMonth] = 0;
                for (let index = 0; index < arrIncomes[selectMonth].length; index++) {
                    income[selectMonth]+=arrIncomes[selectMonth][index];
                }
                //Recalcular el total de los ingresos
                inputTotalIncome[selectMonth].totalIncome=income[selectMonth];
            } else{
                //Redefinir variables al default
                arrIncomes[selectMonth]=[];
                income[selectMonth]=0;
                //Recalcular el total de los ingresos
                inputTotalIncome[selectMonth].totalIncome=income[selectMonth];
            }
            
            //Menos: Detalle de egresos - INPUT EDITABLE
            if($(".inputDetailOfExpenses"+selectMonth).length){
                //Definir la nueva totalidad de egresos
                arrDetailOfExpenses[selectMonth]=[];
                $(".inputDetailOfExpenses"+selectMonth).each(function(){
                    arrDetailOfExpenses[selectMonth].push(parseInt($(this).val()));
                });
                //Sumar la totalidad de Detalles de egresos
                detailOfExpenses[selectMonth] = 0;
                for (let index = 0; index < arrDetailOfExpenses[selectMonth].length; index++) {
                    detailOfExpenses[selectMonth]+=arrDetailOfExpenses[selectMonth][index];
                }
                //Recalcular la totalidad de total egresos
                inputTotalExpenses[selectMonth].totalExpenses= -detailOfExpenses[selectMonth] + administrativeExpenses[selectMonth] + productionCosts[selectMonth];
            } else{
                //Redefinir variables al default
                arrDetailOfExpenses[selectMonth]=[];
                detailOfExpenses[selectMonth]=0;
                //Recalcular la totalidad de total egresos
                inputTotalExpenses[selectMonth].totalExpenses= -detailOfExpenses[selectMonth] + administrativeExpenses[selectMonth] + productionCosts[selectMonth];
            }

            //Mas: Gastos administrativos - INPUT EDITABLE
            if($(".inputAdministrativeExpenses"+selectMonth).length){
                //Definir la nueva totalidad de gastos administrativos
                arrAdministrativeExpenses[selectMonth]=[];
                $(".inputAdministrativeExpenses"+selectMonth).each(function(){
                    arrAdministrativeExpenses[selectMonth].push(parseInt($(this).val()));
                });
                //Sumar la totalidad de gastos administrativos
                administrativeExpenses[selectMonth] = 0;
                for (let index = 0; index < arrAdministrativeExpenses[selectMonth].length; index++) {
                    administrativeExpenses[selectMonth]+=arrAdministrativeExpenses[selectMonth][index];
                }
                //Recalcular la totalidad de total egresos
                inputTotalExpenses[selectMonth].totalExpenses= -detailOfExpenses[selectMonth] + administrativeExpenses[selectMonth] + productionCosts[selectMonth];
            } else{
                //Redefinir variables al default
                arrAdministrativeExpenses[selectMonth]=[];
                administrativeExpenses[selectMonth] = 0;
                //Recalcular la totalidad de total egresos
                inputTotalExpenses[selectMonth].totalExpenses= -detailOfExpenses[selectMonth] + administrativeExpenses[selectMonth] + productionCosts[selectMonth];
            }

            //Mas: Costos de produccion - INPUT EDITABLE
            if($(".inputProductionCosts"+selectMonth).length){
                //Definir la nueva totalidad de costos de produccion
                arrProductionCosts[selectMonth]=[];
                $(".inputProductionCosts"+selectMonth).each(function(){
                    arrProductionCosts[selectMonth].push(parseInt($(this).val()));
                });
                //Sumar la totalidad de gastos administrativos
                productionCosts[selectMonth] = 0;
                for (let index = 0; index < arrProductionCosts[selectMonth].length; index++) {
                    productionCosts[selectMonth]+=arrProductionCosts[selectMonth][index];
                }
                //Recalcular la totalidad de total egresos
                inputTotalExpenses[selectMonth].totalExpenses= -detailOfExpenses[selectMonth] + administrativeExpenses[selectMonth] + productionCosts[selectMonth];
            } else{
                //Redefinir variables al default
                arrProductionCosts[selectMonth]=[];
                productionCosts[selectMonth] = 0;
                //Recalcular la totalidad de total egresos
                inputTotalExpenses[selectMonth].totalExpenses= -detailOfExpenses[selectMonth] + administrativeExpenses[selectMonth] + productionCosts[selectMonth];
            }

            //Recalcular la totalidad de saldo neto
            inputNetBalance[selectMonth].netBalance = inputTotalIncome[selectMonth].totalIncome-inputTotalExpenses[selectMonth].totalExpenses;
            //Recalcular la totalidad de saldo acumulado
            if(selectMonth == 0){
                inputTotalBalance[selectMonth].totalBalance = inputNetBalance[selectMonth].netBalance;
            } else{
                inputTotalBalance[selectMonth].totalBalance = inputTotalBalance[selectMonth-1].totalBalance+inputNetBalance[selectMonth].netBalance;
            }
        }
        
        //Eliminar formulario y variables
        ResetVariables();
        $("#tool").empty();

        //Formulario para ingresar cantidad de meses y asi luego generar un formulario a partir de esa cantidad.
        const inputTimePeriod = $("<input></input>")
                                .addClass("form-control")
                                .attr({"placeholder":"Escriba el nombre del periodo de tiempo en el que se desea evaluar (Opciona)","aria-label":"Escriba el periodo de tiempo en el que se desea evaluar (Opciona)","aria-describedby":"basic-addon2","type":"text"})
                                .focusout(function(){
                                    //Seleccionamos el periodo de tiempo
                                    beforeTimePeriod = selectTimePeriod;
                                    selectTimePeriod = $(this).val()!==""?$(this).val():"Mes";
                                    let pascalCaseBeforeTimePeriod = beforeTimePeriod[0].toUpperCase()+beforeTimePeriod.slice(1);
                                    let pascalCaseSelectTimePeriod = selectTimePeriod[0].toUpperCase()+selectTimePeriod.slice(1).toLowerCase();
                                    //Cambiamos los valores correspondientes por el periodo de tiempo actual.
                                    $(".nav-cash-flow-form").each(function(){
                                        newText = $(this).text();
                                        newText = newText.replace(pascalCaseBeforeTimePeriod,pascalCaseSelectTimePeriod);
                                        $(this).text(newText);
                                    });
                                });
        const inputMonth = "<input type=\"number\" class=\"form-control\" id=\"numberOfMonths\" placeholder=\"Agrega el intervalo de tiempo a evaluar\" aria-label=\"Agrega el intervalo de tiempo a evaluar\" aria-describedby=\"basic-addon2\">";
        let formsByMonth = [];
        let navByMonth = $("<ul></ul>")
                        .addClass("nav nav-tabs");
        let cashFlowServiceForm = $("<div></div>")
                        .attr({id:"cash-flow-form"});
        let containerFlowServiceForm = $("<div></div>")
                                        .addClass("col-md-6 text-center mx-auto");
        //Boton encargado de generar los formularios segun la cantidad de meses indicados
        const btnMonth = $("<input></input>")
                            .attr({type:"button",value:"Generar formulario"})
                            .addClass("btn btn-primary")
                            .click(function(){
                                //0. Se limpia el nav
                                navByMonth.html("");
                                let pascalCaseSelectTimePeriod = selectTimePeriod[0].toUpperCase()+selectTimePeriod.slice(1).toLowerCase();
                                //1. Se toma el numero de meses ingresados.
                                numberOfMonths = parseInt($("#numberOfMonths").val());
                                //1.1. Se limpia la variable de formularios.
                                formsByMonth = [];
                                for (let index_form = 1; index_form <= numberOfMonths; index_form++) {
                                    //2. Se genera un formulario por mes hasta llegar al numero de mes indicado
                                    let newForm = cash_flow_form;
                                    let strMatch = newForm.match(/(id=\"[A-z]*\"){1}/gm);
                                    for (let index = 0; index < strMatch.length; index++) {
                                        let oldId = strMatch[index].replace(/['"]+/g, '');
                                        oldId = oldId.replace(/(id=){1}/g, '');
                                        var idNew = oldId + (index_form - 1);
                                        newForm = newForm.replace(oldId,idNew);
                                    }
                                    formsByMonth.push(newForm);
                                    //3. Se actualiza el nav, mediante el se podra navegar entre los formularios segun mes. Al dar click a un nav podras acceder al formulario del mes en cuestion.
                                    if (index_form == 1){
                                        navByMonth.append(
                                            $("<li></li>")
                                            .addClass("nav-item")
                                            .append(
                                                $("<Button></Button>")
                                                .addClass("nav-link active nav-cash-flow-form")
                                                .text(pascalCaseSelectTimePeriod+" "+index_form)
                                                .click(function(){
                                                    //3.1. Se actualizan los estilos del nav en cuestion.
                                                    $(".nav-cash-flow-form").removeClass("active");
                                                    $(this).addClass("active");
                                                    //3.2. Se actualiza los valores del anterior formulario en el array.
                                                    formsByMonth[selectMonth] = $("#cash-flow-form").html();
                                                    //3.3. Se limpia el anterior formulario del mes en cuestion, se actualiza el formulario del mes indicado.
                                                    selectMonth = 0;
                                                    $("#cash-flow-form")
                                                    .html(formsByMonth[selectMonth]);
                                                    UpdateValues();
                                                    //3.4. Agregar comportamiento de "añadir mas inputs" al boton de agregar inputs pero para el formulario del mes actual.
                                                    $(".addInput").click(AddInput);
                                                })
                                            )
                                        );
                                    } else {
                                        navByMonth.append(
                                            $("<li></li>")
                                            .addClass("nav-item")
                                            .append(
                                                $("<Button></Button>")
                                                .addClass("nav-link nav-cash-flow-form")
                                                .text(pascalCaseSelectTimePeriod+" "+index_form)
                                                .click(function(){
                                                    //3.1. Se actualizan los estilos del nav en cuestion.
                                                    $(".nav-cash-flow-form").removeClass("active");
                                                    $(this).addClass("active");
                                                    //3.2. Se actualiza los valores del anterior formulario en el array.
                                                    formsByMonth[selectMonth] = $("#cash-flow-form").html();
                                                    //3.3. Se limpia el anterior formulario del mes en cuestion, se actualiza el formulario del mes indicado.
                                                    selectMonth = index_form-1;
                                                    $("#cash-flow-form")
                                                    .html(formsByMonth[selectMonth]);
                                                    UpdateValues();
                                                    //3.4. Agregar comportamiento de "añadir mas inputs" al boton de agregar inputs pero para el formulario del mes actual.
                                                    $(".addInput").click(AddInput);
                                                })
                                            )
                                        );
                                    }
                                }
                                //4. Agregar la barra de navegacion para navegar entre los formularios segun mes
                                containerFlowServiceForm
                                .append(navByMonth)
                                .append(cashFlowServiceForm);
                                //5. Reinciar variables a sus valores originales, la longitud de los arrays correspondera al numberOfMonths
                                ResetVariables();
                                //6. Agregar el formulario del primer mes para mostrar por defecto
                                if(numberOfMonths>0){
                                    $("#cash-flow-form").html(formsByMonth[0]);
                                    selectMonth = 0;
                                    //7. Agregar comportamiento de "añadir mas inputs" al boton de agregar inputs.
                                    $(".addInput").click(AddInput);
                                }
                            });
        
        const containerPeriodTimeForm = $("<div></div>")
                                    .addClass("input-group mb-3 w-75 mx-auto")
                                    .append(inputTimePeriod);
        const containerMonthForm = $("<div></div>")
                                    .addClass("input-group mb-3 w-75 mx-auto")
                                    .append(inputMonth)
                                    .append(btnMonth);
        containerFlowServiceForm
        .append(containerPeriodTimeForm)
        .append(containerMonthForm);

        //Crear formulario limpio
        $("#tool").html(containerFlowServiceForm);

        //Agregar boton que muestra un resumen en una tabla, y alterne entre el modo tabla y el modo edicion
        btn_table = $("<Button></Button>")
                    .addClass("btn btn-primary btn-block w-75")
                    .click(function(e){
                        text_btn = e.target.innerHTML 
                        if(text_btn === "Ver en tabla"){
                            e.target.innerHTML ="Cambiar al modo editar";
                        } else{
                            e.target.innerHTML = "Ver en tabla"
                        }
                    })
                    .html("Ver en tabla");

        btn_table.click(function(e){
            idResummaryTable = e.target.parentElement.id
            //Boton cambiar entre modo edicion y modo tabla
            let container_btn_table = $("<div></div>")
                .addClass("col-md-6 text-center mx-auto")
                .append(
                    this
                );
            if(!idResummaryTable){
                let tables = "<div class=\"my-5\"><Table class=\"table table-info table-striped\"><thead><tr><th colspan=2 className=\"text-center fw-bold\">Flujo de efectivo</th></tr></thead><tbody>";
                for (let mes = 0; mes < numberOfMonths; mes++) {
                    let pascalCaseSelectTimePeriod = selectTimePeriod[0].toUpperCase()+selectTimePeriod.slice(1).toLowerCase();
                    let element = "<tr><th colspan=2 className=\"text-center fw-bold\">"+pascalCaseSelectTimePeriod+" "+(mes+1)+"</th></tr><tr><td colspan=\"2\" className=\"text-center fw-bold\">"+nameOfTheMonth[mes]+"</td></tr><tr><td>(+) Detalle de ingreso</td><td>"+income[mes]+"</td></tr><tr><td>(=) Total ingresos</td><td>"+inputTotalIncome[mes].totalIncome+"</td></tr><tr><td>(-) Detalle de egresos</td><td>"+detailOfExpenses[mes]+"</td></tr><tr><td>(+) Egresos de consumo</td><td>"+administrativeExpenses[mes]+"</td></tr><tr><td>(+) Egresos operativos</td><td>"+productionCosts[mes]+"</td></tr><tr><td>(=) Total egresos</td><td>"+inputTotalExpenses[mes].totalExpenses+"</td></tr><tr><td>Saldo neto</td><td>"+inputNetBalance[mes].netBalance+"</td></tr><tr><td>Saldo acumulado</td><td>"+inputTotalBalance[mes].totalBalance+"</td></tr>";
                    tables += element;
                }
                tables+="</tbody></Table></div>";
                //Container
                container_table = $("<div></div>")
                            .addClass("container col-md-6 my-5")
                            .append(
                                tables
                            )
                //Cambiar ID del container_btn_table
                container_btn_table.attr({ id : "SummaryTable" });
                //Reemplazar el anterior contenido con el modo tabla.
                $(containerFlowServiceForm).css("display","none");
                $("#tool").append(container_table);
                $("#tool").remove(container_btn_table);
                $("#tool").append(container_btn_table);
            }
            else{
                //Cambiar ID del container_btn_table
                container_btn_table.attr({ id : "" });
                //Reemplazar el anterior contenido con el modo edicion.
                $(container_table).remove();
                $(containerFlowServiceForm).css("display","block");
                $("#tool").remove(container_btn_table);
                $("#tool").append(container_btn_table);
            }
        });

        let container_btn_table = $("<div></div>")
                            .addClass("col-md-6 text-center mx-auto")
                            .append(
                                btn_table
                            );

        $("#tool").append(container_btn_table);
    });
});