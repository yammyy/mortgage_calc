Front-end part of this web application need bootstrap and font-awesome modules (css styles). I used node to install them.
Back-end part is based on mysql+php.
There is a table, named 'banks' in mysql.
The structure is following:
    bankname        varchar(100)
    interestrate    double
    maxloan         double
    mindownpay      double
    loanterm        double
Database parameters is in separate file named db.ini in not public area.
Project was implemented in https://yammyy01.000webhostapp.com/