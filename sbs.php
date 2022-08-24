<?php
        /*
        S01 = SBS
        S02 = SBS-Sports
        S03 = SBS-Plus
        S04 = SBS-Fun
        S05 = SBS-Golf
        S06 = SBS-Biz
        S07 = SBS-POWER FM
        S08 = SBS-LOVE FM
        S09 = SBS-MTV
        S19 = SBS-GorealraM

        // 非开播时间获取不到链接 ？ //
        * S17 = SBS-POWER FM *
        * S18 = SBS-LOVE FM *

        */

        $id = $_GET['id']; //S01
        $bstrURL = "http://apis.sbs.co.kr/play-api/1.0/onair/channel/$id?v_type=2&platform=pcweb&protocol=hls&ssl=N&rscuse=&jwt-token=&rnd=683";
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$bstrURL);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-FORWARDED-FOR:1.255.87.65'));
        curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36');
        $data = curl_exec($ch);
        $json = json_decode($data);
        //onair.source.mediasource.mediaurl
        $szPlayUrl = $json->onair->source->mediasource->mediaurl;
        header("location:$szPlayUrl");

?>