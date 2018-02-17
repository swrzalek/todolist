
 <?php

 if($_GET['ip']) :
   $ip = ($_GET['ip']);
   $date = ($_GET['date']);
   $number =($_GET['number']);
   utf8_encode($ip);
    echo $ip;
    utf8_encode($params);
    $msg = "Nie zapomnij $ip";

    echo $msg;
    echo $date;

header("Content-type: text/html; charset=utf-8");



function sms_send($params, $token, $backup = false ) {

    static $content;

    if($backup == true){
        $url = 'https://api2.smsapi.pl/sms.do';
    }else{
        $url = 'https://api.smsapi.pl/sms.do';
    }

    $c = curl_init();
    curl_setopt( $c, CURLOPT_URL, $url );
    curl_setopt( $c, CURLOPT_POST, true );
    curl_setopt( $c, CURLOPT_POSTFIELDS, $params );
    curl_setopt( $c, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $c, CURLOPT_HTTPHEADER, array(
       "Authorization: Bearer $token"
    ));

    $content = curl_exec( $c );
    $http_status = curl_getinfo($c, CURLINFO_HTTP_CODE);

    if($http_status != 200 && $backup == false){
        $backup = true;
        sms_send($params, $token, $backup);
    }

    curl_close( $c );
    return $content;
}
$token = "5dc1Xl7udEXMGitqEpay0ffpK5DgT3LohQzqfod1";
$params = array(
     'to' => $number,
     'from' => 'Alert',
     'message' => $msg,
     'encoding' => 'utf-8',
     'date' => $date,
);

echo sms_send($params,$token);
endif;
?>
