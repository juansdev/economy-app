$(function(){
    //statement_of_income_form_part_one: Consta de los inputs junto a sus botones de añadir input: Nombre del negocio, Fecha de datos financieros, Ingreso de venta, Egresos de venta.
    const statement_of_income_form_part_one = "<div class=\"container col-md-6 my-5\"><div class=\"mb-3\"><div id=\"inputBusinessName\"><label class=\"form-label\">Nombre del negocio</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /></div><div class=\"mb-3\"><div id=\"inputDate\"><label class=\"form-label\">Fecha de datos financieros</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /></div><div class=\"mb-3\"><div id=\"inputSalesIncome\"><label class=\"form-label\">(+) Ingreso de venta</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /></div><div class=\"mb-3\"><div id=\"inputSalesExpenses\"><label class=\"form-label\">(-) Egresos de venta</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /></div>";

    //statement_of_income_form_part_two: Consta de los inputs junto a sus botones de añadir input: Utilidad bruta, Gastos operativos.
    const statement_of_income_form_part_two = "<div class=\"mb-3\"><label class=\"form-label\">Utilidad bruta</label><input type=\"number\" readonly class=\"form-control\" id=\"inputGrossProfit\"></div><hr></hr><div class=\"mb-3\"><div id=\"inputOperatingExpenses\"><label class=\"form-label\">(-) Gastos operativos</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /></div>";

    //statement_of_income_form_part_three: Consta de los inputs junto a sus botones de añadir input: Utilidad operativa, Otros ingresos, Otros egresos, Utilidad antes de impuestos, Impuesto de renta, Utilidad neta.
    const statement_of_income_form_part_three = "<div class=\"mb-3\"><label class=\"form-label\">Utilidad operativa</label><input type=\"number\" readonly class=\"form-control\" id=\"inputOperatingProfit\"></div><hr></hr><div class=\"mb-3\"><div id=\"inputOtherIncome\"><label class=\"form-label\">(+) Otros ingresos</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /></div><div class=\"mb-3\"><div id=\"inputOtherExpenses\"><label class=\"form-label\">(-) Otros egresos</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /></div><div class=\"mb-3\"><label class=\"form-label\">Utilidad antes de impuestos</label><input type=\"number\" readonly class=\"form-control\" id=\"inputProfitBeforeTax\"></div><div class=\"mb-3\"><div id=\"inputIncomeTax\"><label class=\"form-label\">(-) Impuesto de renta</label></div><input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" /><div class=\"form-text mt-2\"><p class=\"my-1\">Por defecto se tomara el valor como un valor de precio.</p><p class=\"my-1\">Si deseas agregar un valor de porcentaje, deberas escribirlo como de la siguiente manera: 50%</p></div></div><div class=\"mb-3\"><label class=\"form-label\">Utilidad neta</label><input type=\"number\" readonly class=\"form-control\" id=\"inputNetProfit\"></div></div>";

    //Variables de nombre de negocio y fecha de datos financieros asi como el operador de impuesto de renta (% o $).
    let title,title_2,operator;
    //Variables necesarias para realizar operaciones
    let sell,cost,operating_expenses,other_income,other_expenses,income_tax;
    let arr_sell, arr_cost, arr_operating_expenses, arr_other_income, arr_other_expenses;
    //Variables con evento de escucha a cambios de valores
    let inputGrossProfit,inputOperatingProfit,inputProfitBeforeTax,inputNetProfit;

    //REINICIAR VALORES DE VARIABLES A ORIGINALES
    function ResetVariables(){
        title=title_2=operator="";

        sell=cost=operating_expenses=other_income=other_expenses=income_tax=0;

        arr_sell = [];
        arr_cost = [];
        arr_operating_expenses = [];
        arr_other_income = [];
        arr_other_expenses = [];

        inputGrossProfit = {
            grossProfitInternal: 0,
            grossProfitListener: function(val) {},
            set grossProfit(val) {
            this.grossProfitInternal = val;
            this.grossProfitListener(val);
            },
            get grossProfit() {
            return this.grossProfitInternal;
            },
            registerListener: function(listener) {
            this.grossProfitListener = listener;
            }
        }

        inputOperatingProfit = {
            operatingProfitInternal: 0,
            operatingProfitListener: function(val) {},
            set operatingProfit(val) {
            this.operatingProfitInternal = val;
            this.operatingProfitListener(val);
            },
            get operatingProfit() {
            return this.operatingProfitInternal;
            },
            registerListener: function(listener) {
            this.operatingProfitListener = listener;
            }
        }

        inputProfitBeforeTax = {
            profitBeforeTaxInternal: 0,
            profitBeforeTaxListener: function(val) {},
            set profitBeforeTax(val) {
            this.profitBeforeTaxInternal = val;
            this.profitBeforeTaxListener(val);
            },
            get profitBeforeTax() {
            return this.profitBeforeTaxInternal;
            },
            registerListener: function(listener) {
            this.profitBeforeTaxListener = listener;
            }
        }

        inputNetProfit = {
            netProfitInternal: 0,
            netProfitListener: function(val) {},
            set netProfit(val) {
            this.netProfitInternal = val;
            this.netProfitListener(val);
            },
            get netProfit() {
            return this.netProfitInternal;
            },
            registerListener: function(listener) {
            this.netProfitListener = listener;
            }
        }
    }

    //AÑADIR ENTRADAS DE TEXTO.
    function AddInput(){
        //Cambiar id por el agrupamiento de Inputs correspondiente al boton de agregar inputs.
        const idParent = $(this).parent().children().first().attr("id");

        let fieldWrapper = $("<div class=\"input-group mb-3\" />");
        
        //Cambiar el nombre de la clase por el conjunto de inputs correspondiente...
        if(idParent==="inputBusinessName" || idParent==="inputIncomeTax"){
            var fName = $("<input type=\"text\" class=\"form-control "+idParent+"\" />");
        } else if(idParent.indexOf("Date") !== -1){
            var fName = $("<input type=\"date\" class=\"form-control "+idParent+"\" />");    
        } else{
            var fName = $("<input type=\"number\" class=\"form-control "+idParent+"\" />");
        }
        const removeButton = $("<button class=\"input-group-text bg-danger\"><i class=\"bi bi-trash\"></i></button>");
        removeButton.click(function() {
            $(this).parent().remove();
            UpdateValues();
        });
        fieldWrapper.append(fName);
        fieldWrapper.append(removeButton);
        $("#"+idParent).append(fieldWrapper);

        AddValues();
    }

    //AGREGAR VALORES A VARIABLES Y REALIZAR OPERACIONES EN LAS ENTRADAS DE TEXTO.
    function AddValues(){
        //NOMBRE DEL NEGOCIO
        if($(".inputBusinessName").length === 1){
            $(".inputBusinessName").on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    title = $(this).val();
                    //Deshabilitar input
                    $(this).prop("readonly",true);
                }
            });
            if($(".inputBusinessName").parent().parent().parent().children().length === 2){
                $(".inputBusinessName").parent().parent().parent().children().last().remove();
            }
        }
        //FECHAS DE ESTADO DE RESULTADO
        if($(".inputDate").length <= 2){
            $(".inputDate").on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    title_2 = title_2?title_2+" AL "+$(this).val():"ESTADO DE RESULTADO DEL "+$(this).val();
                    //Deshabilitar input
                    $(this).prop("readonly",true);
                }
            });
            if($(".inputDate").length === 2 && $(".inputDate").parent().parent().parent().children().length === 2){
                $(".inputDate").parent().parent().parent().children().last().remove();
            }
        }

        //ACTUALIZA RESULTADOS - OPERACIONES
        //Ingresos: Venta de mercancías/Venta de productos - INPUT EDITABLE
        $(".inputSalesIncome").on("keypress",function(e){
            if(e.which == 13 && !$(this).attr("readonly")) {
                //Valor de venta
                sell = $(this).val()!==""?parseInt($(this).val()):0;
                //Juntar todas las ventas en un array
                arr_sell.push(sell);

                //Sumar la totalidad de todas las ventas
                sell = 0
                for (let index = 0; index < arr_sell.length; index++) {
                    sell+=arr_sell[index]
                }
                //Calcular la utilidad bruta
                inputNetProfit.netProfit=(sell-cost)<0?
                cost-sell:
                sell-cost;
                if($("#inputGrossProfit").length){
                    inputGrossProfit.grossProfit = inputNetProfit.netProfit;
                } else{
                    inputOperatingProfit.operatingProfit = inputNetProfit.netProfit;
                }
                
                //Deshabilitar input
                $(this).prop("readonly",true);
            }
        });

        //Menos: Costo mercancia vendida/Costo de producto vendido - INPUT EDITABLE
        $(".inputSalesExpenses").on("keypress",function(e){
            if(e.which == 13 && !$(this).attr("readonly")) {
                //Valor de costo
                cost = $(this).val()!==""?parseInt($(this).val()):0;
                //Juntar todos los costo mercancia vendida en un array
                arr_cost.push(cost)
                
                //Sumar la totalidad de costo mercancia vendida
                cost = 0
                for (let index = 0; index < arr_cost.length; index++) {
                    cost+=arr_cost[index]
                }
                //Calcular la utilidad bruta
                inputNetProfit.netProfit=(sell-cost)<0?
                cost-sell:
                sell-cost;
                
                if($("#inputGrossProfit").length){
                    inputGrossProfit.grossProfit = inputNetProfit.netProfit;
                } else{
                    inputOperatingProfit.operatingProfit = inputNetProfit.netProfit;
                }
                //Deshabilitar input tras agregado
                $(this).prop("readonly",true);
            }
        });

        
        if($("#inputGrossProfit").length){
            //Utilidad bruta - INPUT READONLY
            inputGrossProfit.registerListener(
                function(val){
                    $("#inputGrossProfit").val(inputGrossProfit.grossProfit);
                }
            );
        }

        //Menos: Gastos operativos - INPUT EDITABLE
        $(".inputOperatingExpenses").on("keypress",function(e){
            if(e.which == 13 && !$(this).attr("readonly")) {
                //Valor de gastos operativos
                operating_expenses = $(this).val()!==""?parseInt($(this).val()):0;
                //Juntar todos los gastos operativos en un array
                arr_operating_expenses.push(operating_expenses)
                //Sumar la totalidad de gastos operativos
                operating_expenses = 0
                for (let index = 0; index < arr_operating_expenses.length; index++) {
                    operating_expenses+=arr_operating_expenses[index]
                }
                //Calcular la utilidad operativa
                inputNetProfit.netProfit=(inputGrossProfit.grossProfit-operating_expenses)<0?
                operating_expenses-inputGrossProfit.grossProfit:
                inputGrossProfit.grossProfit-operating_expenses;
                inputOperatingProfit.operatingProfit = inputNetProfit.netProfit;
                
                //Deshabilitar input tras agregado
                $(this).prop("readonly",true);
            }
        });

        //Utilidad operativa - INPUT READONLY
        inputOperatingProfit.registerListener(
            function(val){
                $("#inputOperatingProfit").val(inputOperatingProfit.operatingProfit);
            }
        );

        //Mas: otros ingresos - INPUT EDITABLE
        $(".inputOtherIncome").on("keypress",function(e){
            if(e.which == 13 && !$(this).attr("readonly")) {
                //Valor de otros ingresos
                other_income = $(this).val()!==""?parseInt($(this).val()):0;
                //Juntar todos los otros ingresos en un array
                arr_other_income.push(other_income)
                //Sumar la totalidad de otros ingresos
                other_income = 0
                for (let index = 0; index < arr_other_income.length; index++) {
                    other_income+=arr_other_income[index]
                }
                //Calcular la utilidad antes de impuesto
                inputNetProfit.netProfit=
                other_income>0?
                inputOperatingProfit.operatingProfit-(other_expenses-other_income):
                other_income-other_expenses-inputOperatingProfit.operatingProfit;
                inputProfitBeforeTax.profitBeforeTax = inputNetProfit.netProfit;
                
                //Deshabilitar input tras agregado
                $(this).prop("readonly",true);
            }
        });

        //Menos: otros egresos - INPUT EDITABLE
        $(".inputOtherExpenses").on("keypress",function(e){
            if(e.which == 13 && !$(this).attr("readonly")) {
                //Valor de otros egresos
                other_expenses = $(this).val()!==""?parseInt($(this).val()):0;
                //Juntar todos los otros egresos en un array
                arr_other_expenses.push(other_expenses)
                //Sumar la totalidad de otros egresos
                other_expenses = 0
                for (let index = 0; index < arr_other_expenses.length; index++) {
                    other_expenses+=arr_other_expenses[index]
                }
                //Calcular la utilidad antes de impuesto
                inputNetProfit.netProfit=
                other_income>0?
                inputOperatingProfit.operatingProfit-(other_expenses-other_income):
                other_income-other_expenses-inputOperatingProfit.operatingProfit;
                inputProfitBeforeTax.profitBeforeTax = inputNetProfit.netProfit;
                
                //Deshabilitar input tras agregado
                $(this).prop("readonly",true);
            }
        });

        //Utilidad antes de impuestos - INPUT READONLY
        inputProfitBeforeTax.registerListener(
            function(val){
                $("#inputProfitBeforeTax").val(inputProfitBeforeTax.profitBeforeTax);
            }
        );

        //Menos: Impuesto de renta - INPUT EDITABLE
        if($(".inputIncomeTax").length === 1){
            $(".inputIncomeTax").on("keypress",function(e){
                if(e.which == 13 && !$(this).attr("readonly")) {
                    //Sacar operador, si es "%" o si es "$"
                    index_of_percentage = $(this).val().indexOf("%");
                    operator = index_of_percentage !== -1 ? "%" 
                    : "$";
                    //Valor del impuesto de renta
                    index_operator = $(this).val().indexOf(operator);
                    if(operator === "$"){
                        income_tax = $(this).val().slice(index_operator+1);
                    } else{
                        income_tax = $(this).val().slice(0,index_operator);
                    }
                    income_tax = income_tax!==""?parseInt(income_tax):0;
                    
                    //Calcular la utilidad neta

                    //Utilidad Neta * Impuesto de renta / 100
                    inputNetProfit.netProfit= 
                    //Si Utilidad antes de impuesto tiene valor negativo...
                    inputProfitBeforeTax.profitBeforeTax<0?inputProfitBeforeTax.profitBeforeTax:
                    //Si tiene un valor positivo, entonces tomar el valor del Porcentaje si fue elegido, y sacarle porcentaje a la utilidad antes de impuesto
                    operator === "%"?
                    inputProfitBeforeTax.profitBeforeTax*income_tax/100:
                    //Si el valor es un numero entero y no por porcentaje, entonces solo restarlo...
                    inputProfitBeforeTax.profitBeforeTax-income_tax;
                    
                    //Deshabilitar input tras agregado
                    $(this).prop("readonly",true);
                }
            });
            
            if($(".inputIncomeTax").parent().parent().parent().children().length === 2){
                $(".inputIncomeTax").parent().parent().parent().children().last().remove();
            }
        }

        //Utilidad neta - INPUT READONLY
        inputNetProfit.registerListener(
            function(val){
                $("#inputNetProfit").val(inputNetProfit.netProfit);
            }
        );
    }

    //AL ELIMINAR UNA ENTRADA DE TEXTO, ACTUALIZAR RESULTADOS.
    function UpdateValues(){
        
        //NOMBRE DEL NEGOCIO
        if($("#inputBusinessName").parent().children().length === 1){
            title = "";
            //Agregar boton de agregar inputs.
            const agregarBoton = $("<input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" />");
            $("#inputBusinessName").parent().append(agregarBoton);
            //Agregar comportamiento al boton de agregar inputs.
            $("#inputBusinessName").parent().on("click",".addInput",AddInput);
        }
        
        //FECHAS DE ESTADO DE RESULTADO
        if($("#inputDate").parent().children().length === 1){
            title_2 = "";
            //Agregar boton de agregar inputs.
            const agregarBoton = $("<input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" />");
            $("#inputDate").parent().append(agregarBoton);
            //Agregar comportamiento al boton de agregar inputs.
            $("#inputDate").parent().on("click",".addInput",AddInput);
        }

        //ACTUALIZA RESULTADOS - OPERACIONES
        //Ingresos: Venta de mercancías/Venta de productos - INPUT EDITABLE
        if($(".inputSalesIncome").length){
            arr_sell=[];
            $(".inputSalesIncome").each(function(){
                arr_sell.push(parseInt($(this).val()));
            });
            //Sumar la totalidad de todas las ventas
            sell = 0;
            for (let index = 0; index < arr_sell.length; index++) {
                sell+=arr_sell[index];
            }
            //Recalcular la utilidad neta
            inputNetProfit.netProfit=(sell-cost)<0?
            cost-sell:
            sell-cost;
        } else{
            //Redefinir variables al default
            arr_sell=[];
            sell=0;
            //Recalcular la utilidad neta
            inputNetProfit.netProfit=(sell-cost)<0?
            cost-sell:
            sell-cost;
        }
        
        //Menos: Costo mercancia vendida/Costo de producto vendido - INPUT EDITABLE
        if($(".inputSalesExpenses").length){
            arr_cost=[];
            $(".inputSalesExpenses").each(function(){
                arr_cost.push(parseInt($(this).val()));
            });
            //Sumar la totalidad de costo mercancia vendida
            cost = 0;
            for (let index = 0; index < arr_cost.length; index++) {
                cost+=arr_cost[index]
            }
            //Recalcular la utilidad neta
            inputNetProfit.netProfit=(sell-cost)<0?
            cost-sell:
            sell-cost;
        } else{
            //Redefinir variables al default
            arr_cost=[];
            cost=0;
            //Recalcular la utilidad neta
            inputNetProfit.netProfit=(sell-cost)<0?
            cost-sell:
            sell-cost;
        }
        
        if($("#inputGrossProfit").length){
            //Calcular la utilidad bruta
            inputGrossProfit.grossProfit = inputNetProfit.netProfit;
        }  else{
            //Calcular la utilidad operativa
            inputOperatingProfit.operatingProfit = inputNetProfit.netProfit;
        }

        if($(".inputOperatingExpenses").length){
            arr_operating_expenses=[];
            $(".inputOperatingExpenses").each(function(){
                arr_operating_expenses.push(parseInt($(this).val()));
            });
            //Sumar la totalidad de gastos operativos
            operating_expenses = 0;
            for (let index = 0; index < arr_operating_expenses.length; index++) {
                operating_expenses+=arr_operating_expenses[index];
            }
        } else{
            //Redefinir variables al default
            arr_operating_expenses=[];
            operating_expenses = 0;
        }

        //Calcular la utilidad operativa añadiendole gastos operativos si existe.
        if($("#inputOperatingExpenses").length){
            inputNetProfit.netProfit=(inputGrossProfit.grossProfit-operating_expenses)<0?
            operating_expenses-inputGrossProfit.grossProfit:
            inputGrossProfit.grossProfit-operating_expenses;
            inputOperatingProfit.operatingProfit = inputNetProfit.netProfit;
        }

        if($(".inputOtherIncome").length){
            arr_other_income=[];
            $(".inputOtherIncome").each(function(){
                arr_other_income.push(parseInt($(this).val()));
            });
            //Sumar la totalidad de otros ingresos
            other_income = 0;
            for (let index = 0; index < arr_other_income.length; index++) {
                other_income+=arr_other_income[index]
            }
            //Recalcular la utilidad antes de impuesto
            inputNetProfit.netProfit=
            other_income>0?
            inputOperatingProfit.operatingProfit-(other_expenses-other_income):
            other_income-other_expenses-inputOperatingProfit.operatingProfit;
            inputProfitBeforeTax.profitBeforeTax = inputNetProfit.netProfit;
        } else{
            //Redefinir variables al default
            arr_other_income=[];
            other_income = 0;
            //Recalcular la utilidad antes de impuesto
            inputNetProfit.netProfit=
            other_income>0?
            inputOperatingProfit.operatingProfit-(other_expenses-other_income):
            other_income-other_expenses-inputOperatingProfit.operatingProfit;
            inputProfitBeforeTax.profitBeforeTax = inputNetProfit.netProfit;
        }

        if($(".inputOtherExpenses").length){
            arr_other_expenses=[];
            $(".inputOtherExpenses").each(function(){
                arr_other_expenses.push($(this).val());
            });
            //Sumar la totalidad de otros egresos
            other_expenses = 0;
            for (let index = 0; index < arr_other_expenses.length; index++) {
                other_expenses+=arr_other_expenses[index]
            }
            //Recalcular la utilidad antes de impuesto
            inputNetProfit.netProfit=
            other_income>0?
            inputOperatingProfit.operatingProfit-(other_expenses-other_income):
            other_income-other_expenses-inputOperatingProfit.operatingProfit;
            inputProfitBeforeTax.profitBeforeTax = inputNetProfit.netProfit;
        } else{
            //Redefinir variables al default
            arr_other_expenses=[];
            other_expenses = 0;
            //Recalcular la utilidad antes de impuesto
            inputNetProfit.netProfit=
            other_income>0?
            inputOperatingProfit.operatingProfit-(other_expenses-other_income):
            other_income-other_expenses-inputOperatingProfit.operatingProfit;
            inputProfitBeforeTax.profitBeforeTax = inputNetProfit.netProfit;
        }

        //Menos: Impuesto de renta - INPUT EDITABLE
        if($(".inputIncomeTax").length === 1){
            income_tax = $(".inputIncomeTax")[0].val();
            //Recalcular la utilidad neta
            //Utilidad Neta * Impuesto de renta / 100
            inputNetProfit.netProfit= 
            //Si Utilidad antes de impuesto tiene valor negativo...
            inputProfitBeforeTax.profitBeforeTax<0?inputProfitBeforeTax.profitBeforeTax:
            //Si tiene un valor positivo, entonces tomar el valor del Porcentaje si fue elegido, y sacarle porcentaje a la utilidad antes de impuesto
            operator === "%"?
            inputProfitBeforeTax.profitBeforeTax*income_tax/100:
            //Si el valor es un numero entero y no por porcentaje, entonces solo restarlo...
            inputProfitBeforeTax.profitBeforeTax-income_tax;
        } else if($("#inputIncomeTax").parent().children().length < 2){
            income_tax = 0;
            //Agregar boton de agregar inputs.
            const agregarBoton = $("<input type=\"button\" value=\"Añade mas entradas de texto\" class=\"btn btn-primary btn-block addInput w-100\" />");
            $("#inputIncomeTax").parent().append(agregarBoton);
            //Agregar comportamiento al boton de agregar inputs.
            $("#inputIncomeTax").parent().on("click",".addInput",AddInput);
            
            //Recalcular la utilidad neta
            //Utilidad Neta * Impuesto de renta / 100
            inputNetProfit.netProfit= 
            //Si Utilidad antes de impuesto tiene valor negativo...
            inputProfitBeforeTax.profitBeforeTax<0?inputProfitBeforeTax.profitBeforeTax:
            //Si tiene un valor positivo, entonces tomar el valor del Porcentaje si fue elegido, y sacarle porcentaje a la utilidad antes de impuesto
            operator === "%"?
            inputProfitBeforeTax.profitBeforeTax*income_tax/100:
            //Si el valor es un numero entero y no por porcentaje, entonces solo restarlo...
            inputProfitBeforeTax.profitBeforeTax-income_tax;
        }
    }

    //Seleccionamos todos los botones que generan un estado de resultados.
    $(".generate-statment-of-income-service-form").click(function(){
        //Eliminar formulario
        $("#tool").empty();
        const statmentOfIncomeServiceForm = statement_of_income_form_part_one + statement_of_income_form_part_three;
        
        //Reinciar variables a sus valores originales
        ResetVariables();

        //Crear formulario limpio
        $("#tool").html(statmentOfIncomeServiceForm);
        
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
            container_btn = $("<div></div>")
                .addClass("col-md-6 text-center mx-auto")
                .append(
                    this
                )
            if(!idResummaryTable){
                const operator_text = operator==="%"?income_tax+operator:operator+income_tax
                const elements = "<tr><td colspan=\"2\" className=\"text-center fw-bold\">"+title+"</td></tr><tr><td colspan=\"2\" className=\"text-center fw-bold\">"+title_2+"</td></tr><tr><td>(+) Ingresos de venta</td><td>"+sell+"</td></tr><tr><td>(-) Egresos de venta</td><td>"+cost+"</td></tr><tr><td>(=) Utilidad operativa</td><td>"+inputOperatingProfit.operatingProfit+"</td></tr><tr><td>(+) Otros ingresos</td><td>"+other_income+"</td></tr><tr><td>(-) Otros egresos</td><td>"+other_expenses+"</td></tr><tr><td>(=) Utilidad antes de impuestos</td><td>"+inputProfitBeforeTax.profitBeforeTax+"</td></tr><tr><td>(-) Impuesto de renta</td><td>"+operator_text+"</td></tr><tr><td>(=) Utilidad neta</td><td>"+inputNetProfit.netProfit+"</td></tr>";
                const table = "<Table class=\"table table-info table-striped\"><thead><tr><th colspan=\"2\" className=\"text-center fw-bold\">Estado de resultado</th></tr></thead><tbody>"+elements+"</tbody></Table>";
                //Container
                container_table = $("<div></div>")
                            .addClass("container col-md-6 my-5")
                            .append(
                                table
                            )
                //Cambiar ID del container_btn
                container_btn.attr({ id : "SummaryTable" })
                //Reemplazar el anterior contenido con el modo tabla.
                $("#tool").html(container_table);
                $("#tool").append(container_btn);
            }
            else{
                //Cambiar ID del container_btn
                container_btn.attr({ id : "" })
                //Reemplazar el anterior contenido con el modo edicion.
                $("#tool").html(statmentOfIncomeServiceForm);
                $("#tool").append(container_btn);
            }
        });
        container_btn = $("<div></div>")
                            .addClass("col-md-6 text-center mx-auto")
                            .append(
                                btn_table
                            )

        $("#tool").append(container_btn);

        //Agregar comportamiento de "añadir mas inputs" al boton de agregar inputs.
        $(".addInput").click(AddInput);
    });

    $(".generate-statment-of-income-form").click(function(){
        //Eliminar formulario
        $("#tool").empty();
        const statmentOfIncomeServiceForm = statement_of_income_form_part_one + statement_of_income_form_part_two + statement_of_income_form_part_three;

        //Reinciar variables a sus valores originales
        ResetVariables();
        
        //Crear formulario limpio
        $("#tool").html(statmentOfIncomeServiceForm);
        
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
            let container_btn = $("<div></div>")
                .addClass("col-md-6 text-center mx-auto")
                .append(
                    this
                )
            if(!idResummaryTable){
                const operator_text = operator==="%"?income_tax+operator:operator+income_tax
                const elements = "<tr><td colspan=\"2\" className=\"text-center fw-bold\">"+title+"</td></tr><tr><td colspan=\"2\" className=\"text-center fw-bold\">"+title_2+"</td></tr><tr><td>(+) Ingresos de venta</td><td>"+sell+"</td></tr><tr><td>(-) Egresos de venta</td><td>"+cost+"</td></tr><tr><td>(=) Utilidad bruta</td><td>"+inputGrossProfit.grossProfit+"</td></tr><tr><td>(-) Gastos operativos</td><td>"+operating_expenses+"</td></tr><tr><td>(=) Utilidad operativa</td><td>"+inputOperatingProfit.operatingProfit+"</td></tr><tr><td>(+) Otros ingresos</td><td>"+other_income+"</td></tr><tr><td>(-) Otros egresos</td><td>"+other_expenses+"</td></tr><tr><td>(=) Utilidad antes de impuestos</td><td>"+inputProfitBeforeTax.profitBeforeTax+"</td></tr><tr><td>(-) Impuesto de renta</td><td>"+operator_text+"</td></tr><tr><td>(=) Utilidad neta</td><td>"+inputNetProfit.netProfit+"</td></tr>";
                const table = "<Table class=\"table table-info table-striped\"><thead><tr><th colspan=\"2\" className=\"text-center fw-bold\">Estado de resultado</th></tr></thead><tbody>"+elements+"</tbody></Table>";
                //Container
                container_table = $("<div></div>")
                            .addClass("container col-md-6 my-5")
                            .append(
                                table
                            )
                //Cambiar ID del container_btn
                container_btn.attr({ id : "SummaryTable" })
                //Reemplazar el anterior contenido con el modo tabla.
                $("#tool").html(container_table);
                $("#tool").append(container_btn);
            }
            else{
                //Cambiar ID del container_btn
                container_btn.attr({ id : "" })
                //Reemplazar el anterior contenido con el modo edicion.
                $("#tool").html(statmentOfIncomeServiceForm);
                $("#tool").append(container_btn);
            }
        });
        let container_btn = $("<div></div>")
                            .addClass("col-md-6 text-center mx-auto")
                            .append(
                                btn_table
                            )

        $("#tool").append(container_btn);
        
        //Agregar comportamiento de "añadir mas inputs" al boton de agregar inputs.
        $(".addInput").click(AddInput);
    });
    
});