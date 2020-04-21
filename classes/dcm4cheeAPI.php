<?php 
    
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
            $token = $this->SetToken();
            
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
            // $date=http_build_query($post_params);
            curl_setopt($ch1, CURLOPT_SSL_VERIFYHOST, false );
            curl_setopt($ch1, CURLOPT_SSL_VERIFYPEER, false );
            curl_setopt($ch1, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $token->access_token
            ));       
            // curl_setopt($ch1, CURLOPT_USERPWD, $this->config['login'] . ":" . $this->config['pass']);
            curl_setopt($ch1, CURLOPT_URL, $this->config['host'].":".$this->config['port'].$service);       
            curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec( $ch1 );
            curl_close( $ch1 );
            $response=json_decode($response);
            return $response;
        }

        public function getStudies($studiesID = null)
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/studies/".$studiesID."?limit=1";
            return $this->setRequest($service,"","get");
        }
        public function getPatients($patientID = null)
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/patients/".$patientID."?";
            return $this->setRequest($service,"","get");
        }
        public function getInstances($instanceID = null)
        {
            $service = "/dcm4chee-arc/aets/DCM4CHEE/rs/instances/".$instanceID."?";
            return $this->setRequest($service,"","get");
        }
        public function getQueryFromFilter($filter) {
            $fio="*";$iin="*";$StudyDate="*";$patientBDate="*";
            $AET="*";
            if(isset($filter['studyDate']) && $filter['studyDate']) {
                $StudyDate=$this->getOrthankDate($filter['studyDate']);
            }
            if(isset($filter['InstitutionName'])) {
                $instName = $filter['InstitutionName'];
            }
            if(isset($filter['iin'])){
                $iin = $filter['iin'];
              }
              if(isset($filter['FIO'])){
                $fio = $filter['FIO'];
              }
              if(isset($filter['patientBDate']) && $filter['patientBDate']){
                $patientBDate = $this->getOrthankDate($filter['patientBDate']);
              }
              return array('PatientID'=>$iin,
                           'StudyDate'=>$StudyDate,
                           'PatientName'=>$fio."*",
                           'PatientBirthDate'=>$patientBDate,
                           'InstitutionName'=>$instName
                        );
        }
    }

?>