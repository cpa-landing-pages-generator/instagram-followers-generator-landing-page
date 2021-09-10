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

$username = get_string_between($igsrc, 'username&quot;:&quot;', '&quot;');

$fullname = get_string_between($igsrc, 'full_name&quot;:&quot;', '&quot;');

$bio = get_string_between($igsrc, 'biography&quot;:&quot;', '&quot;');

$avatar = get_string_between($igsrc, '&lt;meta property=&quot;og:image&quot; content=&quot;', '&quot;');

$isprivate = get_string_between($igsrc, 'is_private&quot;:', ',');

$media = get_string_between($igsrc, 'edge_owner_to_timeline_media&quot;:{&quot;count&quot;:', ',');

$followers = get_string_between($igsrc, 'followed_by&quot;:{&quot;count&quot;:', '}');

$following = get_string_between($igsrc, 'edge_follow&quot;:{&quot;count&quot;:', '}');

$raw = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $igsrc);

$test = get_string_between($raw, '},&quot;edges&quot;:[{', '}}]},&quot;edge_saved_media&quot;');

$COUNTHAHA = $username . $fullname . $bio . $avatar . $test;

if (strlen($COUNTHAHA) > 50) {
  //echo 'Username: ';
  echo $username . '<br>';

  //echo 'Full name: ';
  echo $fullname . '<br>';

  //echo 'Bio: ';
  echo $bio . '<br>';

  //echo 'Avatar: ';
  echo $avatar . '<br>';

  //echo 'Is private: ';
  echo $isprivate . '<br>';

  //echo 'Media count: ';
  echo $media . '<br>';

  //echo 'Followers: ';
  echo $followers . '<br>';

  //echo 'Following: ';
  echo $following . '<br>';

  echo '[{' . $test . '}}]';

  //echo $raw;
} else {
  echo "HTTP request failed!";
}

?>
