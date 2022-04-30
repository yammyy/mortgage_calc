<!DOCTYPE html>
<html lang="en">

<head>
    <title>Mortgage Calculator</title>
    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="css/styles.css">
</head>

<body>
    <?php
        $config = parse_ini_file('../db.ini', true);
        $db_host=$config['connect']['db_host']; // хост
        $db_name=$config['connect']['db_name']; // бд
        $db_user=$config['connect']['db_user']; // пользователь бд
        $db_pass=$config['connect']['db_pass']; // пароль к бд
        $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name); // коннект с сервером бд
        $mysqli->set_charset("utf8mb4"); // задаем кодировку

        $result = $mysqli->query('select * from banks'); // запрос на выборку
        while($row = $result->fetch_assoc())// получаем все строки в цикле по одной
            {
                $bankname=$row['bankname']; 
                $interestrate=$row['interestrate']; 
                $maxloan=$row['maxloan']; 
                $mindownpay=$row['mindownpay']; 
                $loanterm=$row['loanterm']; 
                $posts[] = array('bankname'=> $bankname, 'interestrate'=> $interestrate, 'maxloan'=> $maxloan, 'mindownpay'=> $mindownpay, 'loanterm'=> $loanterm);
            }
        $response['banks'] = $posts;

        $fp = fopen('banks.json', 'w');
        fwrite($fp, json_encode($response));
        fclose($fp);
    ?>

    <header id="header">
        <div class="container">
            <div class="row row-header">
                <div class="col align-self-center">
                    <h1>Mortgage Calculator</h1>
                </div>
            </div>
        </div>
    </header>
    <div class="container">
        <div class="row row-content">
           <div class="col-12">
              <h3>Payment Plan</h3>
           </div>
            <div class="col-12 col-md-9">
                <form>
                    <div class="form-group row">
                        <label for="initloan" class="col-md-2 col-form-label">Initial loan</label>
                        <div class="col-md-9">
                            <input type="number" class="form-control" id="initloan" name="initloan" placeholder="Initial Loan" onkeypress="numbersOnly(this, event)" onpaste="return false;" onchange="calculateM()">
                        </div>
                        <p class="col-md-1">$</p>
                    </div>
                    <div class="form-group row">
                        <label for="downpayment" class="col-md-2 col-form-label">Down Payment</label>
                        <div class="col-md-9">
                            <input type="number" class="form-control" id="downpayment" name="downpayment" placeholder="Down Payment " value=""onkeypress="numbersOnly(this, event)" onpaste="return false;" onchange="calculateM()">
                        </div>
                        <p class="col-md-1">%</p>
                    </div>
                    <div class="form-group row">
                        <label for="bank" class="col-md-2 col-form-label">Bank</label>
                        <div class="col-md-9">
                            <select class="form-control" id="bank" name="bank" onchange="calculateM()">
                                <option value=""></option>
                            </select>
                        </div>
                        <p class="col-md-1"><a href="changebank.php" class="btn btn-dark" data-toggle="tooltip" title="Add bank"><span class="fa fa-plus" /></a></p>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-4"><h4>Monthly payment</h4></div>
                        <h4 id="resultCalc" name="resultcalc" class="col-md-8">$</h4>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-4">Download payment</div>
                        <p id="resultDP" name="resultdp" class="col-md-8">$</p>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-4">Loan amount</div>
                        <p id="resultLA" name="resultla" class="col-md-8">$</p>
                    </div>
                    <div id="resultTable" name="resulttable" class="form-group row d-none">
                        <div class="col-md-12">
                            <table class="container">
                                <thead>
                                    <tr class="row">
                                        <th class="col col-4">Payment #</th>
                                        <th class="col col-4">Payment</th>
                                        <th class="col col-4">Balance</th>
                                    </tr>
                                </thead>
                                <tbody id="resultTableP" name="resulttablep"></tbody>
                                <tfoot id="totalRes" name="totalres"></tfoot>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
       </div>
    </div>
    <footer>
    </footer>
    <script src="js/scriptsMain.js"></script>
</body>
</html>