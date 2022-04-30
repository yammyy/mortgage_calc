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
    if ($result->num_rows>0){
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
    }
?> 
    <header id="header">
        <div class="container">
            <div class="row row-header">
                <div class="col col-11 align-self-center">
                    <h1>Mortgage Calculator</h1>
                </div>
                <div class="col col-1 align-self-center">
                    <p><a data-toggle="tooltip" title="Go to calculator" href="index.php"><span class="fa fa-calculator" /> To calculator</a></p>
                </div>
            </div>
        </div>
    </header>
    <div class="container">
        <div class="row row-content">
           <div class="col-12">
              <h3>Bank Management</h3>
           </div>
            <div class="col-12 col-md-9">
                <form method="post" action="managebank.php" onsubmit="valaddsub(event)">
                    <div class="form-group row">
                        <label for="bankname" class="col-md-2 col-form-label">Bank Name</label>
                        <div class="col-md-10">
                            <select id="bankname" name="bankname" class="form-control" onchange="getData(this)">
                                <option value="">
                            </select>
                            <input id="banknameusr" type="text" class="form-control d-none" name="banknameusr" placeholder="New bank name" onblur="addNewBank(this)">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="interestrate" class="col-md-2 col-form-label">Interest Rate</label>
                        <div class="col-md-9">
                            <input type="number" class="form-control" id="interestrate" name="interestrate" placeholder="Interest rate" value="" onkeypress="numbersOnly(this, event)" onpaste="return false;" onblur="validInpt(this)">
                        </div>
                        <p class="col-md-1">%</p>
                    </div>
                    <div class="form-group row">
                        <label for="maxloan" class="col-md-2 col-form-label">Maximum Loan</label>
                        <div class="col-md-9">
                            <input type="number" class="form-control" id="maxloan" name="maxloan" placeholder="Maximum Loan" onkeypress="numbersOnly(this, event)" onpaste="return false;" onblur="validInpt(this)">
                        </div>
                        <p class="col-md-1"></p>
                    </div>
                    <div class="form-group row">
                        <label for="mindownpay" class="col-md-2 col-form-label">Minimum Down Payment</label>
                        <div class="col-md-9">
                            <input type="number" class="form-control" id="mindownpay" name="mindownpay" placeholder="Minimum Down Payment" onkeypress="numbersOnly(this, event)" onpaste="return false;" onblur="validInpt(this)">
                        </div>
                        <p class="col-md-1">%</p>
                    </div>
                    <div class="form-group row">
                        <label for="loanterm" class="col-md-2 col-form-label">Loan Term</label>
                        <div class="col-md-9">
                            <input type="number" class="form-control" id="loanterm" name="loanterm" placeholder="Loan Term" onkeypress="numbersOnly(this, event)" onpaste="return false;" onblur="validInpt(this)">
                        </div>
                        <p class="col-md-1">years</p>
                    </div>
                    <div class="form-group row">
                        <div class="offset-md-2 col col-md-2">
                            <button type="submit" class="btn btn-dark" id="bankchBTN" name="type[change]">Change</button>
                            <button type="submit" class="btn btn-dark d-none" id="bankaddBTN" name="type[add]">Add</button>
                        </div>
                        <div class="col-md-8">
                            <button type="submit" class="btn btn-dark d-none" id="bankdelBTN" name="type[del]">Delete</button>
                        </div>
                    </div>
                </form>
            </div>
             <div class="col-12 col-md">
            </div>
       </div>
    </div>
    <script src="js/scriptsManage.js"></script>
</body>