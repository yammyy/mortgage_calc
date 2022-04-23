
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
            var flag=true;
            var i=0;
            var flag=false;
            var selectedI=0;
            while ((i<options.length)&&(flag==false)){
                if (options[i].selected) {
                    selectedI=i;
                    flag=true;
                };
                i++;
            };
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
            if ((elem.value!='')&&(e.key=='-')){e.preventDefault()};
            //To prevent plus and e to be entered
            if ((e.key=='e')||(e.key=='+')) {e.preventDefault()};
        }
        calculateM = function(){
            getBankParams();
            var initLoan = +document.getElementById('initloan').value;
            var downpayment = +document.getElementById('downpayment').value;
            var alertStr='';
            if (initLoan=='') {
                alertStr += 'Initial loan'
            };
            if (downpayment=='') {
                if (alertStr=='') {
                    alertStr = 'D';
                }
                else {alertStr += ',d';}
                alertStr+='own payment';
            };
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
                        alert('Downpayment is less the minimum downpayment of the bank')
                    }
                    else{
                        var p1=(interestrate/12);
                        var p2=Math.pow((1+(interestrate/12)), (loanterm*12));
                        var M = (initLoan*p1*p2)/(p2-1);
                        document.getElementById('resultCalc').textContent=M.toFixed(2);
                    }
                }
            }
        }