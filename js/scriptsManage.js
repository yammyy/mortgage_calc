
    //init
        var banksArr = new Array();
        //Add all banks to dropbox
        async function getAllBanksNames() {
            const requestURL = '../banks.json';
            var request = new Request(requestURL);
            var response = await fetch(request);
            var banksText = await response.text();
            var banks = JSON.parse(banksText);
            const sel = document.getElementById('bankname');
            sel.innerHTML = '';
            banksArr = banks['banks'];
            for (const bank of banksArr) {
                var bankOpt = document.createElement('option');
                bankOpt.textContent = bank.bankname;
                sel.appendChild(bankOpt);
            }
            bankOpt = document.createElement('option');
            bankOpt.textContent = "+add new bank";
            bankOpt.value = "new";
            sel.appendChild(bankOpt);
            if (banksArr.length!=0){
                document.getElementById('interestrate').value=banksArr[0].interestrate;
                document.getElementById('maxloan').value=banksArr[0].maxloan;
                document.getElementById('mindownpay').value=banksArr[0].mindownpay;
                document.getElementById('loanterm').value=banksArr[0].loanterm;
            }
            if ((banksArr.length)==1) {
                document.getElementById('bankdelBTN').classList.add("d-none");
            }
            else {
                document.getElementById('bankdelBTN').classList.remove("d-none");
            };
        };
        getAllBanksNames();
        getBankParams = function(){
            var options = document.getElementById('bankname').getElementsByTagName('option');
            var flag=true;
            //if new bank is in the list then color it red.
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
                        document.getElementById('interestrate').value=bank.interestrate;
                        document.getElementById('maxloan').value=bank.maxloan;
                        document.getElementById('mindownpay').value=bank.mindownpay;
                        document.getElementById('loanterm').value=bank.loanterm;
                    }
                }
            }
        };
    //bankname
        //Add input field if new element choosen
        getData = function(elem) {
            if (elem.value=='new') {
                var bankInt=document.getElementById('banknameusr');
                bankInt.value='';
                bankInt.classList.remove("d-none");
                document.getElementById('bankchBTN').classList.add("d-none");
                document.getElementById('bankaddBTN').classList.remove("d-none");
                document.getElementById('bankdelBTN').classList.add("d-none");
                bankInt.classList.remove("invalid");
                document.getElementById('interestrate').value='';
                document.getElementById('maxloan').value='';
                document.getElementById('mindownpay').value='';
                document.getElementById('loanterm').value='';
            }
            else {
                var bankInt=document.getElementById('banknameusr');
                bankInt.value='';
                bankInt.classList.add("d-none");
                bankInt.classList.remove("invalid");
                document.getElementById('bankchBTN').classList.remove("d-none");
                document.getElementById('bankaddBTN').classList.add("d-none");
                if ((banksArr.length)==1) {
                    document.getElementById('bankdelBTN').classList.add("d-none");
                }
                else {
                    document.getElementById('bankdelBTN').classList.remove("d-none");
                };
                document.getElementById('bankdelBTN').classList.remove("d-none");
                getBankParams();
            }
        };
        //Check if new bank already exists and show user a message in that case
        addNewBank = function(elem) {
            var options = document.getElementById('bankname').getElementsByTagName('option');
            var bankInt=document.getElementById('banknameusr');
            var i=0;
            var flag=true;
            //if new bank is in the list then color it red.
            while ((i<options.length)&&(flag==true)){
                if (options[i].value == bankInt.value) {
                    alert('Name of this bank is already exist');
                    bankInt.classList.add("invalid");
                    flag=false;
                };
                i++;
            };
            if (flag==true){
                if (bankInt.value == '') {
                    bankInt.classList.add("invalid");
                }
            }
        };
    //number fieldsfunction 
        numbersOnly = function(elem, e) {
            //To prevent misplaced minus
            if ((elem.value!='')&&(e.key=='-')){e.preventDefault()};
            //To prevent plus and e to be entered
            if ((e.key=='e')||(e.key=='+')) {e.preventDefault()};
        };
        validInpt = function(elem){
            if (elem.value==''){
                elem.classList.add("invalid");
            }
            else{
                elem.classList.remove("invalid");
            }
        };
    //submit
        //if there is only one left not delete it.
        //validate fields before add/change/del row
        valaddsub = function(e){
            var flag=false;
            if (document.getElementById('banknameusr').classList.contains('d-none')){}
            else{
                if (document.getElementById('banknameusr').value==''){flag=true}; 
                if (document.getElementById('banknameusr').classList.contains('invalid')){flag=true}; 
            };
            if (document.getElementById('interestrate').value==''){
                flag=true;
                document.getElementById('interestrate').classList.add('invalid');
            };
            if (document.getElementById('maxloan').value==''){
                flag=true;
                document.getElementById('maxloan').classList.add('invalid');
            };
            if (document.getElementById('mindownpay').value==''){
                flag=true;
                document.getElementById('mindownpay').classList.add('invalid');
            };
            if (document.getElementById('loanterm').value==''){
                flag=true;
                document.getElementById('loanterm').classList.add('invalid');
            };
            if (flag==true){
                e.preventDefault();
            };
        }