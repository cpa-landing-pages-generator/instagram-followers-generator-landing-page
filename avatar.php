<?php

function get_string_between($string, $start, $end){
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}

$u = $_GET['u'];

$url = 'http://instagram.com/' . $u;

$ch = curl_init();

$FILE = "SETTINGS.txt";
if($F = fopen($FILE, 'r')){
  $X = fgets($F);
  fclose($F);
}
$X = str_replace("\r\n","",$X);
if ($X == "PROXY") {
    $PROXIES1 = file("PROXIES.txt");
    $CHOSEN1 = $PROXIES1[rand(0, count($PROXIES1) - 1)];
    //CPSP = CHOSEN PROXY SERVER PORT
    $CPSP1 = $CHOSEN1;
    curl_setopt($ch, CURLOPT_PROXY, $CPSP1);
} elseif ($X == "AUTH") {
  $PROXIES2 = file("PROXIES.txt");
  $CHOSEN2 = $PROXIES2[rand(0, count($PROXIES2) - 1)];
  //CPSP = CHOSEN PROXY SERVER PORT
  //CPUP = CHOSEN PROXY USER PASSWORD
  $CEXPLODE = explode("#", $CHOSEN2);
  $CPSP2 = $CEXPLODE[0];
  $CPUP2 = $CEXPLODE[1];
  curl_setopt($ch, CURLOPT_PROXY, $CPSP2);
  curl_setopt($ch, CURLOPT_PROXYUSERPWD, $CPUP2);
}

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36');
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$output = curl_exec($ch);
curl_close($ch);

$igsrc = htmlentities($output, ENT_QUOTES);

$avatar = get_string_between($igsrc, '&lt;meta property=&quot;og:image&quot; content=&quot;', '&quot;');

echo '<style>body { margin: 0 !important; }</style>';

echo '<img style="width: 100% !important; height:100% !important;" src="' . $avatar . '">';
?>
