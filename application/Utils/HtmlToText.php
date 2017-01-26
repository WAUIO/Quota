<?php namespace App\Utils;

class HtmlToText{

    function html2text($html){
        $text = $html;
        static $search = array(
            '@<script.+?</script>@usi',  // Strip out javascript content
            '@<style.+?</style>@usi',    // Strip style content
            '@<!--.+?-->@us',            // Strip multi-line comments including CDATA
            '@</?[a-z].*?\>@usi',         // Strip out HTML tags
        );
        $text = preg_replace($search, ' ', $text);
        // normalize common entities
        $text = $this->normalizeEntities($text);
        // decode other entities
        $text = html_entity_decode($text, ENT_QUOTES, 'utf-8');
        // normalize possibly repeated newlines, tabs, spaces to spaces
        $text = preg_replace('/\s+/u', ' ', $text);
        $text = trim($text);
        // we must still run htmlentities on anything that comes out!
        // for instance:
        // <<a>script>alert('XSS')//<<a>/script>
        // will become
        // <script>alert('XSS')//</script>
        return $text;
    }

    // replace encoded and double encoded entities to equivalent unicode character
    // also see /app/bookmarkletPopup.js
    function normalizeEntities($text) {
        static $find = array();
        static $repl = array();
        if (!count($find)) {
            // build $find and $replace from map one time
            $map = array(
                array('\'', 'apos', 39, 'x27'), // Apostrophe
                array('\'', '‘', 'lsquo', 8216, 'x2018'), // Open single quote
                array('\'', '’', 'rsquo', 8217, 'x2019'), // Close single quote
                array('"', '“', 'ldquo', 8220, 'x201C'), // Open double quotes
                array('"', '”', 'rdquo', 8221, 'x201D'), // Close double quotes
                array('\'', '‚', 'sbquo', 8218, 'x201A'), // Single low-9 quote
                array('"', '„', 'bdquo', 8222, 'x201E'), // Double low-9 quote
                array('\'', '′', 'prime', 8242, 'x2032'), // Prime/minutes/feet
                array('"', '″', 'Prime', 8243, 'x2033'), // Double prime/seconds/inches
                array(' ', 'nbsp', 160, 'xA0'), // Non-breaking space
                array('-', '‐', 8208, 'x2010'), // Hyphen
                array('-', '–', 'ndash', 8211, 150, 'x2013'), // En dash
                array('--', '—', 'mdash', 8212, 151, 'x2014'), // Em dash
                array(' ', ' ', 'ensp', 8194, 'x2002'), // En space
                array(' ', ' ', 'emsp', 8195, 'x2003'), // Em space
                array(' ', ' ', 'thinsp', 8201, 'x2009'), // Thin space
                array('*', '•', 'bull', 8226, 'x2022'), // Bullet
                array('*', '‣', 8227, 'x2023'), // Triangular bullet
                array('...', '…', 'hellip', 8230, 'x2026'), // Horizontal ellipsis
                array('°', 'deg', 176, 'xB0'), // Degree
                array('€', 'euro', 8364, 'x20AC'), // Euro
                array('¥', 'yen', 165, 'xA5'), // Yen
                array('£', 'pound', 163, 'xA3'), // British Pound
                array('©', 'copy', 169, 'xA9'), // Copyright Sign
                array('®', 'reg', 174, 'xAE'), // Registered Sign
                array('™', 'trade', 8482, 'x2122') // TM Sign
            );
            foreach ($map as $e) {
                for ($i = 1; $i < count($e); ++$i) {
                    $code = $e[$i];
                    if (is_int($code)) {
                        // numeric entity
                        $regex = "/&(amp;)?#0*$code;/";
                    }
                    elseif (preg_match('/^.$/u', $code)/* one unicode char*/) {
                        // single character
                        $regex = "/$code/u";
                    }
                    elseif (preg_match('/^x([0-9A-F]{2}){1,2}$/i', $code)) {
                        // hex entity
                        $regex = "/&(amp;)?#x0*" . substr($code, 1) . ";/i";
                    }
                    else {
                        // named entity
                        $regex = "/&(amp;)?$code;/";
                    }
                    $find[] = $regex;
                    $repl[] = $e[0];
                }
            }
        } // end first time build
        return preg_replace($find, $repl, $text);
    }
}