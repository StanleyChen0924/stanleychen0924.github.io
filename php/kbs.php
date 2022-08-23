<?php
    //parse for kbs living 
    // ID: 11/12/21/22/23/24/25/26/I92
    $id = $_GET['id'];
    $bstrURL = "https://pwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/$id";
    $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $bstrURL);                  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36");
        $data = curl_exec($ch);
        curl_close($ch);
    $json = json_decode($data);
    //channel_item[0].service_url
    $szPlayURL = $json->channel_item[0]->service_url;
    header("location:$szPlayURL");

?>
