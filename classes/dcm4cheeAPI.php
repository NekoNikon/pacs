<?php 
    function tohttp( $query ){
        $query_array = array();
        foreach( $query as $key => $key_value ){
            $query_array[] = urlencode( $key ) . '=' . urlencode( $key_value );
        }
        return implode( '&', $query_array );
    }
    class DCM4CHEEAPI {
        protected $config;

        public function __construct($config) {
            $this->config = $config;
        }

        public function setToken()  {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $this->config['auth']);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials&client_id=curl&client_secret=".$this->config['secret']);
            $headers = array();
            $headers[] = 'Content-Type: application/x-www-form-urlencoded';
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            $result = curl_exec($ch);
            if (curl_errno($ch)) {
                echo 'Error:' . curl_error($ch);
            }
            curl_close($ch);
            return json_decode($result);
        }

        public function setRequest($service, $post_params=array(),$method="post") {
            // $token = $this->SetToken();
            
            $ch1 = curl_init($this->config['host']);
            if($post_params && count($post_params)){
                $post_params = json_encode($post_params);
                $post_params = str_replace("u0022", "\"", $post_params);
                $post_params = str_replace("u0027", "\'", $post_params);
            }
            switch ($method) {
                case 'post':
                    curl_setopt($ch1, CURLOPT_POST, true);
                    curl_setopt($ch1, CURLOPT_POSTFIELDS, $post_params);
                    break;
                // case 'get':
                //     curl_setopt($ch1, CURLOPT_POST, false);
                //     curl_setopt($ch1, CURLOPT_POSTFIELDS, $post_params);
                //     break;
                default:
                    # code...
                    break;
            }
            curl_setopt($ch1, CURLOPT_SSL_VERIFYHOST, false );
            curl_setopt($ch1, CURLOPT_SSL_VERIFYPEER, false );
            curl_setopt($ch1, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $_SESSION['token']
            ));       
            curl_setopt($ch1, CURLOPT_URL, $this->config['host'].":".$this->config['port'].$service);       
            curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec( $ch1 );
            curl_close( $ch1 );
            $response=json_decode($response);
            return $response;
        }

        public function setRequestPic($service , $post_params=array() , $method)
        {
            $ch1 = curl_init($this->config['host']);
            if($post_params && count($post_params)){
                $post_params = json_encode($post_params);
                $post_params = str_replace("u0022", "\"", $post_params);
                $post_params = str_replace("u0027", "\'", $post_params);
            }
            switch ($method) {
                case 'post':
                    curl_setopt($ch1, CURLOPT_POST, true);
                    curl_setopt($ch1, CURLOPT_POSTFIELDS, $post_params);
                    break;
                default:
                    # code...
                    break;
            }
            curl_setopt($ch1, CURLOPT_SSL_VERIFYHOST, false );
            curl_setopt($ch1, CURLOPT_SSL_VERIFYPEER, false );
            curl_setopt($ch1, CURLOPT_HTTPHEADER, array(
                //content type - image/png (base64) download
                'Authorization: Bearer ' . $_SESSION['token']
            ));       
            curl_setopt($ch1, CURLOPT_URL, $this->config['host'].":".$this->config['port'].$service);       
            curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec( $ch1 );
            curl_close( $ch1 );
            $response=$response;
            $res =base64_encode($response);
            return $res;
        }

        public function download($study=null , $series=null) {
            $token = $this->SetToken();
            $ch1 = curl_init($this->config['host']);    
            
            // $date=http_build_query($post_params);
            curl_setopt($ch1, CURLOPT_SSL_VERIFYHOST, false );
            curl_setopt($ch1, CURLOPT_SSL_VERIFYPEER, false );
            curl_setopt($ch1, CURLOPT_HTTPHEADER, array(
                // 'Accept: multipart/related;type=application/dicom', 
                'Content-Type: application/json',
                'Authorization: Bearer ' . $token->access_token
            ));       
            curl_setopt($ch1, CURLOPT_ENCODING, 'UTF-8');
            curl_setopt($ch1, CURLOPT_URL, $this->config['host'].":8080/dcm4chee-arc/aets/DCM4CHEE/rs/studies/".$study."/series/".$series."?accept=application/zip");       
            curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec( $ch1 );
            // return $response;
            $fd = fopen("../files/".$study.".zip", 'w') or die("не удалось создать файл");
            fwrite($fd, $response);
            fclose($fd);

            // $file_ot = file("../files/".$study.".dcm");
            // $file = array_splice($file_ot,4);
            // file_put_contents("../files/".$study.".dcm" , implode("" , $file));
            
            curl_close( $ch1 );
            return "/files/".$study.".zip";
        }

        public function prettyDate($str = null,$sep = null)	{
            if ($str) {
                $year = $str[0]. $str[1]. $str[2]. $str[3];
                $month = $str[4].$str[5];
                $day = $str[6].$str[7];
                return $day.$sep.$month.$sep.$year;
            }
            else {
                return "";
            }
        }
        public function prettyTime($str=null,$sep=null) {
            $h = $str[0]. $str[1];
            $m = $str[2]. $str[3];
            $s = $str[4]. $str[5];
            return $h.$sep.$m.$sep.$s;
        }

        public function save($study , $series , $obj) {
		
            $token = $this->SetToken();
            $ch1 = curl_init($this->config['host']);    
            curl_setopt($ch1, CURLOPT_SSL_VERIFYHOST, false );
            curl_setopt($ch1, CURLOPT_SSL_VERIFYPEER, false );
            curl_setopt($ch1, CURLOPT_HTTPHEADER, array(
                'Accept: multipart/related;type=application/dicom', 
                // 'Content-Type: application/dicom',
                'Authorization: Bearer ' . $token->access_token
            ));       
            curl_setopt($ch1, CURLOPT_ENCODING, 'UTF-8');
            // curl_setopt($ch1, CURLOPT_USERPWD, $this->config['login'] . ":" . $this->config['pass']);
            curl_setopt($ch1, CURLOPT_URL, "http://".$this->config['host'].":8080/dcm4chee-arc/aets/DCM4CHEE/rs/studies/".$study."/series/".$series."/instances/".$obj."");       
            curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec( $ch1 );
            $fd = fopen("../files/".$study.".dcm", 'w') or die("не удалось создать файл");
            fwrite($fd, $response);
            fclose($fd);
    
            $file_ot = file("../files/".$study.".dcm");
            $file = array_splice($file_ot,4);
            file_put_contents("../files/".$study.".dcm" , implode("" , $file));
            
            curl_close( $ch1 );
            return "/files/".$study.".dcm";
            // header("location: /download.php?file=".str_replace("." , "" , $study).".dcm");
        }

        public function getSeries($sid)
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/studies/".$sid."/series?includefield=all";
            return $this->setRequest($service,"","get");
        }
        public function getSeriesInfo($sid , $serid)
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/studies/".$sid."/series/".$serid."/instances/?includefield=all";
            return $this->setRequest($service,"","get");
        }
        public function getSource($var = null)
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/studies/".$var."/instances?includefield=all&limit=1";
            return $this->setRequest($service,"","get");
        }
        public function getStudies($param="")
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/studies/?includefield=all&offset=0&". tohttp($param);
            return $this->setRequest($service,"","get");
        }
        public function getStudiesCount($param = "")
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/studies/count?includefield=all&offset=0&". tohttp($param);
            return $this->setRequest($service,"","get");
        }
        public function getStudiesInstaces($studyID = null)
        {
            $service ="/dcm4chee-arc/aets/DCM4CHEE/rs/studies/".$studyID."/instances?";
            return $this->setRequest($service,"","get");

        }
        public function getPicture($stu ,$ser,$ins) {
            $service ="/dcm4chee-arc/aets/DCM4CHEE/wado?requestType=WADO&studyUID=".$stu."&serieUID=".$ser."&objectUID=".$ins;
            return $this->setRequestPic($service,"","get");
        }
        public function getPatients($req="")
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/patients/?includefield=all&".$req;
            return $this->setRequest($service,$req,"get");
        }
        public function getInstances($instanceID = null)
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/instances/".$instanceID."?InstitutionName=*";
            return $this->setRequest($service,"","get");
        }
        public function test($param="")
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/studies/?includefield=all&".$param;
            return $this->setRequest($service,"","get");
        }
        public function getQueryFromFilter($filter) {
            $fio="*";$iin="*";$StudyDate="*";$patientBDate="*";
            $limit = "*";
            $AET="*";$instName="*";

            $params_array = (object)array();
            if(isset($filter['StudyDate']) && $filter['StudyDate']) {
                $StudyDate=str_replace("StudyDate=" , "",$filter['StudyDate']);
                $params_array->StudyDate = $StudyDate;
            }
            if(isset($filter['InstitutionName'])) {
                $instName = $filter['InstitutionName'];
            }
            if(isset($filter['iin'])){
                $iin = $filter['iin'];
            }
            if(isset($filter['limit'])){
                $limit = str_replace("limit=" , "",$filter['limit']);
                $params_array->limit = $limit;
            }
            if(isset($filter['FIO'])){
                $fio = $filter['FIO'];
            }
            if(isset($filter['patientBDate']) && $filter['patientBDate']){
                $patientBDate = $filter['patientBDate'];
            }
            return $params_array;
        }
    }

?>