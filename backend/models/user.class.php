<?php
class User {
    //public $id;
    public $anrede;
    public $vorname;
    public $nachname;
    public $adresse;
    public $plz;
    public $ort;
    public $email;
    public $benutzername;
    public $passwort;
    public $zahlungsinformation_id;
    public $role_id;
    public $erstellungsdatum;

    function __construct(/*$id,*/ $anrede, $vorname, $nachname, $adresse, $plz, $ort,$email,
    $benutzername, $passwort, $zahlungsinformation_id, $role_id, $erstellungsdatum) {
        //$this->id = $id;
        $this->anrede = $anrede;
        $this->vorname=$vorname;
        $this->nachname=$nachname;
        $this->adresse=$adresse;
        $this->plz=$plz;
        $this->ort=$ort;
        $this->email=$email;
        $this->benutzername=$benutzername;
        $this->passwort=$passwort;
        $this->zahlungsinformation_id=$zahlungsinformation_id;
        $this->role_id=$role_id;
        $this->erstellungsdatum=$erstellungsdatum;
        
      }

}