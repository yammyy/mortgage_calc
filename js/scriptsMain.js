
    //init
        var banksArr = new Array();
        var interestrate=0;
        var maxloan=0;
        var mindownpay=0;
        var loanterm=0;
        //Add all banks to dropbox
        async function getAllBankNames() {
            const requestURL = '../banks.json';
            var request = new Request(requestURL);
            var response = await fetch(request);
            var banksText = await response.text();
            var banks = JSON.parse(banksText);
            const sel = document.getElementById('bank');
            sel.innerHTML = '';
            banksArr = banks['banks'];
            for (const bank of banksArr) {
                var bankOpt = document.createElement('option');
                bankOpt.textContent = bank.bankname;
                sel.appendChild(bankOpt);
            }
        }
        getAllBankNames();
        getBankParams = function(){
            var options = document.getElementById('bank').getElementsByTagName('option');
            var i=0;
            var flag=false;
            var selectedI=0;
            while ((i<options.length)&&(flag==false)){
                if (options[i].selected) {
                    selectedI=i;
                    flag=true;
                }
                i++;
            }
            if (flag){
                for (const bank of banksArr){
                    if (bank.bankname==options[selectedI].textContent){
                        interestrate=+bank.interestrate;
                        maxloan=+bank.maxloan;
                        mindownpay=+bank.mindownpay;
                        loanterm=+bank.loanterm;
                    }
                }
            }
        };
    //number fieldsfunction 
        numbersOnly = function(elem, e) {
            //To prevent misplaced minus
            if ((elem.value!='')&&(e.key=='-')){e.preventDefault();}
            //To prevent plus and e to be entered
            if ((e.key=='e')||(e.key=='+')) {e.preventDefault();}
        };
    //calculate mortgage functions
        (function() {
            function decimalAdjust(type, value, exp) {
                // Если степень не определена, либо равна нулю...
                if (typeof exp === 'undefined' || +exp === 0) {
                    return Math[type](value);
                }
                value = +value;
                exp = +exp;
                // Сдвиг разрядов
                value = value.toString().split('e');
                value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
                // Обратный сдвиг
                value = value.toString().split('e');
                return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
            }
            // Десятичное округление к ближайшему
            if (!Math.round10) {
                Math.round10 = function(value, exp) {
                    return decimalAdjust('round', value, exp);
                };
            }
        })();
        calculateM = function(){
            document.getElementById('resultTable').classList.add("d-none");
            document.getElementById('resultDP').textContent='$';
            document.getElementById('resultLA').textContent='$';
            document.getElementById('resultCalc').textContent='$';
            document.getElementById('resultTableP').innerHTML = '';
            document.getElementById('totalRes').innerHTML = '';
            getBankParams();
            var initLoan = +document.getElementById('initloan').value;
            var downpayment = +document.getElementById('downpayment').value;
            var alertStr='';
            if (initLoan=='') {
                alertStr += 'Initial loan';
            }
            if (downpayment=='') {
                if (alertStr=='') {
                    alertStr = 'D';
                }
                else {alertStr += ',d';}
                alertStr+='own payment';
            }
            if (alertStr!='') {
                alertStr += 'not defined';
                alert(alertStr);
            }
            else{
                if (initLoan > maxloan) {
                    alert('Bank could not afford such loan');
                }
                else {
                    if (mindownpay > downpayment){
                        alert('Downpayment is less the minimum downpayment of the bank');
                    }
                    else{
                        var downInCash = initLoan * downpayment / 100;
                        document.getElementById('resultDP').textContent=downInCash;
                        initLoan = initLoan - downInCash;
                        document.getElementById('resultLA').textContent=initLoan;
                        var p1 = ( interestrate / ( 100 * 12 ) );
                        var p2 = Math.pow( ( 1 + p1 ), ( loanterm * 12 ) );
                        var M = ( initLoan * p1 * p2 ) / ( p2 - 1 );
                        M = Math.round10(M,-2);
                        document.getElementById('resultCalc').textContent=M;
                        const tableR = document.getElementById('resultTableP');
                        const tableF = document.getElementById('totalRes');
                        tableR.innerHTML = '';
                        totalRes.innerHTML = '';
                        var i = 1;
                        var iMax=loanterm * 12;
                        var initR = M * iMax;
                        initR=Math.round10(initR,-2);
                        var yrtotal = 0;
                        var alltotal = 0;
                        for (i = 1; i <= iMax; i++) {
                            var resTr = document.createElement('tr');
                            resTr.classList.add('row');
                            var resTd = document.createElement('td');
                            resTd.classList.add('col');
                            resTd.classList.add('col-4');
                            resTd.textContent = i;
                            resTr.appendChild(resTd);
                            resTd = document.createElement('td');
                            resTd.classList.add('col');
                            resTd.classList.add('col-4');
                            resTd.textContent = M;
                            resTr.appendChild(resTd);
                            resTd = document.createElement('td');
                            resTd.classList.add('col');
                            resTd.classList.add('col-4');
                            initR=initR-M;
                            initR=Math.round10(initR,-2);
                            resTd.textContent = initR.toFixed(2);
                            resTr.appendChild(resTd);
                            tableR.appendChild(resTr);
                            yrtotal = yrtotal + M;
                            alltotal = alltotal + M;
                            if (i%12==0){
                                
                                resTr = document.createElement('tr');
                                resTr.classList.add("row");
                                resTr.classList.add('yearTotal');
                                resTd = document.createElement('td');
                                resTd.classList.add('col');
                                resTd.classList.add('col-4');
                                resTd.textContent = 'Year '+ Math.floor(i / 12);
                                resTr.appendChild(resTd);
                                resTd = document.createElement('td');
                                resTd.classList.add('col');
                                resTd.classList.add('col-4');
                                yrtotal=Math.round10(yrtotal,-2);
                                resTd.textContent = yrtotal;
                                resTr.appendChild(resTd);
                                resTd = document.createElement('td');
                                resTd.classList.add('col');
                                resTd.classList.add('col-4');
                                resTd.textContent = initR.toFixed(2);
                                resTr.appendChild(resTd);
                                tableR.appendChild(resTr);
                                yrtotal = 0;
                            }
                        }
                        var resTr = document.createElement('tr');
                        resTr.classList.add('row');
                        var resTd = document.createElement('td');
                        resTd.classList.add('col');
                        resTd.classList.add('col-4');
                        resTd.textContent = 'Total with down payment';
                        resTr.appendChild(resTd);
                        resTd = document.createElement('td');
                        resTd.classList.add('col');
                        resTd.classList.add('col-4');
                        alltotal=alltotal+downInCash;
                        alltotal=Math.round10(alltotal,-2);
                        resTd.textContent = alltotal;
                        resTr.appendChild(resTd);
                        resTd = document.createElement('td');
                        resTd.classList.add('col');
                        resTd.classList.add('col-4');
                        resTd.textContent = initR.toFixed(2);
                        resTr.appendChild(resTd);
                        totalRes.appendChild(resTr);
                        document.getElementById('resultTable').classList.remove("d-none");
                    }
                }
            }
        };