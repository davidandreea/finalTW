
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

--Database: 'cupoanedb'
--CREATE DATABASE `cupoanedb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE 'cupoanedb';


--structura tabel 'cupoaneleMele'

CREATE TABLE IF NOT EXIST 'cupoaneleMele' (
    'codCupon' smallint(5) NOT NULL AUTO_INCREMENT,
    'codMagazin' smallint(5),
    'valoareReducere' int(10),
    'valabilitate' date,
    'descriere' varchar(50),
    PRIMARY KEY('codCupon'),
    KEY 'cod_cupoane' ('codCupon') 
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    
    
--structura tabel 'magazine'

CREATE TABLE IF NOT EXIST 'magazine' (
    'codMagazin' smallint(5) NOT NULL AUTO_INCREMENT,
    'sector' smallint(1),
    'strada' varchar(30),
    'nr' smallint(3),
    'telefon' int(10)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;