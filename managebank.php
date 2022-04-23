<?php 
    $db_host='localhost'; // хост
    $db_name='id18828332_yammyydb'; // бд
    $db_user='id18828332_yammyy'; // пользователь бд
    $db_pass='i92lBe5pB72j_'; // пароль к бд
    $conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

    // Check connection
    if($conn === false){
        die("ERROR: Could not connect. "
            . mysqli_connect_error());
    }
    // Taking all values from the form data(input)
    $bankname=$_REQUEST['bankname'];
    $banknameusr=$_REQUEST['banknameusr'];
    $interestrate=$_REQUEST['interestrate']; 
    $maxloan=$_REQUEST['maxloan']; 
    $mindownpay=$_REQUEST['mindownpay']; 
    $loanterm=$_REQUEST['loanterm']; 
    switch (array_keys($_POST['type'])[0]) :
    case 'add':
		// Performing insert query execution
		// here our table name is college
		$sql = "INSERT INTO banks VALUES ('$banknameusr',
			'$interestrate','$maxloan','$mindownpay','$loanterm')";
		
		if(mysqli_query($conn, $sql)){
			echo "<h3>data stored in a database successfully."
				. " Please browse your localhost php my admin"
				. " to view the updated data</h3>";

			echo nl2br("\n$bankname\n$banknameusr\n $interestrate\n $maxloan\n $mindownpay\n $loanterm");
		} else{
			echo "ERROR: Hush! Sorry $sql. "
				. mysqli_error($conn);
		}
        break;
    case 'change':
		// Performing update query execution
		// here our table name is college
		$sql = "UPDATE banks SET interestrate=$interestrate, maxloan=$maxloan, mindownpay=$mindownpay, loanterm=$loanterm WHERE bankname='$bankname'";
		
		if(mysqli_query($conn, $sql)){
			echo "<h3>data stored in a database successfully."
				. " Please browse your localhost php my admin"
				. " to view the updated data</h3>";

			echo nl2br("\n$bankname\n$banknameusr\n $interestrate\n $maxloan\n $mindownpay\n $loanterm");
		} else{
			echo "ERROR: Hush! Sorry $sql. "
				. mysqli_error($conn);
		}
        break;
    case 'del':
		// Performing update query execution
		// here our table name is college
		$sql = "DELETE FROM banks WHERE bankname='$bankname'";
		
		if(mysqli_query($conn, $sql)){
			echo "<h3>data stored in a database successfully."
				. " Please browse your localhost php my admin"
				. " to view the updated data</h3>";

			echo nl2br("\n$bankname\n$banknameusr\n $interestrate\n $maxloan\n $mindownpay\n $loanterm");
		} else{
			echo "ERROR: Hush! Sorry $sql. "
				. mysqli_error($conn);
		}
        break;
    endswitch;
		
		// Close connection
		mysqli_close($conn);  
        echo "<script> location.href='changebank.php'; </script>";
        exit;
		?>